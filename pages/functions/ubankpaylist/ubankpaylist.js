const app = getApp();
Page({
  data: {
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    page: 0,
    keyword: '',
    complete: false
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
            ...item, show: item.nick.toLowerCase().includes(s.toLowerCase())
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
      title: '初遇小竹 - 成员赞助排行',
      path: `/pages/functions/ubankpaylist/ubankpaylist?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
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
  fetch_list: function () {
    if (this.data.complete) return;
    let tpage = this.data.page;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/uwillingpaylist/${app.globalData.token}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            if (tpage > 0) ret.rows = [...this.data.list, ...ret.rows];
            let index = 0;
            ret.rows = ret.rows.map(i => {
              index++;
              return { ...i, left: 60 + 24 * (index.toString().length - 1), index: index, show: true, totalamount: (i.totalamount / 100).toFixed(2) }
            });
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              ret.rows = ret.rows.map(item => {
                return {
                  ...item, show: item.nick.toLowerCase().includes(s.toLowerCase())
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