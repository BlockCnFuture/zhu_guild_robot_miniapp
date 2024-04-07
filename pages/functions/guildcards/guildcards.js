const app = getApp();
Page({
  data: {
    p: 45,
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    channellist: [],
    tochannel: '',
    channelname: '',
    complete: false
  },
  onLoad: function () {
    this.fetch_list();
  },
  addgood() {
    if (this.data.list.length >= 20) {
      qq.showModal({
        title: '数量超限',
        content: '至多可创建20个兑换码库',
        showCancel: false
      })
      return;
    }
    if (!this.data.tochannel) {
      qq.showModal({
        title: '错误',
        content: '必须选择一个子频道来作为指令使用子频道',
        showCancel: false
      })
      return;
    }
    qq.navigateTo({
      url: `./setgood?tochannel=${this.data.tochannel}`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  showinfo: function (event) {
    if (!this.data.tochannel) {
      qq.showModal({
        title: '错误',
        content: '必须选择一个子频道来作为指令使用子频道',
        showCancel: false
      })
      return;
    }
    let item = event.currentTarget.dataset.item;
    qq.navigateTo({
      url: `./setgood?info=${encodeURIComponent(JSON.stringify(item))}&tochannel=${this.data.tochannel}`, fail: err => {
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
      url: `${app.globalData.host}/delguildcardsdb/${app.globalData.token}/${id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_list();
          this.setData({
            loadModal: false
          })
          app.postlog(`删除兑换码库${id}`);
        } else {
          this.setData({
            loadModal: false
          })
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
  fetch_channellist: function () {
    if (this.data.channellist.length > 0) {
      let name = this.data.channellist.filter(item => { return item.type == 0 && item.id == this.data.tochannel });
      if (name && name.length == 1) {
        this.setData({
          channelname: name[0].name
        });
      }
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/channellist/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 })
          });
          let name = ret.data.filter(item => { return item.type == 0 && item.id == this.data.tochannel });
          if (name && name.length == 1) {
            this.setData({
              channelname: name[0].name
            });
          }
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
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
    })
  },
  chosechannel: function () {
    this.setData({
      modalB: 'show'
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channelname: item.name,
      tochannel: item.id,
      modalB: ''
    })
  },
  fetch_list: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchguildcardsdb/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            this.setData({
              complete: false,
              list: ret.rows,
              tochannel: ret.rows[0].fixchannel
            });
          } else {
            this.setData({
              complete: false,
              list: []
            });
          }
          this.fetch_channellist();
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