// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getOpenId(){
     // 登录
     return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.globalData.axios('/userInfoByCode',{code:res.code},"post",(data)=>{
            if(data.code===0){
              this.globalData.openId=data.data.openId;
              resolve(!data.code);
            }else{
              if(res.code){
                this.globalData.openId=data.data.openId;
                resolve(!data.code);
              }else{
                reject(data);
              }
            }
          })
        }
      }) 
     })
  },
  globalData: {
    userInfo: null,
    url:"http://127.0.0.1:7001",
    openId:"",
    axios(url,data,method,callback){
      wx.request({
        url: this.url+url, //仅为示例，并非真实的接口地址
        data: data,
        method:method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          callback(res.data)
        }
      })
    }
  }
})
