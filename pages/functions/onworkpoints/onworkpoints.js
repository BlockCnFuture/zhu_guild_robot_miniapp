const app = getApp();
Page({
  onShow() {
    this.setData({
      userinfo: app.globalData.userinfo
    })
  },
  onLoad: function () {
    this.fetch_sets();
  },
  data: {
    nowcur: false,
    pointlist: [],
    p: 43,
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
    daterange: [Array.from({ length: 24 }, (v, i) => i + '时'), Array.from({ length: 60 }, (v, i) => i + '分')],
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '成员打卡设置',
      useit: false,
      image: '',
      content: {
        gpa: {
          on: false,
          point_id: '',
          point_name: '',
          rules: []
        },
        gpb: {
          on: false,
          point_id: '',
          point_name: '',
          rules: []
        },
        gpc: {
          on: false,
          point_id: '',
          point_name: '',
          point_cnt: 1
        },
        gpd: {
          on: false,
          point_id: '',
          point_name: '',
          rules: []
        },
        fixtime: {
          on: false,
          start: '00:00',
          end: '18:00'
        },
        success: {
          image: 'https://feng.7yan.top/img/card',
          content: '{头像}{艾特} 打卡成功，天天开心噢\r\n\r\n> 累计打卡{累计}天 连续打卡{连续}天\r\n今日打卡第{排名}名 获得林币{每日奖励}点'
        },
        failed: {
          image: 'https://feng.7yan.top/img/card',
          content: '{头像}{艾特} 您今天已经打卡过了，明天再来吧'
        }
      }
    },
    loadModal: false
  },
  LoadTast: function () {
    this.fetch_sets();
  },
  jumpdec() {
    qq.navigateTo({
      url: `../help2/help2`,
      fail: () => {
        qq.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    });
  },
  RolesSwitch: function (event) {
    let target = event.currentTarget.dataset.target;
    this.setData({
      [target]: event.detail.value
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
  loadeda(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      heighta: h
    })
  },
  loadedb(e) {
    let r = e.detail.width / e.detail.height;
    let h = qq.getSystemInfoSync().windowWidth * 0.8 / r;
    this.setData({
      heightb: h
    })
  },
  addc(event) {
    let list = { a: '{每日奖励}', b: '{连续奖励}', c: '{连续}', d: '{艾特}', e: '{累计}', f: '{头像}', g: '{排名}', h: '{累计奖励}', i: '{漏签天数}', ma: '\r\n- - -\r\n', mb: '\r\n>', mc: '\r\n# ', md: '\r\n- ', me: '\r\n1. ' };
    let c = event.currentTarget.dataset.c;
    let nowcur = this.data.nowcur;
    if (!nowcur) nowcur = this.data.tmpc.length;
    if (list[c] == '{头像}' && this.data.tmpc.includes(list[c])) return;
    this.setData({
      tmpc: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur),
      tmpct: this.data.tmpc.slice(0, nowcur) + list[c] + this.data.tmpc.slice(nowcur)
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
      tmpc: c,
      tmpct: c
    })
  },
  chosepoint(event) {
    if (this.data.pointlist.length <= 0) {
      qq.showModal({
        title: "无任何积分",
        content: "本频道无任何自定义积分，请先前往积分设置页创建自定义积分",
        showCancel: false
      })
      return;
    }
    let target = event.currentTarget.dataset.target;
    this.setData({
      tmppath: target,
      modalG: 'show'
    })
  },
  setprule(event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      tmptype: type,
      modalF: 'show'
    })
  },
  delrole: function (event) {
    let index = event.currentTarget.dataset.index;
    if (this.data.tmptype == 'gpa') {
      this.data.rolesets.content.gpa.rules.splice(index, 1);
      this.setData({
        'rolesets.content.gpa.rules': this.data.rolesets.content.gpa.rules
      });
    } else if (this.data.tmptype == 'gpd') {
      this.data.rolesets.content.gpd.rules.splice(index, 1);
      this.setData({
        'rolesets.content.gpd.rules': this.data.rolesets.content.gpd.rules
      });
    } else {
      this.data.rolesets.content.gpb.rules.splice(index, 1);
      this.setData({
        'rolesets.content.gpb.rules': this.data.rolesets.content.gpb.rules
      });
    }
  },
  addrole: function () {
    if (this.data.tmptype == 'gpa') {
      if (this.data.rolesets.content.gpa.rules.length >= 20) {
        qq.showModal({
          title: "数量超限",
          content: "最多可创建20个奖励规则",
          showCancel: false
        });
        return;
      }
      this.data.rolesets.content.gpa.rules.splice(this.data.rolesets.content.gpa.rules.length, 1, {
        a: 1, b: 500, c: 5, d: 10
      });
      this.setData({
        'rolesets.content.gpa.rules': this.data.rolesets.content.gpa.rules
      });
    } else if (this.data.tmptype == 'gpd') {
      if (this.data.rolesets.content.gpd.rules.length >= 20) {
        qq.showModal({
          title: "数量超限",
          content: "最多可创建20个奖励规则",
          showCancel: false
        });
        return;
      }
      this.data.rolesets.content.gpd.rules.splice(this.data.rolesets.content.gpd.rules.length, 1, {
        a: 100, b: 110, c: 5, d: 10
      });
      this.setData({
        'rolesets.content.gpd.rules': this.data.rolesets.content.gpd.rules
      });
    } else {
      if (this.data.rolesets.content.gpb.rules.length >= 20) {
        qq.showModal({
          title: "数量超限",
          content: "最多可创建20个奖励规则",
          showCancel: false
        });
        return;
      }
      this.data.rolesets.content.gpb.rules.splice(this.data.rolesets.content.gpb.rules.length, 1, {
        a: 1, b: 365, c: 7, d: 12
      });
      this.setData({
        'rolesets.content.gpb.rules': this.data.rolesets.content.gpb.rules
      });
    }
  },
  kclick(event) {
    let item = event.currentTarget.dataset.item;
    let type = this.data.tmppath;
    this.setData({
      [`rolesets.content.${type}.point_id`]: item.point_id,
      [`rolesets.content.${type}.point_name`]: item.point_name,
      modalG: ''
    });
  },
  hideModalG: function () {
    this.setData({
      modalG: ''
    })
  },
  hideModalF: function () {
    this.setData({
      modalF: ''
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
  changeimage: function (event) {
    let type = event.currentTarget.dataset.type;
    if (type == 'success') {
      this.setData({
        modalE: 'show',
        tmpimg_width: 0,
        tmpimg_height: 0,
        tmpimg_digest: '',
        imgtype: type,
        tmpimg: this.data.rolesets.content.success.image
      })
    } else {
      this.setData({
        modalE: 'show',
        tmpimg_width: 0,
        tmpimg_height: 0,
        tmpimg_digest: '',
        imgtype: type,
        tmpimg: this.data.rolesets.content.failed.image
      })
    }
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
    if (this.data.nowtarget == '') {
      this.setData({
        channellist: this.data.channellist.map(i => {
          if (i.id == item.id) {
            return { ...i, select: !i.select }
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
        modalB: '',
        tmpc: ''
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
      url: `${app.globalData.host}/geteventssets_back/${app.globalData.token}/${this.data.p}/${this.data.rolesets.name}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          if (ret.sets) {
            if (!ret.sets.content.gpd) {
              ret.sets.content.gpd = {
                on: false,
                point_id: '',
                point_name: '',
                rules: []
              };
            }
            this.setData({
              rolesets: ret.sets
            });
          }
          this.setData({
            loadModal: false
          })
          this.fetch_channellist();
          this.fetchpoints();
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
          if (o.data.imgtype == 'success') {
            o.setData({
              tmpimg_width: 0,
              tmpimg_height: 0,
              tmpimg_digest: '',
              tmpimg: '',
              'rolesets.content.success.image': obj.url
            })
          } else {
            o.setData({
              tmpimg_width: 0,
              tmpimg_height: 0,
              tmpimg_digest: '',
              tmpimg: '',
              'rolesets.content.failed.image': obj.url
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
    if (this.compareTime(s, this.data.rolesets.content.fixtime.end)) {
      qq.showModal({
        title: "错误",
        content: "开始时间必须小于结束时间",
        showCancel: false
      })
      return;
    }
    this.setData({
      'rolesets.content.fixtime.start': s
    })
  },
  bindMultiPickerChangeE: function (event) {
    let time = event.detail.value;
    let s = time[0].toString().padStart(2, 0) + ":" + time[1].toString().padStart(2, 0);
    if (this.compareTime(this.data.rolesets.content.fixtime.start, s)) {
      qq.showModal({
        title: "错误",
        content: "开始时间必须小于结束时间",
        showCancel: false
      })
      return;
    }
    this.setData({
      'rolesets.content.fixtime.end': s
    })
  },
  navigate() {
    qq.showToast({
      title: "暂未开放",
      icon: 'none'
    });
  },
  saveall: function () {
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if ((s.content.gpa.on && (!s.content.gpa.point_id || s.content.gpa.rules.length <= 0)) ||
        (s.content.gpb.on && (!s.content.gpb.point_id || s.content.gpb.rules.length <= 0)) ||
        (s.content.gpd.on && (!s.content.gpd.point_id || s.content.gpd.rules.length <= 0)) ||
        (s.content.gpc.on && !s.content.gpc.point_id)) {
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
      url: `${app.globalData.host}/upeventssets_back/${app.globalData.token}/${this.data.p}`,
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
          app.postlog('修改成员打卡奖励设置');
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
  },
  inputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let type = e.target.dataset.type;
    let cnt = e.currentTarget.dataset.cnt;
    if (type == 'add') {
      cnt++;
      if (cnt >= 99999999) cnt = 99999999;
    } else {
      cnt--;
      if (cnt <= 0) cnt = 1;
    }
    this.setData({
      [target]: cnt
    })
  },
  inputcnts: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = parseInt(e.detail.value);
    if (cnt <= 0) cnt = 1;
    this.setData({
      [target]: cnt
    })
  },
  finishinputcnt: function (e) {
    let target = e.currentTarget.dataset.target;
    let cnt = e.currentTarget.dataset.cnt;
    if (cnt <= 0 || isNaN(cnt)) cnt = 1;
    this.setData({
      [target]: cnt
    })
  },
})
