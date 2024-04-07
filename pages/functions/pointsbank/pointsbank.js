const app = getApp();
Page({
  onShow() {
    this.fetchpoints();
  },
  LoadTast: function () {
    this.fetchpoints();
  },
  data: {
    userinfo: app.globalData.userinfo,
    modalA: '',
    pointlist: [],
    fromp: '',
    nowtarget: '',
    tmpc: '',
    loadModal: false,
    showad: true,
    enterrate: 0,
    leaverate: 0,
    bankrate: 0
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  selectpoint(e) {
    if (this.data.pointlist.length <= 0) {
      qq.showModal({
        title: "无任何积分",
        content: "本频道无任何自定义积分，请联系管理员创建",
        showCancel: false
      });
      return;
    }
    this.setData({
      modalB: 'show'
    });
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      enterrate: item.bankenterrate,
      leaverate: item.bankleaverate,
      bankrate: item.bankrate,
      fromp: item,
      modalB: ''
    })
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
  fetchpoints() {
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
  getTimestampDiffin(time) {
    let givenDate = new Date(time);
    let currentDate = new Date();
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    let diffInMilliseconds = currentDate - givenDate;
    let diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return diffInDays;
  },
  fetchuserpoints() {
    if (this.data.pointlist.length <= 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchuserpointsbank/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            pointlist: this.data.pointlist.map(item => {
              let check = ret.rows.filter(i => { return i.point_id == item.point_id });
              if (check && check.length > 0) {
                let diff = this.getTimestampDiffin(check[0].lasttime);
                let extr = check[0].points * item.bankrate / 10000 * diff;
                if (extr < 1) extr = 0;
                extr = Number(extr.toFixed(0));
                return { ...item, point_cnt: check[0].points, extr: extr, diff: diff };
              } else {
                return { ...item, point_cnt: 0, extr: 0, diff: 0 };
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
  onInput(e) {
    this.setData({
      tmpc: e.detail.value
    })
  },
  stopit: function () {
    return;
  },
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
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
  inbank() {
    this.saveall('in');
  },
  outbank() {
    this.saveall('out');
  },
  gainext(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/userpointsbankgain/${app.globalData.token}/${item.point_id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '收益领取成功',
            icon: 'none'
          });
          this.fetchuserpoints();
        } else {
          this.setData({
            loadModal: false
          });
          if (!ret.errcode) {
            qq.showToast({
              title: '收益领取失败',
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
  },
  saveall: function (type) {
    let fromp = this.data.fromp;
    let cnt = this.data.tmpc.trim();
    if (!fromp.point_id) {
      qq.showModal({
        title: '错误',
        content: '未指定积分类型',
        showCancel: false
      });
      return;
    }
    if (!cnt || Number(cnt) <= 0 || isNaN(cnt)) {
      qq.showModal({
        title: '错误',
        content: '积分数量错误',
        showCancel: false
      });
      return;
    }
    let check = this.data.pointlist.filter(i => { return i.point_id == fromp.point_id });
    if (!check || check.length < 1) {
      qq.showModal({
        title: '错误',
        content: '目标积分类型异常',
        showCancel: false
      });
      return;
    } else {
      if (check[0].extr > 0) {
        qq.showModal({
          title: '错误',
          content: '您需要先领取现有收益，才能对积分进行转入转出操作',
          showCancel: false
        });
        return;
      }
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/transport_point_bank/${app.globalData.token}`,
      method: 'POST',
      data: { fromp: fromp.point_id, type: type, cnt: Number(cnt) },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '资产变更成功',
            icon: 'none'
          });
          this.fetchuserpoints();
        } else {
          this.setData({
            loadModal: false
          });
          if (!ret.errcode) {
            qq.showToast({
              title: '资产变更失败',
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