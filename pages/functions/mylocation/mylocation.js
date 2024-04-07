const app = getApp();
Page({
  onShow() {
    this.fetchuseraddress();
  },
  LoadTast: function () {
    this.fetchuseraddress();
  },
  data: {
    userinfo: app.globalData.userinfo,
    modalA: '',
    modalB: '',
    addresslist: [],
    fromp: '',
    top: '',
    nowtarget: '',
    nowtargetd: '',
    tmpc: '',
    tmpct: '',
    loadModal: false
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  fetchuseraddress() {
    if (this.data.addresslist.length > 0) {
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
          this.setData({
            addresslist: ret.rows,
            loadModal: false
          });
        } else {
          this.setData({
            loadModal: false
          })
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
  onInput(e) {
    this.setData({
      tmpc: e.detail.value
    })
  },
  setdesc: function (event) {
    let target = event.currentTarget.dataset.target;
    let c = this.data;
    target.split('.').forEach(key => {
      if (/\[\d+\]/.test(key)) {
        let index = key.match(/(.*)\[(\d+)\]/);
        c = c[index[1]];
        c = c[parseInt(index[2])];
      } else {
        c = c[key];
      }
    });
    this.setData({
      nowtarget: target,
      modalA: 'show',
      tmpc: c,
      tmpct: c
    })
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.addresslist.splice(index, 1);
    this.setData({
      addresslist: this.data.addresslist
    });
  },
  addrole() {
    if (this.data.addresslist.length >= 10) {
      qq.showModal({
        title: "数量超限",
        content: "您最多可创建10个收货地址",
        showCancel: false
      })
      return;
    }
    this.setData({
      nowtargetd: {
        name: '',
        phone: '',
        contact: '',
        address: ''
      },
      nowindex: this.data.addresslist.length,
      modalB: "show"
    })
  },
  showinfo(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    this.setData({
      nowtargetd: item,
      nowindex: index,
      modalB: "show"
    })
  },
  addinfo() {
    let c = this.data.nowtargetd;
    if (!c.name || !c.phone || !c.address || !c.contact) {
      qq.showModal({
        title: "错误",
        content: "设置数据不完整",
        showCancel: false
      });
      return;
    }
    this.data.addresslist.splice(this.data.nowindex, 1, c);
    this.setData({
      addresslist: this.data.addresslist,
      modalB: ''
    })
  },
  setcontent: function () {
    if (this.data.tmpc.trim().length <= 0) {
      qq.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return;
    }
    if (this.data.nowtarget) {
      this.setData({
        [this.data.nowtarget]: this.data.tmpc.trim(),
        nowtarget: '',
        modalA: ''
      })
    }
  },
  saveall: function () {
    let list = this.data.addresslist;
    if (list.length <= 0) {
      qq.showModal({
        title: '错误',
        content: '未创建任何收货地址',
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upuseraddress/${app.globalData.token}`,
      method: 'POST',
      data: list,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '保存成功',
            icon: 'none'
          });
        } else {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: '保存失败',
            icon: 'none'
          });
          return;
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