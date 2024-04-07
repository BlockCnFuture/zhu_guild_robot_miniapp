const app = getApp();
Page({
  data: {
    nowcur: false,
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
    nowtargetc: '',
    tmpc: '',
    channellist: [],
    tmpchannellist: [],
    ochannellist: [],
    modalC: '',
    daterange: [Array.from({ length: 16 }, (v, i) => i + '秒')],
    tmpimg: '',
    tmpimg_digest: '',
    tmpimg_height: 0,
    tmpimg_width: 0,
    modalE: '',
    modalD: '',
    cronanalyze: ['55', '22', '*', '*', '1,2,3,4,5'],
    cronsets: [Array.from({ length: 60 }, (v, i) => i), Array.from({ length: 24 }, (v, i) => i), Array.from({ length: 31 }, (v, i) => (i + 1)), Array.from({ length: 12 }, (v, i) => (i + 1)), Array.from({ length: 7 }, (v, i) => (i + 1))],
    nowcronset: [],
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
      page: 0,
      loadModal: false,
      list: [],
      complete: false,
      modalA: '',
      modalB: '',
      tmplist: [],
      channellist: [],
      tmpchannellist: [],
      ochannellist: [],
      modalC: '',
      modalE: '',
      modalD: ''
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
    if (e.detail.value.slice(nowcur - 1).startsWith('#') && this.data.nowtargetc == 'nowtarget.content') {
      this.setData({
        modalD: 'show',
        toc: true
      })
    }
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value ? '1' : '0'
    });
  },
  addc(event) {
    let list = { a: '<OR>', b: '@everyone', ma: '\r\n- - -\r\n', mb: '\r\n>', mc: '\r\n# ', md: '\r\n- ', me: '\r\n1. ' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
    })
  },
  hideModal() {
    this.setData({
      modal: ''
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0];
    this.setData({
      'nowtarget.cd': sec.toString()
    })
  },
  delimg: function () {
    this.setData({
      'nowtarget.image': ''
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
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  hideModalC: function () {
    this.setData({
      modalC: ''
    })
  },
  save: function () {
    let t = this.data.nowtarget;
    if (((t.content.trim() == '' && t.image == '') || t.tochannel == '') && t.useit == '1') {
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
        url: `${app.globalData.host}/taskswr/${app.globalData.token}/${this.data.p}`,
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
              list: []
            })
            this.fetch_list();
            if (t.id == '') app.postlog('增加定时消息推送')
            if (t.id != '') app.postlog('修改定时消息推送')
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
  setonchannels: function () {
    this.setData({
      modalD: 'show',
      toc: false
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
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpchannellist: this.data.tmpchannellist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  spclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (this.data.toc) {
      let nowcur = this.data.nowcur;
      if (!nowcur) nowcur = this.data.tmpc.length;
      this.setData({
        tmpc: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        tmpct: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        modalD: ''
      })
    } else {
      this.setData({
        'nowtarget.tochannel': item.id,
        'nowtarget.channel': item,
        modalD: ''
      })
    }
  },
  setchannel: function () {
    let check = this.data.tmpchannellist.filter(i => { return i.select; })
    if (check.length <= 0) {
      qq.showToast({
        title: '至少选中一个',
        icon: 'none'
      })
      return;
    }
    this.setData({
      modalC: '',
      channellist: check
    });
    let cs = '';
    for (let i = 0; i < check.length; i++) {
      cs += `<#${check[i].id}>`;
    }
    if (check.length == this.data.tmpchannellist.filter(i => { return i.type != 4; }).length) cs = 'all';
    this.setData({
      'nowtarget.enabled_channels': cs
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
  setcontent: function () {
    if (this.data.nowtargetc.slice(-7) == 'keyword') {
      try {
        new RegExp(this.data.tmpc.trim(), 'g')
      } catch (err) {
        qq.showToast({
          title: '正则表达式有误',
          icon: 'none'
        })
        return;
      }
    }
    if (this.data.nowtargetc) {
      this.setData({
        [this.data.nowtargetc]: this.data.tmpc.trim(),
        nowtargetc: '',
        modalB: ''
      })
    }
  },
  fetch_list: function () {
    let tpage = this.data.page;
    if (this.data.complete) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchtasks/${app.globalData.token}/${this.data.p}/${tpage}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.fetch_channellist();
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
      list: this.data.list.map((i, s) => {
        if (i.id == item.id) {
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
  opsome: function () {
    let check = this.data.list.filter(i => { return i.select });
    if (check.length <= 0) {
      qq.showToast({
        title: '无选中项',
        icon: 'none'
      })
      return;
    }
    check = check.map(i => { return i.id });
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/deltasks/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('删除定时消息推送')
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]数据删除出错`,
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
  setcronru: function (event) {
    let index = event.currentTarget.dataset.index;
    let tail = '';
    let head = '';
    if (index == '0') { head = '每当第'; tail = '分'; }
    if (index == '1') { head = '每当第'; tail = '小时'; }
    if (index == '2') { head = '每当第'; tail = '日'; }
    if (index == '3') { head = '每当第'; tail = '月'; }
    if (index == '4') { head = '每周'; tail = ''; }
    this.data.nowcronset = this.data.cronsets[index].map(i => {
      let se = false;
      if (this.data.cronanalyze[index] == '*') se = true;
      if (`,${this.data.cronanalyze[index]},`.includes(`,${i},`)) se = true;
      return { name: `${head}${i == 7 && index == '4' ? '日' : i}${tail}`, select: se, n: i };
    })
    this.setData({
      nowindex: index,
      nowcronset: this.data.nowcronset,
      modal: 'show'
    })
  },
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    this.data.nowtarget = item;
    let _cron = this.data.nowtarget.cron;
    let arr = _cron.split(' ');
    this.setData({
      cronanalyze: arr.slice(1),
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      modalA: 'show',
      'nowtarget.channel': this.data.ochannellist.filter(i => {
        return i.id == item.tochannel;
      })[0] || ''
    })
  },
  addword: function () {
    if (this.data.list.length >= 10) {
      qq.showToast({
        title: '最多创建10个',
        icon: 'none'
      })
      return;
    }
    this.setData({
      tmpc: '',
      nowtarget: {
        id: '',
        cron: '0 55 22 * * 1,2,3,4,5',
        tochannel: '',
        channel: '',
        content: '',
        image: '',
        useit: '1',
        edit_time: '',
        editornick: this.data.userinfo.member_nick,
        editorhead: this.data.userinfo.member_head,
        cronanalyze: ['55', '22', '*', '*', '1,2,3,4,5'],
        markdown: '0',
        imgtextdp: '0'
      },
      tmplist: [],
      modalA: 'show',
      channellist: this.data.ochannellist
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
            channellist: ret.data.filter(item => { return item.type != 1 || item.type != 3 })
          });
          this.setData({
            ochannellist: this.data.channellist
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
  __selectall() {
    this.setData({
      nowcronset: this.data.nowcronset.map(i => { return { ...i, select: true } })
    })
  },
  __cancleall() {
    this.setData({
      nowcronset: this.data.nowcronset.map(i => { return { ...i, select: false } })
    })
  },
  _pclick(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      nowcronset: this.data.nowcronset.map((i, si) => {
        if (si == index) {
          return { ...i, select: !i.select }
        } else {
          return i;
        }
      })
    })
  },
  savesets() {
    let index = this.data.nowindex;
    let arr = this.data.nowcronset.filter(i => { return i.select });
    let tc = '';
    if (arr.length == this.data.nowcronset.length || arr.length <= 0) {
      tc = '*';
    } else {
      tc = arr.map(i => { return i.n.toString() }).join(',');
    }
    if (index == 0 && tc == '*') tc = '55';
    this.data.cronanalyze[index] = tc;
    this.data.nowtarget.cron = `0 ${this.data.cronanalyze[0]} ${this.data.cronanalyze[1]} ${this.data.cronanalyze[2]} ${this.data.cronanalyze[3]} ${this.data.cronanalyze[4]}`;
    this.setData({
      cronanalyze: this.data.cronanalyze,
      modal: ''
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
            'nowtarget.image': obj.url
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
  }

})