const app = getApp();
Page({
  data: {
    nowcur: false,
    p: 1,
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
    nowtargetc: '',
    tmpc: '',
    channellist: [],
    tmpchannellist: [],
    ochannellist: [],
    modalC: '',
    modalD: '',
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 59 }, (v, i) => (i + 1) + '分')],
    oplist: [{
      type: '0',
      name: '踢出',
      select: false
    }, {
      type: '1',
      name: '踢出并拉黑(撤回所有发言)',
      select: false
    }, {
      type: '2',
      name: '限制发言(撤回其发言并通知整改)',
      select: false
    }]
  },
  onLoad: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    })
    this.fetch_list();
  },
  navigate_face: function () {
    qq.navigateTo({
      url: `../qface/qface`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
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
      complete: false,
      modalA: '',
      modalB: '',
      channellist: [],
      tmpchannellist: [],
      ochannellist: [],
      modalC: '',
      modalD: ''
    })
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    })
    this.fetch_list();
  },
  onInput(e) {
    this.setData({
      nowcur: e.detail.cursor,
      tmpc: e.detail.value
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + (time[2] + 1) * 60;
    this.setData({
      'nowtarget.op_time': sec.toString()
    })
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
      nowtargetc: target,
      modalB: 'show',
      tmpc: c,
      tmpct: c
    })
  },
  addc(event) {
    let list = { g: '|', h: '^', i: '$', j: '?', k: ' *', l: '.*', m: '\\d+', n: '([\\s\\S]*)' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
    })
  },
  hideModalB: function () {
    this.setData({
      nowtargetc: '',
      modalB: '',
      tmpc: ''
    })
  },
  hideModalC: function () {
    this.setData({
      modalC: ''
    })
  },
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  save: function () {
    let t = this.data.nowtarget;
    if (t.keyword == '') {
      qq.showToast({
        title: '缺少必要内容',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        modalA: '',
        nowtarget: ''
      })
      this.setData({
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/forbidenwordswr_nick/${app.globalData.token}/${this.data.p}`,
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
            app.postlog('修改名片(昵称)敏感词')
          } else {
            this.setData({
              loadModal: false
            })
            qq.showToast({
              title: `[${ret.errcode}]数据修改出错`,
              icon: 'none'
            })
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
    }
  },
  setoptions: function () {
    this.setData({
      oplist: this.data.oplist.map(i => {
        return { ...i, select: i.type == this.data.nowtarget.deal_type };
      }),
      modalD: 'show'
    })
  },
  changent: function () {
    let check = this.data.oplist.filter(i => { return i.select; })
    let type = '5';
    if (check.length == 1) {
      type = check[0].type;
    }
    this.setData({
      modalD: '',
      'nowtarget.deal_type': type
    })
  },
  setonchannels: function () {
    let item = this.data.nowtarget;
    this.setData({
      modalC: 'show',
      tmpchannellist: this.data.ochannellist.map(i => {
        if ((item.enabled_channels.includes('all') ||
          item.enabled_channels.includes(`<#${i.id}>`)) && i.type != 4) {
          return { ...i, select: true };
        } else {
          return { ...i, select: false };
        }
      })
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
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpchannellist: this.data.tmpchannellist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  setchannel: function () {
    let check = this.data.tmpchannellist.filter(i => { return i.select; })
    if (check.length <= 0) {
      qq.showToast({
        title: '至少选中一个',
        icon: 'none'
      })
      return;
    }
    this.setData({
      modalC: '',
      channellist: check
    });
    let cs = '';
    for (let i = 0; i < check.length; i++) {
      cs += `<#${check[i].id}>`;
    }
    if (check.length == this.data.tmpchannellist.filter(i => { return i.type != 4; }).length) cs = 'all';
    this.setData({
      'nowtarget.enabled_channels': cs
    })
  },
  selectallc: function () {
    this.setData({
      tmpchannellist: this.data.tmpchannellist.map(i => {
        if (i.type != 4) {
          return { ...i, select: true };
        } else {
          return { ...i, select: false };
        }
      })
    })
  },
  cancleallc: function () {
    this.setData({
      tmpchannellist: this.data.tmpchannellist.map(i => {
        return { ...i, select: false };
      })
    })
  },
  setcontent: function () {
    if (this.data.nowtargetc.slice(-7) == 'keyword') {
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
    }
    if (this.data.nowtargetc) {
      this.setData({
        [this.data.nowtargetc]: this.data.tmpc.trim(),
        nowtargetc: '',
        modalB: ''
      })
    }
  },
  fetch_list: function () {
    if (this.data.complete) return;
    let tpage = this.data.page;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchforbidenkeywords_nick/${app.globalData.token}/${this.data.p}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.list, ...ret.rows.map(item => ({ ...item, edit_time: app.times2time(item.edit_time), show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, edit_time: app.times2time(item.edit_time), show: true }));
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  return {
                    ...item, show: item.keyword.toLowerCase().includes(s.toLowerCase()) ||
                      item.editornick.toLowerCase().includes(s.toLowerCase()) ||
                      item.editor.toLowerCase().includes(s.toLowerCase()) ||
                      item.edit_time.toLowerCase().includes(s.toLowerCase())
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
  selectone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      list: this.data.list.map((i, s) => {
        if (i.keyword == item.keyword && i.guildid == item.guildid) {
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
    check = check.map(i => { return i.keyword });
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/delforbidenwords_nick/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('删除名片(昵称)敏感词')
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
    this.setData({
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      modalA: 'show',
      channellist: this.data.ochannellist.filter(i => {
        return item.enabled_channels.includes('all') ||
          item.enabled_channels.includes(`<#${i.id}>`)
      })
    })
  },
  addword: function () {
    this.setData({
      tmpc: '',
      nowtarget: {
        keyword: '',
        deal_type: '0',
        editor: this.data.userinfo.member_userid,
        edit_time: '',
        editornick: this.data.userinfo.member_nick,
        editorhead: this.data.userinfo.member_head
      },
      tmplist: [],
      modalA: 'show',
      channellist: this.data.ochannellist
    })
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
            ...item, show: item.keyword.toLowerCase().includes(s.toLowerCase()) ||
              item.editornick.toLowerCase().includes(s.toLowerCase()) ||
              item.editor.toLowerCase().includes(s.toLowerCase()) ||
              item.edit_time.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.editor,
      success: function () {
        qq.showToast({
          title: '已复制用户id',
          icon: 'none'
        })
      }
    })
  },
  copynick: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.editornick,
      success: function () {
        qq.showToast({
          title: '已复制用户昵称',
          icon: 'none'
        })
      }
    })
  }
})