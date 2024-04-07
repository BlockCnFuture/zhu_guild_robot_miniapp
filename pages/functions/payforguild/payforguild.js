const app = getApp();
Page({
  onShow() {
    this.fetch_sets();
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  data: {
    userinfo: app.globalData.userinfo,
    modalA: '',
    pointlist: [],
    paytypels: [{ type: 0, name: '支付宝移动支付赞助', show: true },
    { type: 1, name: '支付宝网页支付赞助', show: true },
    { type: 2, name: '微信支付赞助', show: true }],
    nowpaytype: '',
    tmpc: '',
    loadModal: false,
    showad: true,
    cangainpoints: 0,
    nowpoint: '',
    needpoints: false,
    showtype: 0,
    isets: '',
    iswechat: false
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
    });
    this.refShowpoints();
  },
  selectpoint() {
    if (this.data.pointlist.length <= 0) {
      this.setData({
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/self`,
        success: (data) => {
          let ret = data.data;
          if (ret.errcode == 0) {
            ret.rows = ret.rows.filter(i => { return i.sold == '1'; });
            this.setData({
              pointlist: ret.rows,
              loadModal: false
            });
            if (ret.rows.length > 0) {
              this.setData({
                modalB: 'show'
              });
            } else {
              qq.showModal({
                title: "无有效积分",
                content: "抱歉，当前频道没有允许被回礼的积分类型，请联系管理员创建修改",
                showCancel: false
              });
              return;
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
    } else {
      this.setData({
        modalB: 'show'
      });
    }
  },
  selectpaytype() {
    if (this.data.paytypels.filter(i => { return i.show; }).length <= 0) {
      qq.showModal({
        title: '错误',
        content: '本频道暂未开通任何赞助通道，请联系管理员处理',
        showCancel: false
      })
      return;
    }
    this.setData({
      modalA: 'show'
    })
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowpoint: item,
      modalB: ''
    });
    this.refShowpoints();
  },
  pclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowpaytype: item,
      modalA: ''
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
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  CopyText(e) {
    qq.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        qq.showToast({
          title: '已复制',
          icon: 'none',
        })
      }
    })
  },
  fetch_sets() {
    if (this.data.isets != '') return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchgpaysets/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          let paytypels = this.data.paytypels;
          paytypels[0].show = ret.data.s1.alipay;
          paytypels[1].show = ret.data.s1.alipay_web;
          paytypels[2].show = ret.data.s1.wechat;
          console.log(ret.data);
          this.setData({
            paytypels: paytypels,
            isets: ret.data,
            loadModal: false
          });
          if (ret.data.s2)
            if (ret.data.s2.out_trade_no && ret.data.s2.out_trade_no != '') {
              this.setData({
                iswechat: ret.data.s2.payurl.includes('wxpay'),
                showtype: 1
              })
              qq.showModal({
                title: '历史赞助未确认',
                content: '您有历史赞助未确认，请先确认历史赞助状态',
                showCancel: false
              })
            }
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
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
    this.refShowpoints();
  },
  refShowpoints() {
    let nowpoint = this.data.nowpoint;
    let cnt = this.data.tmpc;
    if (nowpoint && cnt && this.data.needpoints) {
      this.setData({
        cangainpoints: Number(cnt) * nowpoint.soldprice
      })
    } else {
      this.setData({
        cangainpoints: 0
      })
    }
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
  checkb() {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/willingpaycancle/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            showtype: 0,
            loadModal: false
          })
          qq.showToast({
            title: '取消成功',
            icon: 'none'
          });
        } else {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: '取消失败',
            icon: 'none'
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
  checka() {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/willingpayensure/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            showtype: 0,
            loadModal: false
          })
          if (ret.errmsg) {
            qq.showModal({
              title: '提示',
              content: ret.errmsg,
              showCancel: false
            })
          }
        } else {
          this.setData({
            loadModal: false
          });
          if (!ret.errcode) {
            qq.showToast({
              title: '确认失败',
              icon: 'none'
            });
          } else {
            qq.showModal({
              title: '错误',
              content: ret.errmsg,
              showCancel: false
            })
          }
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
  saveall: function () {
    let nowpoint = this.data.nowpoint;
    let needpoints = this.data.needpoints;
    let nowpaytype = this.data.nowpaytype;
    let cnt = this.data.tmpc.trim();
    if (!nowpaytype) {
      qq.showModal({
        title: '错误',
        content: '未指定赞助通道',
        showCancel: false
      });
      return;
    }
    if (needpoints && !nowpoint) {
      qq.showModal({
        title: '错误',
        content: '未指定希望回赠的积分类型',
        showCancel: false
      });
      return;
    }
    if (!cnt || Number(cnt) <= 0 || isNaN(cnt)) {
      qq.showModal({
        title: '错误',
        content: '赞助金额错误，必须为大于0的整数',
        showCancel: false
      });
      return;
    }
    if (Number(cnt) < nowpoint.limitamount_min || Number(cnt) > nowpoint.limitamount_max) {
      qq.showModal({
        title: '金额不在指定范围内',
        content: `抱歉，当前频道设置赞助金额必须在 ${nowpoint.limitamount_min}~${nowpoint.limitamount_max} 范围内`,
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/willingpay/${app.globalData.token}`,
      method: 'POST',
      data: { needp: needpoints, type: nowpaytype.type, cnt: Number(cnt), id: needpoints ? nowpoint.point_id : '' },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            'isets.s2': { out_trade_no: ret.info.id, thisamount: ret.amount * 100, payurl: ret.info.url },
            showtype: 1,
            iswechat: ret.info.url.includes('wxpay'),
            loadModal: false
          })
        } else if (ret.errcode == 414) {
          this.setData({
            'isets.s2': ret.data,
            iswechat: ret.data.payurl.includes('wxpay'),
            showtype: 1,
            loadModal: false
          })
          qq.showModal({
            title: '历史赞助未确认',
            content: '您有历史赞助未确认，请先确认历史赞助状态',
            showCancel: false
          })
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