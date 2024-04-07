const app = getApp();
Page({
  onLoad: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let currentPageName = currentPage.route;
    let name = currentPageName.split('/').pop();
    this.setData({
      p: app.globalData.permissionlist[name]
    });
    let qfaces = '<emoji:14><emoji:1><emoji:2><emoji:3><emoji:4><emoji:6><emoji:7><emoji:8><emoji:9><emoji:10><emoji:11><emoji:12><emoji:13><emoji:0><emoji:15><emoji:16><emoji:96><emoji:18><emoji:19><emoji:20><emoji:21><emoji:22><emoji:23><emoji:24><emoji:25><emoji:26><emoji:27><emoji:28><emoji:29><emoji:30><emoji:31><emoji:32><emoji:33><emoji:34><emoji:35><emoji:36><emoji:37><emoji:38><emoji:39><emoji:97><emoji:98><emoji:99><emoji:100><emoji:101><emoji:102><emoji:103><emoji:104><emoji:105><emoji:106><emoji:107><emoji:108><emoji:305><emoji:109><emoji:110><emoji:111><emoji:172><emoji:182><emoji:179><emoji:173><emoji:174><emoji:212><emoji:175><emoji:178><emoji:177><emoji:180><emoji:181><emoji:176><emoji:183><emoji:262><emoji:263><emoji:264><emoji:265><emoji:266><emoji:267><emoji:268><emoji:269><emoji:270><emoji:271><emoji:272><emoji:277><emoji:307><emoji:306><emoji:281><emoji:282><emoji:283><emoji:284><emoji:285><emoji:293><emoji:286><emoji:287><emoji:288><emoji:289><emoji:294><emoji:297><emoji:298><emoji:299><emoji:300><emoji:301><emoji:322><emoji:323><emoji:332><emoji:336><emoji:334><emoji:347><emoji:348><emoji:303><emoji:302><emoji:295><emoji:49><emoji:66><emoji:63><emoji:64><emoji:187><emoji:146><emoji:116><emoji:67><emoji:60><emoji:185><emoji:76><emoji:124><emoji:118><emoji:78><emoji:119><emoji:79><emoji:120><emoji:121><emoji:77><emoji:122><emoji:123><emoji:201><emoji:203><emoji:204><emoji:202><emoji:200><emoji:194><emoji:193><emoji:211><emoji:210><emoji:198><emoji:206><emoji:290><emoji:292><emoji:226><emoji:215><emoji:237><emoji:214><emoji:235><emoji:222><emoji:217><emoji:221><emoji:225><emoji:241><emoji:227><emoji:238><emoji:240><emoji:229><emoji:216><emoji:218><emoji:233><emoji:219><emoji:244><emoji:232><emoji:243><emoji:223><emoji:231><emoji:224><emoji:278><emoji:239><emoji:230><emoji:273><emoji:75><emoji:74><emoji:46><emoji:112><emoji:56><emoji:169><emoji:171><emoji:59><emoji:144><emoji:147><emoji:89><emoji:41><emoji:125><emoji:42><emoji:43><emoji:86><emoji:129><emoji:85><emoji:5><emoji:311><emoji:312><emoji:314><emoji:317><emoji:318><emoji:319><emoji:320><emoji:324><emoji:325><emoji:337><emoji:338><emoji:339><emoji:341><emoji:342><emoji:343><emoji:344><emoji:345><emoji:346><emoji:114><emoji:326><emoji:53><emoji:137><emoji:333>';
    let reg = /<emoji:(\d+)>/g;
    let ls = [];
    let match = '';
    while (match = reg.exec(qfaces)) {
      ls.push({ id: match[1], type: 1 });
    }

    let emoji_s = '😊|😌|😚|😓|😰|😝|😁|😜|☺|😔|😄|😏|😒|😳|😘|😭|😂|💪|👊|👍|👏|👌|🍜|🍧|🍞|🍺|🍻|☕|🍎|🍓|🍉|🌹|🎉|💝|✨|💨|💦|🔥|💤|📫|👧|👦|🐵|🐮|🐛|🐳|☀|❔|💓'.split('|');
    let emoji_ids = '000|001|002|003|004|005|006|007|008|011|012|013|014|015|016|017|019|020|021|022|024|028|039|041|044|048|049|051|052|054|055|059|060|062|071|072|073|074|077|083|097|098|099|105|109|115|128|134|145'.split('|');
    let arr = [];
    for (let i = 0; i < emoji_ids.length; i++) {
      arr.push({ id: emoji_s[i].codePointAt(), type: 2, sid: emoji_ids[i] });
    }
    this.setData({
      qface_ls: ls,
      emoji_ls: arr
    });
    this.fetch_sets();

    const fs = qq.getFileSystemManager();
    let filePath = qq.env.USER_DATA_PATH + '/faces/qface/s105.gif';
    let sthis = this;
    fs.access({
      path: filePath,
      success: function (res) {
        sthis.ref_faceshow();
      },
      fail: function (error) {
        sthis.setData({
          loadModalS: true
        });
        qq.downloadFile({
          url: `${app.globalData.host.slice(0, app.globalData.host.length - 3)}faces`,
          success: function (res) {
            sthis.setData({
              loadModalS: false
            });
            let zipFilePath = res.tempFilePath;
            let targetPath = qq.env.USER_DATA_PATH + '/faces';
            fs.mkdir({
              dirPath: targetPath,
              success: function () {
                fs.unzip({
                  zipFilePath: zipFilePath,
                  targetPath: targetPath,
                  success: function (res) {
                    sthis.ref_faceshow();
                  },
                  fail: function (error) {
                    qq.showToast({
                      title: '解压表情失败',
                      icon: 'none'
                    });
                  }
                });
              },
              fail: function (error) {
                fs.unzip({
                  zipFilePath: zipFilePath,
                  targetPath: targetPath,
                  success: function (res) {
                    sthis.ref_faceshow();
                  },
                  fail: function (error) {
                    qq.showToast({
                      title: '解压表情失败',
                      icon: 'none'
                    });
                  }
                });
              }
            });
          },
          fail: function (error) {
            sthis.setData({
              loadModalS: false
            });
            qq.showToast({
              title: '下载表情失败',
              icon: 'none'
            });
          }
        });
      }
    });

  },
  data: {
    p: 1,
    qface_ls: [],
    emoji_ls: [],
    userinfo: app.globalData.userinfo,
    channellist: [],
    modalA: '',
    tocaname: '',
    rolesets: {
      fromchannel: '',
      tochannel: '',
      name: '表情表态限制',
      useit: false,
      image: '',
      content: ''
    },
    loadModal: false,
    loadModalS: false
  },
  ref_faceshow() {
    const fs = qq.getFileSystemManager();
    let sthis = this;
    for (let i = 0; i < this.data.qface_ls.length; i++) {
      let s = `qface_ls[${i}].link`;
      let filePath = qq.env.USER_DATA_PATH + `/faces/qface/s${sthis.data.qface_ls[i].id}.gif`;
      fs.access({
        path: filePath,
        success: function (res) {
          sthis.setData({
            [s]: filePath
          });
        },
        fail: function (error) {
          filePath = qq.env.USER_DATA_PATH + `/faces/qface/s${sthis.data.qface_ls[i].id}.png`;
          sthis.setData({
            [s]: filePath
          });
        }
      });
    }
    for (let i = 0; i < this.data.emoji_ls.length; i++) {
      let s = `emoji_ls[${i}].link`;
      let filePath = qq.env.USER_DATA_PATH + `/faces/qemoji/emoji_${sthis.data.emoji_ls[i].sid}.png`;
      sthis.setData({
        [s]: filePath
      });
    }
  },
  selectoneA(e) {
    let index = e.currentTarget.dataset.index;
    let s = `qface_ls[${index}]`;
    this.setData({
      [s]: { ...this.data.qface_ls[index], select: !this.data.qface_ls[index].select }
    });
  },
  selectoneB(e) {
    let index = e.currentTarget.dataset.index;
    let s = `emoji_ls[${index}]`;
    this.setData({
      [s]: { ...this.data.emoji_ls[index], select: !this.data.emoji_ls[index].select }
    });
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
      modalA: ''
    })
  },
  stoc: function (e) {
    this.setData({
      modalA: 'show'
    })
  },
  stopit() {
    return;
  },
  RolesSwitch: function (event) {
    this.setData({
      'rolesets.useit': event.detail.value
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
                this.setData({
                  tocaname: item.name
                });
              }
              return item;
            })
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
              qface_ls: this.data.qface_ls.map(i => {
                return { ...i, select: ret.sets.content.includes(`|${i.id}|`) }
              }),
              emoji_ls: this.data.emoji_ls.map(i => {
                return { ...i, select: ret.sets.content.includes(`|${i.id}|`) }
              })
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
  pclick: function (event) {
    let item = event.currentTarget.dataset.item;
    this.setData({
      modalA: '',
      tocaname: item.name,
      'rolesets.tochannel': item.id
    })
  },
  cancleallc() {
    this.setData({
      qface_ls: this.data.qface_ls.map(i => {
        return { ...i, select: false }
      }),
      emoji_ls: this.data.emoji_ls.map(i => {
        return { ...i, select: false }
      })
    });
  },
  saveall: function () {
    let arr = [...this.data.qface_ls, ...this.data.emoji_ls].filter(i => { return i.select == true; }).map(i => { return `|${i.id}|` }).join('');
    this.setData({
      'rolesets.content': arr
    })
    let s = JSON.parse(JSON.stringify(this.data.rolesets));
    if (s.useit == true) {
      if (s.tochannel == '') {
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
          app.postlog('修改表情表态限制设置');
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
