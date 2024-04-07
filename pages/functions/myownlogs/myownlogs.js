const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '查看 我的系统日志 ',
      path: `/pages/functions/myownlogs/myownlogs?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  onLoad() {
    this.pull_logs();
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
      logs: [],
      page: 0,
      complete: false,
      loading: false
    })
    this.pull_logs();
  },
  pull_logs: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/mylogs/${app.globalData.token}/get/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.logs, ...ret.rows.map(item => ({ ...item, time: app.times2time(item.time), show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, time: app.times2time(item.time), show: true }));
            }
            let s = this.data.keyword;
            if (this.data.keyword != '') {
              this.setData({
                logs: ret.rows.map(item => {
                  return {
                    ...item, show: item.usernick.toLowerCase().includes(s.toLowerCase()) ||
                      item.userid.includes(s.toLowerCase()) ||
                      item.time.toLowerCase().includes(s.toLowerCase()) ||
                      item.logs.toLowerCase().includes(s.toLowerCase())
                  };
                }),
                page: tpage + 1
              });

            } else {
              this.setData({
                logs: ret.rows,
                page: tpage + 1
              });
            }

          }
          this.setData({
            loadModal: false
          })
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
        if (!ret.errcode) return;
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let logs = this.data.logs;
    if (s == '') {
      this.setData({
        logs: logs.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        logs: logs.map(item => {
          return {
            ...item, show: item.time.toLowerCase().includes(s.toLowerCase()) ||
              item.logs.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  copylog: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.logs,
      success: function () {
        qq.showToast({
          title: '已复制日志',
          icon: 'none'
        })
      }
    })
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.userid,
      success: function () {
        qq.showToast({
          title: '已复制用户id',
          icon: 'none'
        })
      }
    })
  },
  copynick: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.usernick,
      success: function () {
        qq.showToast({
          title: '已复制用户昵称',
          icon: 'none'
        })
      }
    })
  },
  copytime: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.time,
      success: function () {
        qq.showToast({
          title: '已复制时间',
          icon: 'none'
        })
      }
    })
  },
  loadmore: function () {

    if (this.data.loading) {
      return;
    }

    this.setData({
      loading: true
    });

    this.pull_logs();

    this.setData({
      loading: false
    });
  },
  data: {
    loadModal: false,
    logs: [],
    page: 0,
    complete: false,
    loading: false,
    userinfo: app.globalData.userinfo,
    keyword: ''
  }
})