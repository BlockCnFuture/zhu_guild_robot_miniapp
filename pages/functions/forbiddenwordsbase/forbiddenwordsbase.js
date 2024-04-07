const app = getApp();
Page({
  data: {
    keyword: '',
    userinfo: app.globalData.userinfo,
    loadModal: false,
    list: [],
    modalB: '',
    tmplist: [],
    nowtarget: '',
    tmpcA: ''
  },
  onLoad: function () {
    this.fetch_list();
  },
  navigateto() {
    qq.navigateTo({
      url: `../forbiddenwordsbasepunish/forbiddenwordsbasepunish`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  onUnload: function () {
    this.setData({
      keyword: '',
      list: []
    });
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
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
      loadModal: false,
      list: [],
      modalB: ''
    })
    this.fetch_list();
  },
  onInput(e) {
    let arr = e.detail.value.split('|').filter(i => { return i != ''; });
    this.setData({
      'nowtarget.wordscnt': arr[0] == '' ? 0 : arr.length,
      'nowtarget.words': e.detail.value
    })
  },
  addc(event) {
    let list = { a: '<文件>', b: '<分享>', c: '<QQ小世界>', d: '<QQ小程序>', e: '<第三方卡片>', f: '<QQ红包>', w: '<不支持的消息>' };
    let c = event.currentTarget.dataset.c;
    let ss = list[c];
    if (this.data.nowtarget.words.includes(ss)) {
      this.setData({
        tmpcA: ''
      })
    } else {
      let arr = this.data.nowtarget.words.split('|').filter(i => { return i != '' });
      this.setData({
        'nowtarget.words': [...arr, ss].join('|'),
        'nowtarget.wordscnt': arr.length + 1
      })
    }
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
    })
  },
  copycommand: function (event) {
    qq.setClipboardData({
      data: '/取图片hash',
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  },
  showbyid() {
    let sthis = this;
    qq.getClipboardData({
      success(res) {
        let id = res.data.trim();
        if (!id || isNaN(id)) {
          qq.showModal({
            title: "错误",
            content: "取剪贴板内容失败，请复制词库id到剪贴板后，再单击进行查询",
            showCancel: false
          })
        } else {
          sthis.setData({
            loadModal: true
          })
          qq.request({
            url: `${app.globalData.host}/fetchforbidenwordsdbbyid/${app.globalData.token}/${id}`,
            success: (data) => {
              let ret = data.data;
              if (ret.errcode == 0) {
                let id = ret.id;
                if (sthis.data.list.filter(i => { return i.id == id }).length <= 0) id = '';
                sthis.setData({
                  tmpc: '',
                  nowtarget: {
                    id: id,
                    dbdesc: ret.dbdesc,
                    words: ret.words,
                    wordscnt: ret.words.split('|').length
                  },
                  modalB: 'show'
                })

                sthis.setData({
                  loadModal: false
                })
              } else {
                sthis.setData({
                  loadModal: false
                })
                qq.showModal({
                  title: "错误",
                  content: `词库[${id}]不存在`,
                  showCancel: false
                })
              }
            },
            fail: () => {
              sthis.setData({
                loadModal: false
              })
              qq.showToast({
                title: '查询失败',
                icon: 'none'
              })
            }
          })
        }
      },
      fail(err) {
        qq.showModal({
          title: "错误",
          content: "取剪贴板内容失败，请复制词库id到剪贴板后，再单击进行查询",
          showCancel: false
        })
      }
    })
  },
  setcontent: function () {
    let arr = this.data.nowtarget.words.split('|').filter(i => { return i != '' });
    if (arr.length <= 0 || !this.data.nowtarget.dbdesc) {
      qq.showModal({
        title: "数据不完整",
        content: "词汇数量必须大于0，词库备注不能为空",
        showCancel: false
      });
      return;
    }
    let item = this.data.nowtarget;
    if (!item.id || item.id == '') {
      if (this.data.list.length >= 10) {
        qq.showModal({
          title: "数量超限",
          content: "每个人最多可创建10个敏感词库",
          showCancel: false
        })
        return;
      }
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/forbidenwordsdbwr/${app.globalData.token}/${item.id}`,
      method: 'POST',
      data: this.data.nowtarget,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            list: [],
            modalB: ''
          })
          this.fetch_list();
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: item.id ? '您不是该词库的作者，无权编辑' : '您不是频道主，无法创建新的敏感词库',
              showCancel: false
            });
            return
          }
          qq.showToast({
            title: `[${ret.errcode}]修改失败`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '修改失败',
          icon: 'none'
        })
      }
    })
  },
  fetch_list: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchforbidenwordsdb/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt <= 0) {

          } else {
            ret.rows = ret.rows.map(item => ({ ...item, edit_time: app.times2time(item.time), show: true, wordscnt: item.words.split('|').filter(i => { return i != '' }).length }));
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(i => {
                  if (i.id.toLowerCase().includes(s.toLowerCase()) ||
                    i.nick.toLowerCase().includes(s.toLowerCase()) ||
                    i.dbdesc.toLowerCase().includes(s.toLowerCase())) {
                    return { ...i, show: true };
                  } else {
                    return { ...i, show: false };
                  }
                })
              });
            } else {
              this.setData({
                list: ret.rows
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
          if (!ret.errcode) return;
          if (ret.errcode == 403) {
            qq.showToast({
              title: `无权限`,
              icon: 'none'
            })
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
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    item.edit_time = app.longtime2s(item.time);
    this.setData({
      nowtarget: item,
      modalB: 'show'
    })
  },
  addword: function () {
    if (this.data.list.length >= 10) {
      qq.showModal({
        title: "数量超限",
        content: "每个人最多可创建10个敏感词库",
        showCancel: false
      })
      return;
    }
    this.setData({
      tmpc: '',
      nowtarget: {
        id: '',
        dbdesc: '词库备注',
        words: '',
        wordscnt: 0
      },
      modalB: 'show'
    })
  },
  inputA: function (e) {
    let type = e.target.dataset.type;
    let ss = this.data.tmpcA;
    ss = ss.replace(/\|/g, '');
    if (!ss) return;
    if (type == 'add') {
      if (this.data.nowtarget.words.includes(ss)) {
        this.setData({
          tmpcA: ''
        })
      } else {
        let arr = this.data.nowtarget.words.split('|').filter(i => { return i != '' });
        this.setData({
          tmpcA: '',
          'nowtarget.words': [...arr, ss].join('|'),
          'nowtarget.wordscnt': arr.length + 1
        })
      }
    } else {
      if (!this.data.nowtarget.words.includes(ss)) {
        this.setData({
          tmpcA: ''
        })
      } else {
        let arr = this.data.nowtarget.words.split('|').filter(i => { return i != ss; });
        this.setData({
          tmpcA: '',
          'nowtarget.words': arr.join('|'),
          'nowtarget.wordscnt': arr.length
        })
      }
    }
  },
  inputAs: function (e) {
    let val = e.detail.value;
    this.setData({
      tmpcA: val
    })
  },
  inputCs: function (e) {
    let val = e.detail.value;
    this.setData({
      'nowtarget.dbdesc': val
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    if (s == '') {
      this.setData({
        list: this.data.list.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        list: this.data.list.map(i => {
          if (i.id.toLowerCase().includes(s.toLowerCase()) ||
            i.nick.toLowerCase().includes(s.toLowerCase()) ||
            i.dbdesc.toLowerCase().includes(s.toLowerCase())) {
            return { ...i, show: true };
          } else {
            return { ...i, show: false };
          }
        }),
        keyword: s
      });
    }
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.id.toString(),
      success: function () {
        qq.showToast({
          title: '已复制词库id',
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
  },
  dbdel: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/delforbidenwordsdb/${app.globalData.token}/${item.id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            page: 0,
            loadModal: false,
            olist: [],
            list: [],
            complete: false,
            modalB: ''
          })
          app.postlog(`删除敏感词库：${item.id}`)
          this.fetch_list();
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '您不是该词库的作者，无权删除',
              showCancel: false
            });
            return
          }
          qq.showToast({
            title: `[${ret.errcode}]删除失败`,
            icon: 'none'
          })
        }
      },
      fail: () => {
        this.setData({
          loadModal: false
        })
        qq.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    })
  }
})