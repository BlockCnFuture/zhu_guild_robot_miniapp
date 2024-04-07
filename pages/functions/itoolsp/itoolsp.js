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
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  fixchannel: function (e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    this.setData({
      nowindex: index,
      channellist: this.data.channellist.map(i => {
        if (i.id == item.fixchannel) {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      modalA: 'show'
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
  stopit() {
    return;
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
            ret.sets.content = ret.sets.content.map(i => { return { ...i, show: true } });
            this.data.rolesets.content = this.data.rolesets.content.map(i => {
              let check = ret.sets.content.filter(ii => { return ii.c == i.c });
              if (check && check.length > 0) {
                return { ...i, ...check[0] };
              } else {
                return i;
              }
            })
            this.setData({
              rolesets: this.data.rolesets
            });
          }
          this.setData({
            loadModal: false
          })
          this.fetch_channellist();
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
  setchannel: function () {
    let nowindex = this.data.nowindex;
    let ls = this.data.channellist.filter(i => { return i.select });
    let fixchannel = '';
    if (ls && ls.length == 1) {
      fixchannel = ls[0].id;
    }
    this.setData({
      [`rolesets.content[${nowindex}].fixchannel`]: fixchannel,
      modalA: ''
    })
  },
  kclick: function (e) {
    let item = e.currentTarget.dataset.item;
    let nowindex = this.data.nowindex;
    this.setData({
      [`rolesets.content[${nowindex}].points.point_id`]: item.point_id,
      modalD: ''
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
        clist: list.map(item => { return { ...item, show: item.c.toLowerCase().includes(s.toLowerCase()) } })
      });
    }
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    s.content = s.content.map(({ d, show, p, ...rest }) => rest);
    let check = s.content.filter(i => { return i.on && i.points.on && (!i.points.point_id || i.points.point_cnt <= 0) });
    if (check.length > 0) {
      qq.showModal({
        title: "错误",
        content: '设置数据缺失积分类型或积分数量',
        showCancel: false
      });
      return;
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
          app.postlog('修改非危险指令权限');
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
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
    });
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
  inputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let type = e.target.dataset.type;
    let cnt = e.currentTarget.dataset.cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 99999999) cnt = 99999999;
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
    let cnt = parseInt(e.detail.value);
    if (cnt <= 0) cnt = 1;
    this.setData({
      [target]: cnt
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
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      [target]: cnt
    })
  },
  selectpoint(e) {
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    if (this.data.pointlist.length > 0) {
      this.setData({
        pointlist: this.data.pointlist.map(i => {
          if (i.point_id == item.points.point_id) {
            return { ...i, select: true }
          } else {
            return { ...i, select: false }
          }
        }),
        nowindex: index,
        modalD: 'show'
      });
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
          if (ret.rows.length <= 0) {
            this.setData({
              loadModal: false,
              modalD: ''
            });
            qq.showModal({
              title: "错误",
              content: "本频道无任何自定义积分，请先创建积分",
              showCancel: false
            });
            return;
          } else {
            this.setData({
              loadModal: false,
              pointlist: ret.rows.map(i => {
                if (i.point_id == item.points.point_id) {
                  return { ...i, select: true }
                } else {
                  return { ...i, select: false }
                }
              }),
              nowindex: index,
              modalD: 'show'
            });
            return;

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
  data: {
    userinfo: app.globalData.userinfo,
    channellist: [],
    p: '49',
    pointlist: [],
    loadModal: false,
    modalD: '',
    nowindex: -1,
    rolesets: {
      fromchannel: '0',
      tochannel: '0',
      name: '便民指令设置',
      useit: true,
      image: '',
      content: app.globalData.pclist.map(i => { return { ...i, show: true, fixchannel: '', on: false, points: { on: false, point_id: '', point_cnt: 10 } } })
    }
  }
})
