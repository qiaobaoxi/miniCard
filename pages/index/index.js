// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUseGetUserProfile: false,
    openId: ""
  },
  onLoad(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow() {
    app.getOpenId().then((res) => {
      if (res) {
        this.setData({
          hasUserInfo: false,
        })
      } else {
        this.setData({
          hasUserInfo: true,
        })
      }
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        let userInfo = res.userInfo
        userInfo.openId = app.globalData.openId;
        app.globalData.axios('/saveUser', {
          userInfo
        }, "post", (data) => {
          if (data.code) {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'error',
              duration: 2000
            })
          }
        })
      }
    })
  }
})