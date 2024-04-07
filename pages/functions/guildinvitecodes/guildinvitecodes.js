const app = getApp();
Page({
  data: {
    p: 36,
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    complete: false,
    modalA: '',
    modalB: '',
    tmplist: [],
    nowtarget: '',
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    daterange_: [Array.from({ length: 2 }, (v, i) => i + '月'), Array.from({ length: 30 }, (v, i) => i + '天')],
    rolelist: [],
    orolelist: []
  },
  onLoad: function () {
    this.fetch_list();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  LoadTast: function () {
    this.setData({
      page: 0,
      loadModal: false,
      list: [],
      complete: false
    })
    this.fetch_list();
  },
  showus: function (event) {
    let si = event.target.dataset.item;
    let item = { own: '0', code: si.code };
    qq.navigateTo({
      url: `../invited_users/invited_users?info=${encodeURIComponent(JSON.stringify(item))}`, fail: err => {
        qq.showToast({
          title: '查看失败',
          icon: 'none'
        })
      }
    })
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    this.setData({
      'nowtarget.gbantime': time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60
    })
  },
  bindMultiPickerChange__: function (event) {
    let time = event.detail.value;
    this.setData({
      'nowtarget.rest_time': time[0] * 60 * 60 * 24 * 30 + time[1] * 60 * 60 * 24
    })
  },
  save: function () {
    let t = this.data.nowtarget;
    if (t.rest_time <= 0) {
      qq.showModal({
        title: '错误',
        content: '相对有效期不可为0',
        showCancel: false
      })
      return;
    }
    t.groles = t.groles.filter(i => { return i.roleid > 0; });
    t.groles = JSON.stringify(t.groles);
    t.gpoints = JSON.stringify(t.gpoints);
    this.setData({
      modalA: '',
      nowtarget: ''
    })
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/invitecodeswr/${app.globalData.token}/${this.data.p}/0`,
      method: 'POST',
      data: t,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            modalA: '',
            nowtarget: '',
            page: 0,
            complete: false,
            list: []
          })
          this.fetch_list();
          if (t.code == '') app.postlog('增加邀请码')
          if (t.code != '') app.postlog('修改邀请码')
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 407) {
            qq.showModal({
              title: '无权限',
              content: '频道主没有给予您邀请码个性化设置权限，请您取消禁言设置与身份组设置',
              showCancel: false
            })
          } else {
            qq.showToast({
              title: `[${ret.errcode}]数据修改出错`,
              icon: 'none'
            })
          }
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据修改失败',
          icon: 'none'
        })
      }
    })
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchinvitecodes/${app.globalData.token}/${this.data.p}/${tpage}/0`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_rolelist();
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.list, ...ret.rows.map(item => ({ ...item, rest_time: ((item.exp_time - Date.now()) / 1000).toFixed(0), exp_time: app.times2time(item.exp_time), show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, rest_time: ((item.exp_time - Date.now()) / 1000).toFixed(0), exp_time: app.times2time(item.exp_time), show: true }));
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  return {
                    ...item, show: item.code.toString().includes(s.toLowerCase()) ||
                      item.authorname.toLowerCase().includes(s.toLowerCase()) ||
                      item.authorid.toLowerCase().includes(s.toLowerCase())
                  };
                }),
                page: tpage + 1
              });
            } else {
              this.setData({
                list: ret.rows,
                page: tpage + 1
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
  copylink(e) {
    let item = e.target.dataset.item;
    let s = encodeURIComponent(`pages/functions/beinvited/beinvited?guildID=${item.guildid}&i=${item.code}`);
    qq.setClipboardData({
      data: `https://m.q.qq.com/a/p/${app.getnowappid()}?s=${s}`,
      success: function () {
        qq.showToast({
          title: '已复制'
        })
      }
    })
  },
  selectone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      list: this.data.list.map((i, s) => {
        if (i.code == item.code) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  cancleall: function () {
    this.setData({
      list: this.data.list.map((i, s) => {
        return { ...i, select: false };
      })
    })
  },
  stopit: function () {
    return;
  },
  hideModalA: function () {
    this.setData({
      modalA: '',
      nowtarget: ''
    })
  },
  opsome: function () {
    let check = this.data.list.filter(i => { return i.select });
    if (check.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    check = check.map(i => { return i.code });
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/delinvitecodes/${app.globalData.token}/${this.data.p}/0`,
      method: 'POST',
      data: { words: check },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            nowtarget: '',
            list: [],
            page: 0,
            complete: false
          })
          this.fetch_list();
          app.postlog(`删除邀请码 ${JSON.stringify(check)}`)
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]数据删除出错`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '数据删除失败',
          icon: 'none'
        })
      }
    })
  },
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    item.groles = JSON.parse(item.groles);
    item.gpoints = JSON.parse(item.gpoints);
    this.setData({
      nowtarget: item,
      modalA: 'show'
    })
  },
  addword: function () {
    if (this.data.list.length >= 10) {
      qq.showModal({
        title: '达到上限',
        content: '您最多可以创建10个邀请码',
        showCancel: false
      })
      return;
    }
    let head = this.data.userinfo.guild_head;
    let check = head.match(/cn\/(\d+)\//);
    if (check && check[1] && check[1].length > 4) {
      this.setData({
        nowtarget: {
          code: '',
          guildrid: check[1],
          guildname: this.data.userinfo.guild_name,
          guildhead: this.data.userinfo.guild_head,
          groles: [],
          gpoints: [],
          gbantime: 0,
          rest_time: 60 * 60 * 24 * 7
        },
        tmplist: [],
        modalA: 'show'
      })
    } else {
      qq.showModal({
        title: '暂不支持',
        content: '您所在的频道暂不支持创建邀请码，请加入[红叶竹林]频道进行反馈',
        showCancel: false
      })
    }
  },
  selectall: function () {
    this.setData({
      list: this.data.list.map((i, s) => {
        return { ...i, select: true };
      }),
      modal: ''
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let list = this.data.list;
    if (s == '') {
      this.setData({
        list: list.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        list: list.map(item => {
          return {
            ...item, show: item.code.toString().includes(s.toLowerCase()) ||
              item.authorname.toLowerCase().includes(s.toLowerCase()) ||
              item.authorid.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  fetch_rolelist: function () {
    if (this.data.rolelist.length > 0) {
      return;
    }
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
  bindMultiPickerChange_: function (event) {
    let index = event.currentTarget.dataset.index;
    let time = event.detail.value;
    this.data.nowtarget.groles[index].time = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    this.setData({
      'nowtarget.groles': this.data.nowtarget.groles
    })
  },
  addrole: function () {
    this.data.nowtarget.groles.splice(this.data.nowtarget.groles.length, 1, {
      roleid: 0,
      rolename: '',
      time: 0,
    })
    this.setData({
      'nowtarget.groles': this.data.nowtarget.groles
    });
  },
  froles: function (event) {
    let roles = this.data.nowtarget.groles;
    let index = event.currentTarget.dataset.index;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        for (let s of roles) {
          if (s.roleid == i.id) {
            return { ...i, disable: true, select: (i.id == this.data.nowtarget.groles[index].roleid) }
          }
        }
        return { ...i, disable: false, select: (i.id == this.data.nowtarget.groles[index].roleid) }
      }),
      nowindex: index,
      modalB: 'show'
    })
  },
  fclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (item.disable) return;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      })
    })
  },
  setonerole: function () {
    let roles = this.data.nowtarget.groles;
    let s = this.data.rolelist.filter(item => { return item.select });
    if (s && s.length == 1) {
      roles[this.data.nowindex].roleid = s[0].id;
      roles[this.data.nowindex].rolename = s[0].name;
      roles[this.data.nowindex].rolecolor = s[0].color;
      this.setData({
        'nowtarget.groles': roles
      })
    }
    this.setData({
      modalB: ''
    })
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.nowtarget.groles.splice(index, 1);
    this.setData({
      'nowtarget.groles': this.data.nowtarget.groles
    });
  },
  navigate: function (event) {
    let target = event.currentTarget.dataset.url;
    qq.navigateTo({
      url: `../../functions/${target}/${target}`,
      fail: () => {
        qq.showToast({
          title: '暂未开放',
          icon: 'none'
        })
      }
    });
  }
})