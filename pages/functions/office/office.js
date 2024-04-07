const app = getApp();
Page({
  onLoad() {
    this.InitLs();
  },
  InitLs: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name],
      userlist: [],
      complete: false,
      nownext: '0'
    });
    this.fetch_sets();
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
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    });
    this.fetch_pointslist();
  },
  setchannel() {
    let path = `rolesets.${this.data.nowtarget}`;
    let check = this.data.channellist.filter(i => { return i.select });
    if (check && check.length == 1) {
      if (this.data.nowtarget == 'tochannel') {
        this.setData({
          channelname: check[0].name,
          [path]: check[0].id,
          modalB: ''
        })
      } else {
        this.setData({
          channelname_: check[0].name,
          [path]: check[0].id,
          modalB: ''
        })
      }
    } else {
      if (this.data.nowtarget == 'tochannel') {
        this.setData({
          channelname: '',
          [path]: '',
          modalB: ''
        })
      } else {
        this.setData({
          channelname_: '',
          [path]: '',
          modalB: ''
        })
      }
    }
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
          this.fetch_rolelist();
          this.fetch_pointslist();
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
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 })
          });
          let name = ret.data.filter(item => { return item.type == 0 && item.id == this.data.rolesets.tochannel });
          if (name && name.length == 1) {
            this.setData({
              channelname: name[0].name
            });
          }
          if (this.data.rolesets.content && this.data.rolesets.content.report && this.data.rolesets.content.report.fixchannel) {
            let name_ = ret.data.filter(item => { return item.type == 0 && item.id == this.data.rolesets.content.report.fixchannel });
            if (name_ && name_.length == 1) {
              this.setData({
                channelname_: name_[0].name
              });
            }
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
  RolesSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
    });
  },
  MentionSwitch: function (event) {
    this.setData({
      'rolesets.content.mention': event.detail.value
    });
  },
  DisbanSwitch: function (event) {
    this.setData({
      'rolesets.content.disban.able': event.detail.value
    });
  },
  DisbanUSwitch: function (event) {
    this.setData({
      'rolesets.content.disban.dep.able': event.detail.value
    });
  },
  ReportSwitch: function (event) {
    this.setData({
      'rolesets.content.report.able': event.detail.value
    });
  },
  ReportUSwitch: function (event) {
    this.setData({
      'rolesets.content.report.enp.able': event.detail.value
    });
  },
  fclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      userlist: [],
      complete: false,
      nownext: '0',
      nowgrpid: item.id,
      nowgrpname: item.name,
      modalD: ''
    })
    this.fetch_list();
  },
  copycommand: function (event) {
    let c = event.currentTarget.dataset.c;
    qq.setClipboardData({
      data: c,
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  },
  copylink: function () {
    let s = encodeURIComponent(`pages/functions/disbanapply/disbanapply?guildID=${this.data.userinfo.open_guild_id}`);
    qq.setClipboardData({
      data: `https://m.q.qq.com/a/p/${app.getnowappid()}?s=${s}`,
      success: function () {
        qq.showToast({
          title: '已复制'
        })
      }
    })
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
  navigate: function (event) {
    let target = event.currentTarget.dataset.url;
    qq.navigateTo({
      url: `../${target}/${target}`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  fclick_: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      rolelist_: this.data.rolelist_.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  fetch_list() {
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/tu_list/${app.globalData.token}/${this.data.nownext}/${this.data.nowgrpid}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.data.length > 0) {
            ret.data = [...this.data.userlist, ...ret.data];
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                userlist: ret.data.map(item => {
                  if (item.user.username.toLowerCase().includes(s.toLowerCase())) {
                    return { ...item, show: true };
                  } else {
                    return { ...item, show: false };
                  }
                }),
                nownext: ret.next,
                complete: ret.next == '0'
              });
            } else {
              this.setData({
                userlist: ret.data.map(item => {
                  return { ...item, show: true };
                }),
                nownext: ret.next,
                complete: ret.next == '0'
              });
            }
          } else {
            this.setData({
              complete: true
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
            title: `[${ret.errcode}]数据拉取出错`,
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
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      [this.data.nowtarget]: item.point_id,
      modalE: ''
    })
    this.refRshow();
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.userlist;
    if (s == '') {
      this.setData({
        userlist: list.map(i => {
          return { ...i, show: true };
        }),
        keyword: s
      });
    } else {
      this.setData({
        userlist: list.map(item => {
          if (item.user.username.toLowerCase().includes(s.toLowerCase())) {
            return { ...item, show: true };
          } else {
            return { ...item, show: false };
          }
        }),
        keyword: s
      });
    }
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
  selectall: function () {
    this.setData({
      rolelist_: this.data.rolelist_.map(i => {
        return { ...i, select: true };
      })
    })
  },
  cancleall: function () {
    this.setData({
      rolelist_: this.data.rolelist_.map(i => {
        return { ...i, select: false };
      })
    })
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
  hideModalC: function () {
    this.setData({
      modalC: ''
    })
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
          ret.data = ret.data.filter(i => { return i.id != '4' });
          this.setData({
            rolelist: ret.data.filter(i => { return i.id != '6' && i.id != '1' }),
            rolelist_: [...ret.data, ...Array.from({ length: 25 }, (i, v) => { return { id: (v + 10 + 1).toString(), name: `等级身份组 LV.${v + 1}`, hexcolor: 'n' } })]
          });
          this.refRshow();
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
  hideModalD() {
    this.setData({
      modalD: ''
    })
  },
  hideModalE: function () {
    this.setData({
      modalE: ''
    })
  },
  choseRole() {
    this.setData({
      modalD: 'show'
    })
  },
  tusers() {
    let check = this.data.userlist.filter(i => { return i.select });
    if (check && check.length > 3) {
      qq.showModal({
        title: "数量超限",
        content: '每日值班人员最多指定3人',
        showCancel: false
      });
      return;
    }
    let arr = check.map(i => { return { avatar: i.user.avatar, id: i.user.id, username: i.user.username }; });
    let path = `rolesets.content.${this.data.nowtarget}`;
    this.setData({
      [path]: arr,
      nowtarget: '',
      modalA: ''
    })
  },
  selectone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      userlist: this.data.userlist.map((i, s) => {
        if (i.user.id == item.user.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  stopit() {
    return;
  },
  choseUsers(e) {
    if (this.data.userlist.length <= 0) {
      this.fetch_list();
    }
    this.setData({
      nowtarget: e.currentTarget.dataset.target,
      modalA: 'show'
    })
  },
  changechannel(e) {
    let path = e.currentTarget.dataset.target;
    if (path == 'tochannel') {
      this.setData({
        channellist: this.data.channellist.map(i => { return { ...i, select: this.data.rolesets.tochannel == i.id } })
      })
    } else {
      this.setData({
        channellist: this.data.channellist.map(i => { return { ...i, select: this.data.rolesets.content.report.fixchannel == i.id } })
      })
    }
    this.setData({
      nowtarget: e.currentTarget.dataset.target,
      modalB: 'show'
    })
  },
  ableroles(e) {
    let path = e.currentTarget.dataset.target;
    let needrole = [];
    if (path == 'rolesets.content.disban.needroles') {
      needrole = this.data.rolesets.content.disban.needroles;
    } else {
      needrole = this.data.rolesets.content.report.needroles;
    }
    this.setData({
      rolelist_: this.data.rolelist_.map(i => { return { ...i, select: needrole.includes(i.id) }; }),
      nowtarget: e.currentTarget.dataset.target,
      modalC: 'show'
    })
  },
  refRshow() {
    let arr = false;
    try {
      arr = this.data.rolesets.content.disban.needroles
    } catch (err) { }
    if (arr && arr.length > 0) {
      this.setData({
        showroles: this.data.rolelist_.filter(i => {
          return arr.includes(i.id);
        })
      })
    }
    arr = false;
    try {
      arr = this.data.rolesets.content.report.needroles
    } catch (err) { }
    if (arr && arr.length > 0) {
      this.setData({
        showroles_: this.data.rolelist_.filter(i => {
          return arr.includes(i.id);
        })
      })
    }
    let id = false;
    try {
      id = this.data.rolesets.content.disban.dep.id
    } catch (err) { }
    if (id && id != '') {
      let check = this.data.plist.filter(i => { return i.point_id == id; });
      if (check && check.length == 1) {
        this.setData({
          pname: check[0].point_name,
          'rolesets.content.disban.dep.name': check[0].point_name
        })
      }
    }
    id = false;
    try {
      id = this.data.rolesets.content.report.enp.id
    } catch (err) { }
    if (id && id != '') {
      let check = this.data.plist.filter(i => { return i.point_id == id; });
      if (check && check.length == 1) {
        this.setData({
          pname_: check[0].point_name,
          'rolesets.content.report.enp.name': check[0].point_name
        })
      }
    }
  },
  setrole() {
    let check = this.data.rolelist_.filter(i => { return i.select });
    if (check && check.length > 0) {
      check = check.map(i => { return i.id })
    }
    this.setData({
      [this.data.nowtarget]: check,
      modalC: ''
    })
    this.refRshow();
  },
  checkpermission: function (id) {
    if (this.data.userinfo.member_role == 2) return true;
    let ret = app.hasPermission(this.data.userinfo.permissions, id);
    return ret;
  },
  chosepoint(e) {
    let sthis = this;
    if (this.data.plist.length <= 0) {
      qq.showModal({
        title: '无任何积分',
        content: '您还未创建任何积分规则，是否前往创建？',
        success(res) {
          if (res.confirm) {
            if (!sthis.checkpermission(37)) {
              qq.showToast({
                title: '频道主未授予您页面权限',
                icon: 'none'
              })
              return;
            }
            qq.navigateTo({
              url: `../pointssets/pointssets`,
              fail: () => {
                qq.showToast({
                  title: '跳转失败',
                  icon: 'none'
                })
              }
            });
          }
        }
      });
      return;
    }
    this.setData({
      nowtarget: e.currentTarget.dataset.target,
      modalE: 'show'
    })
  },
  fetch_pointslist: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchGpoints/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt > 0 && ret.rows) {
            this.setData({
              plist: ret.rows
            })
          }
          this.setData({
            loadModal: false
          })
        } else {
          this.setData({
            loadModal: false
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
      }
    })
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
  inputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let type = e.target.dataset.type;
    let cnt = e.currentTarget.dataset.cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 9999999) cnt = 9999999;
    } else {
      cnt--;
      if (cnt < 0) cnt = 0;
    }
    this.setData({
      [target]: cnt
    })
  },
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = parseInt(e.detail.value);
    if (cnt < 0) cnt = 0;
    if (cnt > 9999999) cnt = 9999999;
    this.setData({
      [target]: cnt
    })
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt < 0 || isNaN(cnt) || !cnt) cnt = 0;
    this.setData({
      [target]: cnt
    })
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if (s.tochannel == '' || (s.content.disban.dep.able && s.content.disban.dep.id == '') || (s.content.report.enp.able && s.content.report.enp.id == '')) {
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
          app.postlog('修改值班系统设置');
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
  data: {
    p: '0',


    channelname: '',
    channelname_: '',
    pname: '',
    pname_: '',
    showroles: [],
    showroles_: [],

    nowtarget: '',
    rolelist: [],
    rolelist_: [],
    userlist: [],
    plist: [],
    userinfo: app.globalData.userinfo,
    modalA: '',
    loadModal: false,
    complete: false,
    nowgrpid: '2',
    nownext: '0',
    keyword: '',
    channellist: [],
    nowgrpname: '超级管理员',
    modalD: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '值班室设置',
      useit: false,
      image: '',
      content: {
        mention: false,
        u1: [],
        u2: [],
        u3: [],
        u4: [],
        u5: [],
        u6: [],
        u7: [],
        disban: {
          able: false,
          needroles: [],
          dep: {
            able: false,
            id: '',
            name: '',
            number: 0
          }
        },
        report: {
          able: false,
          needroles: [],
          fixchannel: '',
          enp: {
            able: false,
            id: '',
            name: '',
            number: 0
          }
        }
      }
    }
  }
})
