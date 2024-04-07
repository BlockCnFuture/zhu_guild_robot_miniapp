const app = getApp();
Page({
  onLoad(option) {
    if (option.pa && option.pb && option.pc) {
      this.setData({
        pa: option.pa,
        pb: option.pb,
        pc: option.pc
      })
      this.pull_logs();
    } else {
      qq.showModal({
        title: '错误',
        content: '缺少数据',
        showCancel: false
      })
    }
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
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    let tpage = this.data.page;
    qq.request({
      url: `${app.globalData.host}/historygoodslogs/${app.globalData.token}/${this.data.pa}/${this.data.pb}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) ret.rows = [...this.data.logs, ...ret.rows];
            let s = this.data.keyword;
            if (this.data.keyword != '') {
              this.setData({
                logs: ret.rows.map(i => {
                  if (i.name.toLowerCase().includes(s.toLowerCase()) ||
                    i.usernick.toLowerCase().includes(s.toLowerCase())) {
                    return { ...i, show: true }
                  } else {
                    return { ...i, show: false }
                  }
                }),
                page: tpage + 1
              });

            } else {
              this.setData({
                logs: ret.rows.map(i => { return { ...i, show: true } }),
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
    if (s == '') {
      this.setData({
        logs: this.data.logs.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        logs: this.data.logs.map(i => {
          if (i.name.toLowerCase().includes(s.toLowerCase()) ||
            i.usernick.toLowerCase().includes(s.toLowerCase())) {
            return { ...i, show: true }
          } else {
            return { ...i, show: false }
          }
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
  hassend(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/hassendgoods/${app.globalData.token}/${item.logid}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: `执行成功`,
            icon: 'none'
          })
          app.postlog(`核销礼品记录${item.id}`);
          this.setData({
            loadModal: false,
            logs: [],
            page: 0,
            complete: false,
            loading: false
          })
          this.pull_logs();
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '错误',
              content: '您没有礼品核销权限',
              showCancel: false
            })
            return;
          }
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
          title: '修改失败',
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
    ologs: [],
    logs: [],
    page: 0,
    complete: false,
    loading: false,
    userinfo: app.globalData.userinfo,
    keyword: '',
    pa: '0',
    pb: '1',
    pc: '0'
  }
})