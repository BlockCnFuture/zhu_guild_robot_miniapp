const app = getApp();
Page({
  data: {
    user_id: '',
    point_id: '',
    point_name: '',
    isadmin: true,
    p: 46,
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    page: 0,
    complete: false,
    keyword: ''
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
            ...item, show: item.opnick.toLowerCase().includes(s.toLowerCase()) ||
              item.reason.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  copyText: function (event) {
    let link = event.currentTarget.dataset.link;
    let name = event.currentTarget.dataset.name;
    qq.setClipboardData({
      data: link,
      success: function () {
        qq.showToast({
          title: `已复制${name}`,
          icon: 'none'
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      list: [],
      complete: false,
    })
    this.fetch_list();
    qq.stopPullDownRefresh();
  },
  onLoad(option) {
    if (option.user_id && option.point_id && option.point_name) {
      this.setData({
        user_id: option.user_id,
        point_id: option.point_id,
        point_name: decodeURIComponent(option.point_name)
      })
      this.fetch_list();
    } else {
      qq.showModal({
        title: "数据缺失",
        content: "进入页面时缺少必要数据",
        showCancel: false
      });
    }
  },
  showmore() {
    this.fetch_list();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  LoadTast: function () {
    //
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  fetch_list: function () {
    if (this.data.complete || !this.data.point_id || !this.data.user_id) return;
    let tpage = this.data.page;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upointschangelogs/${app.globalData.token}/${this.data.user_id}/${this.data.point_id}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            ret.rows = ret.rows.map(i => {
              let changepoint = i.changepoint;
              if (i.reason == '管理员手动清空全员积分') {
                changepoint = '-ALL'
              } else if (i.reason == '系统定时重置积分') {
                changepoint = `set ${i.changepoint}`
              } else {
                if (changepoint > 0) {
                  changepoint = `+${i.changepoint}`;
                } else {
                  changepoint = `${i.changepoint}`;
                }
              }
              return { ...i, show: true, changepoint: changepoint, time: app.times2time(i.time) }
            });
            if (tpage > 0) ret.rows = [...this.data.list, ...ret.rows];
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              ret.rows = ret.rows.map(item => {
                return {
                  ...item, show: item.opnick.toLowerCase().includes(s.toLowerCase()) ||
                    item.reason.toLowerCase().includes(s.toLowerCase())
                }
              })
            }
            this.setData({
              complete: false,
              page: tpage + 1,
              list: ret.rows
            });
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
          if (ret.errcode == 403) {
            qq.showModal({
              title: "权限不足",
              content: "抱歉，您没有查看相应数据的权限",
              showCancel: false
            })
            return;
          }
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