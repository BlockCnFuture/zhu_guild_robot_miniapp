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
    nowcur: false,
    p: 1,
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
    nowtarget: '',
    tmpc: '',
    tmpimg: '',
    orolelist: [],
    rolelist: [],
    modalA: '',
    modalB: '',
    channelname: '',
    pointlist: [],
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '成员评论奖励设置',
      useit: false,
      image: '',
      content: {
        rolesa: [{
          cnt: 7,
          roleid: 0,
          rolename: '',
          time: 0
        }],
        pointsa: [{
          cnt: 7,
          point_id: 0,
          point_name: '',
          pointcnt: 1
        }],
        rolesb: [{
          cnt: 7,
          roleid: 0,
          rolename: '',
          time: 0
        }],
        pointsb: [{
          cnt: 7,
          point_id: 0,
          point_name: '',
          pointcnt: 1
        }],
        needlength: 10,
        countimage: true,
        countatrobot: false,
        setrolesa: false,
        setpointsa: false,
        setrolesb: false,
        setpointsb: false,
        ra: '',
        pa: '',
        rb: '',
        pb: ''
      }
    },
    loadModal: false
  },
  onInput(e) {
    this.setData({
      nowcur: e.detail.cursor,
      tmpc: e.detail.value
    })
  },
  inputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let type = e.target.dataset.type;
    let cnt = e.currentTarget.dataset.cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 9999999999) cnt = 9999999999;
    } else {
      cnt--;
      if (cnt <= 0) cnt = 1;
    }
    this.setData({
      [target]: cnt
    })
  },
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    let check = e.currentTarget.dataset.cnt;
    if (check == 'x') {
      this.setData({
        [target]: e.detail.value
      })
    } else {
      let cnt = parseInt(e.detail.value);
      if (cnt <= 0) cnt = 1;
      this.setData({
        [target]: cnt
      })
    }
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      [target]: cnt
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
  setresttime(event) {
    let index = event.currentTarget.dataset.index;
    let target = event.currentTarget.dataset.target;
    let tmp = this.data.rolesets.content[target][index].time;
    this.setData({
      oldtime: tmp
    })
  },
  canceltime(event) {
    let index = event.currentTarget.dataset.index;
    let target = event.currentTarget.dataset.target;
    this.data.rolesets.content[target][index].time = this.data.oldtime;
    this.data.rolesets.content[target][index].times = app.longtime2s(this.data.oldtime);
    this.setData({
      oldtime: '',
      [`rolesets.content.${target}`]: this.data.rolesets.content[target]
    })
  },
  bindMultiPickerChange: function (event) {
    let index = event.currentTarget.dataset.index;
    let target = event.currentTarget.dataset.target;
    let time = event.detail.value;
    this.data.rolesets.content[target][index].time = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    this.data.rolesets.content[target][index].times = app.longtime2s(this.data.rolesets.content[target][index].time);
    this.setData({
      oldtime: '',
      [`rolesets.content.${target}`]: this.data.rolesets.content[target]
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
  froles: function (event) {
    let target = event.currentTarget.dataset.target;
    let index = event.currentTarget.dataset.index;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: (i.id == this.data.rolesets.content[target][index].roleid) }
      }),
      nowindex: index,
      tmptarget: target,
      modalD: 'show'
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
    let roles = this.data.rolesets.content[this.data.tmptarget];
    let s = this.data.rolelist.filter(item => { return item.select });
    if (s && s.length == 1) {
      roles[this.data.nowindex].roleid = s[0].id;
      roles[this.data.nowindex].rolename = s[0].name;
      roles[this.data.nowindex].rolecolor = s[0].color;
      this.setData({
        [`rolesets.content.${this.data.tmptarget}`]: roles
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
    this.setData({
      nowtarget: target,
      modalB: 'show',
      tmpc: c,
      tmpct: c
    })
  },
  setcontent: function () {
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
  kclick: function (event) {
    let points = this.data.rolesets.content[this.data.tmptarget];
    let item = event.currentTarget.dataset.item;
    points[this.data.nowindex].point_id = item.point_id
    points[this.data.nowindex].point_name = item.point_name;
    this.setData({
      [`rolesets.content.${this.data.tmptarget}`]: points,
      modalA: ''
    })
  },
  changepoint(event) {
    let target = event.currentTarget.dataset.target;
    let index = event.currentTarget.dataset.index;
    if (this.data.pointlist.length > 0) {
      this.setData({
        tmptarget: target,
        nowindex: index,
        modalA: 'show'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/self`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            pointlist: ret.rows,
            loadModal: false
          });
          if (ret.rows.length <= 0) {
            qq.showModal({
              title: "无任何积分",
              content: "本频道无任何自定义积分，请联系管理员创建",
              showCancel: false
            });
          } else {
            this.setData({
              tmptarget: target,
              nowindex: index,
              modalA: 'show'
            })
          }
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
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
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
    });
  },
  delrole: function (event) {
    let target = event.currentTarget.dataset.target;
    let index = event.currentTarget.dataset.index;
    this.data.rolesets.content[target].splice(index, 1);
    this.setData({
      [`rolesets.content.${target}`]: this.data.rolesets.content[target]
    });
  },
  addrole: function (e) {
    let target = e.currentTarget.dataset.target;
    let max = 60;
    if (target.includes('rolesa')) max = 3;
    if (this.data.rolesets.content[target].length >= max) {
      qq.showModal({
        title: '达到上限',
        content: `最多可以设置${max}个规则`,
        showCancel: false
      });
      return;
    }
    this.data.rolesets.content[target].splice(this.data.rolesets.content[target].length, 1, target.includes('roles') ? {
      cnt: 7,
      roleid: 0,
      rolename: '',
      time: 0
    } : {
        cnt: 7,
        point_id: 0,
        point_name: '',
        pointcnt: 1
      })
    this.setData({
      [`rolesets.content.${target}`]: this.data.rolesets.content[target]
    });
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
            if (ret.sets.content.roles) {
              ret.sets.content.roles = ret.sets.content.roles.map(i => {
                return { ...i, times: app.longtime2s(i.time) };
              });
            }
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
  saveall: function () {
    if (!this.data.rolesets.content.points) this.data.rolesets.content.points = [];
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    s.content.rolesa = s.content.rolesa.filter(item => { return item.roleid > 0 });
    s.content.pointsa = s.content.pointsa.filter(item => { return item.point_id > 0 && item.pointcnt > 0 });
    s.content.rolesb = s.content.rolesb.filter(item => { return item.roleid > 0 });
    s.content.pointsb = s.content.pointsb.filter(item => { return item.point_id > 0 && item.pointcnt > 0 });
    if ((s.content.rolesa.length <= 0 && s.content.setrolesa == true) ||
      (s.content.pointsa.length <= 0 && s.content.setpointsa == true) ||
      (s.content.rolesb.length <= 0 && s.content.setrolesb == true) ||
      (s.content.pointsb.length <= 0 && s.content.setpointsb == true)) {
      qq.showToast({
        title: '设置数据不完整',
        icon: 'none'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    s.useit = true;
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
          app.postlog(`修改${this.data.rolesets.name}`);
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
