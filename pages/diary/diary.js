Page({
  data: {
    dogDiaries: []
  },

  onLoad: function () {
    this.getDogDiaries();
  },

  getDogDiaries: function () {
    const userId = wx.getStorageSync('userId');  // 获取存储的用户ID

    wx.cloud.callFunction({
      name: 'getDogDiaries',
      data: {
        userId
      },
      success: res => {
        if (res.result.success) {
          this.setData({
            dogDiaries: res.result.data
          });
        } else {
          console.error('Error:', res.result.error);
        }
      },
      fail: err => {
        console.error('Call function failed:', err);
      }
    });
  }
});
