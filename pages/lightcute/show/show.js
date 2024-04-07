const app = getApp();
Page({
  onLoad(option) {
    if (option.info) {
      let data = JSON.parse(decodeURIComponent(option.info));
      data.replay = JSON.parse(data.replay);
      this.setData({
        content: data
      })
    }
  },
  data: {
    content: null
  },
  ViewImage(e) {
    let url = e.currentTarget.dataset.url;
    let item = e.currentTarget.dataset.item;
    qq.previewImage({
      urls: item.imgs,
      current: url
    });
  }
})