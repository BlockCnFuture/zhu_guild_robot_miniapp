const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '礼品商店',
      path: `/pages/functions/goodslist/goodslist?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.goods[this.data.TabCur];
    if (s == '') {
      this.setData({
        [`goods[${this.data.TabCur}]`]: list.map(i => {
          return { ...i, show: true };
        }),
        keyword: s
      });
    } else {
      this.setData({
        [`goods[${this.data.TabCur}]`]: list.map(i => {
          if (i.name.toLowerCase().includes(s.toLowerCase()) ||
            i.point_name.toLowerCase().includes(s.toLowerCase())) {
            return { ...i, show: true };
          } else {
            return { ...i, show: false };
          }
        }),
        keyword: s
      });
    }
  },
  onShow() {
    let p = this.data.userinfo.permissions;
    let role = this.data.userinfo.member_role;
    if (role == '2' || app.hasPermission(p, 44)) {
      this.setData({
        isadmin: true
      })
    }
    this.fetchpoints();
    this.fetch_shopinfo();
  },
  onPullDownRefresh: function () {
    this.fetchpoints();
    this.fetch_shopinfo();
    qq.stopPullDownRefresh();
  },
  LoadTast: function () {
    let p = this.data.userinfo.permissions;
    let role = this.data.userinfo.member_role;
    if (role == '2' || app.hasPermission(p, 44)) {
      this.setData({
        isadmin: true
      })
    }
    this.fetchpoints();
    this.fetch_shopinfo();
  },
  data: {
    keyword: '',
    _keyword: '',
    isadmin: false,
    userinfo: app.globalData.userinfo,
    modalA: '',
    pointlist: [],
    fromp: '',
    top: '',
    nowtarget: '',
    tmpc: '',
    loadModal: false,
    TabCur: 0,
    groups: [],
    goods: [],
    showrest: false,
    complate: false
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
      let p = this.data.userinfo.permissions;
      let role = this.data.userinfo.member_role;
      if (role == '2' || app.hasPermission(p, 44)) {
        this.setData({
          isadmin: true
        })
      }
    }
  },
  showpointinfo(e) {
    let info = e.currentTarget.dataset.info;
    if (!info || info == '') {
      qq.showModal({
        title: '无介绍',
        content: '该积分未设置介绍',
        showCancel: false
      })
    } else {
      qq.showModal({
        title: '积分介绍',
        content: info,
        showCancel: false
      })
    }
  },
  tabSelect(e) {
    this.setData({
      keyword: '',
      _keyword: '',
      TabCur: e.currentTarget.dataset.id
    })
    this.showmore();
  },
  switchTab(e) {
    this.setData({
      keyword: '',
      __keyword: '',
      TabCur: e.detail.current
    })
    this.showmore();
  },
  fetchpoints() {
    if (this.data.pointlist.length > 0) {
      this.fetchuserpoints();
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/self`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            pointlist: ret.rows,
            loadModal: false
          });
          if (ret.rows.length <= 0) {
            qq.showModal({
              title: "无任何积分",
              content: "本频道无任何自定义积分，请联系管理员创建",
              showCancel: false
            });
          } else {
            this.fetchuserpoints();
          }
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
  fetchuserpoints() {
    if (this.data.pointlist.length <= 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchuserpoints/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            pointlist: this.data.pointlist.map(item => {
              let check = ret.rows.filter(i => { return i.point_id == item.point_id });
              if (check && check.length > 0) {
                return { ...item, point_cnt: check[0].points };
              } else {
                return { ...item, point_cnt: 0 };
              }
            }),
            loadModal: false
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
  fetch_shopinfo() {
    this.setData({
      keyword: '',
      _keyword: '',
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_shopinfo/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          let sets = ret.sets;
          let goods = ret.goods;
          this.setData({
            loadModal: false
          });
          if (!sets || sets.useit != 'true') {
            qq.showModal({
              title: "未开启",
              content: "礼品商店暂未开启，请联系管理员开启",
              showCancel: false
            })
          } else {
            try {
              sets = JSON.parse(sets.content);
            } catch (err) {
              qq.showModal({
                title: "未开启",
                content: "礼品商店暂未开启，请联系管理员开启",
                showCancel: false
              });
              return;
            }
            let groups = [];
            let _goods = [];
            if (sets.showall) {
              groups.push('全部');
              _goods.push(goods);
            }
            groups.push(...sets.groups);
            groups.forEach((val, i) => {
              if (i == 0 && sets.showall) return;
              _goods.push(goods.filter(ii => { return ii.groupname == val }));
            });
            this.setData({
              showrest: sets.showrest,
              groups: groups,
              goods: _goods
            })
            this.showmore();
          }
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
  goodsneedsend() {
    qq.navigateTo({
      url: `../historygoods/historygoods?pa=1&pb=0&pc=1`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
    return;
  },
  navigate() {
    qq.navigateTo({
      url: `../goodslistset/goodslistset`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  showinfo(event) {
    let item = event.currentTarget.dataset.item;
    qq.navigateTo({
      url: `./goodsinfo?item=${encodeURIComponent(JSON.stringify(item))}&points=${encodeURIComponent(JSON.stringify(this.data.pointlist))}`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  showmore() {
    let i = 0;
    let list = this.data.goods[this.data.TabCur];
    for (let j = 0; j < list.length; j++) {
      if (!list[j].show) {
        list[j].show = true;
        i++;
        if (i >= 10) break;
      }
    }
    this.setData({
      complete: i < 10,
      [`goods[${this.data.TabCur}]`]: list
    })
  }
})