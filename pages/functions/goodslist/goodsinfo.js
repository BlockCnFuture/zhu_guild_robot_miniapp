const app = getApp();
Page({
  onLoad: function (option) {
    if (option.item && option.points) {
      this.setData({
        item: JSON.parse(decodeURIComponent(option.item)),
        points: JSON.parse(decodeURIComponent(option.points))
      })
    } else {
      qq.showModal({
        title: '错误',
        content: '缺少信息',
        showCancel: false
      })
    }
  },
  data: {
    item: '',
    modalA: '',
    points: [],
    addresslist: [],
    userinfo: app.globalData.userinfo,
    adminguildid: app.globalData.adminguildid,
    loadModal: false
  },
  jumptolocation() {
    qq.navigateTo({
      url: `../mylocation/mylocation`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  gainbyaddr(event) {
    this.setData({
      modalA: ''
    });
    let item = event.currentTarget.dataset.item;
    this.realgaingoods(item);
  },
  choseuseraddress() {
    if (this.data.addresslist.length > 0) {
      this.setData({
        modalA: 'show'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_useraddress/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.rows.length <= 0) {
            qq.showModal({
              title: '没有收货地址',
              content: '该礼品需要您提供收货地址，您还没有创建任何收货地址，请前往创建',
              showCancel: false,
              success: (info) => {
                this.jumptolocation();
              }
            })
          } else {
            this.setData({
              addresslist: ret.rows,
              loadModal: false,
              modalA: 'show'
            });
          }
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]拉取地址失败`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '拉取地址失败',
          icon: 'none'
        })
      }
    })
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
  hideModalA() {
    this.setData({
      modalA: ''
    })
  },
  gaingoods() {
    if (this.data.item.rest <= 0 && this.data.item.type != '2') {
      qq.showModal({
        title: '库存不足',
        content: '该礼品库存不足，无法兑换',
        showCancel: false
      })
      return;
    }
    let check = this.data.points.filter(i => { return i.point_id == this.data.item.point_id });
    if (check.length <= 0 || check[0].point_cnt < this.data.item.pointcnt) {
      qq.showModal({
        title: '资产不足',
        content: '抱歉，您的资产不足，无法兑换该礼品',
        showCancel: false
      })
      return;
    }
    if (this.data.item.needaddress == '1') {
      this.choseuseraddress();
    } else {
      this.realgaingoods('');
    }
  },
  stopit() {
    return;
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
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
  realgaingoods: function (addr) {
    if (this.data.item.id < 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/gaingoods/${app.globalData.token}/${this.data.item.id}`,
      method: 'POST',
      data: { address: addr },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          if (ret.extinfo) {
            qq.setClipboardData({
              data: ret.extinfo
            })
          }
          if (ret.errmsg) {
            qq.showModal({
              title: '提示',
              content: ret.errmsg,
              showCancel: false
            })
          } else {
            qq.showToast({
              title: '兑换成功',
              icon: 'none'
            })
          }
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode) {
            qq.showModal({
              title: '错误',
              content: ret.errmsg,
              showCancel: false
            })
          } else {
            qq.showToast({
              title: '兑换出错',
              icon: 'none'
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
  }
})