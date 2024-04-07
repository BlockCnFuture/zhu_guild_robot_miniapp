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
    userinfo: app.globalData.userinfo,
    daterange: [Array.from({ length: 16 }, (v, i) => i + '时'), Array.from({ length: 59 }, (v, i) => (i) + '分')],
    cronsets: [Array.from({ length: 60 }, (v, i) => i), Array.from({ length: 24 }, (v, i) => i), Array.from({ length: 31 }, (v, i) => (i + 1)), Array.from({ length: 12 }, (v, i) => (i + 1)), Array.from({ length: 7 }, (v, i) => (i + 1))],
    nowcronset: [],
    nowtarget: '',
    nowindex: '',
    tmpc: '',
    tmpimg: '',
    ochannellist: [],
    channellist: [],
    modalA: '',
    modalB: '',
    channelname: '',
    rolesets: {
      cron: '0 55 22 * * 1,2,3,4,5',
      tochannel: '',
      content: '',
      image: '',
      useit: '0',
      editor: '21600',
      editors: app.longtime2s('21600'),
      markdown: '0',
      imgtextdp: '0'
    },
    cronanalyze: ['55', '22', '*', '*', '1,2,3,4,5'],
    loadModal: false
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
    this.data.rolesets.cron = `0 ${this.data.cronanalyze[0]} ${this.data.cronanalyze[1]} ${this.data.cronanalyze[2]} ${this.data.cronanalyze[3]} ${this.data.cronanalyze[4]}`;
    this.setData({
      cronanalyze: this.data.cronanalyze,
      'rolesets.cron': this.data.rolesets.cron,
      modal: ''
    })
  },
  selectall() {
    this.setData({
      nowcronset: this.data.nowcronset.map(i => { return { ...i, select: true } })
    })
  },
  cancleall() {
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
  hideModal() {
    this.setData({
      modal: ''
    })
  },
  delimg() {
    this.setData({
      'rolesets.image': '',
      tmpimg_width: 0,
      tmpimg_height: 0,
      tmpimg_digest: '',
      tmpimg: ''
    })
  },
  onInput(e) {
    this.setData({
      nowcur: e.detail.cursor,
      tmpc: e.detail.value
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
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let sec = time[0] * 60 * 60 + time[1] * 60;
    if (sec <= 0) sec = 60;
    this.data.rolesets.editor = sec.toString();
    this.setData({
      'rolesets.editor': this.data.rolesets.editor,
      'rolesets.editors': app.longtime2s(this.data.rolesets.editor)
    })
  },
  hideModalA: function () {
    this.setData({
      channellist: this.data.ochannellist,
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
      tmpimg: this.data.rolesets.image
    })
  },
  chosechannel: function () {
    this.setData({
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
        'rolesets.tochannel': check[0].id
      })
    } else {
      this.setData({
        channelname: '',
        'rolesets.tochannel': ''
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
          return { ...i, select: !i.select }
        } else {
          return { ...i, select: false }
        }
      })
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
      tmpc: c || '',
      tmpct: c || ''
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
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value ? '1' : '0'
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
            channellist: ret.data.filter(item => { return item.type == 0 || item.type == 4 }).map(item => {
              if (item.id == this.data.rolesets.tochannel) {
                return { ...item, select: true }
              } else {
                return { ...item, select: false }
              }
            })
          });
          this.setData({
            ochannellist: this.data.channellist
          });
          let name = ret.data.filter(item => { return item.type == 0 && item.id == this.data.rolesets.tochannel });
          if (name && name.length == 1) {
            this.setData({
              channelname: name[0].name
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
  fetch_sets: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchtask_banspeaking/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.cnt == 1) {
            if (ret.rows[0].editor) {
              ret.rows[0].editors = app.longtime2s(ret.rows[0].editor);
            }
            this.setData({
              rolesets: ret.rows[0]
            });
          }
          let _cron = this.data.rolesets.cron;
          let arr = _cron.split(' ');
          if (arr.length != 6 || arr[0] != '0') arr = '0 55 22 * * 1,2,3,4,5'.split(' ');
          this.setData({
            cronanalyze: arr.slice(1),
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
            'rolesets.image': obj.url
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/savetask_banspeaking/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('修改定时全员禁言设置');
          this.fetch_sets();
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
