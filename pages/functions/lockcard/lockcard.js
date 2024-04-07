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
    nowcur: false,
    p: 1,
    userinfo: app.globalData.userinfo,
    nowtarget: '',
    extc: false,
    nowindex: '',
    nowtype: '',
    tmpc: '',
    rolelist: [],
    orolelist: [],
    ochannellist: [],
    channellist: [],
    modalA: '',
    modalB: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '名片监控',
      useit: false,
      image: '',
      content: {
        ls: [{
          fromcs: [],
          toca: '',
          tocaname: '',
          ca: '竹林-.*',
          cb: '{艾特}您的昵称不符合频道要求\r\n请将频道内昵称改成 竹林-叶 的格式\r\n改正后发言不会再被限制'
        }]
      }
    },
    loadModal: false
  },
  onInput(e) {
    let nowcur = e.detail.cursor;
    if (e.detail.value.slice(nowcur - 1).startsWith('#') && this.data.extc) {
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
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  addc(event) {
    let list = { g: '|', h: '^', i: '$', j: '?', k: ' *', l: '.*', m: '\\d+', n: '([\\s\\S]*)', p: '{艾特}' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
    })
  },
  changeroles: function (e) {
    this.setData({
      nowtarget: '',
      nowindex: e.currentTarget.dataset.index,
      nowtype: e.currentTarget.dataset.type,
      rolelist: this.data.orolelist.map(i => {
        return { ...i, canselect: !this.checkifhasid(i.id), select: this.checkifselect(e.currentTarget.dataset.index, i.id) }
      }),
      modalD: 'show'
    })
  },
  selectall() {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.canselect) {
          return { ...i, select: true }
        } else {
          return i;
        }
      })
    })
  },
  cancleall() {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
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
    this.setData({
      nowtarget: '',
      nowindex: e.currentTarget.dataset.index,
      nowtype: e.currentTarget.dataset.type,
      channellist: arr,
      modalA: 'show'
    })
  },
  checkifhasid(id) {
    let ls = this.data.rolesets.content.ls;
    for (let s of ls) {
      for (let b of s.fromcs) {
        if (b.id == id) {
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
    let check = this.data.rolelist.filter(item => { return item.select == true }).map(i => {
      return { id: i.id, name: i.name, hexcolor: i.hexcolor }
    });
    this.data.rolesets.content.ls[this.data.nowindex].fromcs = check;
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalD: ''
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (this.data.nowtype == 'fromcs') {
      this.setData({
        rolelist: this.data.rolelist.map(i => {
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
        } else if (this.data.extc) {
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
    if (this.data.nowtarget.slice(-2) == 'ca') {
      try {
        let reg = new RegExp(this.data.tmpc.trim(), 'g');
        if (reg.test('apple') && reg.test('竹林') && reg.test('2002')) {
          qq.showModal({
            title: '错误',
            content: '您使用的正则表达式貌似会匹配任何文本，请您仔细检查您使用的正则表达式是否正确，比如末尾是否多使用了|表达式，以免造成灾难性后果',
            showCancel: false
          });
          return;
        }
      } catch (err) {
        qq.showToast({
          title: '正则表达式有误',
          icon: 'none'
        })
        return;
      }
    } else {
      if (this.data.tmpc.trim() == '') {
        qq.showModal({
          title: '错误',
          content: '内容不能为空',
          showCancel: false
        });
        return;
      }
    }
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
      ca: '竹林-.*',
      cb: '{艾特}您的昵称不符合频道要求\r\n请将频道内昵称改成 竹林-叶 的格式\r\n改正后发言不会再被限制'
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
  fetch_rolelist: function () {
    if (this.data.rolelist.length > 0) {
      return;
    }
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
            rolelist: ret.data.filter(item => { return item.id.length > 4; }),
            orolelist: ret.data.filter(item => { return item.id.length > 4; })
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
          this.fetch_rolelist();
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
    if (s.useit == true) {
      if (s.content.ls.filter(item => { return item.toca == '' || item.ca == '' || item.cb == '' }).length > 0) {
        qq.showToast({
          title: '设置数据不完整',
          icon: 'none'
        })
        return;
      }
    }
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
          app.postlog('修改名片格式锁定设置');
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
