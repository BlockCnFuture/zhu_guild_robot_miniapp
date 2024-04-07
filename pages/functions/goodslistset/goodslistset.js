const app = getApp();
Page({
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    nowcur: false,
    pointlist: [],
    p: 44,
    userinfo: app.globalData.userinfo,
    permissionlist: app.globalData.permissionlist,
    nowtarget: '',
    tmpc: '',
    tmpimg: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '礼品商店设置',
      useit: false,
      image: '',
      content: {
        showrest: false,
        showall: false,
        groups: []
      }
    },
    loadModal: false
  },
  loadeda(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      heighta: h
    })
  },
  goodsneedsend() {
    qq.navigateTo({
      url: `../historygoods/historygoods?pa=1&pb=0&pc=1`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
    return;
  },
  goodssend() {
    qq.navigateTo({
      url: `../historygoods/historygoods?pa=1&pb=1&pc=0`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
    return;
  },
  CopyText(e) {
    let link = e.currentTarget.dataset.link;
    if (link == 'goodslist') {
      let s = encodeURIComponent(`pages/functions/goodslist/goodslist?guildID=${this.data.userinfo.open_guild_id}`);
      link = `https://m.q.qq.com/a/p/${app.getnowappid()}?s=${s}`;
    }
    qq.setClipboardData({
      data: link,
      success: res => {
        qq.showToast({
          title: '已复制',
          icon: 'none',
        })
      }
    })
  },
  LoadTast: function () {
    this.fetch_sets();
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
  onInput(e) {
    let nowcur = e.detail.cursor;
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  setgroup() {
    this.setData({
      modalA: 'show'
    })
  },
  hideModalA: function () {
    this.setData({
      'rolesets.content.groups': this.data.rolesets.content.groups.filter(i => { return i != '' }),
      modalA: ''
    })
  },
  hideModalB: function () {
    this.setData({
      'rolesets.content.groups': this.data.rolesets.content.groups.filter(i => { return i != '' }),
      nowtarget: '',
      modalB: '',
      tmpc: ''
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
    let check = this.data.rolesets.content.groups.filter(i => { return i == this.data.tmpc.trim() });
    if (check.length > 0) {
      qq.showModal({
        title: '错误',
        content: '分类名重复，请使用其他分类名',
        showCancel: false
      });
      return;
    }
    if (this.data.nowtarget) {
      this.setData({
        [this.data.nowtarget]: this.data.tmpc.trim(),
        nowtarget: '',
        tmpc: '',
        modalB: ''
      })
    }
  },
  stopit() {
    return;
  },
  showinfo(event) {
    let index = event.currentTarget.dataset.index;
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpc: item,
      tmpct: item,
      nowtarget: `rolesets.content.groups[${index}]`,
      modalB: 'show'
    })
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.rolesets.content.groups.splice(index, 1);
    this.setData({
      'rolesets.content.groups': this.data.rolesets.content.groups
    });
  },
  addrole: function () {
    if (this.data.rolesets.content.groups.length >= 10) {
      qq.showModal({
        title: "数量超限",
        content: "最多可创建10个礼品分类",
        showCancel: false
      });
      return;
    }
    this.data.rolesets.content.groups.splice(this.data.rolesets.content.groups.length, 1, '');
    this.setData({
      'rolesets.content.groups': this.data.rolesets.content.groups,
      nowtarget: `rolesets.content.groups[${this.data.rolesets.content.groups.length - 1}]`,
      tmpc: '',
      tmpct: '',
      modalB: 'show'
    });
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
  navigate() {
    qq.showToast({
      title: "暂未开放",
      icon: 'none'
    });
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
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
          app.postlog('修改礼品商店设置');
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
  jmpto(e) {
    let target = e.currentTarget.dataset.target;
    qq.navigateTo({
      url: `../${target}/${target}`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  }
})