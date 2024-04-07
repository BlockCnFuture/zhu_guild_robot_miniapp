const app = getApp();
Page({
  onLoad() {
    this.InitLs();
  },
  InitLs: function () {
    this.setData({
      userlist: [],
      complete: false,
      nownext: '0'
    })
    this.fetch_list();
    this.fetch_rolelist();
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
  fetch_list() {
    let tnext = this.data.nownext;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/tu_list/${app.globalData.token}/${tnext}/${this.data.nowgrpid}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.data.length > 0) {
            if (tnext == '0') {
              //
            } else {
              ret.data = [...this.data.userlist, ...ret.data];
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                userlist: ret.data.map(item => {
                  return { ...item, show: item.user.username.toLowerCase().includes(s.toLowerCase()) }
                }),
                nownext: ret.next,
                complete: ret.next == '0'
              });
            } else {
              this.setData({
                userlist: ret.data.map(i => { return { ...i, show: true } }),
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
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.userlist;
    if (s == '') {
      this.setData({
        userlist: list.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        userlist: list.map(item => {
          return { ...item, show: item.user.username.toLowerCase().includes(s.toLowerCase()) }
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
  navigate: function (event) {
    let item = event.currentTarget.dataset.item;
    let url = event.currentTarget.dataset.url;

    if (this.data.nowuid == item.user.id) {
      this.clcpermissions();
      this.setData({ modal: 'show' });
    } else {
      this.setData({
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/permissions/${item.user.id}/${app.globalData.token}`,
        success: (ret) => {
          ret = ret.data;
          if (ret.errcode == 0) {
            this.setData({
              nowuid: item.user.id,
              uidp: ret.p,
              ouidp: ret.p
            });
            this.setData({
              loadModal: false
            })
            this.clcpermissions();
            this.setData({ modal: 'show' });
          } else {
            this.setData({
              loadModal: false
            })
            qq.showToast({
              title: `[${ret.errcode}]请求出错`,
              icon: 'none'
            })
          }
        },
        fail: () => {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '请求失败，请检查网络',
            icon: 'none'
          })
        }
      })
    }
  },
  opsome: function () {
    let arr = this.data.userlist.filter(i => { return i.select });
    if (arr.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    this.setData({
      uidp: '0',
      ouidp: '0',
      nowuid: '',
      permissionlist_names: this.data.permissionlist_names.map(i => { return { ...i, has: false } }),
      modal: 'show'
    });
  },
  hideModal: function () {
    this.setData({
      modal: 'hide',
      uidp: this.data.ouidp
    })
  },
  cancleall_: function () {
    this.setData({
      userlist: this.data.userlist.map((i, s) => {
        return { ...i, select: false };
      })
    })
  },
  selectsome_: function () {
    this.setData({
      userlist: this.data.userlist.map((i, s) => {
        return { ...i, select: true };
      })
    })
  },
  clcpermissions: function () {
    for (let i = 0; i < this.data.permissionlist_names.length; i++) {
      this.data.permissionlist_names[i].has = app.hasPermission(this.data.uidp, i + 2);
    }
    this.setData({
      permissionlist_names: this.data.permissionlist_names
    })
  },
  pclick: function (event) {
    let index = event.currentTarget.dataset.index;
    let has = event.currentTarget.dataset.has;
    if (has) {
      this.setData({
        uidp: app.removePermission(this.data.uidp, index)
      })
    } else {
      this.setData({
        uidp: app.addPermission(this.data.uidp, index)
      })
    }
    this.clcpermissions();
  },
  selectall: function () {
    for (let i = 0; i < this.data.permissionlist_names.length; i++) {
      this.setData({
        uidp: app.addPermission(this.data.uidp, i + 2)
      })
    }
    this.clcpermissions()
  },
  cancleall: function () {
    for (let i = 0; i < this.data.permissionlist_names.length; i++) {
      this.setData({
        uidp: app.removePermission(this.data.uidp, i + 2)
      })
    }
    this.clcpermissions()
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
          this.setData({
            rolelist: ret.data.filter(i => { return i.id != '4' && i.id != '6' && i.id != '1' })
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
  hideModalD() {
    this.setData({
      modalD: ''
    })
  },
  choseRole() {
    this.setData({
      modalD: 'show'
    })
  },
  savesets: function () {
    let arr = this.data.userlist.filter(i => { return i.select });
    if (this.data.nowuid == '') {
      if (arr.length > 50) {
        this.setData({
          modal: 'hide'
        })
        qq.showToast({
          title: '操作成员过多',
          icon: 'none'
        })
        return;
      } else {
        this.setData({
          modal: 'hide',
          loadModal: true
        })
        qq.request({
          url: `${app.globalData.host}/setpermission/${app.globalData.token}/${this.data.uidp}`,
          method: 'POST',
          data: { users: arr.map(i => { return i.user.id }) },
          success: (ret) => {
            ret = ret.data;
            if (ret.errcode == 0) {
              this.setData({
                loadModal: false
              })
              qq.showToast({
                title: '设置成功',
                icon: 'none'
              })
              app.postlog(`分配后台控制权限`);
            } else {
              this.setData({
                loadModal: false
              })
              qq.showToast({
                title: `[${ret.errcode}]请求出错`,
                icon: 'none'
              })
            }
          },
          fail: () => {
            this.setData({
              loadModal: false
            })
            qq.showToast({
              title: '请求失败，请检查网络',
              icon: 'none'
            })
          }
        })
      }
      return;
    }
    this.setData({
      modal: 'hide',
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/setpermission/${this.data.nowuid}/${this.data.uidp}/${app.globalData.token}`,
      success: (ret) => {
        ret = ret.data;
        if (ret.errcode == 0) {
          this.setData({
            ouidp: this.data.uidp
          })
          this.clcpermissions();
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '设置成功',
            icon: 'none'
          })
          app.postlog(`分配后台控制权限`);
        } else {
          this.setData({
            uidp: this.data.ouidp
          })
          this.clcpermissions();
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]请求出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          uidp: this.data.ouidp
        })
        this.clcpermissions();
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '请求失败，请检查网络',
          icon: 'none'
        })
      }
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
  onSearchInputS: function (event) {
    let s = event.detail.value;
    let list = this.data.permissionlist_names;
    if (s == '') {
      this.setData({
        permissionlist_names: list.map(i => { return { ...i, show: true } })
      });
    } else {
      this.setData({
        permissionlist_names: list.map(item => {
          return { ...item, show: item.name.toLowerCase().includes(s.toLowerCase()) }
        })
      });
    }
  },
  data: {
    rolelist: [],
    userlist: [],
    userinfo: app.globalData.userinfo,
    modal: 'hide',
    loadModal: false,
    permissionlist: app.globalData.permissionlist,
    permissionlist_names: app.globalData.permissionlist_names.map(i => { return { ...i, show: true } }),
    nowuid: '',
    uidp: '',
    ouidp: '',
    complete: false,
    nowgrpid: '2',
    nownext: '0',
    keyword: '',
    nowgrpname: '超级管理员',
    modalD: '',
    keywords: '',
  }
})
