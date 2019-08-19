// pages/mymovie/mymovie.js
const db = wx.cloud.database({
  env: "jj2785402562-slkh9"       //初始化数据库并指定环境
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conten:"",  //用户输入的文字
    file:{}     //选中的图片
  },
  myupload(){
    //选择一张图片
    wx.chooseImage({
      count:1,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success: (res)=>{
        var file = res.tempFilePaths[0]; //获取选中的图片
        //将选中的图片保存data
        //1.在data添加属性file 表示选中图片
        //2.将选中图片保存
        this.setData({
          file:file
        })
      },
    })
  },
  mysubmit(){
    //提交按钮 上传图片 保存在云函数中
    //1.获取上传的图片
    var f = this.data.file;
    //2.截取文件后缀名
    var suffix = /\.\w+$/.exec(f)[0]
    //3.创建新文件名
    var newFile = new Date().getTime() + suffix;
    //4.获取用户评论内容
    var c = this.data.conten;
    //5.上传文件操作
    wx.cloud.uploadFile({
      cloudPath:newFile,  //新文件名
      filePath:f,         //选中文件
      success:res=>{
        console.log(res.fileID)
        //5.1如果文件上传成功 获取fileID
        var fId = res.fileID;
        //5.2将fileID评论内容添加到数据库
        //5.3提示发表信息成功提示框
        db.collection("mymovie").add({
          data:{
            fileId:fId,
            content:c
          }
        }).then(res=>{
          wx.showToast({
            title: '发表成功',
          })
        }).catch(err=>{
          wx.showToast({
            title: '发表失败',
          })
        })
      },
      file:err=>{
        console.log(err);
      }
    })
  },
  onContentChange(event) {   //输入框
    // event.detail 为当前输入的值
    console.log(event.detail);  
    //获取用户输入的留言内容
    this.setData({
      conten: event.detail
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