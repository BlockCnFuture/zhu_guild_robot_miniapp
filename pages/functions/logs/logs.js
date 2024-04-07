const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 系统日志',
      path: `/pages/functions/logs/logs?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  onLoad() {
    this.pull_logs();
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
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/logs/${app.globalData.token}/get/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.logs, ...ret.rows.map(item => ({ ...item, time: app.times2time(item.time), show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, time: app.times2time(item.time), show: true }));
            }
            let s = this.data.keyword;
            if (this.data.keyword != '') {
              this.setData({
                logs: ret.rows.map(item => {
                  return {
                    ...item, show: item.usernick.toLowerCase().includes(s.toLowerCase()) ||
                      item.userid.includes(s.toLowerCase()) ||
                      item.time.toLowerCase().includes(s.toLowerCase()) ||
                      item.logs.toLowerCase().includes(s.toLowerCase())
                  };
                }),
                page: tpage + 1
              });

            } else {
              this.setData({
                logs: ret.rows,
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
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '抱歉，您没有系统日志页的查看权限，请联系频道主给您分配权限',
              showCancel: false
            })
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
        return;
      }
    })
  },
  checkpermission() {
    if (this.data.userinfo.member_role == '2') return true;
    return app.hasPermission(this.data.userinfo.permissions, 40);
  },
  uopa(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.opuser('a', item.userid, '0');
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  uopb(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.opuser('b', item.userid, '0');
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  uopc(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.opuser('c', item.userid, '0');
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  uop() {
    let uid = this.data.nowitem.userid;
    this.opuser('d', uid, this.data.bantime);
    this.setData({
      nowitem: null,
      modalA: ''
    });
  },
  uopd(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.setData({
        nowitem: item,
        modalA: 'show'
      });
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  uope(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.opuser('d', item.userid, '0');
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  uopf(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.opuser('f', item.userid, '0');
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }
  },
  opuser: function (type, uid, time) {
    this.setData({
      modalB: '',
      loadModal: true
    });
    qq.request({
      url: `${app.globalData.host}/slogsuop/${app.globalData.token}/${type}/${uid}/${time}`,
      method: 'GET',
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '操作成功',
            icon: 'none'
          });
          if (type == 'a') app.postlog(`对系统日志内用户(${uid})进行操作：踢出`);
          if (type == 'b') app.postlog(`对系统日志内用户(${uid})进行操作：踢黑`);
          if (type == 'c') app.postlog(`对系统日志内用户(${uid})进行操作：下黑`);
          if (type == 'd') app.postlog(`对系统日志内用户(${uid})进行操作：禁言${time}秒`);
          if (type == 'f') app.postlog(`对系统日志内用户(${uid})进行操作：重置警告`);
          if (type == 'c') {
            qq.showModal({
              title: '提示',
              content: '已将用户从系统黑名单移除\r\n但需要再手动将用户从频道黑名单移除，机器人无法完成此操作',
              showCancel: false
            })
          }
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
              showCancel: false
            });
            return;
          } else if (ret.errcode == 401) {
            qq.showModal({
              title: '操作失败',
              content: '操作失败，可能用户已不在频道内或用户为管理层',
              showCancel: false
            });
            return;
          }
          qq.showToast({
            title: `[${ret.errcode}]操作失败`,
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
  onSearchInput: function (event) {
    let s = event.detail.value;
    let logs = this.data.logs;
    if (s == '') {
      this.setData({
        logs: logs.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        logs: logs.map(item => {
          return {
            ...item, show: item.usernick.toLowerCase().includes(s.toLowerCase()) ||
              item.userid.includes(s.toLowerCase()) ||
              item.time.toLowerCase().includes(s.toLowerCase()) ||
              item.logs.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  stopit: function () {
    return;
  },
  hideModalA: function () {
    this.setData({
      modalA: '',
      nowitem: null
    })
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
    })
  },
  MoreOp(event) {
    let item = event.currentTarget.dataset.item;
    if (item.userid == this.data.userinfo.member_userid) {
      qq.showModal({
        title: '逻辑错误',
        content: '不能对自己进行操作',
        showCancel: false
      });
      return;
    }

    if (item.userrole == '2' || item.userrole == '1') {
      qq.showModal({
        title: '无权限',
        content: '抱歉，无法对频道管理层进行操作',
        showCancel: false
      });
      return;
    }
    if (this.checkpermission()) {
      this.setData({
        tmpitem: item,
        modalB: 'show'
      })
    } else {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有系统日志用户管理权限，请联系频道主给您分配相关权限',
        showCancel: false
      });
    }

  },
  copylog: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.logs,
      success: function () {
        qq.showToast({
          title: '已复制日志',
          icon: 'none'
        })
      }
    })
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.userid,
      success: function () {
        qq.showToast({
          title: '已复制用户id',
          icon: 'none'
        })
      }
    })
  },
  copynick: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.usernick,
      success: function () {
        qq.showToast({
          title: '已复制用户昵称',
          icon: 'none'
        })
      }
    })
  },
  copytime: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.time,
      success: function () {
        qq.showToast({
          title: '已复制时间',
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
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    this.setData({
      bantime: (time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60).toFixed(0).toString()
    });
  },
  data: {
    loadModal: false,
    logs: [],
    page: 0,
    complete: false,
    loading: false,
    userinfo: app.globalData.userinfo,
    keyword: '',
    nowitem: null,
    modalA: '',
    bantime: '300',
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
  }
})