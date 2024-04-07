const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 解除禁言申诉',
      path: `/pages/functions/disbanapply/disbanapply?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    userinfo: app.globalData.userinfo,
    uinfo: '',
    rolesets: '',
    tmpc: '',
    loadModal: false,
    showad: true
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  onInput(e) {
    this.setData({
      tmpc: e.detail.value
    })
  },
  fetch_uinfo: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchuinfo/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            uinfo: ret.info,
            loadModal: false
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
          loadModal: false
        })
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  },
  fetch_sets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getGuildOfficeSets/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            if (ret.sets.content.disban.able) {
              this.fetch_uinfo();
              this.setData({
                rolesets: ret.sets.content.disban
              });
            } else {
              qq.showModal({
                title: '未开启',
                content: '频道主未开启此功能',
                showCancel: false
              });
              return;
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
          if (ret.errcode == 407) {
            qq.showModal({
              title: '未开启',
              content: '频道主未开启此功能',
              showCancel: false
            });
            return;
          }
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
      }
    })
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
  rolecheck(uroles, needroles) {
    if (needroles.length <= 0) return true;
    for (let s of needroles) {
      if (uroles.includes(s)) {
        return true;
      }
    }
    return false;
  },
  saveall: function () {
    let answer = this.data.tmpc.trim();
    if (!answer || answer == '') {
      qq.showModal({
        title: '错误',
        content: '申请理由不能为空',
        showCancel: false
      });
      return;
    }
    let urole = this.data.uinfo.roles;
    let needrole = this.data.rolesets.needroles;
    if (!this.rolecheck(urole, needrole)) {
      qq.showModal({
        title: '错误',
        content: '抱歉，您在频道内的等级过低或无满足条件的身份组，无法申请解除禁言',
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/DisbanApply/${app.globalData.token}`,
      method: 'POST',
      data: { answer: answer },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '提交成功',
            icon: 'none'
          });
        } else {
          this.setData({
            loadModal: false
          });
          if (!ret.errcode) {
            qq.showToast({
              title: '请求失败',
              icon: 'none'
            });
            return;
          }
          qq.showModal({
            title: '错误',
            content: ret.errmsg,
            showCancel: false
          });
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  }
})
