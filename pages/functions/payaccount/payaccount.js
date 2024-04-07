const app = getApp();
Page({
  onShow() {
    this.setData({
      userinfo: app.globalData.userinfo
    })
  },
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    nowcur: false,
    pointlist: [],
    p: 50,
    userinfo: app.globalData.userinfo,
    tmpc: '',
    channellist: [],
    channelname: '',
    accountinfo: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '用户赞助设置',
      useit: false,
      image: '',
      content: {
        user_id: '',
        alipay: true,
        alipay_web: true,
        wechat: true,
        userpayfee: true,
        link: ''
      }
    },
    loadModal: false
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  jumpdec() {
    qq.navigateTo({
      url: `../help2/help2`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
    });
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  chosechannel: function () {
    this.setData({
      nowtarget: '',
      modalA: 'show'
    })
  },
  setchannel: function () {
    let check = this.data.channellist.filter(item => { return item.select == true });
    if (check && check.length == 1) {
      this.setData({
        channelname: check[0].name,
        'rolesets.tochannel': check[0].id
      })
    } else {
      this.setData({
        channelname: '',
        'rolesets.tochannel': ''
      })
    }
    this.setData({
      modalA: ''
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: false }
        }
      })
    });
  },
  stopit() {
    return;
  },
  fetch_channellist: function () {
    if (this.data.channellist.length > 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/channellist/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 }).map(item => {
              if (item.id == this.data.rolesets.tochannel) {
                return { ...item, select: true }
              } else {
                return { ...item, select: false }
              }
            })
          });
          let name = ret.data.filter(item => { return item.type == 0 && item.id == this.data.rolesets.tochannel });
          if (name && name.length == 1) {
            this.setData({
              channelname: name[0].name
            });
          }
          this.setData({
            loadModal: false
          })
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
  fetch_sets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/geteventssets_back/${app.globalData.token}/${this.data.p}/${this.data.rolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              rolesets: ret.sets
            });
          }
          this.setData({
            loadModal: false
          })
          this.fetch_channellist();
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
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    this.setData({
      [target]: e.detail.value,
      'rolesets.content.user_id': ''
    })
  },
  checkurl: function () {
    let link = this.data.rolesets.content.link;
    let check = link.match(/afdian\.net\/a\/(.*)/);
    if (!check || !check[1] || check[1].trim() == '') {
      qq.showModal({
        title: '错误',
        content: '爱发电主页地址格式错误',
        showCancel: false
      })
      return;
    }
    check = check[1].trim();
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getPayProfileinfo/${app.globalData.token}/${check}`,
      method: 'GET',
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            'rolesets.content.user_id': ret.data.user.user_id,
            accountinfo: ret.data.user,
            loadModal: false
          })
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '错误',
              content: '您没有此页面设置权限',
              showCancel: false
            })
          } else {
            qq.showModal({
              title: '错误',
              content: '未能查询到爱发电用户信息，请确认爱发电主页地址是否正确',
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
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if (!s.content.user_id) {
        qq.showModal({
          title: '错误',
          content: '为确保赞助目标设置正确，请先点击检查按钮来确认个人信息',
          showCancel: false
        })
        return;
      }
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upeventssets_back/${app.globalData.token}/${this.data.p}`,
      method: 'POST',
      data: s,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '数据保存成功',
            icon: 'none'
          })
          app.postlog('修改用户赞助设置');
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]数据保存出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据保存失败',
          icon: 'none'
        })
      }
    })
  },
})