const app = getApp();
Page({
  data: {
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    complete: false
  },
  onLoad: function () {
    this.fetch_list();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      loadModal: false,
      list: [],
      complete: false
    })
    this.fetch_list();
    qq.stopPullDownRefresh();
  },
  LoadTast: function () {
    this.fetch_list();
  },
  hideModal(event) {
    let url = event.target.dataset.url;
    this.setData({
      'modal.show': false
    })
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_pexpimgs/${app.globalData.token}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.list, ...ret.rows.map(item => ({ ...item, show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, show: true }));
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  return {
                    ...item, show: item.hash.toLowerCase().includes(s.toLowerCase())
                  };
                }),
                page: tpage + 1
              });
            } else {
              this.setData({
                list: ret.rows,
                page: tpage + 1
              });
            }
          }
          this.setData({
            loadModal: false
          })
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false,
            modal: {
              show: true,
              title: '错误',
              content: '您没有审核员权限',
              fine: {
                title: '',
                url: ''
              },
              cancle: {
                title: '确定',
                url: ''
              }
            }
          });
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
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
  opsome: function (e) {
    let op = e.target.dataset.op;
    let item = e.target.dataset.item;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/op_pexpimgs/${app.globalData.token}/${op}/${item.hash}`,
      method: 'GET',
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            nowtarget: '',
            list: [],
            page: 0,
            complete: false
          })
          this.fetch_list();
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false,
            modal: {
              show: true,
              title: '错误',
              content: '您没有审核员权限',
              fine: {
                title: '',
                url: ''
              },
              cancle: {
                title: '确定',
                url: ''
              }
            }
          });
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
          qq.showToast({
            title: `[${ret.errcode}]数据修改出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据修改失败',
          icon: 'none'
        })
      }
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.list;
    if (s == '') {
      this.setData({
        list: list.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        list: list.map(item => {
          return {
            ...item, show: item.hash.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  copyhash: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.hash,
      success: function () {
        qq.showToast({
          title: '已复制图片哈希',
          icon: 'none'
        })
      }
    })
  },
  ViewImage(event) {
    let item = event.currentTarget.dataset.item;
    let link = `${app.globalData.host.slice(0, app.globalData.host.length - 3)}img/${item.hash}`;
    qq.previewImage({
      urls: [link],
      current: link
    })
  }
})