// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  goIds(e){
    var url = e.currentTarget.dataset.lurl;
    console.log(url)
    wx.navigateTo({                 //传 id
      url: 'ids/ids?url=' + url,
    });
  },
  loadMore(){
    //调用云函数
    wx.cloud.callFunction({
      name:"user",
      data:{
        url:'https://www.apiopen.top/journalismApi'
      }
    }).then(res=>{
      var obj = JSON.parse(res.result);
      var rows = obj.data;
      this.setData({
        list: rows
      })
      console.log(rows)
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore()
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