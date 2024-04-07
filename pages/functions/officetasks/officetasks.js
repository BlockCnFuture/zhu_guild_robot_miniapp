const app = getApp();
Page({
  data: {
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    nowtaskid: '',
    nowmida: '',
    nowmidb: '',
    nowtasktype: '',
    modalA: '',
    bantimes: '5分钟',
    bantime: '300',
    optype: '',
    complete: false,
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 59 }, (v, i) => i + '分')],
    oplist: [
      [{
        type: '0',
        name: '撤回并禁言',
        select: false
      }, {
        type: '1',
        name: '撤回并警告',
        select: false
      }, {
        type: '2',
        name: '撤回并警告、禁言',
        select: false
      }, {
        type: '3',
        name: '撤回并踢出',
        select: false
      }, {
        type: '4',
        name: '撤回并踢出、拉黑',
        select: false
      }, {
        type: '5',
        name: '仅撤回',
        select: false
      }, {
        type: '30',
        name: '解除禁言',
        select: false
      }],
      [{
        type: '21',
        name: '确认举报内容有效',
        select: false
      }, {
        type: '22',
        name: '无法确认举报内容有效',
        select: false
      }],
      [{
        type: '6',
        name: '同意申请',
        select: false
      }, {
        type: '7',
        name: '拒绝申请',
        select: false
      }],
      [{
        type: '8',
        name: '撤回并禁言',
        select: false
      }, {
        type: '9',
        name: '撤回并警告',
        select: false
      }, {
        type: '10',
        name: '撤回并警告、禁言',
        select: false
      }, {
        type: '11',
        name: '撤回并踢出',
        select: false
      }, {
        type: '12',
        name: '撤回并踢出、拉黑',
        select: false
      }, {
        type: '13',
        name: '仅撤回',
        select: false
      }, {
        type: '14',
        name: '无法确认被举报者违规',
        select: false
      }]
    ]
  },
  ensureop() {
    let optype = this.data.optype;
    let bantime = this.data.bantime;
    let taskid = this.data.nowtaskid;
    if (optype == '') {
      qq.showModal({
        title: '错误',
        content: '必须选择一个操作',
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/deal_officetasks/${app.globalData.token}/${taskid}/${optype}/${bantime}`,
      method: 'POST',
      data: { mida: this.data.nowmida, midb: this.data.nowmidb },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            modalA: '',
            loadModal: false,
            list: [],
            page: 0,
            complete: false
          })
          this.fetch_list();
          qq.showToast({
            title: '操作成功',
            icon: 'none'
          })
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '无权限',
            content: '您没有值班权限\r\n请联系频道主或管理员给您分配值班权限',
            showCancel: false
          });
        } else if (ret.errcode == 408) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '登录失败',
            content: '抱歉，QQ小程序登录失败，请重新进入小程序',
            showCancel: false
          });
        } else if (ret.errcode == 407) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '未开启',
            content: '抱歉，值班室未开启，请联系频道主或管理员开启值班室',
            showCancel: false
          });
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]操作出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 值班任务列表',
      path: `/pages/functions/officetasks/officetasks?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  stopit: function () {
    return;
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    if (sec <= 0) sec = 60;
    this.setData({
      bantime: sec.toString(),
      bantimes: app.longtime2s(sec)
    })
  },
  hideModalA: function () {
    this.setData({
      optype: '',
      modalA: ''
    })
  },
  onLoad: function () {
    this.fetch_list();
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      list: [],
      complete: false,
    })
    this.fetch_list();
    qq.stopPullDownRefresh();
  },
  oclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.data.oplist[this.data.nowtasktype] = this.data.oplist[this.data.nowtasktype].map(i => { return { ...i, select: i.type == item.type }; });
    this.setData({
      oplist: this.data.oplist,
      optype: item.type
    })
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
  show(e) {
    let id = e.currentTarget.dataset.id;
    app.refQuery({ i: id.toString() });
    qq.navigateTo({
      url: `../show/show`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_officetasks/${app.globalData.token}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.list, ...ret.rows.map(item => ({ ...item, time_string: app.times2time(item.creattime) }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, time_string: app.times2time(item.creattime) }));
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  if (item.taskid.toLowerCase().includes(s.toLowerCase())) {
                    return { ...item, show: true };
                  } else {
                    return { ...item, show: false };
                  }
                }),
                page: tpage + 1
              });
            } else {
              this.setData({
                list: ret.rows.map(i => { return { ...i, show: true }; }),
                page: tpage + 1
              });
            }
          }
          this.setData({
            loadModal: false
          })
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '无权限',
            content: '您没有值班权限\r\n请联系频道主或管理员给您分配值班权限',
            showCancel: false
          });
        } else if (ret.errcode == 408) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '登录失败',
            content: '抱歉，QQ小程序登录失败，请重新进入小程序',
            showCancel: false
          });
        } else if (ret.errcode == 407) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '未开启',
            content: '抱歉，值班室未开启，请联系频道主或管理员开启值班室',
            showCancel: false
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
  stopit: function () {
    return;
  },
  optasks(e) {
    let id = e.currentTarget.dataset.id;
    let mida = e.currentTarget.dataset.mida;
    let midb = e.currentTarget.dataset.midb;
    let type = e.currentTarget.dataset.type;
    let check = this.data.oplist[type].filter(i => { return i.select; });
    let optype = '';
    if (check && check.length == 1) {
      optype = check[0].type;
    }
    this.setData({
      nowtaskid: id,
      nowmida: mida,
      nowmidb: midb,
      nowtasktype: type,
      optype: optype,
      modalA: 'show'
    });
  },
  delonetask: function (e) {
    let id = e.currentTarget.dataset.id;
    let isclose = e.currentTarget.dataset.isclose;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/del_officetask/${app.globalData.token}/${id}/${isclose}`,
      method: 'GET',
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            list: [],
            page: 0,
            complete: false
          })
          this.fetch_list();
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false
          })
          qq.showModal({
            title: '无权限',
            content: '抱歉，您没有值班权限，请联系频道主或管理员给予权限',
            showCancel: false
          });
        } else if (ret.errcode == 408) {
          this.setData({
            loadModal: false
          })
          qq.showModal({
            title: '登录失败',
            content: '抱歉，QQ小程序登录失败，请重新进入小程序',
            showCancel: false
          });
        } else if (ret.errcode == 407) {
          this.setData({
            loadModal: false
          });
          qq.showModal({
            title: '未开启',
            content: '抱歉，值班室未开启，请联系频道主或管理员开启值班室',
            showCancel: false
          });
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
          qq.showToast({
            title: `[${ret.errcode}]修改出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据删除失败',
          icon: 'none'
        })
      }
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    if (s == '') {
      this.setData({
        list: this.data.list.map(i => { return { ...i, show: true }; }),
        keyword: s
      });
    } else {
      this.setData({
        list: this.data.list.map(item => {
          if (item.taskid.toLowerCase().includes(s.toLowerCase())) {
            return { ...item, show: true };
          } else {
            return { ...item, show: false };
          }
        }),
        keyword: s
      });
    }
  }

})