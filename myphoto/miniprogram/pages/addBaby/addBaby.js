// pages/addBaby/addBaby.js
const regeneratorRuntime = require('../common/regenerator-runtime.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifName: true,
    msg:"",
    sort:"",
    babyMsg:{
      babypic:"/images/fruit/add.png",
      uname:"",
      sex:"",
      bir:"",
      height:"",
      weight:""
    }
  },

  //上传或修改宝宝头像
  chooseImage(){
    wx.chooseImage({//选图片
      count: 1,//张数
      sizeType: ['original', 'compressed'],//原图//压缩图
      sourceType: ['album', 'camera'],//相册相机
      success: res => {
        console.log(res.tempFilePaths)
        var babypic = 'babyMsg.babypic';
        this.setData({ 
          [babypic]:res.tempFilePaths
        })
      }
    })
  },

  //添加或修改宝宝各个信息
  stuName(e){
    this.setData({
      ifName:!this.data.ifName
    })
    this.sort=e.currentTarget.dataset.sort; 
  },

  
  //修改信息输入框取消
  cancel(){
    this.setData({
      ifName:true
    })
  },
  
  //按确定按钮修改对应的信息
  confirm(){
    if(this.sort == "name") {
      var uname = 'babyMsg.uname';
      this.setData({
        [uname]:this.data.msg
      })
    }else if (this.sort == "sex") {
      var sex= 'babyMsg.sex';
      this.setData({
        [sex]: this.data.msg
      })
    }else if (this.sort == "bir") {
      var bir = 'babyMsg.bir';
      this.setData({
        [bir]: this.data.msg
      })
    } else if (this.sort == "height") {
      var height = 'babyMsg.height';
      this.setData({
        [height]: this.data.msg
      })
    } else if (this.sort == "weight") {
      var weight = 'babyMsg.weight';
      this.setData({
        [weight]: this.data.msg
      })
    }
    this.setData({
      ifName:true
    })
    console.log(this.data.babyMsg)
  },

  //添加宝宝信息到user记录中
  addbabyMsg:function(){
      
      const db = wx.cloud.database( )
     
    // 写入集合
    db.collection('user').doc(app.globalData.id).update({
        data: {
          babyMsgs:this.data.babyMsg  
        }
      }).then((res)=> {
        wx.showToast({
          title: '添加信息成功',
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '../album/album'
          })
        },1500)
        console.log('添加信息成功', res)
      }).catch((err)=>{
        console.log("添加信息失败",err)
        wx.showToast({
          title: '添加信息失败',
        })
      })
    },

  //获取输入框输入的信息
  setValue(e){
    this.setData({
      msg: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})