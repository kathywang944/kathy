register: function () {
  wx.cloud.callFunction({
    name: 'registerUser',
    data: {
      phoneNumber: this.data.phoneNumber,
      password: this.data.password
    },
    success: res => {
      if (res.result.success) {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        });
        wx.setStorageSync('userId', res.result.user.userId); // 存储用户ID
        wx.redirectTo({
          url: '/pages/profile/profile',
        });
      } else {
        wx.showToast({
          title: res.result.error.message,
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