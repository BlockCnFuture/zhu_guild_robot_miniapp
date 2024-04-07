const app = getApp();
Page({
  data: {
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    nowitem: '',
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
  LoadTast: function () {
    this.fetch_list();
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
  hideModal(event) {
    let url = event.target.dataset.url;
    this.setData({
      'modal.show': false
    })
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_nowguilds/${app.globalData.token}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.list, ...ret.rows.map(item => {
                let url = item.head;
                let guildr = '';
                if (url.includes('/40?t=')) {
                  url = url.replace('/40?t=', '/0?t=');
                }
                let check = url.match(/cn\/(\d+)\//);
                if (check && check[1] && check[1].length > 4) guildr = check[1];
                return { ...item, exptime: app.times2time(item.expiration_time), show: true, head: url, guildr: guildr };
              })];
            } else {
              ret.rows = ret.rows.map(item => {
                let url = item.head;
                let guildr = '';
                if (url.includes('/40?t=')) {
                  url = url.replace('/40?t=', '/0?t=');
                }
                let check = url.match(/cn\/(\d+)\//);
                if (check && check[1] && check[1].length > 4) guildr = check[1];
                return { ...item, exptime: app.times2time(item.expiration_time), show: true, head: url, guildr: guildr };
              });
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  return {
                    ...item, show: item.name.toLowerCase().includes(s.toLowerCase()) ||
                      item.guildid.toLowerCase().includes(s.toLowerCase())
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
    if (!this.data.nowitem) {
      qq.showToast({
        title: '未选择频道',
        icon: 'none'
      })
      return;
    }
    let guildid = this.data.nowitem.guildid;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/op_pnowguilds/${app.globalData.token}/${op}/${guildid}`,
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
            ...item, show: item.name.toLowerCase().includes(s.toLowerCase()) ||
              item.guildid.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  change: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowitem: item,
      list: this.data.list.map(i => {
        if (i.guildid == item.guildid) {
          return { ...i, select: true };
        } else {
          return { ...i, select: false };
        }
      })
    });
  },
  copynick: function () {
    let item = this.data.nowitem;
    if (!item) return;
    qq.setClipboardData({
      data: item.name,
      success: function () {
        qq.showToast({
          title: '已复制频道名称',
          icon: 'none'
        })
      }
    })
  },
  copyguild: function () {
    let item = this.data.nowitem;
    if (!item) return;
    qq.setClipboardData({
      data: item.guildid,
      success: function () {
        qq.showToast({
          title: '已复制频道id',
          icon: 'none'
        })
      }
    })
  }
})