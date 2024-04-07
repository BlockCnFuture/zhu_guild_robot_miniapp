const app = getApp();
Page({
  data: {
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
    channellist: [],
    sets: { china_channel: '', abroad_channel: '', ka: '', kb: '{艾特} 请前往{子频道}使用指令' },
    nameA: '',
    nameB: '',
    nameC: ''
  },
  onLoad: function () {
    this.fetch_sets();
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
  hideModalA: function () {
    this.setData({
      nowtarget: '',
      modalA: ''
    })
  },
  chosechannel: function (event) {
    let type = event.currentTarget.dataset.type;
    if (type == 'A') {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (this.data.sets.china_channel && i.id == this.data.sets.china_channel) {
            return { ...i, select: true }
          } else {
            return { ...i, select: false }
          }
        }),
        nowtarget: type,
        modalA: 'show'
      })
    } else if (type == 'B') {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (this.data.sets.abroad_channel && i.id == this.data.sets.abroad_channel) {
            return { ...i, select: true }
          } else {
            return { ...i, select: false }
          }
        }),
        nowtarget: type,
        modalA: 'show'
      })
    } else {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (this.data.sets.ka && i.id == this.data.sets.ka) {
            return { ...i, select: true }
          } else {
            return { ...i, select: false }
          }
        }),
        nowtarget: type,
        modalA: 'show'
      })
    }
  },
  oclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      oplist: this.data.oplist.map(i => {
        return { ...i, select: i.type == item.type };
      })
    })
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchkeywords_lc/${app.globalData.token}/${this.data.p}/${tpage}`,
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
            ret.rows = ret.rows.map(i => {
              let k = i.keyword;
              if (k.slice(0, 1) == '^') k = k.slice(1);
              if (k.slice(-1) == '$') k = k.slice(0, k.length - 1);
              return { ...i, keyword_show: k };
            })
            if (this.data.keyword != '') {
              let s = this.data.keyword;
              this.setData({
                list: ret.rows.map(item => {
                  return {
                    ...item, show: item.keyword.toLowerCase().includes(s.toLowerCase()) ||
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
  fetch_sets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/getCsets_lc/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              sets: ret.sets
            })
          }
          this.setData({
            loadModal: false
          })
          this.fetch_channellist();
          this.fetch_list();
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
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      channellist: this.data.channellist.map(i => {
        if (i.id == item.id && item.type != 4) {
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: false }
        }
      })
    })
  },
  setchannel: function () {
    let check = this.data.channellist.filter(item => { return item.select == true });
    if (check.length <= 0) check = [{ name: '', id: '' }];
    let type = this.data.nowtarget;
    if (type == 'A') {
      let name = check[0].name;
      let sets = JSON.parse(JSON.stringify(this.data.sets));
      sets = { ...sets, china_channel: check[0].id };
      this.savesets(sets, name, type);
    } else if (type == 'B') {
      let name = check[0].name;
      let sets = JSON.parse(JSON.stringify(this.data.sets));
      sets = { ...sets, abroad_channel: check[0].id };
      this.savesets(sets, name, type);
    } else {
      let name = check[0].name;
      let sets = JSON.parse(JSON.stringify(this.data.sets));
      sets = { ...sets, ka: check[0].id };
      this.savesets(sets, name, type);
    }
    this.setData({
      nowtarget: '',
      modalA: ''
    })
  },
  savesets: function (sets, name, type) {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/savesets_LC/${app.globalData.token}`,
      method: 'POST',
      data: sets,
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
          if (type == 'A') {
            this.setData({
              nameA: name,
              'sets': sets,
            })
          } else if (type == 'B') {
            this.setData({
              nameB: name,
              'sets': sets,
            })
          } else {
            this.setData({
              nameC: name,
              'sets': sets,
            })
          }
          app.postlog('修改订阅设置');
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showToast({
              title: `无权限`,
              icon: 'none'
            })
          } else {
            qq.showToast({
              title: `[${ret.errcode}]数据保存出错`,
              icon: 'none'
            })
          }
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
      url: `${app.globalData.host}/channellist_lc/${app.globalData.token}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 }).map(i => { return { ...i, select: false } })
          })
          let nameA = ret.data.filter(item => { return item.type == 0 && item.id == this.data.sets.china_channel });
          let nameB = ret.data.filter(item => { return item.type == 0 && item.id == this.data.sets.abroad_channel });
          let nameC = ret.data.filter(item => { return item.type == 0 && item.id == this.data.sets.ka });
          if (nameA && nameA.length == 1) {
            if (nameA[0].name) {
              this.setData({
                nameA: nameA[0].name
              });
            }
          }
          if (nameB && nameB.length == 1) {
            if (nameB[0].name) {
              this.setData({
                nameB: nameB[0].name
              });
            }
          }
          if (nameC && nameC.length == 1) {
            if (nameC[0].name) {
              this.setData({
                nameC: nameC[0].name
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
          qq.showModal({
            title: '无法获取频道列表',
            content: '请确认光萌位于频道内并拥有获取子频道列表的权限'
          });
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
  opsome: function (event) {
    if (!this.data.userinfo.open_guild_id) {
      qq.showModal({
        title: '不支持此操作',
        content: '抱歉，群聊场景下不支持此操作',
        showCancel: false
      })
      return;
    }
    let type = event.currentTarget.dataset.type;
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
      url: `${app.globalData.host}/${type}keywords_lc/${app.globalData.token}/${this.data.p}`,
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
          if (type == 'del') {
            app.postlog('删除光萌词汇')
          } else {
            app.postlog('刷新光萌词汇最后编辑时间')
          }
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `无权限`,
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
    qq.navigateTo({
      url: `../show/show?info=${encodeURIComponent(JSON.stringify(item))}`, fail: err => {
        qq.showToast({
          title: '查看失败',
          icon: 'none'
        })
      }
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
              item.edit_time.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  hideModalE: function () {
    this.setData({
      modalE: ''
    })
  }

})