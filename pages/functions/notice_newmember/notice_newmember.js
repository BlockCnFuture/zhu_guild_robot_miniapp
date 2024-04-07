const app = getApp();
Page({
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    nowcur:false,
    p: 5,
    userinfo: app.globalData.userinfo,
    permissionlist: app.globalData.permissionlist,
    nowtarget: '',
    tmpc: '',
    tmpimg: '',
    ochannellist: [],
    channellist: [],
    ochannellist_: [],
    channellist_: [],
    channelname: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '入频通知',
      useit: false,
      image: 'https://feng.7yan.top/img/newwelcome',
      content: '{头像}{艾特}欢迎光临新成员！\r\n您是今天第{计数}个加入本频道的成员'
    },
    loadModal: false,
    preshowtype: 0
  },
  CtypeA() {
    if (this.data.preshowtype != 0) {
      this.setData({
        'rolesets.content': '{头像}{艾特}欢迎光临新成员！\r\n您是今天第{计数}个加入本频道的成员'
      })
    }
    this.setData({
      preshowtype: 0,
      modalG: ''
    })
  },
  CtypeB() {
    if (this.data.preshowtype != 1) {
      let c = {
        content: '{艾特} 你是今天第{计数}个加入光遇帮帮团家族频道的新成员，欢迎加入🎉',
        t1: '💡快速了解',
        c1: '请前往对应子频道',
        t2: '🤔我想加入',
        c2: '有意向加入家族的可向名称带有“光遇帮帮团家族”前缀以及点击头像资料显示有帮帮团相关身份组的桃、忻、竹、柒彦任意一个人私聊咨询',
        c3: '帮帮团频道全局禁止代跑/陪玩/账号等交易',
        c4: '神圣的火花指尖触及，温暖的灵魂终将相遇'
      };
      this.setData({
        'rolesets.content': c
      })
    }
    this.setData({
      preshowtype: 1,
      modalG: ''
    })
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  RolesSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
    });
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  onInput(e) {
    let nowcur = e.detail.cursor;
    if (e.detail.value.slice(nowcur - 1).startsWith('#')) {
      this.setData({
        modalB: '',
        modalA: 'show'
      })
    }
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  loaded(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      height: h
    })
  },
  addc(event) {
    let list = { a: '{时间}', b: '{昵称}', c: '{id}', d: '{艾特}', e: '{计数}', f: '{头像}', ma: '\r\n- - -\r\n', mb: '\r\n>', mc: '\r\n# ', md: '\r\n- ', me: '\r\n1. ' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    if (list[c] == '{头像}' && this.data.tmpc.includes(list[c])) return;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
    })
  },
  checkpermission: function (name) {
    if (this.data.userinfo.member_role == 2) return true;
    let id = this.data.permissionlist[name];
    let ret = app.hasPermission(this.data.userinfo.permissions, id);
    return ret;
  },
  navigate: function (event) {
    let target = event.currentTarget.dataset.url;
    if (target == 'permission') {
      if (this.data.userinfo.member_role != 2) {
        qq.showToast({
          title: '请使用频道主账号分配权限',
          icon: 'none'
        })
        return;
      }
    } else {
      if (!this.checkpermission(target)) {
        qq.showToast({
          title: '频道主未授予您相关权限',
          icon: 'none'
        })
        return;
      }
    }
    qq.navigateTo({
      url: `../../functions/${target}/${target}`,
      fail: () => {
        qq.showToast({
          title: '暂未开放',
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
      nowtarget: target,
      modalB: 'show',
      showhead: target == 'rolesets.content',
      tmpc: c,
      tmpct: c
    })
  },
  chosetype() {
    this.setData({
      modalG: 'show'
    })
  },
  hideModalG: function () {
    this.setData({
      modalG: ''
    })
  },
  hideModalA: function () {
    this.setData({
      channellist: this.data.ochannellist,
      modalA: '',
      modalB: this.data.nowtarget ? 'show' : ''
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
    }
    this.setData({
      modalA: ''
    })
  },
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    if (this.data.nowtarget == '') {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (i.id == item.id) {
            return { ...i, select: true }
          } else {
            return { ...i, select: false }
          }
        })
      })
    } else {
      let nowcur = this.data.nowcur;
      if (!nowcur) nowcur = this.data.tmpc.length;
      this.setData({
        tmpc: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        tmpct: this.data.tmpc.slice(0, nowcur - 1) + '<#' + item.id + '>' + this.data.tmpc.slice(nowcur),
        modalA: '',
        modalB: 'show'
      })
    }
  },
  setcontent: function () {
    if (this.data.tmpc.trim().length <= 0) {
      qq.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return;
    }
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
            ochannellist_: ret.data.filter(item => { return item.type != 1 && item.type != 3 }),
            channellist_: ret.data.filter(item => { return item.type != 1 && item.type != 3 }),
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
      url: `${app.globalData.host}/geteventssets/${app.globalData.token}/${this.data.p}/${this.data.rolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              rolesets: ret.sets,
              preshowtype: (typeof ret.sets.content == 'object' ? 1 : 0)
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if (s.tochannel == '' || s.image == '') {
        qq.showToast({
          title: '设置数据不完整',
          icon: 'none'
        })
        return;
      }
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/upeventssets/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('修改新人加入通知');
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
