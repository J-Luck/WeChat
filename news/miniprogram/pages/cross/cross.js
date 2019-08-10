// pages/cross/cross.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    ids: '1000',
    i:1
  },
  videoPlay(e){
    // 上个一视频id
    var prev_id = this.data.ids;
    //本视频id
    var id = e.currentTarget.id;
    //console.log(prev_id,id)
    //判断暂停
    if(id == prev_id){
      var str = this.data.i+=1;
      //console.log(str)
      this.setData({
        i:str
      })
      if(str%2==0){
        wx.createVideoContext(id).pause();
        return;
      }
    }
    this.setData({
      ids: id
    })
    // 停止上一个视频播放
    wx.createVideoContext(prev_id).pause();
    // 延迟500ms，再播放本视频
    setTimeout(function () {
      wx.createVideoContext(id).play();
    }, 500)
  },
  newsMore: function () {
    //1.调用云函数
    //2.将返回的结果保存
    wx.cloud.callFunction({
      name: "crosslists",
      data: {
        page: 1
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      //保存段子列表
      /** 保留上一页的段子列表 */
      //**保存段子列表的数据 ，将段子列表的数组拼接操作  将拼接后的结果保存起来 */
      //保存段子列表的数据
      var rows = obj.data;
      //将拼接后的结果保存起来
      this.setData({
        list: rows
      })
      console.log(rows);
    }).catch(err => {
      console.log(err);
    });
  },
  loadMore: function () {
    //1.调用云函数
    //2.将返回的结果保存
    wx.cloud.callFunction({
      name: "crosslists",
      data: {
        page: 1
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      //保存段子列表
      /** 保留上一页的段子列表 */
      //**保存段子列表的数据 ，将段子列表的数组拼接操作  将拼接后的结果保存起来 */
      //保存段子列表的数据
      var rows = obj.data;
      //将段子列表的数组拼接操作
      rows = this.data.list.concat(rows);
      //将拼接后的结果保存起来
      this.setData({
        list: rows
      })
      console.log(rows);
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.newsMore();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})