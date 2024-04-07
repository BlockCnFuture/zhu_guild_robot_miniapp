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
    channellist: [],
    p: 1,
    userinfo: app.globalData.userinfo,
    nowtarget: '',
    extc: false,
    nowindex: '',
    nowtype: '',
    modalA: '',
    modalB: '',
    levellist: [],
    olevellist: [
      { level: 1, name: '<= LV.1', desc: '0活跃值' },
      { level: 2, name: '<= LV.2', desc: '2活跃值' },
      { level: 3, name: '<= LV.3', desc: '4活跃值' },
      { level: 4, name: '<= LV.4', desc: '9活跃值' },
      { level: 5, name: '<= LV.5', desc: '15活跃值' },
      { level: 6, name: '<= LV.6', desc: '25活跃值' },
      { level: 7, name: '<= LV.7', desc: '35活跃值' },
      { level: 8, name: '<= LV.8', desc: '45活跃值' },
      { level: 9, name: '<= LV.9', desc: '60活跃值' },
      { level: 10, name: '<= LV.10', desc: '75活跃值' },
      { level: 11, name: '<= LV.11', desc: '90活跃值' },
      { level: 12, name: '<= LV.12', desc: '110活跃值' },
      { level: 13, name: '<= LV.13', desc: '130活跃值' },
      { level: 14, name: '<= LV.14', desc: '160活跃值' },
      { level: 15, name: '<= LV.15', desc: '190活跃值' },
      { level: 16, name: '<= LV.16', desc: '230活跃值' },
      { level: 17, name: '<= LV.17', desc: '270活跃值' },
      { level: 18, name: '<= LV.18', desc: '325活跃值' },
      { level: 19, name: '<= LV.19', desc: '380活跃值' },
      { level: 20, name: '<= LV.20', desc: '450活跃值' },
      { level: 21, name: '<= LV.21', desc: '520活跃值' },
      { level: 22, name: '<= LV.22', desc: '610活跃值' },
      { level: 23, name: '<= LV.23', desc: '700活跃值' },
      { level: 24, name: '<= LV.24', desc: '810活跃值' },
      { level: 25, name: '<= LV.25', desc: '920活跃值' }
    ],
    btypes: [],
    obtypes: ['文本消息', '图片消息', '链接', '数字', '文件', '分享', 'QQ小世界', 'QQ小程序', '第三方卡片', 'QQ红包', '艾特消息', '<不支持的消息>', '主题'],
    typedesk: ['普通文本消息', '带图片的消息', '带链接的消息', '带数字的消息', 'apk等文件', '网页分享、音乐分享等', 'QQ小世界视频', 'QQ小程序卡片', '第三方卡片消息', '频道QQ红包消息', '带有艾特其他人的消息', '短视频、频道邀请ark等', '也就是帖子（非评论）'],
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '各等级成员发言限制',
      useit: false,
      image: '',
      content: {
        ls: [{
          bdtypes: [],
          level: 0,
          channels: ''
        }]
      }
    },
    loadModal: false
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
      modalB: ''
    })
  },
  hideModalC: function () {
    this.setData({
      modalC: ''
    })
  },
  sftypes: function (e) {
    let desc = this.data.typedesk;
    this.setData({
      nowindex: e.currentTarget.dataset.index,
      btypes: this.data.obtypes.map((i, index) => {
        return { name: i, desc: desc[index], select: this.data.rolesets.content.ls[e.currentTarget.dataset.index].bdtypes.includes(i) }
      }),
      modalA: 'show'
    })
  },
  sflevels: function (e) {
    this.setData({
      nowindex: e.currentTarget.dataset.index,
      levellist: this.data.olevellist.map(i => {
        return { ...i, select: this.data.rolesets.content.ls[e.currentTarget.dataset.index].level == i.level, canselect: !this.checkifhaslevel(i.level) }
      }),
      modalB: 'show'
    })
  },
  sfchannels: function (e) {
    if (!this.data.rolesets.content.ls[e.currentTarget.dataset.index].channels) this.data.rolesets.content.ls[e.currentTarget.dataset.index].channels = '';
    this.setData({
      nowindex: e.currentTarget.dataset.index,
      channellist: this.data.channellist.map(i => {
        return { ...i, select: this.data.rolesets.content.ls[e.currentTarget.dataset.index].channels.includes(`|${i.id}|`) }
      }),
      modalC: 'show'
    })
  },
  selectall() {
    this.setData({
      btypes: this.data.btypes.map(i => {
        return { ...i, select: true }
      })
    })
  },
  cancleall() {
    this.setData({
      btypes: this.data.btypes.map(i => {
        return { ...i, select: false }
      })
    })
  },
  checkifhaslevel(level) {
    let ls = this.data.rolesets.content.ls;
    for (let s of ls) {
      if (s.level == level) {
        return true;
      }
    }
    return false;
  },
  setchannel: function () {
    let check = this.data.btypes.filter(item => { return item.select == true }).map(i => { return i.name });
    this.data.rolesets.content.ls[this.data.nowindex].bdtypes = check;
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalA: ''
    })
  },
  ssetchannel: function () {
    let check = this.data.channellist.filter(item => { return item.select == true }).map(i => { return `|${i.id}|` }).join('');
    this.data.rolesets.content.ls[this.data.nowindex].channels = check;
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalC: ''
    })
  },
  setlevel: function () {
    let check = this.data.levellist.filter(item => { return item.select == true }).map(i => { return i.level });
    if (check.length == 1) {
      this.data.rolesets.content.ls[this.data.nowindex].level = check[0];
    }
    this.setData({
      'rolesets.content.ls': this.data.rolesets.content.ls,
      modalB: ''
    })
  },
  pclick_: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: i.select }
        }
      })
    })
  },
  pclick: function (event) {
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
  lclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      levellist: this.data.levellist.map(i => {
        if (i.level == item.level) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      })
    })
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
      bdtypes: [],
      level: 0,
      channels: ''
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
            channellist: ret.data.filter(item => { return item.type != 1 && item.type != 3 })
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
  selectalls() {
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.type != 4) {
          return { ...i, select: true }
        } else {
          return i;
        }
      })
    })
  },
  canclealls() {
    this.setData({
      channellist: this.data.channellist.map(i => {
        return { ...i, select: false }
      })
    })
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if (s.content.ls.filter(item => { return item.bdtypes.length == 0 || item.level == 0 }).length > 0) {
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
          app.postlog('修改各等级成员发言限制策略');
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
