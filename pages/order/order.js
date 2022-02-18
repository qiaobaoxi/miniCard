// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [{
      name: "",
      phone: "",
      id: "",
      imgs: []
    }],
    url:app.globalData.url,
    unit: "",
    car: "",
    reason:"",
    office:"",
    officer:"",
    manager:[],
    index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios("/getManager",'get',{},(data)=>{
       if(data.code){
        this.setData({manager:data.data.result})
       }else{
        wx.showToast({
          title: data.msg,
          icon: 'error',
          duration: 2000
        }) 
       }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  FnGetName(e) {
    this.data.info[e.target.dataset.index].name = e.detail.value
    this.setData({
      info: this.data.info
    })
  },
  FnGetPhone(e) {
    this.data.info[e.target.dataset.index].phone = e.detail.value
    this.setData({
      info: this.data.info
    })
  },
  FnGetId(e) {
    this.data.info[e.target.dataset.index].id = e.detail.value
    this.setData({
      info: this.data.info
    })
  },
  FnChangeInfo(e) {
    if (Number(e.target.dataset.key) === 1) {
      this.data.info.unshift({
        name: "",
        phoen: "",
        id: "",
        imgs: []
      })
    } else {
      this.data.info.splice(Number(e.target.dataset.index))
    }
    this.setData({
      info: this.data.info
    })
  },
  FnUpload(e) {
    console.log(this.data.info[Number(e.target.dataset.index)].imgs.length)
    if(this.data.info[Number(e.target.dataset.index)].imgs.length>=3){
      return  wx.showToast({
        title: '只能上传3张图',
        icon: 'error',
        duration: 2000
      })
   }
    wx.chooseImage({
      success:(res)=> {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.url+"/upload", //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success:(res)=> {
            this.data.info[Number(e.target.dataset.index)].imgs.push(JSON.parse(res.data).url)
            this.setData({
              info: this.data.info
            })
          }
        })
      }
    })
  },
  FnClose(e){
    this.data.info[e.target.dataset.index].imgs.splice(Number(e.target.dataset.idx))
    this.setData({
      info: this.data.info
    })
  },
  bindPickerChange(e){
     this.setData({index:e.detail.value})
  },
  FnGetUnit(){

  },
  FnGetCar(){

  },
  FnGetReason(){

  },
  FnGetOffice(){

  },
  FnSubmit() {
    for(let item of this.data.info){
      console.log(item)
      if(!item.name){
        return  wx.showToast({
          title: '访问姓名不能空',
          icon: 'error',
          duration: 2000
        })
      }
      if(item.phone&&!(/^1[34578]\d{9}$/.test(item.phone))){
        return  wx.showToast({
          title: '手机号码不正确',
          icon: 'error',
          duration: 2000
        })
      }
      if(item.id&&item.id.length!==18){
        return  wx.showToast({
          title: '身份证不正确',
          icon: 'error',
          duration: 2000
        })
      }
    }
    if(!this.data.unit){
      return  wx.showToast({
        title: '采访单位不能空',
        icon: 'error',
        duration: 2000
      })
    }
    if(!this.data.reason){
      return  wx.showToast({
        title: '采访事由不能空',
        icon: 'error',
        duration: 2000
      })
    }
    if(this.data.index===""){
      return  wx.showToast({
        title: '请选择访问担当',
        icon: 'error',
        duration: 2000
      })
    }
    app.globalData.axios('/addVisiter',{info:JSON.stringify(this.data.info),unit:this.data.unit,car:this.data.car,reason:this.data.reason,office:this.data.office,officer:this.data.manager[this.data.index].name,openId:app.globalData.openId},"post",(data)=>{
      if(data.code){
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 2000
        }) 
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'error',
          duration: 2000
        }) 
      }
    })
  }
})