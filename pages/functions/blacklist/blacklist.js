const app = getApp();
Page({
  data: {
    p: 4,
    page: 0,
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    blacklist: [],
    complete: false,
    modal: '',
    modalA: '',
    tmplist: [],
    nowtarget: '',
    tmpc: ''
  },
  onLoad: function () {
    this.fetch_list();
  },
  LoadTast: function () {
    this.setData({
      page: 0,
      loadModal: false,
      blacklist: [],
      complete: false,
      modal: '',
      modalA: '',
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
  fetch_list: function () {
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    let tpage = this.data.page;
    qq.request({
      url: `${app.globalData.host}/fetchblacklist/${app.globalData.token}/${this.data.p}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {
            this.setData({
              complete: true
            })
          } else {
            if (tpage > 0) {
              ret.rows = [...this.data.blacklist, ...ret.rows.map(item => ({ ...item, last_black_time: app.times2time(item.last_black_time), show: true }))];
            } else {
              ret.rows = ret.rows.map(item => ({ ...item, last_black_time: app.times2time(item.last_black_time), show: true }));
            }
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                blacklist: ret.rows.map(item => {
                  if (item.usernick.toLowerCase().includes(s.toLowerCase()) ||
                    item.user_id.includes(s.toLowerCase()) ||
                    ('状态：未拉黑'.includes(s) && !item.is_black) ||
                    ('状态：已拉黑'.includes(s) && item.is_black)) {
                    return { ...item, show: true };
                  } else {
                    return { ...item, show: false };
                  }
                }),
                page: tpage + 1
              });
            } else {
              this.setData({
                blacklist: ret.rows,
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
      blacklist: this.data.blacklist.map((i, s) => {
        if (i.user_id == item.user_id && i.guildid == item.guildid) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  cancleall: function () {
    this.setData({
      blacklist: this.data.blacklist.map((i, s) => {
        return { ...i, select: false };
      })
    })
  },
  stopit: function () {
    return;
  },
  hideModal: function () {
    this.setData({
      modal: ''
    })
  },
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  selectsome: function () {
    this.setData({
      modal: 'show'
    })
  },
  opsome: function () {
    let check = this.data.blacklist.filter(i => { return i.select });
    if (check.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    this.setData({
      tmpc: '',
      nowtarget: '',
      tmplist: check,
      modalA: 'show'
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
  do_operation: function (event) {
    let op = event.currentTarget.dataset.op;
    let c = this.data.tmpc.trim();
    if (op != 'del' && c == '') {
      qq.showToast({
        title: '需要填写理由',
        icon: 'none'
      })
      return;
    }
    let data = { ids: '', isblack: false, reason: this.data.tmpc.trim() };
    data.isblack = (op == 'black' ? true : false);
    if (this.data.tmplist.length <= 0) {
      data.ids = '|' + this.data.nowtarget.user_id + '|'
    } else {
      this.data.tmplist.forEach(i => {
        data.ids += '|' + i.user_id + '|';
      })
    }

    if (data.ids == '') {
      qq.showToast({
        title: '没有执行目标',
        icon: 'none'
      })
      return;
    }

    if (op == 'del') {
      this.op_users('delblack', data)
    } else {
      this.op_users('editblack', data)
    }
  },
  op_users: function (path, d) {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/${path}/${app.globalData.token}/${this.data.p}`,
      method: 'POST',
      data: d,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            complete: false,
            modalA: '',
            blacklist: [],
            tmpc: '',
            nowtarget: [],
            tmplist: [],
            page: 0
          })
          this.fetch_list();
          app.postlog('修改用户黑名单列表')
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
  },
  selectallblack: function () {
    this.setData({
      blacklist: this.data.blacklist.map((i, s) => {
        return { ...i, select: i.is_black };
      }),
      modal: ''
    })
  },
  selectallwhite: function () {
    this.setData({
      blacklist: this.data.blacklist.map((i, s) => {
        return { ...i, select: !i.is_black };
      }),
      modal: ''
    })
  },
  selectall: function () {
    this.setData({
      blacklist: this.data.blacklist.map((i, s) => {
        return { ...i, select: true };
      }),
      modal: ''
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let blacklist = this.data.blacklist;
    if (s == '') {
      this.setData({
        blacklist: blacklist.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        blacklist: blacklist.map(item => {
          if (item.usernick.toLowerCase().includes(s.toLowerCase()) ||
            item.user_id.includes(s.toLowerCase()) ||
            ('状态：未拉黑'.includes(s) && !item.is_black) ||
            ('状态：已拉黑'.includes(s) && item.is_black)) {
            return { ...item, show: true }
          } else {
            return { ...item, show: false }
          }
        }),
        keyword: s
      });
    }
  },
  onInput(e) {
    this.setData({
      tmpc: e.detail.value.trim()
    })
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.user_id,
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
      data: item.usernick,
      success: function () {
        qq.showToast({
          title: '已复制用户昵称',
          icon: 'none'
        })
      }
    })
  }
})