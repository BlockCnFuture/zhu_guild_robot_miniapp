const app = getApp();
Page({
  onLoad(option) {
    if (option.info) {
      let data = JSON.parse(decodeURIComponent(option.info));
      this.setData({
        own: data.own,
        code: data.code
      })
      this.InitLs();
    }
  },
  InitLs: function () {
    this.setData({
      page: 0,
      userlist: [],
      complete: false
    })
    this.fetch_list();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  copyid: function (e) {
    qq.setClipboardData({
      data: e.currentTarget.dataset.id,
      success: function () {
        qq.showToast({
          title: '已复制用户id',
          icon: 'none'
        })
      }
    })
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  fetch_list() {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchinvitecode_r/${app.globalData.token}/36/${tpage}/${this.data.own}/${this.data.code}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.rows.length > 0) {
            ret.rows = ret.rows.map(i => {
              return { ...i, entertime: app.times2time(i.entertime), show: true };
            })
            if (tpage > 0) ret.rows = [...this.data.userlist, ...ret.rows];
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                userlist: ret.rows.map(item => {
                  return { ...item, show: item.username.toLowerCase().includes(s.toLowerCase()) }
                }),
                page: tpage + 1
              });
            } else {
              this.setData({
                userlist: ret.rows,
                page: tpage + 1
              });
            }
          } else {
            this.setData({
              complete: true
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
            title: `[${ret.errcode}]数据拉取出错`,
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
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.userlist;
    if (s == '') {
      this.setData({
        userlist: list.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        userlist: list.map(item => {
          return { ...item, show: item.username.toLowerCase().includes(s.toLowerCase()) }
        }),
        keyword: s
      });
    }
  },
  data: {
    userlist: [],
    userinfo: app.globalData.userinfo,
    modal: 'hide',
    loadModal: false,
    complete: false,
    page: 0,
    keyword: ''
  }
})
