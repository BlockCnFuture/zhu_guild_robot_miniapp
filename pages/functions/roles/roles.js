const app = getApp();
Page({
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    nowcur:false,
    p: 3,
    showcolor: '',
    shownewrole: '',
    tmpnewrolename: '',
    tmprolelistshow: true,
    tmpcolorhex: '#000000',
    tmprgba: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    userinfo: app.globalData.userinfo,
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    levellist: [
      { level: 0, name: '>= LV.0', desc: '无限制' },
      { level: 1, name: '>= LV.1', desc: '0活跃值' },
      { level: 2, name: '>= LV.2', desc: '2活跃值' },
      { level: 3, name: '>= LV.3', desc: '4活跃值' },
      { level: 4, name: '>= LV.4', desc: '9活跃值' },
      { level: 5, name: '>= LV.5', desc: '15活跃值' },
      { level: 6, name: '>= LV.6', desc: '25活跃值' },
      { level: 7, name: '>= LV.7', desc: '35活跃值' },
      { level: 8, name: '>= LV.8', desc: '45活跃值' },
      { level: 9, name: '>= LV.9', desc: '60活跃值' },
      { level: 10, name: '>= LV.10', desc: '75活跃值' },
      { level: 11, name: '>= LV.11', desc: '90活跃值' },
      { level: 12, name: '>= LV.12', desc: '110活跃值' },
      { level: 13, name: '>= LV.13', desc: '130活跃值' },
      { level: 14, name: '>= LV.14', desc: '160活跃值' },
      { level: 15, name: '>= LV.15', desc: '190活跃值' },
      { level: 16, name: '>= LV.16', desc: '230活跃值' },
      { level: 17, name: '>= LV.17', desc: '270活跃值' },
      { level: 18, name: '>= LV.18', desc: '325活跃值' },
      { level: 19, name: '>= LV.19', desc: '380活跃值' },
      { level: 20, name: '>= LV.20', desc: '450活跃值' },
      { level: 21, name: '>= LV.21', desc: '520活跃值' },
      { level: 22, name: '>= LV.22', desc: '610活跃值' },
      { level: 23, name: '>= LV.23', desc: '700活跃值' },
      { level: 24, name: '>= LV.24', desc: '810活跃值' },
      { level: 25, name: '>= LV.25', desc: '920活跃值' }
    ],
    nowtarget: '',
    nowindex_: -1,
    tmpc: '',
    tmpimg: '',
    ochannellist: [],
    channellist: [],
    rolelist: [],
    modalA: '',
    modalB: '',
    modalK: '',
    channelname: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '自助领取身份组',
      useit: false,
      image: '',
      content: []
    },
    nowrolec: {},
    heights: [],
    loadModal: false
  },
  onInput(e) {
    this.setData({
      nowcur: e.detail.cursor,
      tmpc: e.detail.value
    })
  },
  changei(e) {
    let index = e.target.dataset.index;
    let item = e.target.dataset.item;
    let name = this.data.ochannellist.filter(i => { return i.type == 0 && i.id == item.tochannel });
    if (name && name.length == 1) {
      this.setData({
        channelname: name[0].name
      });
    } else {
      this.setData({
        channelname: ''
      });
    }
    this.setData({
      nowrolec: item,
      nowindex_: index,
      modalK: 'show'
    })
  },
  creatrolerule() {
    if (this.data.rolesets.content.length >= 10) {
      qq.showModal({
        title: '无法新增',
        content: '最多可以创建10个身份组领取规则',
        showCancel: false
      })
      return;
    }
    this.setData({
      nowrolec: {
        tochannel: '',
        image: 'https://feng.7yan.top/img/role',
        desc: '',
        roles: [{
          roleid: 0,
          rolename: '',
          rolecolor: 0,
          time: 0,
          desc: '',
          levellimit: 0,
          nicklimit: {
            on: false,
            rule: '初遇小竹-.*',
            tips: '您的昵称不符合要求\r\n请修改您的昵称后再领取身份组\r\n正确示范：初遇小竹-叶'
          }
        }],
        multigain: false,
        maxcnt: 1,
        canexit: true
      },
      nowindex_: -1,
      channelname: '',
      modalK: 'show'
    })
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  loaded(e) {
    let index = e.target.dataset.index;
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.data.heights[index] = h;
    this.setData({
      heights: this.data.heights
    })
  },
  getrole(e) {
    let index = e.target.dataset.index;
    app.refQuery({ i: index.toString() });
    qq.navigateTo({
      url: `../getrole/getrole`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  deli(e) {
    let index = e.target.dataset.index;
    this.data.rolesets.content.splice(index, 1);
    this.setData({
      'rolesets': this.data.rolesets
    })
  },
  copyi(e) {
    let index = e.target.dataset.index;
    let s = encodeURIComponent(`pages/functions/getrole/getrole?guildID=${this.data.userinfo.open_guild_id}&i=${index}`);
    qq.setClipboardData({
      data: `https://m.q.qq.com/a/p/${app.getnowappid()}?s=${s}`,
      success: function () {
        qq.showToast({
          title: '已复制'
        })
      }
    })
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  creatnewrole: function () {
    this.setData({
      tmpnewrolename: '',
      tmprolelistshow: true,
      shownewrole: 'show'
    })
  },
  changecolor: function () {
    this.setData({
      showcolor: 'show'
    })
  },
  colorClose: function () {
    this.setData({
      showcolor: ''
    })
  },
  RoleLsShSwitch: function (event) {
    this.setData({
      tmprolelistshow: event.detail.value
    })
  },
  colorConfirm(event) {
    this.setData({
      showcolor: '',
      tmpcolorhex: event.detail.hex,
      tmprgba: event.detail.rgba
    })
  },
  rolecreat: function () {
    if (!this.data.tmpnewrolename) {
      qq.showToast({
        title: '身份组名字必填',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/newrole/${app.globalData.token}/${this.data.p}`,
        method: 'POST',
        data: { name: this.data.tmpnewrolename, color: this.data.tmpcolorhex, hoist: this.data.tmprolelistshow ? 1 : 0 },
        success: (data) => {
          let ret = data.data;
          if (ret.errcode == 0) {
            this.setData({
              shownewrole: '',
              rolelist: []
            });
            this.setData({
              loadModal: false
            })
            this.fetch_rolelist();
          } else {
            this.setData({
              loadModal: false
            })
            qq.showToast({
              title: `[${ret.errcode}]身份创建出错`,
              icon: 'none'
            })
          }
        },
        fail: () => {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '身份创建失败',
            icon: 'none'
          })
        }
      })
    }
  },
  sendmd: function (event) {
    let index = event.currentTarget.dataset.index;
    let channel = this.data.rolesets.content[index].tochannel;
    if (!channel) {
      qq.showModal({
        title: '错误',
        content: '请确认是否已正确设置领取子频道',
        showCancel: false
      })
      return;
    } else {
      this.setData({
        loadModal: true
      })
      qq.request({
        url: `${app.globalData.host}/sendmd/${app.globalData.token}/${index}/${channel}`,
        method: 'GET',
        success: (data) => {
          let ret = data.data;
          if (ret.errcode == 0) {
            this.setData({
              loadModal: false
            })
            qq.showToast({
              title: `发送成功`,
              icon: 'none'
            })
            app.postlog('发送自助领取身份组markdown入口');
          } else {
            this.setData({
              loadModal: false
            })
            qq.showModal({
              title: '发送失败',
              content: '请确认设置的领取子频道是否有效，请确认小竹在对应子频道是否有消息推送权限（需要给予小竹在对应子频道的主动消息推送权限）',
              showCancel: false
            })
          }
        },
        fail: () => {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: '请求出错',
            icon: 'none'
          })
        }
      })
    }
  },
  setresttime(event) {
    let index = event.currentTarget.dataset.index;
    let tmp = this.data.nowrolec.roles[index].time;
    this.setData({
      oldtime: tmp
    })
  },
  canceltime(event) {
    let index = event.currentTarget.dataset.index;
    this.data.nowrolec.roles[index].time = this.data.oldtime;
    this.setData({
      oldtime: '',
      'nowrolec.roles': this.data.nowrolec.roles
    })
  },
  bindMultiPickerChange: function (event) {
    let index = event.currentTarget.dataset.index;
    let time = event.detail.value;
    this.data.nowrolec.roles[index].time = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    this.setData({
      oldtime: '',
      'nowrolec.roles': this.data.nowrolec.roles
    })
  },
  hideModalA: function () {
    this.setData({
      channellist: this.data.ochannellist,
      modalA: ''
    })
  },
  hideModalK: function () {
    this.setData({
      modalK: ''
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
  hideModalnewrole: function () {
    this.setData({
      shownewrole: ''
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
  changeimage: function () {
    this.setData({
      modalE: 'show',
      tmpimg_width: 0,
      tmpimg_height: 0,
      tmpimg_digest: '',
      tmpimg: this.data.nowrolec.image
    })
  },
  froles: function (event) {
    let roles = this.data.nowrolec.roles;
    let index = event.currentTarget.dataset.index;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        for (let s of roles) {
          if (s.roleid == i.id) {
            return { ...i, disable: true, select: (i.id == this.data.nowrolec.roles[index].roleid) }
          }
        }
        return { ...i, disable: false, select: (i.id == this.data.nowrolec.roles[index].roleid) }
      }),
      nowindex: index,
      modalD: 'show'
    })
  },
  chosechannel: function () {
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.id == this.data.nowrolec.tochannel) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      nowtarget: '',
      modalA: 'show'
    })
  },
  setchannel: function () {
    this.setData({
      ochannellist: this.data.channellist
    });
    let check = this.data.channellist.filter(item => { return item.select == true });
    if (check && check.length == 1) {
      this.setData({
        channelname: check[0].name,
        'nowrolec.tochannel': check[0].id
      })
    }
    this.setData({
      modalA: ''
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
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
    let roles = this.data.nowrolec.roles;
    let s = this.data.rolelist.filter(item => { return item.select });
    if (s && s.length == 1) {
      roles[this.data.nowindex].roleid = s[0].id;
      roles[this.data.nowindex].rolename = s[0].name;
      roles[this.data.nowindex].rolecolor = s[0].color;
      this.setData({
        'nowrolec.roles': roles
      })
    }
    this.setData({
      modalD: ''
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
    if (target.includes('nicklimit.rule') && !c) c = '初遇小竹-.*';
    if (target.includes('nicklimit.tips') && !c) c = '您的昵称不符合要求\r\n请修改您的昵称后再领取身份组\r\n正确示范：初遇小竹-叶';
    this.setData({
      nowtarget: target,
      modalB: 'show',
      tmpc: c || '',
      tmpct: c || '',
      isrule: target.includes('nicklimit.rule')
    })
  },
  setcontent: function () {
    if (this.data.nowtarget.slice(-14) == 'nicklimit.rule') {
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
  setlevelli: function (event) {
    let item = event.currentTarget.dataset.item;
    let target = event.currentTarget.dataset.target;
    this.setData({
      levellist: this.data.levellist.map(i => {
        if (i.level == item.levellimit) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      modalC: 'show',
      nowtarget: target
    })
  },
  inputcnt: function (e) {
    let type = e.target.dataset.type;
    let cnt = this.data.nowrolec.maxcnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 100) cnt = 99;
    } else {
      cnt--;
      if (cnt <= 0) cnt = 1;
    }
    this.setData({
      'nowrolec.maxcnt': cnt
    })
  },
  inputcnts: function (e) {
    let cnt = parseInt(e.detail.value);
    if (cnt <= 0) cnt = 1;
    this.setData({
      'nowrolec.maxcnt': cnt
    })
  },
  finishinputcnt: function (e) {
    let cnt = this.data.nowrolec.maxcnt;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      'nowrolec.maxcnt': cnt
    })
  },
  RolesSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
    });
  },
  MultiSwitch: function (event) {
    this.setData({
      'nowrolec.multigain': event.detail.value
    });
  },
  QuitSwitch: function (event) {
    this.setData({
      'nowrolec.canexit': event.detail.value
    });
  },
  NickLimitSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
    });
  },
  setlevel: function () {
    let l = this.data.levellist.filter(item => { return item.select == true; });
    if (l && l.length == 1) {
      this.setData({
        [this.data.nowtarget]: l[0].level
      });
    }
    this.setData({
      modalC: '',
      nowtarget: ''
    });
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    this.data.nowrolec.roles.splice(index, 1);
    this.setData({
      'nowrolec.roles': this.data.nowrolec.roles
    });
  },
  addrole: function () {
    this.data.nowrolec.roles.splice(this.data.nowrolec.roles.length, 1, {
      roleid: 0,
      rolename: '',
      time: 0,
      desc: '',
      levellimit: 0,
      nicklimit: {
        on: false,
        rule: this.data.nowrolec.roles.length == 0 ? '初遇小竹-.*' : '',
        tips: this.data.nowrolec.roles.length == 0 ? '您的昵称不符合要求\r\n请修改您的昵称后再领取身份组\r\n正确示范：初遇小竹-叶' : ''
      }
    })
    this.setData({
      'nowrolec.roles': this.data.nowrolec.roles
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
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 })
          });
          this.setData({
            ochannellist: this.data.channellist,
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
  fetch_rolelist: function () {
    if (this.data.rolelist.length > 0) {
      return;
    }
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
          this.setData({
            rolelist: ret.data.filter(item => { return item.id.length > 4; })
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
      url: `${app.globalData.host}/geteventssets/${app.globalData.token}/${this.data.p}/${this.data.rolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              rolesets: ret.sets,
              heights: Array.from({ length: ret.sets.content.length })
            });
          }
          this.setData({
            loadModal: false
          })
          this.fetch_channellist();
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
  choseoneimg: function () {
    let o = this;
    qq.chooseImage({
      count: 1,
      success: function (res) {
        let imgpath = res.tempFilePaths[0];
        qq.getFileInfo({
          filePath: imgpath,
          success: function (res) {
            let sizeInMB = res.size / (1024 * 1024);
            if (sizeInMB > 2) {
              qq.showToast({
                title: '图片文件不能大于2MB',
                icon: 'none'
              });
            } else if (sizeInMB <= 0) {
              qq.showToast({
                title: '错误的文件',
                icon: 'none'
              });
            } else {
              if (o.isImageFile(imgpath)) {
                o.setData({
                  tmpimg_digest: res.digest
                })
                qq.getImageInfo({
                  src: imgpath,
                  success: function (res) {
                    o.setData({
                      tmpimg_width: res.width,
                      tmpimg_height: res.height,
                    })
                    o.setData({
                      tmpimg: imgpath
                    });
                  },
                  fail: function (res) {
                    qq.showToast({
                      title: '获取文件信息失败',
                      icon: 'none'
                    });
                  }
                });
              } else {
                qq.showToast({
                  title: '错误的文件',
                  icon: 'none'
                });
              }
            }
          },
          fail: function (res) {
            qq.showToast({
              title: '获取文件信息失败',
              icon: 'none'
            });
          }
        });
      }
    })
  },
  isImageFile: function (filePath) {
    let fs = qq.getFileSystemManager();
    let buffer = fs.readFileSync(filePath, 'binary', 0, 8);
    if (buffer.length < 8) {
      return false;
    }
    buffer = buffer.slice(0, 8);
    let pngHeader = '89504E470D0A1A0A';
    let jpgHeader = 'FFD8';
    let gifHeader = '47494638';
    let webpHeader = '52494646';
    let webpExtendedHeader = '57454250';
    let webpAnimatedHeader = '57415645';
    let header = '';
    for (let i = 0; i < buffer.length; i++) {
      header += buffer.charCodeAt(i).toString(16).toUpperCase().padStart(2, '0');
    }
    return header.startsWith(pngHeader) || header.startsWith(jpgHeader) ||
      header.startsWith(gifHeader) || header.startsWith(webpHeader) ||
      header.startsWith(webpExtendedHeader) || header.startsWith(webpAnimatedHeader);
  },
  uploadImage: function () {
    if (this.data.tmpimg_digest == '') {
      this.setData({
        modalE: ''
      })
      qq.showToast({
        title: '无变动',
        icon: 'none'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    let o = this;
    qq.uploadFile({
      url: `${app.globalData.host}/uploadimage/${app.globalData.token}/${this.data.p}/${o.data.tmpimg_digest}/${o.data.tmpimg_height}/${o.data.tmpimg_width}`,
      filePath: this.data.tmpimg,
      name: 'image',
      success: function (res) {
        o.setData({
          loadModal: false,
          modalE: ''
        })
        let obj;
        try {
          obj = JSON.parse(res.data);
        } catch (e) {
          qq.showToast({
            title: '错误，上传失败',
            icon: 'none'
          })
          return;
        }
        if (res.data == "" || !obj || obj.errcode != 0) {
          qq.showToast({
            title: '错误，上传失败',
            icon: 'none'
          })
          return;
        } else {
          qq.showToast({
            title: '上传成功',
            icon: 'none'
          })
          o.setData({
            tmpimg_width: 0,
            tmpimg_height: 0,
            tmpimg_digest: '',
            tmpimg: '',
            'nowrolec.image': obj.url
          })
        }
      },
      fail: function (res) {
        o.setData({
          loadModal: false,
        })
        qq.showToast({
          title: '上传失败',
          icon: 'none'
        })
      }
    })
  },
  newrule: function () {
    let s = JSON.parse(JSON.stringify(this.data.nowrolec));
    s.roles = s.roles.filter(item => { return item.roleid > 0 });
    if (s.roles.length <= 0 || s.tochannel == '' || s.roles.filter(i => { return i.nicklimit.on == true && (!i.nicklimit.rule || !i.nicklimit.tips) }).length > 0) {
      qq.showToast({
        title: '设置数据不完整',
        icon: 'none'
      })
      return;
    }
    let index = this.data.nowindex_;
    if (index == -1) {
      this.data.rolesets.content = [...this.data.rolesets.content, s];
    } else {
      this.data.rolesets.content[index] = s;
    }
    this.setData({
      rolesets: this.data.rolesets,
      nowindex_: -1,
      modalK: ''
    })
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
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
          app.postlog('修改自助领取身份组设置');
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
