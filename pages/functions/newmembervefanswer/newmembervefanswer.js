const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 人机验证',
      path: `/pages/functions/newmembervefanswer/newmembervefanswer?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  onLoad: function () {
    let parr = Array.from({ length: 81 }, (_, index) => index.toString()).map(i => { return { id: i, select: false }; });
    this.setData({
      points_ls: parr,
      points_ls_: parr
    });
    this.fetch_sets();
  },
  onShow: function () {
    this.setData({
      mathA: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      mathB: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    });
    this.refPshow();
  },
  data: {
    userinfo: app.globalData.userinfo,
    question: '',
    rolesets: '',
    tmpc: '',
    points_ls: [],
    points_ls_: [],
    loadModal: false,
    mathA: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    mathB: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
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
  cancleallc() {
    this.setData({
      points_ls_: this.data.points_ls_.map(i => {
        return { ...i, select: false }
      }),
    });
  },
  onInput(e) {
    this.setData({
      tmpc: e.detail.value
    })
  },
  selectoneA(e) {
    let index = e.currentTarget.dataset.index;
    let s = `points_ls_[${index}]`;
    this.setData({
      [s]: { ...this.data.points_ls_[index], select: !this.data.points_ls_[index].select }
    });
  },
  refPshow() {
    if (this.data.rolesets.fromchannel == '2') {
      this.setData({
        points_ls: this.data.points_ls.map(i => {
          return { ...i, select: this.data.rolesets.content.includes(`|${i.id}|`) }
        })
      });
    } else if (this.data.rolesets.fromchannel == '0') {
      this.setData({
        question: `请问 ${this.data.mathA} X ${this.data.mathB} = ?`
      });
    } else if (this.data.rolesets.fromchannel == '1') {
      this.setData({
        question: this.data.rolesets.content
      });
    }
  },
  fetch_sets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getGuildVefSets/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              rolesets: ret.sets
            });
            this.refPshow();
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
              content: '抱歉，小程序登录失败，请您退出后重新进入',
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
  saveall: function () {
    let type = this.data.rolesets.fromchannel;
    let answer = '';
    if (type == '2') {
      answer = this.data.points_ls_.filter(i => { return i.select == true; }).map(i => {
        return `|${i.id}|`;
      }).join('');
      if (answer != this.data.rolesets.content) {
        qq.showModal({
          title: '回答错误',
          content: '您的答案不正确，请重试',
          showCancel: false
        });
        return;
      }
    } else if (type == '0') {
      if ((this.data.mathA * this.data.mathB).toFixed(0) != Number(this.data.tmpc.trim())) {
        qq.showModal({
          title: '回答错误',
          content: '您的答案不正确，请重试',
          showCancel: false
        });
        return;
      }
    } else if (type == '1') {
      let reg = '';
      try {
        reg = new RegExp(this.data.rolesets.image.trim(), 'g');
      } catch (err) { }
      if (!reg || !reg.test(this.data.tmpc.trim())) {
        qq.showModal({
          title: '回答错误',
          content: '您的答案不正确，请重试',
          showCancel: false
        });
        return;
      }
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/AnswerVef/${app.globalData.token}`,
      method: 'GET',
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            rolesets: ''
          })
          qq.showToast({
            title: '验证成功',
            icon: 'none'
          })
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]验证失败`,
            icon: 'none'
          })
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
