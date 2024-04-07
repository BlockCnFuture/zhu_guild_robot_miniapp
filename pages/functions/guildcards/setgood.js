const app = getApp();
Page({
  onLoad: function (option) {
    if (option.info) {
      let data = JSON.parse(decodeURIComponent(option.info));
      this.setData({
        times: app.longtime2s(data.rolesecs),
        goodsinfo: data
      })
    }
    if (option.tochannel) {
      this.setData({
        'goodsinfo.fixchannel': option.tochannel
      })
    }
    this.fetch_sets();
  },
  data: {
    pointlist: [],
    p: 44,
    channelname: '',
    userinfo: app.globalData.userinfo,
    permissionlist: app.globalData.permissionlist,
    nowtarget: '',
    tmpc: '',
    daterange_: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    rolelist: [],
    crolelist: [],
    showroles: [],
    rolesets: '',
    times: '',
    goodsinfo: {
      id: -1,
      guildid: '',
      type: '0',
      roleid: '',
      rolename: '',
      rolesecs: 0,
      pointcnt: 1,
      point_id: '',
      point_name: '',
      gaincnt: 1,
      fixchannel: '',
      time: 0
    },
    loadModal: false
  },
  upcards() {
    if (this.data.goodsinfo.id < 0) {
      qq.showModal({
        title: '错误',
        content: '请先保存兑换码库设置，使兑换码库生效，再进入兑换码管理页',
        showCancel: false
      });
      return;
    }
    qq.navigateTo({
      url: `../goodslistsetgoods/cardsedit?id=${this.data.goodsinfo.id}&type=1`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  ffclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      'goodsinfo.roleid': item.id,
      'goodsinfo.rolename': item.name,
      modalB: ''
    })
  },
  changetr() {
    this.setData({
      modalB: 'show'
    })
  },
  chosep(event) {
    if (this.data.pointlist.length <= 0) {
      qq.showModal({
        title: '无积分类型',
        content: '本频道无任何积分类型，请联系管理员创建积分',
        showCancel: false
      })
      return;
    }
    this.setData({
      modalG: 'show'
    })
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      'goodsinfo.point_id': item.point_id,
      'goodsinfo.point_name': item.point_name,
      modalG: ''
    })
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  changetype(e) {
    if (this.data.goodsinfo.id >= 0) {
      qq.showModal({
        title: '无法修改',
        content: '该兑换码库已生效，无法修改兑换码类型，请修改其他内容',
        showCancel: false
      })
      return;
    }
    let type = e.currentTarget.dataset.type
    this.setData({
      'goodsinfo.type': type
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let secs = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    this.setData({
      times: app.longtime2s(secs),
      'goodsinfo.rolesecs': secs
    })
  },
  hideModalG: function () {
    this.setData({
      modalG: ''
    })
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
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
      if (cnt <= 0) cnt = 1;
      if (target == 'goodsinfo.limitpb' && cnt > 7) cnt = 7;
      this.setData({
        [target]: cnt
      })
    }
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt == 'x') return;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      [target]: cnt
    })
  },
  stopit() {
    return;
  },
  fetch_rolelist: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/rolelist/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          ret.data.map(item => {
            item.hexcolor = '#' + (item.color).toString(16).substr(2).toUpperCase();
          })
          this.setData({
            crolelist: ret.data.filter(i => { return i.id.length > 4; })
          });
          this.setData({
            loadModal: false
          })
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]请赋予管理`,
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
    this.fetchpoints();
    this.fetch_rolelist();
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
    if (this.data.pointlist.length > 0) {
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.goodsinfo));
    if ((!s.roleid && s.type == '0') || (!s.point_id && s.type == '1')) {
      qq.showModal({
        title: '错误',
        content: '数据不完整',
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/Cardsdbinfoswr/${app.globalData.token}/${this.data.p}`,
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
          this.setData({
            'goodsinfo.id': ret.id
          });
          if (s.id < 0) app.postlog(`创建新兑换码库${ret.id}`);
          if (s.id >= 0) app.postlog(`修改兑换码库(${s.id})设置`);
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
  }
})