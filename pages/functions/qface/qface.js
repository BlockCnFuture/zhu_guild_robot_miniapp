const app = getApp();
Page({
  data: {
    qface_ls: [],
    emoji_ls: [],
    content: '',
    showad: true,
    downloadi: 0,
    loadModalS: false
  },
  onLoad() {
    let qfaces = '<emoji:5><emoji:311><emoji:312><emoji:314><emoji:317><emoji:318><emoji:319><emoji:320><emoji:324><emoji:325><emoji:337><emoji:338><emoji:339><emoji:341><emoji:342><emoji:343><emoji:344><emoji:345><emoji:346><emoji:181><emoji:74><emoji:114><emoji:75><emoji:326><emoji:53><emoji:137><emoji:333><emoji:9999><emoji:14><emoji:1><emoji:2><emoji:3><emoji:4><emoji:6><emoji:7><emoji:8><emoji:9><emoji:10><emoji:11><emoji:12><emoji:13><emoji:0><emoji:15><emoji:16><emoji:96><emoji:18><emoji:19><emoji:20><emoji:21><emoji:22><emoji:23><emoji:24><emoji:25><emoji:26><emoji:27><emoji:28><emoji:29><emoji:30><emoji:31><emoji:32><emoji:33><emoji:34><emoji:35><emoji:36><emoji:37><emoji:38><emoji:39><emoji:97><emoji:98><emoji:99><emoji:100><emoji:101><emoji:102><emoji:103><emoji:104><emoji:105><emoji:106><emoji:107><emoji:108><emoji:305><emoji:109><emoji:110><emoji:111><emoji:172><emoji:182><emoji:179><emoji:173><emoji:174><emoji:212><emoji:175><emoji:178><emoji:177><emoji:180><emoji:176><emoji:183><emoji:262><emoji:263><emoji:264><emoji:265><emoji:266><emoji:267><emoji:268><emoji:269><emoji:270><emoji:271><emoji:272><emoji:277><emoji:307><emoji:306><emoji:281><emoji:282><emoji:283><emoji:284><emoji:285><emoji:293><emoji:286><emoji:287><emoji:288><emoji:289><emoji:294><emoji:297><emoji:298><emoji:299><emoji:300><emoji:301><emoji:322><emoji:323><emoji:332><emoji:336><emoji:334><emoji:347><emoji:348><emoji:303><emoji:302><emoji:295><emoji:49><emoji:66><emoji:63><emoji:64><emoji:187><emoji:146><emoji:116><emoji:67><emoji:60><emoji:185><emoji:76><emoji:124><emoji:118><emoji:78><emoji:119><emoji:79><emoji:120><emoji:121><emoji:77><emoji:122><emoji:123><emoji:201><emoji:203><emoji:204><emoji:202><emoji:200><emoji:194><emoji:193><emoji:211><emoji:210><emoji:198><emoji:206><emoji:290><emoji:292><emoji:226><emoji:215><emoji:237><emoji:214><emoji:235><emoji:222><emoji:217><emoji:221><emoji:225><emoji:241><emoji:227><emoji:238><emoji:240><emoji:229><emoji:216><emoji:218><emoji:233><emoji:219><emoji:244><emoji:232><emoji:243><emoji:223><emoji:231><emoji:224><emoji:278><emoji:239><emoji:230><emoji:273><emoji:46><emoji:112><emoji:56><emoji:169><emoji:171><emoji:59><emoji:144><emoji:147><emoji:89><emoji:41><emoji:125><emoji:42><emoji:43><emoji:86><emoji:129><emoji:85><emoji:9999><emoji:9999><emoji:9999><emoji:9999>';
    let reg = /<emoji:(\d+)>/g;
    let ls = [];
    let match = '';
    while (match = reg.exec(qfaces)) {
      ls.push({ str: `<emoji:${match[1]}>`, id: match[1] });
    }
    let emoji_s = '😊|😌|😚|😓|😰|😝|😁|😜|☺|😍|😔|😄|😏|😒|😳|😘|😭|😱|😂|💪|👊|👍|👏|👎|🙏|👌|👆|👀|🍜|🍧|🍞|🍺|🍻|☕|🍎|🍓|🍉|🚬|🌹|🎉|💝|💣|✨|💨|💦|🔥|💤|💩|💉|📫|🐎|👧|👦|🐵|🐷|🐮|🐔|🐸|👻|🐛|🐶|🐳|👢|☀|❔|🔫|💓|🏪'.split('|');
    let emoji_ids = '000|001|002|003|004|005|006|007|008|010|011|012|013|014|015|016|017|018|019|020|021|022|024|026|027|028|031|033|039|041|044|048|049|051|052|054|055|057|059|060|062|067|071|072|073|074|077|080|081|083|091|097|098|099|101|105|106|107|108|109|111|115|121|128|134|143|145|162'.split('|');
    let arr = [];
    for (let i = 0; i < emoji_ids.length; i++) {
      arr.push({ str: emoji_s[i], id: emoji_s[i].codePointAt(), type: 2, sid: emoji_ids[i] });
    }
    this.setData({
      qface_ls: ls,
      emoji_ls: arr
    });

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
  onSearchInput: function (event) {
    let s = event.detail.value;
    if (s == '') {
      this.setData({
        qface_ls: this.data.qface_ls.map(i => { return { ...i, hiden: false } }),
        emoji_ls: this.data.emoji_ls.map(i => { return { ...i, hiden: false } })
      });
    } else {
      this.setData({
        qface_ls: this.data.qface_ls.map(i => {
          return { ...i, hiden: !i.str.toLowerCase().includes(s.toLowerCase()) }
        }),
        emoji_ls: this.data.emoji_ls.map(i => { return { ...i, hiden: true } })
      });
    }
  },
  qfaceadd(e) {
    let item = e.currentTarget.dataset.value;
    this.setData({
      content: item.str
    });
  },
  aderr() {
    this.setData({
      showad: false
    });
  },
  adsucc() {
    this.setData({
      showad: true
    });
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
  copystr: function (event) {
    qq.setClipboardData({
      data: event.currentTarget.dataset.c,
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  }
})