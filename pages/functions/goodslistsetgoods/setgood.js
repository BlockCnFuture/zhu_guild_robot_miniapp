const app = getApp();
Page({
  onLoad: function (option) {
    if (option.info) {
      let data = JSON.parse(decodeURIComponent(option.info));
      this.setData({
        times: app.longtime2s(data.rolesecs),
        goodsinfo: data
      })
    }
    this.fetch_sets();
  },
  data: {
    pointlist: [],
    p: 44,
    userinfo: app.globalData.userinfo,
    permissionlist: app.globalData.permissionlist,
    nowtarget: '',
    tmpc: '',
    tmpimg: '',
    daterange: [Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    daterange_: [Array.from({ length: 30 }, (v, i) => i + '天'), Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    rolelist: [],
    crolelist: [],
    showroles: [],
    rolesets: '',
    times: '',
    goodsinfo: {
      id: -1,
      guildid: '',
      type: '0',
      name: '',
      image: 'https://feng.7yan.top/img/presend',
      rest: 1000,
      daymax: 10,
      roleid: '',
      rolename: '',
      rolesecs: 0,
      pointcnt: 1,
      point_id: '',
      point_name: '',
      limitpa: 99,
      limitpb: 1,
      groupname: '',
      onsold: '1',
      goodsdesc: '',
      descimg: '',
      saferoles: 'all',
      start: '06:00',
      end: '20:00',
      needaddress: '0',
      time: 0
    },
    loadModal: false
  },
  delimg: function () {
    this.setData({
      'goodsinfo.descimg': ''
    })
  },
  upcards() {
    if (this.data.goodsinfo.id < 0) {
      qq.showModal({
        title: '错误',
        content: '请先保存礼品设置，使礼品生效，再进入兑换码管理页',
        showCancel: false
      });
      return;
    }
    qq.navigateTo({
      url: `./cardsedit?id=${this.data.goodsinfo.id}&type=0`, fail: err => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },
  loadeda(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      heighta: h
    })
  },
  ffclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      'goodsinfo.roleid': item.id,
      'goodsinfo.rolename': item.name,
      modalB: ''
    })
  },
  changetr() {
    this.setData({
      modalB: 'show'
    })
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value ? '1' : '0'
    });
  },
  chosep(event) {
    if (this.data.pointlist.length <= 0) {
      qq.showModal({
        title: '无积分类型',
        content: '本频道无任何积分类型，请联系管理员创建积分',
        showCancel: false
      })
      return;
    }
    this.setData({
      modalG: 'show'
    })
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      'goodsinfo.point_id': item.point_id,
      'goodsinfo.point_name': item.point_name,
      modalG: ''
    })
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      this.setData({
        userinfo: app.globalData.userinfo
      })
    }
  },
  onInputArea(e) {
    this.setData({
      'goodsinfo.goodsdesc': e.detail.value
    })
  },
  changetype(e) {
    if (this.data.goodsinfo.id >= 0) {
      qq.showModal({
        title: '无法修改',
        content: '该礼品已生效，无法修改礼品类型，请修改其他内容',
        showCancel: false
      })
      return;
    }
    let type = e.currentTarget.dataset.type
    this.setData({
      'goodsinfo.type': type
    })
  },
  bindMultiPickerChange: function (event) {
    let time = event.detail.value;
    let secs = time[0] * 60 * 60 * 24 + time[1] * 60 * 60 + time[2] * 60;
    this.setData({
      times: app.longtime2s(secs),
      'goodsinfo.rolesecs': secs
    })
  },
  compareTime(firstTime, secondTime) {
    if (!firstTime || !secondTime) return false;
    const [firstHour, firstMinute] = firstTime.split(':').map(Number);
    const [secondHour, secondMinute] = secondTime.split(':').map(Number);
    if (firstHour > secondHour) {
      return true;
    } else {
      if (firstMinute >= secondMinute && firstHour == secondHour) {
        return true;
      }
    }
    return false;
  },
  bindMultiPickerChangeS: function (event) {
    let time = event.detail.value;
    let s = time[0].toString().padStart(2, 0) + ":" + time[1].toString().padStart(2, 0);
    if (this.compareTime(s, this.data.goodsinfo.end)) {
      qq.showModal({
        title: "错误",
        content: "开始时间必须小于结束时间",
        showCancel: false
      })
      return;
    }
    this.setData({
      'goodsinfo.start': s
    })
  },
  bindMultiPickerChangeE: function (event) {
    let time = event.detail.value;
    let s = time[0].toString().padStart(2, 0) + ":" + time[1].toString().padStart(2, 0);
    if (this.compareTime(this.data.goodsinfo.start, s)) {
      qq.showModal({
        title: "错误",
        content: "开始时间必须小于结束时间",
        showCancel: false
      })
      return;
    }
    this.setData({
      'goodsinfo.end': s
    })
  },
  changeroles: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (this.data.goodsinfo.saferoles.includes(`|${i.id}|`) || this.data.goodsinfo.saferoles == 'all') {
          return { ...i, select: true }
        } else {
          return { ...i, select: false }
        }
      }),
      modalD: 'show'
    })
  },
  hideModalD: function () {
    this.setData({
      modalD: ''
    })
  },
  hideModalE: function () {
    this.setData({
      modalE: ''
    })
  },
  hideModalG: function () {
    this.setData({
      modalG: ''
    })
  },
  fclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        if (i.id == item.id) {
          return { ...i, select: !i.select };
        } else {
          return i;
        }
      })
    })
  },
  selectall: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: true };
      })
    })
  },
  cancleall: function () {
    this.setData({
      rolelist: this.data.rolelist.map(i => {
        return { ...i, select: false };
      })
    })
  },
  setrole: function () {
    let ls = this.data.rolelist.filter(i => { return i.select });
    let rs = '';
    ls.map(i => {
      rs += `|${i.id}|`;
    });
    if (ls.length == this.data.rolelist.length) rs = 'all';
    this.setData({
      'goodsinfo.saferoles': rs,
      modalD: ''
    });
    this.refRoleshow();
  },
  onInput(e) {
    let nowcur = e.detail.cursor;
    this.setData({
      tmpc: e.detail.value,
      nowcur: nowcur
    })
  },
  setgroup() {
    if (!this.data.rolesets || !this.data.rolesets.content || !this.data.rolesets.content.groups || this.data.rolesets.content.groups.length <= 0) {
      qq.showModal({
        title: '错误',
        content: '本频道未创建任何分类，请在礼品商店设置页创建分类',
        showCancel: false
      })
      return;
    }
    this.setData({
      modalA: 'show'
    })
  },
  chosegroup(e) {
    let name = e.currentTarget.dataset.item;
    this.setData({
      'goodsinfo.groupname': name,
      modalA: ''
    })
  },
  hideModalA: function () {
    this.setData({
      modalA: ''
    })
  },
  hideModalB: function () {
    this.setData({
      modalB: ''
    })
  },
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    let check = e.currentTarget.dataset.cnt;
    if (check == 'x') {
      this.setData({
        [target]: e.detail.value
      })
    } else {
      let cnt = parseInt(e.detail.value);
      if (cnt <= 0) cnt = 1;
      if (target == 'goodsinfo.limitpb' && cnt > 7) cnt = 7;
      this.setData({
        [target]: cnt
      })
    }
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt == 'x') return;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      [target]: cnt
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
  changeimage: function (event) {
    let type = event.currentTarget.dataset.type;
    if (type == 'image') {
      this.setData({
        modalE: 'show',
        tmpimg_width: 0,
        tmpimg_height: 0,
        tmpimg_digest: '',
        imgtype: type,
        tmpimg: this.data.goodsinfo.image
      })
    } else {
      this.setData({
        modalE: 'show',
        tmpimg_width: 0,
        tmpimg_height: 0,
        tmpimg_digest: '',
        imgtype: type,
        tmpimg: this.data.goodsinfo.descimg
      })
    }
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
          if (o.data.imgtype == 'image') {
            o.setData({
              tmpimg_width: 0,
              tmpimg_height: 0,
              tmpimg_digest: '',
              tmpimg: '',
              'goodsinfo.image': obj.url
            })
          } else {
            o.setData({
              tmpimg_width: 0,
              tmpimg_height: 0,
              tmpimg_digest: '',
              tmpimg: '',
              'goodsinfo.descimg': obj.url
            })
          }

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
  stopit() {
    return;
  },
  refRoleshow() {
    this.setData({
      showroles: this.data.rolelist.filter(i => {
        return (this.data.goodsinfo.saferoles.includes(`|${i.id}|`) || this.data.goodsinfo.saferoles == 'all')
      })
    })
  },
  fetch_rolelist: function () {
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/rolelist/${app.globalData.token}/${this.data.p}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          ret.data.map(item => {
            item.hexcolor = '#' + (item.color).toString(16).substr(2).toUpperCase();
          })
          this.setData({
            crolelist: ret.data.filter(i => { return i.id.length > 4; })
          });
          ret.data = [...ret.data, ...Array.from({ length: 25 }, (i, v) => { return { id: (v + 10 + 1).toString(), name: `等级身份组 LV.${v + 1}`, hexcolor: 'n' } })]
          this.setData({
            rolelist: ret.data
          });
          this.setData({
            loadModal: false
          })
          this.refRoleshow();
        } else {
          this.setData({
            loadModal: false
          })
          qq.showToast({
            title: `[${ret.errcode}]请赋予管理`,
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
      url: `${app.globalData.host}/geteventssets_back/${app.globalData.token}/${this.data.p}/礼品商店设置`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            this.setData({
              rolesets: ret.sets
            });
          }
          this.setData({
            loadModal: false
          })
          this.fetchpoints();
          this.fetch_rolelist();
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
  navigate() {
    qq.showToast({
      title: "暂未开放",
      icon: 'none'
    });
  },
  showpointinfo(e) {
    let info = e.currentTarget.dataset.info;
    if (!info || info == '') {
      qq.showModal({
        title: '无介绍',
        content: '该积分未设置介绍',
        showCancel: false
      })
    } else {
      qq.showModal({
        title: '积分介绍',
        content: info,
        showCancel: false
      })
    }
  },
  fetchpoints() {
    if (this.data.pointlist.length > 0) {
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchGpoints_byid/${app.globalData.token}/self`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            pointlist: ret.rows,
            loadModal: false
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
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.goodsinfo));
    if (!s.name || !s.image || !s.point_id || !s.goodsdesc || (!s.roleid && s.type == '1')) {
      qq.showModal({
        title: '错误',
        content: '数据不完整',
        showCancel: false
      });
      return;
    }
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/Goodsinfoswr/${app.globalData.token}/${this.data.p}`,
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
          this.setData({
            'goodsinfo.id': ret.id,
            'goodsinfo.show': true
          });
          if (s.id < 0) app.postlog(`创建新礼品${ret.id}`);
          if (s.id >= 0) app.postlog(`修改礼品(${s.id})设置`);
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