const app = getApp();
Page({
  data: {
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
    tmpimg: '',
    tmpimg_digest: '',
    tmpimg_height: 0,
    tmpimg_width: 0,
    modalE: '',
    modalD: ''
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
    this.fetch_list();
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      loadModal: false,
      list: [],
      complete: false
    })
    this.fetch_list();
    qq.stopPullDownRefresh();
  },
  hideModalB: function () {
    this.setData({
      nowtargetc: '',
      modalB: '',
      tmpc: ''
    })
  },
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  copyguild: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.guildid,
      success: function () {
        qq.showToast({
          title: '已复制频道id',
          icon: 'none'
        })
      }
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
      tmpc: c
    })
  },
  hideModalC: function () {
    this.setData({
      modalC: ''
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
  hideModal(event) {
    let url = event.target.dataset.url;
    this.setData({
      'modal.show': false
    })
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetch_ptasks/${app.globalData.token}/${tpage}`,
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
                    ...item, show: item.content.toLowerCase().includes(s.toLowerCase()) ||
                      item.editornick.toLowerCase().includes(s.toLowerCase()) ||
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
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false,
            modal: {
              show: true,
              title: '错误',
              content: '您没有审核员权限',
              fine: {
                title: '',
                url: ''
              },
              cancle: {
                title: '确定',
                url: ''
              }
            }
          });
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
  selectone: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      list: this.data.list.map((i, s) => {
        if (i.id == item.id && i.guildid == item.guildid) {
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
  opsome: function (e) {
    let op = e.target.dataset.op;
    let check = this.data.list.filter(i => { return i.select });
    if (check.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/op_ptasks/${app.globalData.token}/${op}`,
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
          app.postlog('审核定时任务')
        } else if (ret.errcode == 403) {
          this.setData({
            loadModal: false,
            modal: {
              show: true,
              title: '错误',
              content: '您没有审核员权限',
              fine: {
                title: '',
                url: ''
              },
              cancle: {
                title: '确定',
                url: ''
              }
            }
          });
        } else {
          this.setData({
            loadModal: false
          })
          if (!ret.errcode) return;
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
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      modalA: 'show'
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
            ...item, show: item.content.toLowerCase().includes(s.toLowerCase()) ||
              item.editornick.toLowerCase().includes(s.toLowerCase()) ||
              item.edit_time.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
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
  hideModalE: function () {
    this.setData({
      modalE: ''
    })
  },
  changeimage: function () {
    this.setData({
      modalE: 'show',
      tmpimg_width: 0,
      tmpimg_height: 0,
      tmpimg_digest: '',
      tmpimg: this.data.nowtarget.image
    })
  },
  ViewImage() {
    qq.previewImage({
      urls: [this.data.nowtarget.image],
      current: this.data.nowtarget.image
    });
  }

})