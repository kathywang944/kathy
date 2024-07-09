Page({
  data: {
    userInfo: {
      avatarUrl: '/images/default-avatar.png',
      dogCount: 0,
      daysCount: 0
    }
  },

  onLoad: function () {
    const userId = wx.getStorageSync('userId');
    if (userId) {
      this.getUserInfo(userId);
    }
  },

  navigateToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  },

  getUserInfo: function (userId) {
    const db = wx.cloud.database();
    db.collection('users').doc(userId).get({
      success: res => {
        this.setData({
          userInfo: res.data
        });
      },
      fail: err => {
        console.error('获取用户信息失败:', err);
      }
    });
  }
});