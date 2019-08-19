// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //3.保存的数据
    list:[]
  },
  jumpComment:function(e){
    //页面跳转  用户点击详情按钮后 ，跳转到详情页面
    /*wx.redirectTo({  //关闭并跳转  ， 无法返回
      url: '/pages/comment/comment',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })*/
    //将电影id获取并且跳转时传递comment组件，并在comment获取id
    var id = e.target.dataset.id;
    console.log(id)

    //保留并跳转  ,  允许回退
    wx.navigateTo({                 //传 id
      url: '/pages/comment/comment?id='+id,
    });
  },
  loadMore:function(){
    //1.调用云函数
    //2.将返回的结果保存
    wx.cloud.callFunction({
      name:"movielist3",
      data:{
        start:this.data.list.length,
        count:10
      }
    }).then(res=>{
      var obj=JSON.parse(res.result);
      //保存电影列表
      /** 保留上一页的电影列表 */
        //**保存电影列表的数据 ，将电影列表的数组拼接操作  将拼接后的结果保存起来 */
        //保存电影列表的数据
      var rows = obj.subjects;
        //将电影列表的数组拼接操作
      rows=this.data.list.concat(rows);
        //将拼接后的结果保存起来
      this.setData({    
        list:rows
      })
      console.log(obj.subjects);
    }).catch(err=>{
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //发送请求下载下一页的数据
    this.loadMore();  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})