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
    top: '',
    nowtarget: '',
    tmpc: '',
    loadModal: false,
    showad: true,
    fromrate: 0,
    torate: 0
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
    let type = e.currentTarget.dataset.type;
    this.setData({
      nowtarget: type,
      modalB: 'show'
    });
  },
  change(e) {
    let item = e.currentTarget.dataset.item;
    let type = this.data.nowtarget;
    if (type == 'to') {
      this.setData({
        tog: item,
        modalA: ''
      })
    } else {
      if (item.guildid == this.data.fromg.guildid) {
        this.setData({
          fromg: item,
          modalA: ''
        })
      } else {
        this.setData({
          pointlist: [],
          pointname: '',
          fromg: item,
          modalA: ''
        })
      }
    }
  },
  selectguild(e) {
    let type = e.currentTarget.dataset.type;
    if (this.data.guildlist.length > 0) {
      this.setData({
        guildlist: this.data.guildlist.map(i => {
          if (type == 'to') {
            return { ...i, select: i.guildid == this.data.tog.guildid }
          } else {
            return { ...i, select: i.guildid == this.data.fromg.guildid }
          }
        }),
        nowtarget: type,
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
              if (type == 'to') {
                return { ...i, select: i.guildid == this.data.tog.guildid }
              } else {
                return { ...i, select: i.guildid == this.data.fromg.guildid }
              }
            }),
            nowtarget: type,
            loadModal: false,
            modalA: 'show'
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
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    let type = this.data.nowtarget;
    if (type == 'to') {
      if (item.canchangeenter != '1') {
        qq.showModal({
          title: '错误',
          content: '目标积分不接受转换转入',
          showCancel: false
        })
        return;
      }
      this.setData({
        torate: item.changeenter_rate,
        top: item,
        modalB: ''
      })
    } else {
      if (item.canchangeleave != '1') {
        qq.showModal({
          title: '错误',
          content: '来源积分不允许转换转出',
          showCancel: false
        })
        return;
      }
      this.setData({
        fromrate: item.changeleave_rate,
        fromp: item,
        modalB: ''
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
  saveall: function () {
    let fromp = this.data.fromp;
    let top = this.data.top;
    let cnt = this.data.tmpc.trim();
    if (!fromp.point_id || !top.point_id) {
      qq.showModal({
        title: '错误',
        content: '未指定来源或目标积分类型',
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
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/transport_point_point/${app.globalData.token}`,
      method: 'POST',
      data: { fromp: fromp.point_id, top: top.point_id, cnt: Number(cnt) },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '转账成功',
            icon: 'none'
          });
          this.fetchuserpoints();
        } else {
          this.setData({
            loadModal: false
          });
          if (!ret.errcode) {
            qq.showToast({
              title: '转账失败',
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