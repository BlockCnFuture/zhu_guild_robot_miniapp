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
    modalD: ''
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
        modalD: 'show'
      })
    }
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  addc(event) {
    let list = { a: '<文件>', b: '<分享>', c: '<QQ小世界>', d: '<QQ小程序>', e: '<第三方卡片>', f: '<QQ红包>', g: '|', h: '^', i: '$', j: '?', k: ' *', l: '.*', m: '\\d+', n: '([\\s\\S]*)', o: '{回复}', p: '{艾特}', q: '@everyone', w: '<不支持的消息>' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
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
    if (t.keyword == '' || t.enabled_channels.trim() == '' || (t.content.trim() == '' && t.image == '')) {
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
        url: `${app.globalData.host}/keywordswr/${app.globalData.token}/${this.data.p}`,
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
            if (t.id == '') app.postlog('增加关键词')
            if (t.id != '') app.postlog('修改关键词')
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
    let item = this.data.nowtarget;
    this.setData({
      modalC: 'show',
      tmpchannellist: this.data.ochannellist.map(i => {
        if ((item.enabled_channels.includes('all') ||
          item.enabled_channels.includes(`<#${i.id}>`)) && i.type != 4) {
          return { ...i, select: true };
        } else {
          return { ...i, select: false };
        }
      })
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
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
      modalD: ''
    })
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
        let reg = new RegExp(this.data.tmpc.trim(), 'g');
        if (reg.test('apple') && reg.test('竹林') && reg.test('2002')) {
          qq.showModal({
            title: '错误',
            content: '您使用的正则表达式貌似会匹配任何文本，请您仔细检查您使用的正则表达式是否正确，比如末尾是否多使用了|表达式，以免造成灾难性后果',
            showCancel: false
          });
          return;
        }
      } catch (err) {
        qq.showToast({
          title: '正则表达式有误',
          icon: 'none'
        });
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
      url: `${app.globalData.host}/fetchkeywords/${app.globalData.token}/${this.data.p}/${tpage}`,
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
                    ...item, show: item.keyword.toLowerCase().includes(s.toLowerCase()) ||
                      item.content.toLowerCase().includes(s.toLowerCase()) ||
                      item.editornick.toLowerCase().includes(s.toLowerCase()) ||
                      item.editor.toLowerCase().includes(s.toLowerCase()) ||
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
      url: `${app.globalData.host}/delkeywords/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('删除关键词')
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
  showinfo: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      tmpc: '',
      nowtarget: item,
      tmplist: [],
      modalA: 'show',
      channellist: this.data.ochannellist.filter(i => {
        return item.enabled_channels.includes('all') ||
          item.enabled_channels.includes(`<#${i.id}>`)
      })
    })
  },
  addword: function () {
    this.setData({
      tmpc: '',
      nowtarget: {
        id: '',
        keyword: '',
        enabled_channels: 'all',
        content: '',
        image: '',
        cd: '0',
        editor: this.data.userinfo.member_userid,
        edit_time: '',
        editornick: this.data.userinfo.member_nick,
        editorhead: this.data.userinfo.member_head
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
            ...item, show: item.keyword.toLowerCase().includes(s.toLowerCase()) ||
              item.content.toLowerCase().includes(s.toLowerCase()) ||
              item.editornick.toLowerCase().includes(s.toLowerCase()) ||
              item.editor.toLowerCase().includes(s.toLowerCase()) ||
              item.edit_time.toLowerCase().includes(s.toLowerCase())
          };
        }),
        keyword: s
      });
    }
  },
  copyid: function (event) {
    let item = event.currentTarget.dataset.item;
    qq.setClipboardData({
      data: item.editor,
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