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
    nowcur:false,
    p: 1,
    userinfo: app.globalData.userinfo,
    nowtarget: '',
    extc: false,
    nowindex: '',
    nowtype: '',
    tmpc: '',
    ochannellist: [],
    channellist: [],
    modalA: '',
    modalB: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '语音房通知',
      useit: false,
      image: '',
      content: {
        ca: '{艾特}进入了语音房{原始子频道}\r\n时间：{时间}',
        cb: '{艾特}退出了语音房{原始子频道}\r\n时间：{时间}\r\n互动时长：{互动时长}',
        ls: [{
          fromcs: [],
          toca: '',
          tocaname: '',
          ca: '',
          tocb: '',
          tocbname: '',
          cb: ''
        }]
      }
    },
    loadModal: false
  },
  onInput(e) {
    let nowcur = e.detail.cursor;
    if (e.detail.value.slice(nowcur - 1).startsWith('#')) {
      this.setData({
        channellist: this.data.ochannellist.map(i => { return { ...i, canselect: true } }),
        modalA: 'show'
      })
    }
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
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
  hideModalA: function () {
    this.setData({
      modalA: '',
      nowindex: '',
      nowtype: ''
    })
  },
  hideModalB: function () {
    this.setData({
      nowtarget: '',
      modalB: '',
      tmpc: ''
    })
  },
  addc(event) {
    let list = { a: '{艾特}', b: '{互动时长}', c: '{时间}', d: '{原始子频道}' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
    })
  },
  sfromc: function (e) {
    let tls = JSON.parse(JSON.stringify(this.data.ochannellist));
    tls.splice(0, 0, { id: '2002', name: '所有语音子频道', type: 2, sub_type: 0 });
    tls = tls.filter(i => {
      return i.type == 2 || i.type == 4;
    }).map(i => {
      return { ...i, canselect: !this.checkifhasid(i.id, i.type), select: this.checkifselect(e.currentTarget.dataset.index, i.id) }
    });
    this.setData({
      nowtarget: '',
      nowindex: e.currentTarget.dataset.index,
      nowtype: e.currentTarget.dataset.type,
      channellist: tls,
      modalA: 'show'
    })
  },
  selectall() {
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.canselect && i.type != 4) {
          return { ...i, select: true }
        } else {
          return i;
        }
      })
    })
  },
  cancleall() {
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.canselect) {
          return { ...i, select: false }
        } else {
          return i;
        }
      })
    })
  },
  stoc: function (e) {
    let arr = this.data.ochannellist.map(i => {
      return { ...i, canselect: true, select: this.data.rolesets.content.ls[e.currentTarget.dataset.index][e.currentTarget.dataset.type] == i.id }
    });
    arr.splice(0, 0, { id: '0', name: '原子频道', type: 2, canselect: true, select: false });
    if (this.data.rolesets.content.ls[e.currentTarget.dataset.index][e.currentTarget.dataset.type] == '0') {
      arr[0].select = true;
    }
    this.setData({
      nowtarget: '',
      nowindex: e.currentTarget.dataset.index,
      nowtype: e.currentTarget.dataset.type,
      channellist: arr,
      modalA: 'show'
    })
  },
  checkifhasid(id, type) {
    let ls = this.data.rolesets.content.ls;
    for (let s of ls) {
      for (let b of s.fromcs) {
        if (b.id == id || (b.id == '2002' && type != '4')) {
          return true;
        }
      }
    }
    return false;
  },
  checkifselect(index, id) {
    let ls = this.data.rolesets.content.ls;
    let s = ls[index];
    for (let b of s.fromcs) {
      if (b.id == id) {
        return true;
      }
    }
    return false;
  },
  setchannel: function () {
    let check = this.data.channellist.filter(item => { return item.select == true }).map(i => {
      return { id: i.id, name: i.name }
    });
    let allcheck = check.filter(i => { return i.id == '2002' });
    if (allcheck.length > 0) {
      check = allcheck;
      if (this.data.rolesets.content.ls.length > 1) {
        qq.showModal({
          title: '逻辑错误',
          content: '存在其他规则与"所有子频道"设置冲突，请先移除其他规则',
          showCancel: false
        });
        return;
      }
    }
    this.data.rolesets.content.ls[this.data.nowindex].fromcs = check;
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalA: ''
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (this.data.nowtype == 'fromcs') {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (i.id == item.id) {
            return { ...i, select: !i.select }
          } else {
            return { ...i, select: i.select }
          }
        })
      })
    } else {
      let check = this.data.channellist.filter(i => { return i.id == item.id });
      if (check.length == 1) {
        if (this.data.nowtype == 'toca') {
          this.data.rolesets.content.ls[this.data.nowindex].toca = check[0].id;
          this.data.rolesets.content.ls[this.data.nowindex].tocaname = check[0].name;
        } else if (this.data.nowtype == 'tocb') {
          this.data.rolesets.content.ls[this.data.nowindex].tocb = check[0].id;
          this.data.rolesets.content.ls[this.data.nowindex].tocbname = check[0].name;
        } else {
          let nowcur = this.data.nowcur;
          if (!nowcur) nowcur = this.data.tmpc.length;
          this.setData({
            tmpc: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
            tmpct: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
            modalA: ''
          })
          return;
        }

      }
      this.setData({
        modalA: '',
        nowindex: '',
        nowtype: '',
        'rolesets.content.ls': this.data.rolesets.content.ls
      })
    }
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
      extc: target.slice(-2) == 'cb',
      modalB: 'show',
      tmpc: c,
      tmpct: c
    })
  },
  setcontent: function () {
    if (this.data.nowtarget) {
      this.setData({
        [this.data.nowtarget]: this.data.tmpc.trim(),
        nowtarget: '',
        modalB: ''
      })
    }
  },
  stopit() {
    return;
  },
  RolesSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
    });
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.rolesets.content.ls.splice(index, 1);
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls
    });
  },
  addrole: function () {
    this.data.rolesets.content.ls.splice(this.data.rolesets.content.ls.length, 1, {
      fromcs: [],
      toca: '',
      tocaname: '',
      ca: '',
      tocb: '',
      tocbname: '',
      cb: ''
    })
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls
    });
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
            channellist: ret.data.filter(item => { return item.type != 1 && item.type != 3 }).map(item => {
              if (item.id == this.data.rolesets.tochannel) {
                return { ...item, select: true }
              } else {
                return { ...item, select: false }
              }
            })
          });
          this.setData({
            ochannellist: this.data.channellist
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
      url: `${app.globalData.host}/geteventssets/${app.globalData.token}/${this.data.p}/${this.data.rolesets.name}`,
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    s.content.ls = s.content.ls.filter(item => { return item.fromcs.length > 0 });
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upeventssets/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('修改语音房通知');
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
