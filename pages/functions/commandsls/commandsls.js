const app = getApp()
Page({
  data: {
    clist: [...app.globalData.clist, ...app.globalData.qclist].map(i => { return { ...i, show: true } }),
    oclist: [...app.globalData.oclist, ...app.globalData.pclist].map(i => { return { ...i, show: true } }),
    Headlines: [{
      id: 0,
      title: "小竹是私域，私域指令可省略艾特"
    }, {
      id: 1,
      title: "有权限要求的指令默认只有频道主可用"
    }, {
      id: 3,
      title: "可前往首页分配指令使用权限"
    }]
  },
  copycommand: function (event) {
    qq.setClipboardData({
      data: '/' + event.currentTarget.dataset.c,
      success: function () {
        qq.showToast({
          title: '已复制',
          icon: 'none'
        })
      }
    })
  },
  onSearchInput: function (event) {
    let s = event.detail.value;
    let listA = this.data.clist;
    let listB = this.data.oclist;
    if (s == '') {
      this.setData({
        clist: listA.map(i => { return { ...i, show: true } }),
        oclist: listB.map(i => { return { ...i, show: true } })
      });
    } else {
      this.setData({
        clist: listA.map(item => { return { ...item, show: item.c.toLowerCase().includes(s.toLowerCase()) } }),
        oclist: listB.map(item => { return { ...item, show: item.c.toLowerCase().includes(s.toLowerCase()) } })
      });
    }
  }
})