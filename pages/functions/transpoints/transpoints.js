const app = getApp();
Page({
  onHide() {
    this.setData({
      modalA: '',
      guildlist: []
    })
  },
  stips() {
    qq.showModal({
      title: '提示',
      content: '请在对应的频道，通过我的的资料卡打开小程序，方可增加频道记录',
      showCancel: false
    })
  },
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '跨频转账',
      path: `/pages/functions/transpoints/transpoints?guildID=${app.globalData.userinfo.open_guild_id}`
    }
  },
  data: {
    userinfo: app.globalData.userinfo,
    modalA: '',
    guildlist: [],
    pointlist: [],
    toplist: [],
    fromg: { guildname: "请选择来源频道", guildhead: "https://groupprohead.gtimg.cn/0/0", guilddesc: '' },
    tog: { guildname: "请选择目标频道", guildhead: "https://groupprohead.gtimg.cn/0/0", guilddesc: '' },
    fromrate: 0,
    torate: 0,
    uinfo: '',
    nowtarget: '',
    rolesets: '',
    tmpc: '',
    loadModal: false,
    pointname: '',
    showad: true
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  change(e) {
    let item = e.currentTarget.dataset.item;
    let type = this.data.nowtarget;
    if (type == 'to') {
      if (item.guildid == this.data.tog.guildid) {
        this.setData({
          tog: item,
          modalA: ''
        })
      } else {
        this.setData({
          pointlist: [],
          fromrate: 0,
          torate: 0,
          pointname: '',
          tog: item,
          modalA: ''
        })
      }
    } else {
      if (item.guildid == this.data.fromg.guildid) {
        this.setData({
          fromg: item,
          modalA: ''
        })
      } else {
        this.setData({
          pointlist: [],
          fromrate: 0,
          torate: 0,
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
    let topi = this.data.toplist.filter(i => { return i.point_name == item.point_name });
    if (!topi || topi.length <= 0) {
      qq.showModal({
        title: '错误',
        content: '服务异常，目标频道信息缺失',
        showCancel: false
      })
      return;
    } else {
      topi = topi[0];
    }
    this.setData({
      pointname: item.point_name,
      fromrate: item.leave_rate,
      torate: topi.enter_rate,
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
  selectpoint() {
    if (!this.data.fromg.guildid) {
      qq.showModal({
        title: "未选择来源频道",
        content: "请先选择来源频道",
        showCancel: false
      })
      return;
    }
    if (!this.data.tog.guildid) {
      qq.showModal({
        title: "未选择目标频道",
        content: "请先选择目标频道",
        showCancel: false
      })
      return;
    }
    if (this.data.pointlist.length > 0) {
      this.setData({
        modalB: 'show'
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    let sthis = this;
    qq.request({
      url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/${sthis.data.fromg.guildid}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.rows.length <= 0) {
            sthis.setData({
              loadModal: false,
              modalB: ''
            });
            qq.showModal({
              title: "错误",
              content: "该来源频道无任何自定义积分",
              showCancel: false
            });
            return;
          }
          let fromplist = ret.rows;
          qq.request({
            url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/${sthis.data.tog.guildid}`,
            success: (data) => {
              let ret = data.data;
              if (ret.errcode == 0) {
                if (ret.rows.length <= 0) {
                  sthis.setData({
                    loadModal: false,
                    modalB: ''
                  });
                  qq.showModal({
                    title: "错误",
                    content: "该目标频道无任何自定义积分",
                    showCancel: false
                  });
                  return;
                }
                let toplist = ret.rows;
                let plist = fromplist.filter(i => {
                  let check = toplist.filter(ii => ii.point_name == i.point_name);
                  return check && check.length > 0;
                });
                if (plist.length <= 0) {
                  qq.showModal({
                    title: "错误",
                    content: "来源频道与目标频道无任何同名积分，无法进行转账",
                    showCancel: false
                  });
                  return;
                }
                sthis.setData({
                  pointlist: plist,
                  toplist: toplist,
                  loadModal: false,
                  modalB: 'show'
                });

              } else {
                sthis.setData({
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
              sthis.setData({
                loadModal: false
              })
              qq.showToast({
                title: '数据加载失败',
                icon: 'none'
              })
            }
          })
        } else {
          sthis.setData({
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
        sthis.setData({
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
    let fromg = this.data.fromg;
    let tog = this.data.tog;
    let name = this.data.pointname;
    let cnt = this.data.tmpc.trim();
    if (!fromg.guildid || !tog.guildid || !name) {
      qq.showModal({
        title: '错误',
        content: '未指定频道或积分类型',
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
      url: `${app.globalData.host}/transport_points_guild/${app.globalData.token}`,
      method: 'POST',
      data: { fromg: fromg.guildid, tog: tog.guildid, name: name, cnt: Number(cnt) },
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