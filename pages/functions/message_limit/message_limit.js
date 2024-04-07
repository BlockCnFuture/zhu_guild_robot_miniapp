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
    nowtarget: '',
    extc: false,
    nowindex: '',
    nowtype: '',
    tmpc: '',
    ochannellist: [],
    channellist: [],
    modalA: '',
    modalB: '',
    btypes: [],
    obtypes: ['文本消息', '图片消息', '链接', '数字', '文件', '分享', 'QQ小世界', 'QQ小程序', '第三方卡片', 'QQ红包', '艾特消息', '<不支持的消息>'],
    typedesk: ['普通文本消息', '带图片的消息', '带链接的消息', '带数字的消息', 'apk等文件', '网页分享、音乐分享等', 'QQ小世界视频', 'QQ小程序卡片', '第三方卡片消息', '频道QQ红包消息', '带有艾特其他人的消息', '短视频、频道邀请ark等'],
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '子频道发言类型限制',
      useit: false,
      image: '',
      content: {
        ls: [{
          fromcs: [],
          bdtypes: []
        }]
      }
    },
    loadModal: false
  },
  onInput(e) {
    this.setData({
      nowcur: e.detail.cursor,
      tmpc: e.detail.value
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
  sftypes: function (e) {
    let desc = this.data.typedesk;
    this.setData({
      nowindex: e.currentTarget.dataset.index,
      btypes: this.data.obtypes.map((i, index) => {
        return { name: i, desc: desc[index], select: this.data.rolesets.content.ls[e.currentTarget.dataset.index].bdtypes.includes(i) }
      }),
      modalB: 'show'
    })
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
  sfromc: function (e) {
    let tls = JSON.parse(JSON.stringify(this.data.ochannellist));
    tls.splice(0, 0, { id: '2002', name: '所有文字子频道', type: 0, sub_type: 0 });
    tls = tls.filter(i => {
      return i.type == 0 || i.type == 4;
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
      return { id: i.id, name: i.name, sub_type: i.sub_type }
    });
    let allcheck = check.filter(i => { return i.id == '2002' });
    if (allcheck.length > 0) {
      check = allcheck;
      if (this.data.rolesets.content.ls.length > 1) {
        qq.showModal({
          title: '逻辑错误',
          content: '存在其他策略与"所有子频道"设置冲突，请先移除其他策略',
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
  selectall_() {
    this.setData({
      btypes: this.data.btypes.map(i => {
        return { ...i, select: true }
      })
    })
  },
  cancleall_() {
    this.setData({
      btypes: this.data.btypes.map(i => {
        return { ...i, select: false }
      })
    })
  },
  setchannel_: function () {
    let check = this.data.btypes.filter(item => { return item.select == true }).map(i => { return i.name });
    this.data.rolesets.content.ls[this.data.nowindex].bdtypes = check;
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalB: ''
    })
  },
  pclick_: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      btypes: this.data.btypes.map(i => {
        if (i.name == item.name) {
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: i.select }
        }
      })
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
      bdtypes: []
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
    s.content.ls = s.content.ls.filter(item => { return item.fromcs.length > 0 && item.bdtypes.length > 0 });
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
          app.postlog('修改子频道发言类型限制');
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
