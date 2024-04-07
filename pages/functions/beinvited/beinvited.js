const app = getApp();
Page({
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '邀请你加入频道',
      path: `/pages/functions/beinvited/beinvited?guildID=${app.globalData.userinfo.open_guild_id}&i=${app.globalData.userinfo.query.i}`
    }
  },
  onShow() {
    this.LoadTast();
    this.StartCheck();
  },
  LoadTast: function () {
    let index = app.globalData.userinfo.query.i;
    if (index == undefined) {
      index = 0;
    } else {
      index = Number(index);
    }
    if (index > 0) {
      this.setData({
        code: index
      })
      this.fetch_cinfo();
    }
  },
  data: {
    userinfo: app.globalData.userinfo,
    rolesets: {},
    code: false,
    clkid: null,
    hasenter: false,
  },
  StartCheck() {
    if (!this.data.clkid) this.data.clkid = setInterval(this.CheckTask, 600);
  },
  CheckTask() {
    let sthis = this;
    if (sthis.data.rolesets.guildid) {
      qq.getGuildInfo({
        open_guild_id: sthis.data.rolesets.guildid,
        success(res) {
          let encryptedData = res.encryptedData;
          let iv = res.iv;
          if (encryptedData.length >= 200) {
            clearInterval(sthis.data.clkid);
            sthis.setData({
              hasenter:true
            });
            try {
              let pack = {
                encryptedData: encryptedData,
                iv: iv,
                token: app.globalData.token,
                code: sthis.data.code,
                head: sthis.data.userinfo.member_head
              };
              qq.request({
                url: `${app.globalData.host}/decodedata_invite`,
                data: pack,
                method: 'POST',
                success: res => {

                },
                fail: res => {

                }
              })
            } catch (e) { }
          }
        },
        fail(err) {
          //clearInterval(sthis.data.clkid);
        },
      })
    }
  },
  RefreshCallBack: function () {
    if (JSON.stringify(this.data.userinfo) != JSON.stringify(app.globalData.userinfo)) {
      let index = app.globalData.userinfo.query.i;
      if (index == undefined) {
        index = 0;
      } else {
        index = Number(index);
      }
      this.setData({
        userinfo: app.globalData.userinfo
      })

      if (index > 0) {
        this.setData({
          code: index
        })
        this.fetch_cinfo();
      }
    }
  },
  fetch_cinfo: function () {
    if (!this.data.code) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host}/fetchinvitecode_info/${app.globalData.token}/${this.data.code}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            rolesets: ret.data
          })
        } else {
          this.setData({
            loadModal: false,
            rolesets: {}
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
          loadModal: false,
          rolesets: {}
        })
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  }
})