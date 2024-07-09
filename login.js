Page({
  data: {
    phoneNumber: '',
    password: ''
  },

  onPhoneNumberInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    });
  },

  onPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  login: function () {
    wx.cloud.callFunction({
      name: 'loginUser',
      data: {
        phoneNumber: this.data.phoneNumber,
        password: this.data.password
      },
      success: res => {
        if (res.result.success) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          wx.setStorageSync('userId', res.result.user.userId); // 存储用户ID
          wx.redirectTo({
            url: '/pages/profile/profile',
          });
        } else {
          wx.showToast({
            title: res.result.error,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '调用云函数失败',
          icon: 'none',
          duration: 2000
        });
        console.error('调用云函数失败：', err);
      }
    });
  },

  navigateToRegister: function () {
    wx.redirectTo({
      url: '/pages/register/register',
    });
  }
});