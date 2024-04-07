const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '自助领取身份组',
      path: `/pages/functions/getrole/getrole?guildID=${app.globalData.userinfo.open_guild_id}&i=${app.globalData.userinfo.query.i}`
    }
  },
  onShow() {
    this.LoadTast();
  },
  LoadTast: function () {
    this.fetch_rolesets();
  },
  data: {
    userinfo: app.globalData.userinfo,
    rolesets: [],
    nowrolec: {},
    uinfo: false,
    nowroles: 0,
    height: 0
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      let index = app.globalData.userinfo.query.i;
      if (index == undefined) {
        index = 0;
      } else {
        index = Number(index);
      }
      if (this.data.rolesets.content && this.data.rolesets.content.length > index && index >= 0) {
        this.data.nowrolec = this.data.rolesets.content[index];
      }
      this.setData({
        userinfo: app.globalData.userinfo,
        nowrolec: this.data.nowrolec
      })
    }
  },
  loaded(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      height: h
    })
  },
  fetch_rolesets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getrolesets/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            if (!ret.sets.useit) {
              this.setData({
                rolesets: {}
              });
              qq.showModal({
                title: '通知',
                content: '该频道未开启此功能，请联系频道主或管理员开启',
                showCancel: false
              });
            } else {
              let len = ret.sets.content.length;
              for (let i = 0; i < len; i++) {
                ret.sets.content[i].roles.map(item => {
                  item.hexcolor = '#' + (item.rolecolor).toString(16).substr(2).toUpperCase();
                  item.canexit = ret.sets.content.canexit;
                })
              }
              let index = app.globalData.userinfo.query.i;
              if (index == undefined || index < 0) {
                index = 0;
              } else {
                index = Number(index);
              }
              if (index >= ret.sets.content.length) index = ret.sets.content.length - 1;
              this.setData({
                rolesets: ret.sets,
                nowroles: 0,
                nowrolec: ret.sets.content[index]
              });
              this.fetch_uinfo();
            }
          } else {
            this.setData({
              rolesets: {}
            });
            qq.showModal({
              title: '通知',
              content: '该频道未开启此功能，请联系频道主或管理员开启',
              showCancel: false
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
          if (ret.errcode == 408) {
            qq.showModal({
              title: '登录失败',
              content: '抱歉，小程序登录失败，请您重新进入小程序',
              showCancel: false
            });
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
  },
  fetch_uinfo: function () {
    this.setData({
      loadModal: true
    })
    this.data.nowroles = 0;
    qq.request({
      url: `${app.globalData.host}/fetchuinfo/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            uinfo: ret.info,
            loadModal: false,
            'nowrolec.roles': this.data.nowrolec.roles.map(i => {
              if (ret.info.roles.includes(i.roleid)) {
                this.data.nowroles++;
                return { ...i, select: true, canexit: this.data.nowrolec.canexit }
              } else {
                return { ...i, select: false, canexit: this.data.nowrolec.canexit }
              }
            })
          })
        } else {
          this.setData({
            loadModal: false,
            rolesets: {}
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
          loadModal: false,
          rolesets: {}
        })
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  },
  checklevel(roles) {
    if (!roles) return 1;
    let check = roles.filter(i => {
      return Number(i) >= 11 && Number(i) <= 35
    })
    if (check && check.length == 1) {
      return Number(check[0]) - 10;
    }
    return 0;
  },
  canclerole: function (e) {
    let item = e.target.dataset.item;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/changerole/${app.globalData.token}/${item.roleid}/del/0`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_uinfo();
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]请求出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false,
          rolesets: {}
        })
        qq.showToast({
          title: '请求加载失败',
          icon: 'none'
        })
      }
    })
  },
  newrole: function (e) {
    let item = e.target.dataset.item;
    let s = this.data.nowrolec;

    //数量检查
    if (!s.multigain) {
      if (this.data.nowroles >= 1) {
        qq.showModal({
          title: '数量超限',
          content: '最多只能领取 1 个身份组',
          showCancel: false
        });
        return;
      }
    } else {
      if (this.data.nowroles >= s.maxcnt) {
        qq.showModal({
          title: '数量超限',
          content: `最多只能领取 ${s.maxcnt} 个身份组`,
          showCancel: false
        });
        return;
      }
    }
    //昵称检查
    if (item.nicklimit.on) {
      let reg = new RegExp(item.nicklimit.rule, 'g');
      if (!reg.test(this.data.uinfo.nick)) {
        qq.showModal({
          title: '频道昵称不符合规范',
          content: item.nicklimit.tips,
          showCancel: false
        });
        return;
      }
    }
    //等级检查
    let level = this.checklevel(this.data.uinfo.roles);
    if (item.levellimit > level) {
      qq.showModal({
        title: '等级不足',
        content: `您在频道内的活跃等级为 ${level} 级\r\n领取此身份组至少需要 ${item.levellimit} 级`,
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    });
    let needdisban = '0';
    let nowhas = this.data.nowrolec.roles.filter(i => { return i.select });
    if (nowhas.length <= 0) needdisban = '1';
    qq.request({
      url: `${app.globalData.host}/changerole/${app.globalData.token}/${item.roleid}/add/${item.time}/${needdisban}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_uinfo();
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 407) {
            qq.showModal({
              title: '未完成验证',
              content: `抱歉，本频道已开启人机验证，您需要先完成验证才能领取身份组\r\n十分钟内未完成验证将被踢出`,
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  qq.navigateTo({
                    url: `../newmembervefanswer/newmembervefanswer`,
                    fail: () => {
                      qq.showToast({
                        title: '跳转失败',
                        icon: 'none'
                      })
                    }
                  });
                }
              }
            })
          } else {
            qq.showModal({
              title: '领取失败',
              content: `该身份组人数可能已达上限，请选择其他身份组`,
              showCancel: false
            });
          }
        }
      },
      fail: () => {
        this.setData({
          loadModal: false,
          rolesets: {}
        })
        qq.showToast({
          title: '请求加载失败',
          icon: 'none'
        })
      }
    })
  }
})