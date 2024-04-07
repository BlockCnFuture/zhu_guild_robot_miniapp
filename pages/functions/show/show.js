const app = getApp();
Page({
  onReady() {
    const ctx = wx.createCanvasContext('watermarkCanvas', this);
    // 绘制水印
    this.drawWatermark(ctx);
    ctx.draw();
  },
  drawWatermark(ctx) {
    // 设置水印样式
    ctx.setFontSize(14);
    ctx.setTextAlign('center');
    ctx.rotate(-30 * Math.PI / 180);  // 设置水印旋转角度

    let text = '此为用户发言，不代表《初遇小竹》官方立场';
    let width = wx.getSystemInfoSync().windowWidth + 600;
    let height = wx.getSystemInfoSync().windowHeight + 600;

    let k = 0;

    for (let x = -width; x < width; x += 300) { //水平间距
      for (let y = -height; y < height; y += 40) { //垂直间距

        if (k == 0) {
          ctx.setFillStyle('rgba(0, 0, 0, 0.1)');
          ctx.fillText(text, x, y);
          k = 1;
        } else {
          ctx.setFillStyle('rgba(255, 255, 255, 0.2)');
          ctx.fillText(text, x, y);
          k = 0;
        }
      }
    }
  },
  onShareAppMessage: function () {
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
    });
    return {
      title: '初遇小竹',
      path: `/pages/functions/show/show?guildID=${app.globalData.userinfo.open_guild_id}&i=${app.globalData.userinfo.query.i}`
    }
  },
  onShow() {
    this.LoadTast();
  },
  stopit: function () {
    return;
  },
  CopyText(e) {
    qq.setClipboardData({
      data: e.currentTarget.dataset.cc,
      success: res => {
        qq.showToast({
          title: '已复制内容',
          icon: 'none',
        })
      }
    })
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
    code: -1,
    content: null,
    level: false,
    admin: false,
    showad: true
  },
  check_level(roles) {
    for (let role of roles) {
      let n = Number(role);
      if (!isNaN(n) && n >= 11 && n <= 35) {
        return n - 10;
      }
    }
    return 0;
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
  fetch_cinfo: function () {
    if (!this.data.code) return;
    this.setData({
      loadModal: true
    })
    qq.request({
      url: `${app.globalData.host.slice(0, app.globalData.host.length - 4)}/s/w${this.data.code}?ref=${Date.now()}`,
      success: (data) => {
        let ret = data.data;
        if (ret.errcode == 0) {
          this.setData({
            loadModal: false,
            content: ret.data
          });
          if (ret.data.member && ret.data.member.roles) {
            let level = this.check_level(ret.data.member.roles);
            let admin = false;
            if (ret.data.member.roles.includes('7')) admin = '分组管理员';
            if (ret.data.member.roles.includes('5')) admin = '子频道管理员';
            if (ret.data.member.roles.includes('2')) admin = '超级管理员';
            if (ret.data.member.roles.includes('4')) admin = '频道主';
            let entertime = new Date(ret.data.member.joined_at).getTime();
            this.setData({
              level: level,
              admin: admin,
              enterDays: app.longtime2s(new Date().getTime() - entertime, true),
              enterAt: ret.data.member.joined_at.replace('+08:00', '').replace('T', ' ')
            });
          }
        } else {
          this.setData({
            loadModal: false
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
          loadModal: false
        })
        qq.showToast({
          title: '数据加载失败',
          icon: 'none'
        })
      }
    })
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  },
  viewhead(e) {
    let url = e.currentTarget.dataset.url;
    qq.previewImage({
      urls: [url],
      current: url
    });
  }
})