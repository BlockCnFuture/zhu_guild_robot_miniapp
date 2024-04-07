const app = getApp();
Page({
  data: {
    pointlist: [],
    point_id: '',
    point_name: '',
    isadmin: false,
    p: 46,
    tmptaskinfo: '',
    taskinfo: {
      useit: '0',
      guildid: '',
      point_id: '',
      resetpoint: 0,
      hours: '0',
      weekdays: '*',
      days: '27',
      moths: '2,9',
      time: 0
    },
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    page: 0,
    complete: false,
    keyword: '',
    nowitem: '',
    modal: {
      show: false,
      title: '请输入自定义积分数量',
      fine: {
        title: '确定',
        url: ''
      },
      cancle: {
        title: '取消',
        url: ''
      }
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
  savetaskinfo() {
    if (!this.data.point_id) {
      qq.showModal({
        title: "错误",
        content: "数据缺失",
        showCancel: false
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/savepointtaskinfo/${app.globalData.token}/${this.data.point_id}`,
      method: 'POST',
      data: this.data.taskinfo,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            modalB: ''
          })
          qq.showToast({
            title: `保存成功`,
            icon: 'none'
          })
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '抱歉，您没有此权限',
              showCancel: false
            });
            return;
          }
          qq.showToast({
            title: `错误，保存失败`,
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
  },
  setPTasks() {
    if (!this.data.point_id) {
      qq.showModal({
        title: "错误",
        content: "数据缺失",
        showCancel: false
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getpointtaskinfo/${app.globalData.token}/${this.data.point_id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            taskinfo: ret.data,
            tmptaskinfo: ret.data,
            modalB: 'show'
          })
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '抱歉，您没有此权限',
              showCancel: false
            });
            return;
          }
          qq.showToast({
            title: `错误，取信息失败`,
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
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value ? '1' : '0'
    });
  },
  stopit() {
    return;
  },
  hideModal(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 'fine') {
      if (this.data.nowitem.oldpoints == this.data.nowitem.points) {
        qq.showToast({
          title: `无变动`,
          icon: 'none'
        })
        return;
      }
      this.setData({
        'modal.show': false,
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/changeuserpoint/${app.globalData.token}/${this.data.nowitem.point_id}/${this.data.nowitem.user_id}/${this.data.nowitem.points}`,
        success: (data) => {
          let ret = data.data;
          if (ret.errcode == 0) {
            this.setData({
              loadModal: false,
              page: 0,
              list: [],
              complete: false
            });
            this.fetch_list();
          } else {
            this.setData({
              loadModal: false
            })
            if (ret.errcode == 403) {
              qq.showModal({
                title: '无权限',
                content: '抱歉，您没有此权限',
                showCancel: false
              });
              return;
            }
            qq.showToast({
              title: `错误，修改失败`,
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
    } else {
      this.setData({
        'modal.show': false
      })
    }
  },
  inputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let type = e.target.dataset.type;
    let cnt = e.currentTarget.dataset.cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 9999999999) cnt = 9999999999;
    } else {
      cnt--;
      if (cnt < 0) cnt = 0;
    }
    this.setData({
      [target]: cnt
    })
  },
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    let check = e.currentTarget.dataset.cnt;
    if (check == 'x') {
      this.setData({
        [target]: e.detail.value
      })
    } else {
      let cnt = parseInt(e.detail.value);
      if (cnt < 0) cnt = 0;
      this.setData({
        [target]: cnt
      })
    }
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt < 0 || isNaN(cnt)) cnt = 0;
    this.setData({
      [target]: cnt
    })
  },
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹 - 成员资产排行',
      path: `/pages/functions/upointslist/upointslist?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  viewmylog() {
    qq.navigateTo({
      url: `./phistory?user_id=${app.globalData.userinfo.member_userid}&point_id=${this.data.point_id}&point_name=${encodeURIComponent(this.data.point_name)}`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  uplogs(e) {
    let item = e.currentTarget.dataset.item;
    if (!this.data.isadmin && item.user_id != this.data.userinfo.member_userid) {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有相应的权限，只能查看自己的积分明细',
        showCancel: false
      })
      return;
    }
    qq.navigateTo({
      url: `./phistory?user_id=${item.user_id}&point_id=${this.data.point_id}&point_name=${encodeURIComponent(this.data.point_name)}`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  upchange(e) {
    let item = e.currentTarget.dataset.item;
    if (!this.data.isadmin) {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有积分修改权限',
        showCancel: false
      })
      return;
    }
    this.setData({
      nowitem: { ...item, oldpoints: item.points },
      'modal.show': true
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
            ...item, show: item.user_id.toLowerCase().includes(s.toLowerCase()) ||
              item.nick.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
      ListTouchStartY: e.touches[0].pageY
    })
  },
  ListTouchMove(e) {
    this.setData({
      ListTouchDirectionY: Math.abs(e.touches[0].pageY - this.data.ListTouchStartY) > 100,
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  ListTouchEnd(e) {
    if (this.data.ListTouchDirectionY == true) return;
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      point_id: item.point_id,
      point_name: item.point_name,
      nowpoint: item,
      modalA: ''
    });
    this.setData({
      loadModal: false,
      list: [],
      page: 0,
      complete: false
    });
    this.fetch_list();
  },
  hideModalA() {
    this.setData({
      modalA: ''
    })
  },
  hideModalB() {
    this.setData({
      modalB: ''
    })
  },
  changepoint() {
    if (this.data.pointlist.length > 0) {
      this.setData({
        modalA: 'show'
      })
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
            this.setData({
              modalA: 'show'
            })
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
  onShow() {
    let p = this.data.userinfo.permissions;
    let role = this.data.userinfo.member_role;
    if (role == '2' || app.hasPermission(p, 46)) {
      this.setData({
        isadmin: true
      })
    }
  },
  showmore() {
    this.fetch_list();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
      let p = this.data.userinfo.permissions;
      let role = this.data.userinfo.member_role;
      if (role == '2' || app.hasPermission(p, 46)) {
        this.setData({
          isadmin: true
        })
      }
    }
  },
  LoadTast: function () {
    let p = this.data.userinfo.permissions;
    let role = this.data.userinfo.member_role;
    if (role == '2' || app.hasPermission(p, 46)) {
      this.setData({
        isadmin: true
      })
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
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  deleteall: function () {
    if (!this.data.isadmin) {
      qq.showModal({
        title: '无权限',
        content: '抱歉，您没有此权限',
        showCancel: false
      })
      return;
    }
    let sthis = this;
    qq.showModal({
      title: '警告',
      content: '此操作将清空所有成员的积分，您确认进行此操作吗？',
      success(res) {
        if (res.confirm) {
          sthis.setData({
            loadModal: true
          })
          qq.request({
            url: `${app.globalData.host}/delallpoints/${app.globalData.token}/${sthis.data.point_id}`,
            success: (data) => {
              let ret = data.data;
              if (ret.errcode == 0) {
                sthis.setData({
                  loadModal: false,
                  page: 0,
                  list: [],
                  complete: false
                });
                sthis.fetch_list();
              } else {
                sthis.setData({
                  loadModal: false
                })
                if (ret.errcode == 403) {
                  qq.showModal({
                    title: '无权限',
                    content: '抱歉，您没有权限',
                    showCancel: false
                  });
                  return;
                }
                qq.showToast({
                  title: `[${ret.errcode}]请求出错`,
                  icon: 'none'
                })
              }
            },
            fail: () => {
              sthis.setData({
                loadModal: false
              })
              qq.showToast({
                title: '请求失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  fetch_list: function () {
    if (this.data.complete || !this.data.point_id) return;
    let tpage = this.data.page;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upointslist/${app.globalData.token}/${this.data.point_id}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0) {
            ret.rows = ret.rows.map(i => { return { ...i, show: true } });
            if (tpage > 0) ret.rows = [...this.data.list, ...ret.rows];
            let index = 0;
            ret.rows = ret.rows.map(i => {
              index++;
              return { ...i, left: 60 + 24 * (index.toString().length - 1), index: index }
            });
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              ret.rows = ret.rows.map(i => {
                return {
                  ...i, show: i.user_id.toLowerCase().includes(s.toLowerCase()) ||
                    i.nick.toLowerCase().includes(s.toLowerCase())
                }
              });
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