const app = getApp();
let RewardedVideoAd = false;
Page({
  onShow() {
    if (!RewardedVideoAd) {
      let sthis = this;
      RewardedVideoAd = qq.createRewardedVideoAd({
        adUnitId: '5d0a3f1295a64818fec4e6f5555a49f8'
      });
      RewardedVideoAd.onError((res) => {
        sthis.delTodayAdCnt();
        qq.showToast({
          title: '拉起视频出错',
          icon: 'none'
        });
      });
      RewardedVideoAd.onClose((res) => {
        if (!res.isEnded) {
          sthis.delTodayAdCnt();
          qq.showToast({
            title: '未观看完成',
            icon: 'none'
          });
        } else {
          this.setData({
            loadModal: true
          })
          qq.request({
            url: `${app.globalData.host}/ad_gainGoods/${app.globalData.token}`,
            success: (data) => {
              let ret = data.data;
              if (ret.errcode == 0) {
                qq.showModal({
                  title: '续期成功',
                  content: `成功为当前频道续期${ret.days}天`,
                  showCancel: false
                })
                this.setData({
                  loadModal: false
                })
              } else {
                this.setData({
                  loadModal: false
                })
                qq.showToast({
                  title: `奖励发放出错`,
                  icon: 'none'
                })
              }
            },
            fail: () => {
              this.setData({
                loadModal: false
              })
              qq.showToast({
                title: '奖励发放出错',
                icon: 'none'
              })
            }
          })
        }

      });
    }
    this.readhistorypage();
  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
      ListTouchStartY: e.touches[0].pageY
    })
  },
  ListTouchMove(e) {
    let val = e.touches[0].pageX - this.data.ListTouchStart;
    if (val > 80) {
      val = 'right';
    } else if (val < -80) {
      val = 'left';
    } else {
      val = '';
    }
    this.setData({
      ListTouchDirectionY: Math.abs(e.touches[0].pageY - this.data.ListTouchStartY) > 60,
      ListTouchDirection: val
    })
  },
  ListTouchEnd(e) {
    if (this.data.ListTouchDirectionY == true) return;
    if (this.data.ListTouchDirection == 'right') {
      this.setData({
        modalName: 'viewModal'
      })
    } else if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: ''
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.indexpagelist;
    if (s == '') {
      this.setData({
        indexpagelist: list.map(i => {
          let pages = i.pages.map(ii => {
            return { ...ii, hiden: false }
          });
          return {
            group: i.group, pages: pages, hiden: pages.filter(i => !i.hiden).length <= 0
          };
        }),
        keyword: s
      });
    } else {
      this.setData({
        indexpagelist: list.map(i => {
          let pages = i.pages.map(ii => {
            if (ii.name.toLowerCase().includes(s.toLowerCase()) ||
              ii.desc.toLowerCase().includes(s.toLowerCase())) {
              return { ...ii, hiden: false }
            } else {
              return { ...ii, hiden: true }
            }
          });
          return {
            group: i.group, pages: pages, hiden: pages.filter(i => !i.hiden).length <= 0
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
      title: '初遇小竹 - 系统首页'
    }
  },
  data: {
    showad: true,
    keyword: '',
    canviewad: true,
    userinfo: app.globalData.userinfo,
    permissionlist: app.globalData.permissionlist,
    indexpagelist: app.globalData.indexpagelist,
    adminguildid: app.globalData.adminguildid,
    loadModal: false,
    guildlist: [],
    historypages: [],
    iconList: [{
      icon: 'location',
      color: 'blue',
      badge: 0,
      name: '地址管理',
      page: "mylocation"
    }, {
      icon: 'presentfill',
      color: 'red',
      badge: 0,
      name: '待发礼品',
      page: "nowgoods"
    }, {
      icon: 'formfill',
      color: 'purple',
      badge: 0,
      name: '已发礼品',
      page: "historygoods"
    }, {
      icon: 'shopfill',
      color: 'green',
      badge: 0,
      name: '礼品商店',
      page: "goodslist"
    }, {
      icon: 'pay',
      color: 'black',
      badge: 0,
      name: '个人资产',
      page: "mypoints"
    }, {
      icon: 'vipcard',
      color: 'green',
      badge: 0,
      name: '资产银行',
      page: "pointsbank"
    }, {
      icon: 'recharge',
      color: 'yellow',
      badge: 0,
      name: '跨频转账',
      page: "transpoints"
    }]
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      });
    }
  },
  ReSetCallBack: function () {
    this.setData({
      userinfo: app.globalData.userinfo
    });
  },
  hideModalA() {
    this.setData({
      modalA: ''
    })
  },
  readhistorypage() {
    let check = '';
    try {
      let value = qq.getStorageSync('historypages')
      if (value) check = JSON.parse(value);
    } catch (e) {
      return false;
    }
    if (!check) return false;
    check = check.slice(0, 5);
    this.setData({
      historypages: check
    })
    return true;
  },
  addhistorypage(item) {
    let check = [];
    try {
      let value = qq.getStorageSync('historypages')
      if (value) check = JSON.parse(value);
    } catch (e) {
      check = [];
    }
    check = check.filter(i => { return i.url != item.url });
    check = [item, ...check];
    check = check.slice(0, 5);
    try {
      qq.setStorageSync('historypages', JSON.stringify(check));
    } catch (e) {
      return false;
    }
    return true;
  },
  copyid: function () {
    qq.setClipboardData({
      data: this.data.userinfo.open_guild_id,
      success: function () {
        qq.showToast({
          title: '已复制'
        })
      }
    })
  },
  clcpcnt(permission) {
    return (permission.match(/1/g) || []).length;
  },
  changeguild() {
    if (app.globalData.token == '') {
      qq.showModal({
        title: '登录失败',
        content: '小程序登录失败，请重新进入小程序',
        showCancel: false
      });
      return;
    }
    if (this.data.guildlist.length > 0) {
      this.setData({
        guildlist: this.data.guildlist.map(i => {
          return { ...i, select: i.guildid == this.data.userinfo.open_guild_id }
        }),
        loadModal: false,
        modalA: 'show'
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_guildsnew/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            guildlist: ret.rows.map(i => {
              let url = i.guildhead;
              if (url.includes('/40?t=')) {
                url = url.replace('/40?t=', '/0?t=');
              }
              return { ...i, select: i.guildid == this.data.userinfo.open_guild_id, guildhead: url }
            }),
            loadModal: false,
            modalA: 'show'
          });
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
  copyuid: function (event) {
    qq.setClipboardData({
      data: this.data.userinfo.member_userid,
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  },
  stopit() {
    return;
  },
  stips() {
    qq.showModal({
      title: '提示',
      content: '请在对应的频道，通过机器人的资料卡打开小程序，方可增加频道记录',
      showCancel: false
    })
  },
  CopyText(e) {
    qq.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        qq.showToast({
          title: '已复制内容',
          icon: 'none',
        })
      }
    })
  },
  checkpermission: function (name) {
    if (this.data.userinfo.member_role == 2) return true;
    let nopls = ['stroill', 'help1', 'help2', 'commandsls', 'getrole', 'keywords_p', 'pushmessageontime_p', 'updatelogs', 'myownlogs', 'myinvitecodes', 'qface', 'disbanapply', 'officetasks', 'lc_keywords', 'forbiddenwordsbase', 'gaingoods', 'mylocation', 'nowgoods', 'historygoods', 'goodslist', 'mypoints', 'transpoints', 'onworklist', 'upointslist', 'pointsbank',
      'itoolsp', 'payforguild', 'ubankpaylist', 'guildsmanage', 'imagesp'];
    if (nopls.includes(name)) return true;
    let id = this.data.permissionlist[name];
    let ret = app.hasPermission(this.data.userinfo.permissions, id);
    return ret;
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  navigate: function (event) {
    let item = event.currentTarget.dataset.item;
    let target = event.currentTarget.dataset.url;
    if (!this.data.userinfo.open_guild_id) {
      qq.showModal({
        title: '未选择频道',
        content: '请选择一个频道后再进行操作',
        showCancel: false
      });
      return;
    }
    if (target == 'index') return;
    if (target == 'people') {
      this.setData({
        modalName: 'viewModal'
      })
      return;
    }
    if (target == 'permission' || target == 'permission_c') {
      if (this.data.userinfo.member_role != 2) {
        qq.showToast({
          title: '请使用频道主账号分配权限',
          icon: 'none'
        })
        return;
      }
    } else {
      if (!this.checkpermission(target)) {
        qq.showToast({
          title: '频道主未授予您相关权限',
          icon: 'none'
        })
        return;
      }
    }
    if (item) this.addhistorypage(item);
    if (target == 'nowgoods') {
      qq.navigateTo({
        url: `../historygoods/historygoods?pa=0&pb=0&pc=0`, fail: err => {
          qq.showToast({
            title: '跳转失败',
            icon: 'none'
          })
        }
      })
      return;
    }
    if (target == 'historygoods') {
      qq.navigateTo({
        url: `../historygoods/historygoods?pa=0&pb=1&pc=0`, fail: err => {
          qq.showToast({
            title: '跳转失败',
            icon: 'none'
          })
        }
      })
      return;
    }
    if (target == 'lc_keywords') {
      qq.navigateTo({
        url: `../../lightcute/keywords/keywords`,
        fail: () => {
          qq.showToast({
            title: '暂未开放',
            icon: 'none'
          })
        }
      });
    } else {
      qq.navigateTo({
        url: `../${target}/${target}`,
        fail: () => {
          qq.showToast({
            title: '暂未开放',
            icon: 'none'
          })
        }
      });
    }
  },
  change: function (event) {
    let item = event.currentTarget.dataset.item;
    if (item.guildid == this.data.userinfo.open_guild_id) {
      this.setData({
        modalA: ''
      })
    } else {
      this.setData({
        modalA: ''
      })
      this.setData({
        loadModal: true
      });
      let sthis = this;
      qq.getGuildInfo({
        open_guild_id: item.guildid,
        success: res => {
          try {
            let pack = {
              encryptedData: res.encryptedData,
              iv: res.iv,
              token: app.globalData.token,
              open_guild_id: item.guildid
            };
            qq.request({
              url: `${app.getHost()}/decodedata`,
              data: pack,
              method: 'POST',
              success: res => {
                let ret = res.data;
                if (ret.errcode == 0) {
                  ret = ret.data;
                  ret = JSON.parse(ret);
                  if (ret.retcode == 0) {
                    if (ret.data.member_role == undefined) { //实际上登录失败
                      this.setData({
                        loadModal: false
                      });
                      qq.showModal({
                        title: '登录失败',
                        content: '请确认您是否仍在该频道内',
                        showCancel: false
                      });
                      return;
                    }
                    sthis.data.guildlist.map(i => {
                      if (i.guildid == item.guildid) {
                        return { ...i, select: true };
                      } else {
                        return { ...i, select: false };
                      }
                    })
                    sthis.setData({
                      guildlist: sthis.data.guildlist
                    })
                    app.refLoginData(item.guildid, ret.data);
                    this.setData({
                      loadModal: false
                    });
                  } else {
                    this.setData({
                      loadModal: false
                    });
                    qq.showToast({
                      title: '登录失败',
                      icon: 'none'
                    })
                  }
                } else {
                  this.setData({
                    loadModal: false
                  });
                  qq.showToast({
                    title: '登录失败',
                    icon: 'none'
                  })
                }
              },
              fail: res => {
                this.setData({
                  loadModal: false
                });
                qq.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }
            })
          } catch (e) { }
        },
        fail: res => {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      })
    }
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  aderr() {
    this.setData({
      showad: false
    });
  },
  adsucc() {
    this.setData({
      showad: true
    });
  },
  TodayTime() {
    let d = new Date();
    return `${d.getFullYear()} ${d.getMonth() + 1}-${d.getDate()}`;
  },
  readTodayAdCnt() {
    let check = '';
    try {
      let value = qq.getStorageSync('ads_cnt')
      if (value) check = JSON.parse(value);
    } catch (e) {
      return false;
    }
    if (!check) return false;
    return check;
  },
  addTodayAdCnt() {
    let check = this.readTodayAdCnt();
    if (!check) check = {};
    let date = this.TodayTime();
    if (!check.date || check.date != date) {
      check.cnt = 1;
      check.date = date;
    } else {
      check.cnt = check.cnt + 1;
    }
    if (check.cnt > 3) return false;
    try {
      qq.setStorageSync('ads_cnt', JSON.stringify(check));
    } catch (e) {
      return false;
    }
    return true;
  },
  delTodayAdCnt() {
    let check = this.readTodayAdCnt();
    if (!check) check = {};
    let date = this.TodayTime();
    if (!check.date || check.date != date) {
      check.cnt = 0;
      check.date = date;
    } else {
      check.cnt = check.cnt - 1;
    }
    if (check.cnt < 0) check.cnt = 0;
    try {
      qq.setStorageSync('ads_cnt', JSON.stringify(check));
    } catch (e) {
      return false;
    }
    return true;
  },
  watchvideo() {
    if (!this.data.userinfo.open_guild_id) {
      qq.showModal({
        title: '未选择频道',
        content: '请选择一个频道后再进行操作',
        showCancel: false
      });
      return;
    }
    let sthis = this;
    if (RewardedVideoAd) {
      let addcheck = sthis.addTodayAdCnt();
      if (!addcheck) {
        sthis.setData({
          canviewad: false
        })
        qq.showToast({
          title: '今日次数达到上限',
          icon: 'none'
        });
        return;
      }
      RewardedVideoAd.load().then(() => {
        RewardedVideoAd.show();
      });
    }
  }
})