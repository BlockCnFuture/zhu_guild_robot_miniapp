const app = getApp();
Page({
  data: {
    order: '0',
    p: 44,
    rolelist: [],
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    page: 0,
    keyword: '',
    complete: false,
    oplist: [
      { name: '每日打卡榜', order: '0' },
      { name: '连续打卡榜', order: '1' },
      { name: '累计打卡榜', order: '2' }
    ]
  },
  selectallr: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: true };
      })
    })
    this.refshowbyrole();
  },
  cancleallr: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: false };
      })
    })
    this.refshowbyrole();
  },
  setsaferoles: function () {
    this.setData({
      modalE: 'show'
    })
  },
  hideModalE: function () {
    this.setData({
      modalE: ''
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
            ...item, show: item.usernick.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 成员打卡排行',
      path: `/pages/functions/onworklist/onworklist?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  oclick(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      order: item.order,
      list: [],
      page: 0,
      complete: false,
      modalA: ''
    });
    this.fetch_list();
  },
  hideModalA() {
    this.setData({
      modalA: ''
    })
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  changeorder() {
    this.setData({
      modalA: 'show'
    })
  },
  onShow() {
    this.fetch_list();
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
  refshowbyrole() {
    if (this.data.rolelist.length <= 0) return;
    let check = this.data.rolelist.filter(i => { return i.select; });
    this.setData({
      list: this.data.list.map(i => {
        if (i.roles != undefined && i.roles != '') {
          let show = false;
          for (let ss of check) {
            if (i.roles.includes(`|${ss.id}|`)) {
              show = true;
              break;
            }
          }
          return { ...i, show: show };
        } else {
          return { ...i, show: check.length == this.data.rolelist.length }
        }
      })
    })
  },
  copyText: function (e) {
    let link = e.currentTarget.dataset.link;
    let name = e.currentTarget.dataset.name;
    qq.setClipboardData({
      data: link,
      success: function () {
        qq.showToast({
          title: `已复制${name}`
        })
      }
    })
  },
  LoadTast: function () {
    this.setData({
      loadModal: false,
      list: [],
      page: 0,
      complete: false
    })
    this.fetch_list();
  },
  fclick_: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
    this.refshowbyrole();
  },
  fetch_rolelist: function () {
    if (this.data.rolelist.length > 0) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/rolelist/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          ret.data.map(item => {
            item.hexcolor = '#' + (item.color).toString(16).substr(2).toUpperCase();
            item.select = true;
          })
          ret.data = ret.data.filter(i => { return i.id != '7' });
          this.setData({
            rolelist: [...ret.data, ...Array.from({ length: 25 }, (i, v) => { return { id: (v + 10 + 1).toString(), name: `等级身份组 LV.${v + 1}`, hexcolor: 'n', select: true } })]
          });
          this.setData({
            loadModal: false
          })
        } else {
          if (!ret.errcode) return;
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]取身份组失败`,
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
  fetch_list: function () {
    this.fetch_rolelist();
    if (this.data.complete) return;
    let tpage = this.data.page;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/onworklists/${app.globalData.token}/${this.data.order}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            if (this.data.order == '0') ret.rows = ret.rows.map(i => { return { ...i, time: app.times2time(i.time) } });
            if (tpage > 0) ret.rows = [...this.data.list, ...ret.rows];
            let index = 0;
            ret.rows = ret.rows.map(i => {
              index++;
              return { ...i, left: 60 + 24 * (index.toString().length - 1), index: index, show: true }
            });
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              ret.rows = ret.rows.map(item => {
                return {
                  ...item, show: item.usernick.toLowerCase().includes(s.toLowerCase())
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
          this.refshowbyrole();
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
  }
})