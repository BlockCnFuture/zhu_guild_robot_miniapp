const app = getApp();
Page({
  onLoad: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    })
    this.fetch_sets();
  },
  data: {
    p: 1,
    userinfo: app.globalData.userinfo,
    ochannellist: [],
    channellist: [],
    channelname: '',
    rolesets: { psets: [{ cnt: 3, type: 0, checktime: 10, checktimes: app.longtime2s(10), ptype: 0, ptime: 300, ptimes: app.longtime2s(300), reset: false }], notifyid: "" },
    nowindex: -1,
    nowtarget: null,
    loadModal: false,
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    daterange_: [Array.from({ length: 3 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分'), Array.from({ length: 60 }, (v, i) => i + '秒')],
    oplist: [{
      type: 0,
      name: '踢出',
      select: false
    }, {
      type: 1,
      name: '踢出并拉黑（撤回所有发言）',
      select: false
    }, {
      type: 2,
      name: '禁言',
      select: false
    }]
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  hideModalB: function () {
    this.setData({
      nowtarget: null,
      nowindex: -1,
      modalB: ''
    })
  },
  setresttime: function (event) {
    let index = event.currentTarget.dataset.index;
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowindex: index,
      nowtarget: item
    })
  },
  canceltime: function () {
    this.setData({
      nowtarget: null,
      nowindex: -1
    })
  },
  bindMultiPickerChange_: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60 + time[3];
    if (sec <= 0) sec = 1;
    let ss = `rolesets.psets[${this.data.nowindex}].checktime`;
    let sa = `rolesets.psets[${this.data.nowindex}].checktimes`;
    this.setData({
      [ss]: sec,
      [sa]: app.longtime2s(sec)
    })
  },
  changechecktype: function (event) {
    let index = event.currentTarget.dataset.index;
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowindex: index,
      nowtarget: item,
      modalC: 'show'
    })
  },
  setchecktypeA: function () {
    let ss = `rolesets.psets[${this.data.nowindex}].type`;
    this.setData({
      nowtarget: null,
      nowindex: -1,
      modalC: '',
      [ss]: 0
    })
  },
  setchecktypeB: function () {
    let ss = `rolesets.psets[${this.data.nowindex}].type`;
    this.setData({
      nowtarget: null,
      nowindex: -1,
      modalC: '',
      [ss]: 1
    })
  },
  hideModalC: function () {
    this.setData({
      nowtarget: null,
      nowindex: -1,
      modalC: ''
    })
  },
  setoptions: function (event) {
    let index = event.currentTarget.dataset.index;
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowindex: index,
      nowtarget: item,
      oplist: this.data.oplist.map(i => {
        return { ...i, select: i.type == item.ptype };
      }),
      modalB: 'show'
    })
  },
  changent: function () {
    let check = this.data.oplist.filter(i => { return i.select; })
    let type = 0;
    if (check.length == 1) {
      type = check[0].type;
    }
    let ss = `rolesets.psets[${this.data.nowindex}].ptype`;
    let sa = `rolesets.psets[${this.data.nowindex}].ptime`;
    let sb = `rolesets.psets[${this.data.nowindex}].ptimes`;
    this.setData({
      [sa]: this.data.nowtarget.ptime,
      [sb]: app.longtime2s(this.data.nowtarget.ptime),
      nowtarget: null,
      nowindex: -1,
      modalB: '',
      [ss]: type
    })
  },
  oclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      oplist: this.data.oplist.map(i => {
        return { ...i, select: i.type == item.type };
      })
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    if (sec <= 0) sec = 60;
    this.setData({
      'nowtarget.ptime': sec,
      'nowtarget.ptimes': app.longtime2s(sec)
    })
  },
  addrole() {
    let len = this.data.rolesets.psets.length;
    if (len >= 10) {
      qq.showModal({
        title: '数量超限',
        content: '最多可以创建10个警告处罚规则',
        showCancel: false
      });
      return;
    }
    this.data.rolesets.psets.splice(this.data.rolesets.psets.length, 1, { cnt: 3, type: 0, checktime: 10, checktimes: app.longtime2s(10), ptype: 0, ptime: 300, ptimes: app.longtime2s(300), reset: false })
    this.setData({
      'rolesets.psets': this.data.rolesets.psets
    })
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.rolesets.psets.splice(index, 1);
    this.setData({
      'rolesets.psets': this.data.rolesets.psets
    });
  },
  inputcnt: function (e) {
    let index = e.currentTarget.dataset.index;
    let type = e.target.dataset.type;
    let cnt = this.data.rolesets.psets[index].cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 100) cnt = 99;
    } else {
      cnt--;
      if (cnt <= 0) cnt = 1;
    }
    let ss = `rolesets.psets[${index}].cnt`;
    this.setData({
      [ss]: cnt
    })
  },
  inputcnts: function (e) {
    let index = e.currentTarget.dataset.index;
    let cnt = parseInt(e.detail.value);
    if (cnt <= 0) cnt = 1;
    let ss = `rolesets.psets[${index}].cnt`;
    this.setData({
      [ss]: cnt
    })
  },
  finishinputcnt: function (e) {
    let index = e.currentTarget.dataset.index;
    let cnt = this.data.rolesets.psets[index].cnt;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    let ss = `rolesets.psets[${index}].cnt`;
    this.setData({
      [ss]: cnt
    })
  },
  RolesSwitch: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.rolesets.psets[index].reset = this.data.rolesets.psets[index].reset ? false : true;
    this.setData({
      'rolesets.psets': this.data.rolesets.psets
    })
  },
  hideModalA: function () {
    this.setData({
      channellist: this.data.ochannellist,
      modalA: ''
    })
  },
  chosechannel: function () {
    this.setData({
      modalA: 'show'
    })
  },
  setchannel: function () {
    this.setData({
      ochannellist: this.data.channellist
    });
    let check = this.data.channellist.filter(item => { return item.select == true });
    if (check && check.length == 1) {
      this.setData({
        channelname: check[0].name,
        'rolesets.notifyid': check[0].id
      })
    } else {
      this.setData({
        channelname: '',
        'rolesets.notifyid': ''
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
    })
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
              if (item.id == this.data.rolesets.notifyid) {
                return { ...item, select: true }
              } else {
                return { ...item, select: false }
              }
            })
          });
          this.setData({
            ochannellist: this.data.channellist
          });
          let name = ret.data.filter(item => { return item.type == 0 && item.id == this.data.rolesets.notifyid });
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
      url: `${app.globalData.host}/getguildsets/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets.sets) {
            let tmp = JSON.parse(ret.sets.sets);
            if (tmp.psets) {
              tmp.psets = tmp.psets.map(i => {
                return { ...i, ptimes: app.longtime2s(i.ptime), checktimes: app.longtime2s(i.checktime) }
              });
            }
            this.setData({
              rolesets: tmp
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    let crack = false;
    let arr0 = s.psets.filter(i => {
      return i.type == 0;
    });
    let cntMap0 = {};
    for (let s of arr0) {
      if (cntMap0[s.cnt] != undefined) {
        crack = true;
        break;
      } else {
        cntMap0[s.cnt] = 1;
      }
    }
    let arr1 = s.psets.filter(i => {
      return i.type == 1;
    });
    let cntMap1 = {};
    for (let s of arr1) {
      if (cntMap1[s.cnt] != undefined) {
        crack = true;
        break;
      } else {
        cntMap1[s.cnt] = 1;
      }
    }
    if (crack) {
      qq.showToast({
        title: '数据存在冲突',
        icon: 'none'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upguildsets/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('修改频道警告设置');
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
