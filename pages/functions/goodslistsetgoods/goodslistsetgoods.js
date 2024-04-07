const app = getApp();
Page({
  data: {
    p: 44,
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    complete: false
  },
  onLoad: function () {
    this.fetch_list();
  },
  addgood() {
    if (this.data.list.length >= 100) {
      qq.showModal({
        title: '数量超限',
        content: '至多可创建100个礼品',
        showCancel: false
      })
      return;
    }
    qq.navigateTo({
      url: `./setgood`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.navigateTo({
      url: `./setgood?info=${encodeURIComponent(JSON.stringify(item))}`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  delone(event) {
    let id = event.currentTarget.dataset.id;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/delchannelgoods/${app.globalData.token}/${id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_list();
          this.setData({
            loadModal: false
          })
          app.postlog(`删除礼品${id}`);
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 402) {
            qq.showModal({
              title: '无法删除',
              content: '该礼品已上架，请先下架再删除',
              showCancel: false
            })
            return;
          }
          qq.showToast({
            title: `[${ret.errcode}]删除出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })
  },
  onShow() {
    this.fetch_list();
  },
  showmore() {
    let i = 0;
    let list = this.data.list;
    for (let j = 0; j < list.length; j++) {
      if (!list[j].show) {
        list[j].show = true;
        i++;
        if (i >= 10) break;
      }
    }
    this.setData({
      complete: i < 10,
      list: list
    })
  },
  navigate_face: function () {
    qq.navigateTo({
      url: `../qface/qface`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
      ListTouchStartY: e.touches[0].pageY
    })
  },
  ListTouchMove(e) {
    this.setData({
      ListTouchDirectionY: Math.abs(e.touches[0].pageY - this.data.ListTouchStartY) > 100,
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  ListTouchEnd(e) {
    if (this.data.ListTouchDirectionY == true) return;
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  LoadTast: function () {
    this.setData({
      loadModal: false,
      list: [],
      complete: false
    })
    this.fetch_list();
  },
  fetch_list: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchchannelgoods/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            this.setData({
              complete: false,
              list: ret.rows
            });
          } else {
            this.setData({
              complete: false,
              list: []
            });
          }
          this.showmore();
          this.setData({
            loadModal: false
          })
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]数据加载出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  }
})