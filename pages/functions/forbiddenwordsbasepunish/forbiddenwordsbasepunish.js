const app = getApp();
Page({
  data: {
    rolesets: '',
    erolesets: {
      fromchannel: '',
      tochannel: '',
      name: '敏感词库处罚策略',
      useit: true,
      image: '',
      content: []
    },
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
    showroles: [],
    modalC: '',
    modalD: '',
    modalE: '',
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 59 }, (v, i) => (i) + '分')],
    oplist: [{
      type: '0',
      name: '触发后禁言',
      select: false
    }, {
      type: '1',
      name: '触发后警告',
      select: false
    }, {
      type: '2',
      name: '触发后警告并禁言',
      select: false
    }, {
      type: '3',
      name: '触发后踢出',
      select: false
    }, {
      type: '4',
      name: '触发后踢出并拉黑',
      select: false
    }, {
      type: '5',
      name: '无额外操作(只撤回)',
      select: false
    }, {
      type: '6',
      name: '人工处理(不撤回)',
      select: false
    }, {
      type: '7',
      name: '人工处理并撤回',
      select: false
    }, {
      type: '8',
      name: '人工处理并禁言',
      select: false
    }, {
      type: '9',
      name: '人工处理并撤回、禁言',
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
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    })
    this.fetch_esets();
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
  LoadTast: function () {
    this.setData({
      page: 0,
      loadModal: false,
      olist: [],
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
    let nowcur = e.detail.cursor;
    if (e.detail.value.slice(nowcur - 1).startsWith('#') && this.data.nowtargetc == 'nowtarget.notifytext') {
      this.setData({
        modalC: 'show',
        tmpchannellist: this.data.ochannellist
      })
    }
    this.setData({
      nowcur: nowcur,
      tmpc: e.detail.value
    })
  },
  addc(event) {
    let list = { a: '<文件>', b: '<分享>', c: '<QQ小世界>', d: '<QQ小程序>', e: '<第三方卡片>', f: '<QQ红包>', g: '|', h: '^', i: '$', j: '?', k: ' *', l: '.*', m: '\\d+', n: '([\\s\\S]*)', w: '<不支持的消息>', sa: '{回复}', sb: '{艾特}', sc: '{处罚时长}', sd: '{证据链}', se: '{用户id}', sf: '{用户昵称}', ma: '\r\n- - -\r\n', mb: '\r\n>', mc: '\r\n# ', md: '\r\n- ', me: '\r\n1. ' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
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
          ret.data = ret.data.filter(i => { return i.id != '4' && i.id != '2' && i.id != '5' && i.id != '7' });
          this.setData({
            rolelist: [...ret.data, ...Array.from({ length: 25 }, (i, v) => { return { id: (v + 10 + 1).toString(), name: `等级身份组 LV.${v + 1}`, hexcolor: 'n' } })]
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
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    if (sec <= 0) sec = 60;
    this.setData({
      'nowtarget.op_time': sec.toString(),
      'nowtarget.op_times': app.longtime2s(sec)
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
  hideModalE: function () {
    this.setData({
      modalE: ''
    })
  },
  applynewrule: function () {
    let t = this.data.nowtarget;
    if (t.id == '' || t.enabled_channels.trim() == '') {
      qq.showToast({
        title: '缺少必要内容',
        icon: 'none'
      })
      return;
    } else {
      let nowarr = this.data.erolesets.content;
      let index = -1;
      let i = -1;
      for (let s of nowarr) {
        i++;
        if (s.id == t.id) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        this.data.erolesets.content[index] = t;
      } else {
        this.data.erolesets.content = [...nowarr, t];
      }
      this.setData({
        modalA: '',
        nowtarget: '',
        'erolesets.content': this.data.erolesets.content
      })
    }
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.erolesets));
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
          app.postlog('修改敏感词库处罚策略');
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
  setsaferoles: function () {
    let item = this.data.nowtarget;
    this.setData({
      modalE: 'show',
      rolelist: this.data.rolelist.map(i => {
        if (item.saferoles && item.saferoles.includes(`|${i.id}|`)) {
          return { ...i, select: true };
        } else {
          return { ...i, select: false };
        }
      })
    })
  },
  fetch_esets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/geteventssets_back/${app.globalData.token}/${this.data.p}/值班室设置`,
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
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
      }
    })
  },
  checkpermission: function (id) {
    if (this.data.userinfo.member_role == 2) return true;
    let ret = app.hasPermission(this.data.userinfo.permissions, id);
    return ret;
  },
  oclick: function (event) {
    let sthis = this;
    let item = event.currentTarget.dataset.item;
    if (item.type == '6') {
      if (!this.data.rolesets || !this.data.rolesets.useit) {
        qq.showModal({
          title: '未开启值班室',
          content: '您还未启用值班室，无法选择此敏感词效果，是否前往启用值班室？',
          success(res) {
            if (res.confirm) {
              if (!sthis.checkpermission(41)) {
                qq.showToast({
                  title: '频道主未授予您页面权限',
                  icon: 'none'
                })
                return;
              }
              qq.navigateTo({
                url: `../office/office`,
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
    }
    this.setData({
      oplist: this.data.oplist.map(i => {
        return { ...i, select: i.type == item.type };
      })
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    if (this.data.nowtargetc == 'nowtarget.notifytext') {
      this.setData({
        tmpc: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        tmpct: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        modalC: ''
      })
    } else {
      this.setData({
        tmpchannellist: this.data.tmpchannellist.map(i => {
          if (i.id == item.id) {
            return { ...i, select: !i.select };
          } else {
            return i;
          }
        })
      });
    }
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
  setrole: function () {
    let check = this.data.rolelist.filter(i => { return i.select; })
    this.setData({
      showroles: check,
      modalE: ''
    });
    let cs = '';
    for (let i = 0; i < check.length; i++) {
      cs += `|${check[i].id}|`;
    }
    this.setData({
      'nowtarget.saferoles': cs
    })
  },
  selectallr: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: true };
      })
    })
  },
  cancleallr: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
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
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/geteventssets_back/${app.globalData.token}/${this.data.p}/${this.data.erolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              erolesets: ret.sets
            });
          }
          this.fetch_channellist();
          this.fetch_rolelist();
          this.fetch_esets();
          this.setData({
            loadModal: false
          })
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
          if (ret.errcode == 403) {
            qq.showModal({
              title: '错误',
              content: '抱歉，您没有权限，请联系频道主给您分配权限',
              showCancel: false
            });
            return;
          }
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
  stopit: function () {
    return;
  },
  hideModalA: function () {
    this.setData({
      modalA: '',
      nowtarget: ''
    })
  },
  navigateto() {
    qq.navigateTo({
      url: `../forbiddenwordsbase/forbiddenwordsbase`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  delone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      modalA: '',
      nowtarget: '',
      'erolesets.content': this.data.erolesets.content.filter(i => { return i.id != item.id })
    })
  },
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    item.op_times = app.longtime2s(item.op_time);
    if (!item.notifytext) item.notifytext = '';
    if (!item.saferoles) item.saferoles = '';
    this.setData({
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      channellist: this.data.ochannellist.filter(i => {
        return item.enabled_channels.includes('all') ||
          item.enabled_channels.includes(`<#${i.id}>`)
      }),
      showroles: this.data.rolelist.filter(i => {
        return item.saferoles.includes(`|${i.id}|`)
      }),
      modalA: 'show'
    })
  },
  addword: function () {
    if (this.data.erolesets.content.length >= 20) {
      qq.showModal({
        title: '数量超限',
        content: '最多可创建20个词库处罚策略',
        showCancel: false
      })
      return;
    }
    this.setData({
      tmpc: '',
      nowtarget: {
        id: '',
        enabled_channels: 'all',
        deal_type: '5',
        op_time: '300',
        op_times: app.longtime2s(300),
        editor: this.data.userinfo.member_userid,
        edit_time: app.times2time(new Date().getTime()),
        editornick: this.data.userinfo.member_nick,
        editorhead: this.data.userinfo.member_head,
        notifytext: '',
        saferoles: ''
      },
      tmplist: [],
      modalA: 'show',
      channellist: this.data.ochannellist
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
  fclick_: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
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
            channellist: ret.data.filter(item => { return item.type != 1 || item.type != 3 })
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
  }
})