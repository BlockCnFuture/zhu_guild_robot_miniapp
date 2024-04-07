const app = getApp();
Page({
  onLoad: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    let parr = Array.from({ length: 81 }, (_, index) => index.toString()).map(i => { return { id: i, select: false }; });
    this.setData({
      p: app.globalData.permissionlist[name],
      points_ls: parr
    })
    this.fetch_sets();
  },
  data: {
    nowcur:false,
    p: 1,
    userinfo: app.globalData.userinfo,
    points_ls: [],
    nowtarget: '',
    tmpc: '',
    modalA: '',
    modalB: '',
    modalC: '',
    channelname: '',
    channellist: [],
    vefls: [
      { id: '0', name: '数学式验证', desc: '让用户计算数学式' },
      { id: '1', name: '问答验证', desc: '让用户正确回答问题' },
      { id: '2', name: '点阵图案验证', desc: '自定义验证点阵图' }
    ],
    rolesets: {
      fromchannel: '1',
      tochannel: '',
      name: '入频验证码',
      useit: false,
      image: '(官方)?(Q|q)(Q|q)频道',
      content: '请问您是从哪里知道本频道的？\r\n请在十分钟内正确回答此问题\r\n未及时回答将被踢出'
    },
    loadModal: false
  },
  selectoneA(e) {
    let index = e.currentTarget.dataset.index;
    let s = `points_ls[${index}]`;
    this.setData({
      [s]: { ...this.data.points_ls[index], select: !this.data.points_ls[index].select }
    });
  },
  cancleallc() {
    this.setData({
      points_ls: this.data.points_ls.map(i => {
        return { ...i, select: false }
      }),
    });
  },
  onInput(e) {
    let nowcur = e.detail.cursor;
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  preview() {
    qq.navigateTo({
      url: `../newmembervefanswer/newmembervefanswer`,
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
    this.fetch_sets();
  },
  RoleLsShSwitch: function (event) {
    this.setData({
      tmprolelistshow: event.detail.value
    })
  },
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  hideModalB: function () {
    this.setData({
      nowtarget: '',
      modalB: '',
      tmpc: ''
    })
  },
  hideModalC: function () {
    this.setData({
      modalC: ''
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
  chosechannel: function () {
    this.setData({
      modalA: 'show'
    })
  },
  chosevef: function () {
    this.setData({
      modalC: 'show'
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channelname: item.name,
      'rolesets.tochannel': item.id,
      modalA: ''
    });
  },
  refPshow() {
    this.setData({
      points_ls: this.data.points_ls.map(i => {
        return { ...i, select: this.data.rolesets.content.includes(`|${i.id}|`) }
      })
    })
  },
  vefclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (item.id == '1') {
      if (this.data.rolesets.fromchannel == '1') return;
      this.setData({
        'rolesets.fromchannel': item.id,
        'rolesets.content': '请问您是从哪里知道本频道的？\r\n请在十分钟内正确回答此问题\r\n未及时回答将被踢出',
        modalC: ''
      })

    } else if (item.id == '2') {
      if (this.data.rolesets.fromchannel == '2') return;
      this.setData({
        'rolesets.fromchannel': item.id,
        'rolesets.content': '|0||8||10||13||16||20||24||31||37||38||39||41||42||43||46||49||52||55||58||61||65||66||68||69||76|',
        modalC: ''
      });
      this.refPshow();
    } else {
      this.setData({
        'rolesets.fromchannel': item.id,
        modalC: ''
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
      modalB: 'show',
      tmpc: c,
      tmpct: c
    })
  },
  setcontent: function () {
    if (this.data.tmpc.trim() == '') {
      qq.showModal({
        title: '错误',
        content: '内容不能为空',
        showCancel: false
      });
      return;
    }
    if (this.data.nowtarget.slice(-5) == 'image') {
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
  NickLimitSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
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
          let arr = ret.data.filter(item => { return item.type == 0 || item.type == 4 });
          this.setData({
            channellist: arr
          });
          for (let ss of arr) {
            if (ss.id == this.data.rolesets.tochannel) {
              this.setData({
                channelname: ss.name
              });
              break;
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
            if (ret.sets.fromchannel == '2') {
              this.refPshow();
            }
          }
          this.fetch_channellist();
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (this.data.rolesets.useit && this.data.rolesets.tochannel == '') {
      qq.showModal({
        title: '错误',
        content: '设置数据不完整',
        showCancel: false
      });
      return;
    }
    if (this.data.rolesets.fromchannel == '2') {
      s.content = this.data.points_ls.filter(i => { return i.select == true; }).map(i => {
        return `|${i.id}|`;
      }).join('');
      this.setData({
        'rolesets.content': s.content
      })
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
          app.postlog('修改新人验证设置');
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
        });
        qq.showToast({
          title: '数据保存失败',
          icon: 'none'
        })
      }
    })
  }
})
