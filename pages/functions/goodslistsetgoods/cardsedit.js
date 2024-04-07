const app = getApp();
Page({
  onLoad: function (option) {
    if (option.id && option.type) {
      this.setData({
        id: Number(option.id),
        type: option.type
      })
    } else {
      qq.showModal({
        title: '错误',
        content: '缺少信息',
        showCancel: false
      })
    }
    this.fetchcards();
  },
  data: {
    id: -1,
    type: '0',
    p: 44,
    userinfo: app.globalData.userinfo,
    precards: '',
    cardslist: [],
    keyword: '',
    nowtarget: '',
    loadModal: false,
    oplist: ['下架', '上架', '删除', '复制']
  },
  LoadTast: function () {
    this.fetchcards();
  },
  hideModalA() {
    this.setData({
      modalA: ''
    })
  },
  stopit() {
    return;
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let cardslist = this.data.cardslist;
    if (s == '') {
      this.setData({
        cardslist: cardslist.map(i => { return { ...i, show: true } }),
        keyword: s
      });
    } else {
      this.setData({
        cardslist: cardslist.map(i => {
          if (i.card.toLowerCase().includes(s.toLowerCase())) {
            return { ...i, show: true };
          } else {
            return { ...i, show: false };
          }
        }),
        keyword: s
      });
    }
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  pall() {
    this.opall(0);
  },
  oall() {
    this.opall(1);
  },
  dall() {
    this.opall(2);
  },
  opall(op) {
    if (this.data.id < 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/${this.data.type == '0' ? 'editallgoodscards' : 'editalldbcards'}/${app.globalData.token}/${this.data.id}/${op}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: `执行成功`,
            icon: 'none'
          })
          app.postlog(`操作${this.data.type == '0' ? '礼品' : '兑换码库'}${this.data.id}的所有卡密,操作:${op}`);
          this.fetchcards();
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
          title: '修改失败',
          icon: 'none'
        })
      }
    })
  },
  oclick(e) {
    let item = e.currentTarget.dataset.item;
    if (item == '下架') {
      this.realopone(this.data.nowtarget.cardid, 0)
    } else if (item == '上架') {
      this.realopone(this.data.nowtarget.cardid, 1)
    } else if (item == '删除') {
      this.realopone(this.data.nowtarget.cardid, 2)
    } else if (item == '复制') {
      qq.setClipboardData({
        data: this.data.nowtarget.card,
        success: res => {
          qq.showToast({
            title: '已复制',
            icon: 'none',
          })
        }
      })
    }
    this.setData({
      modalA: ''
    })
  },
  realopone(id, op) {
    if (id < 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/${this.data.type == '0' ? 'editonegoodscards' : 'editonedbcards'}/${app.globalData.token}/${id}/${op}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          });
          qq.showToast({
            title: `执行成功`,
            icon: 'none'
          })
          app.postlog(`操作${this.data.type == '0' ? '礼品' : '兑换码库'}${this.data.id}单个卡密${id},操作:${op}`);
          this.fetchcards();
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
          title: '修改失败',
          icon: 'none'
        })
      }
    })
  },
  opone(event) {
    if (this.data.id < 0) {
      return;
    }
    let item = event.currentTarget.dataset.item;
    this.setData({
      nowtarget: item,
      modalA: 'show'
    })
  },
  fetchcards() {
    if (this.data.id < 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/${this.data.type == '0' ? 'fetchgoodscards' : 'fetchdbcards'}/${app.globalData.token}/${this.data.id}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            cardslist: ret.rows.map(i => {
              if (this.data.keyword == '' || i.card.toLowerCase().includes(this.data.keyword.toLowerCase())) {
                return { ...i, show: true };
              } else {
                return { ...i, show: false };
              }
            }),
            loadModal: false
          });
        } else {
          this.setData({
            loadModal: false
          })
          if (ret.errcode == 403) {
            qq.showModal({
              title: '无权限',
              content: '错误，您没有相关权限',
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
  onInputArea(e) {
    this.setData({
      precards: e.detail.value
    })
  },
  upload: function () {
    if (this.data.id < 0) {
      return;
    }
    let c = this.data.precards.trim();
    c = c.replace(/\r\n/g, '\r');
    c = c.replace(/\n/g, '\r');
    let arr = c.split('\r').filter(i => { return i != '' && i.length <= 76; });
    if (arr.length <= 0) {
      qq.showModal({
        title: '错误',
        content: '请输入兑换码',
        showCancel: false
      });
      return;
    }
    if (this.data.cardslist.length >= 500) {
      qq.showModal({
        title: '数量超限',
        content: '现有兑换码数量已达到数量上限500',
        showCancel: false
      });
      return;
    }
    arr = arr.splice(0, 500 - this.data.cardslist.length);
    arr = arr.map(i => { return [i, '1', new Date().getTime()]; });
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/${this.data.type == '0' ? 'uploadgoodscards' : 'uploaddbcards'}/${app.globalData.token}/${this.data.id}`,
      method: 'POST',
      data: { rows: arr },
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false
          })
          this.setData({
            precards: ''
          });
          if (ret.cnt > 0) {
            app.postlog(`上传${this.data.type == '0' ? '礼品' : '兑换码库'}(${this.data.id})兑换码${ret.cnt}条`);
            qq.showToast({
              title: `成功${ret.cnt}条`,
              icon: 'none'
            });
            this.fetchcards();
          } else {
            qq.showModal({
              title: '错误',
              content: `无任何有效数据`,
              showCancel: false
            })
          }
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