const app = getApp();
Page({
  onLoad() {
    this.InitLs();
  },
  InitLs: function () {
    this.fetch_sets();
  },
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  changeroles: function (e) {
    let item = e.currentTarget.dataset.item;
    let ls = this.data.rolesets.content.filter(i => { return i.c == item.c });
    this.setData({
      nowc: item.c,
      rolelist: this.data.rolelist.map(i => {
        if (ls && ls[0] && ls[0].p && ls[0].p.includes(`|${i.id}|`)) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      modalD: 'show'
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
    this.InitLs();
  },
  copycommand: function (event) {
    qq.setClipboardData({
      data: '/' + event.currentTarget.dataset.c,
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  },
  fclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == '4') {
          return { ...i, select: true };
        }
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  selectall: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: true };
      })
    })
  },
  cancleall: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == '4') {
          return { ...i, select: true };
        }
        return { ...i, select: false };
      })
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
      url: `${app.globalData.host}/rolelist/${app.globalData.token}/0`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          ret.data.map(item => {
            item.hexcolor = '#' + (item.color).toString(16).substr(2).toUpperCase();
          })
          ret.data = [...ret.data, ...Array.from({ length: 25 }, (i, v) => { return { id: (v + 10 + 1).toString(), name: `等级身份组 LV.${v + 1}`, hexcolor: 'n' } })]
          this.setData({
            rolelist: ret.data,
            orolelist: ret.data
          });
          this.setData({
            clist: this.data.clist.map(item => {
              let ls = this.data.rolesets.content.filter(i => { return i.c == item.c });
              if (ls.length == 1) {
                let roles = [];
                this.data.rolelist.map(i => {
                  if (ls[0].p.includes(`|${i.id}|`)) {
                    roles.push({ name: i.name, hexcolor: i.hexcolor });
                  }
                })
                return { ...item, roles: roles }
              } else {
                this.data.rolesets.content.push({ c: item.c, p: '|4|' });
                return { ...item, roles: [{ name: '频道主', hexcolor: '#FF3F32' }] }
              }
            })
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
      url: `${app.globalData.host}/geteventssets/${app.globalData.token}/0/${this.data.rolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            ret.sets.content = ret.sets.content.filter(i => {
              let check = this.data.clist.filter(ii => { return ii.c == i.c });
              return check && check.length == 1;
            });
            this.setData({
              rolesets: ret.sets
            });
          }
          this.setData({
            loadModal: false
          })
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
  checkp_old(c) {
    let ls = this.data.rolesets.content.filter(i => { return i.c == c });
    if (ls.length == 1) {
      return ls[0].p;
    } else {
      return '|4|';
    }
  },
  setrole: function () {
    let c = this.data.nowc;
    let ls = this.data.rolelist.filter(i => { return i.select });
    let arr = this.data.clist.filter(i => { return i.select }).map(i => { return i.c });
    let rs = '';
    ls.map(i => {
      rs += `|${i.id}|`;
    });
    if (c == '') {
      this.setData({
        'rolesets.content': this.data.clist.map(i => {
          if (arr.includes(i.c)) {
            return { c: i.c, p: rs }
          } else {
            return { c: i.c, p: this.checkp_old(i.c) }
          }
        })
      })
    } else {
      this.setData({
        'rolesets.content': this.data.clist.map(i => {
          if (i.c == c) {
            return { c: i.c, p: rs }
          } else {
            return { c: i.c, p: this.checkp_old(i.c) }
          }
        })
      })
    }
    this.setData({
      clist: this.data.clist.map(item => {
        let ls = this.data.rolesets.content.filter(i => { return i.c == item.c });
        if (ls.length == 1) {
          let roles = [];
          this.data.rolelist.map(i => {
            if (ls[0].p.includes(`|${i.id}|`)) {
              roles.push({ name: i.name, hexcolor: i.hexcolor });
            }
          })
          return { ...item, roles: roles }
        }
        return item;
      }),
      modalD: ''
    });
  },
  cancleall_: function () {
    this.setData({
      clist: this.data.clist.map((i, s) => {
        return { ...i, select: false };
      })
    })
  },
  selectsome_: function () {
    this.setData({
      clist: this.data.clist.map((i, s) => {
        return { ...i, select: true };
      })
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.clist;
    if (s == '') {
      this.setData({
        clist: list.map(i => { return { ...i, show: true } })
      });
    } else {
      this.setData({
        clist: list.map(item => {
          return { ...item, show: item.c.toLowerCase().includes(s.toLowerCase()) } 
          })
      });
    }
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upeventssets/${app.globalData.token}/0`,
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
          app.postlog('修改危险指令权限');
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
  selectone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      clist: this.data.clist.map((i, s) => {
        if (i.c == item.c) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  opsome: function () {
    let arr = this.data.clist.filter(i => { return i.select });
    if (arr.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    this.setData({
      nowc: '',
      rolelist: this.data.rolelist.map(i => {
        if (i.id == '4') {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      modalD: 'show'
    });
  },
  data: {
    userinfo: app.globalData.userinfo,
    clist: app.globalData.clist.map(i => { return { ...i, show: true } }),
    loadModal: false,
    rolelist: [],
    orolelist: [],
    modalD: '',
    nowc: '',
    rolesets: {
      fromchannel: '0',
      tochannel: '0',
      name: '管理指令权限设置',
      useit: true,
      image: '',
      content: app.globalData.clist.map(({ d, ...rest }) => rest)
    }
  }
})
