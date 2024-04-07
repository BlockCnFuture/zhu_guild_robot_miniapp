const app = getApp();
Page({
  data: {
    guildlist: [],
    nowcur: false,
    p: 1,
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    olist: [],
    list: [],
    complete: false,
    modalA: '',
    modalB: '',
    modalC: '',
    tmplist: [],
    nowtarget: '',
    nowtargetc: '',
    tmpc: '',
    daterange: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 59 }, (v, i) => i + '分')],
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
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    if (sec <= 0) sec = 60;
    this.setData({
      'nowtarget.exp_seconds': sec
    })
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
      tmplist: []
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
    let ctype = typeof this.data.tmpc;
    if (ctype == 'number') {
      let val = Number(e.detail.value);
      if (val < 0 || isNaN(val)) val = 0;
      this.setData({
        tmpc: val,
        tmpct: val,
        nowcur: nowcur
      })
    } else {
      this.setData({
        tmpc: e.detail.value,
        nowcur: nowcur
      })
    }
  },
  RolesSwitch(event) {
    let target = event.currentTarget.dataset.target;
    let spath = `nowtarget.${target}`;
    this.setData({
      [spath]: this.data.nowtarget[target] == '1' ? '0' : '1'
    });
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
  save: function () {
    let t = this.data.nowtarget;
    let check = this.data.olist.filter(i => {
      return i.point_name == t.point_name;
    });
    if (check.length > 0 && check[0].point_id != t.point_id) {
      qq.showModal({
        title: "名称冲突",
        content: "当前积分名称已存在，为避免冲突引发使用问题，请您更换其他名称",
        showCancel: false
      });
      return;
    }
    if (t.point_name == '') {
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
        url: `${app.globalData.host}/Gpointswr/${app.globalData.token}/${this.data.p}`,
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
              list: [],
              olist: []
            })
            this.fetch_list();
            if (t.point_id == '') app.postlog('增加积分规则')
            if (t.point_id != '') app.postlog('修改积分规则')
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
  delrole: function (event) {
    let t = event.currentTarget.dataset.item;
    if (!t.point_id) return;
    let sthis = this;
    qq.showModal({
      title: '警告',
      content: '删除此积分，将同步清空所有用户拥有的该积分，确定要删除吗？',
      success(res) {
        if (res.confirm) {

          sthis.setData({
            loadModal: true
          })
          qq.request({
            url: `${app.globalData.host}/delGpoint/${app.globalData.token}/${sthis.data.p}/${t.point_id}`,
            method: 'GET',
            success: (data) => {
              let ret = data.data;
              if (ret.errcode == 0) {
                sthis.setData({
                  loadModal: false,
                  modalA: '',
                  nowtarget: '',
                  page: 0,
                  complete: false,
                  list: [],
                  olist: []
                })
                sthis.fetch_list();
                app.postlog('删除积分规则')
              } else {
                sthis.setData({
                  loadModal: false
                })
                qq.showToast({
                  title: `[${ret.errcode}]数据删除出错`,
                  icon: 'none'
                })
              }
            },
            fail: () => {
              sthis.setData({
                loadModal: false
              })
              qq.showToast({
                title: '数据删除失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  setcontent: function () {
    if (this.data.nowtargetc) {
      if (typeof this.data.tmpc == 'string') this.data.tmpc = this.data.tmpc.trim();
      if (this.data.nowtargetc == 'nowtarget.limitamount_min' && this.data.tmpc < 5) this.data.tmpc = 5;
      if (this.data.nowtargetc == 'nowtarget.limitamount_max' && this.data.tmpc < 10) this.data.tmpc = 10;
      if (this.data.nowtargetc == 'nowtarget.soldprice' && this.data.tmpc <= 0) this.data.tmpc = 1;
      this.setData({
        [this.data.nowtargetc]: this.data.tmpc,
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
      url: `${app.globalData.host}/fetchGpoints/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            ret.rows = [...this.data.olist, ...ret.rows];
            this.setData({
              olist: ret.rows,
              list: ret.rows,
              page: this.data.page + 1
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
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      modalA: 'show'
    })
  },
  stips() {
    qq.showModal({
      title: '提示',
      content: '请在对应的频道，通过小竹的资料卡打开小程序，方可增加频道记录',
      showCancel: false
    })
  },
  selectguilds(e) {
    let item = e.currentTarget.dataset.item;
    if (this.data.guildlist.length > 0) {
      this.setData({
        guildlist: this.data.guildlist.map(i => {
          if (item.guilds) {
            return { ...i, select: item.guilds.includes(`|${i.guildid}|`) }
          } else {
            return { ...i, select: false }
          }
        }),
        loadModal: false,
        modalC: 'show'
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_guildsnew/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            guildlist: ret.rows.map(i => {
              if (item.guilds) {
                return { ...i, select: item.guilds.includes(`|${i.guildid}|`) }
              } else {
                return { ...i, select: false }
              }
            }),
            loadModal: false,
            modalC: 'show'
          });
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
  gclick(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      guildlist: this.data.guildlist.map(i => {
        if (i.guildid == item.guildid) {
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: i.select }
        }
      })
    })
  },
  change() {
    let check = this.data.guildlist.filter(i => {
      return i.select;
    }).map(i => { return `|${i.guildid}|` });
    this.setData({
      'nowtarget.guilds': check.join(''),
      modalC: ''
    })
  },
  addrole: function () {
    if (this.data.olist.length >= 10) {
      qq.showModal({
        title: "达到上限",
        content: "您最多可创建10个积分规则",
        showCancel: false
      });
      return;
    }
    this.setData({
      tmpc: '',
      nowtarget: {
        guildid: '',
        point_id: '',
        point_name: '积分',
        point_desc: '',
        canenter: '0',
        canleave: '1',
        enter_rate: 0,
        leave_rate: 0,
        sold: '1',
        soldprice: 100,
        limitamount_min: 6,
        limitamount_max: 1000,
        cantrans: '1',
        transrate: 5,
        bank: '1',
        bankenterrate: 5,
        bankleaverate: 5,
        bankrate: 500,
        exp_seconds: 2592000,
        canchangeenter: '0',
        canchangeleave: '0',
        changeenter_rate: 0,
        changeleave_rate: 0,
        guilds: ''
      },
      tmplist: [],
      modalA: 'show'
    })
  }
})