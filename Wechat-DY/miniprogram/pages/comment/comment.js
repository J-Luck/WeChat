// pages/comment/comment.js
const db = wx.cloud.database({
  env:"jj2785402562-slkh9"
})        //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',  //输入框中的内容
    score: 4,   //分数
    movieid:"", //电影id值
    list:[],    //保存电影信息
    images:[],   //保存选中的图片
    fileIDS:[]    //上传成功保存fielD

  },
  mysubmit(){
    //提交按钮  将选中的图片上传到云存储中
    //将云存储中的fileID 一次性保存在云数据
    //1.在data中添加属性fileIDS:[]
    //2.显示加载动画提示框“正在提交中”
    wx.showLoading({
      title: '正在提交中……',
    })
    //3.上传到云存储
      //3.1创建promise数组【保存promise对象】
    var promiseArr = [];
      //3.2创建一个循环遍历选中的图片
    for(var i=0;i<this.data.images.length;i++){
      //3.3创建promise对象(负责上传一张图片的任务 并且保存id在数组中)
      promiseArr.push(new Promise((reslove,reject)=>{
        //3.3.1获取当前图片 
        var item = this.data.images[i];
        //3.3.2创建正则表达式拆分文件后缀名.jpg .gif .png
        var suffix = /\.\w+$/.exec(item)[0];
        //3.3.3上传图片并且将fileID保存在数组中
        //3.3.4为图片创建新的文件名
                          //    时间戳          随机数                     后缀名
        var newFile = new Date().getTime()+Math.floor(Math.random()*9999)+suffix;
        wx.cloud.uploadFile({
          cloudPath:newFile,  //新文件名
          filePath:item,      //选中文件
          success:res=>{      //上传成功
            //3.3.5上传成功拼接fileID
            var fid = res.fileID;
            var ids = this.data.fileIDS.concat(fid);
            this.setData({
              fileIDS:ids
            });
            //3.3.6将当前promise任务追加在任务列表中
            reslove();
          },
          files:err=>{        //上传失败
            //3.3.7上传失败输出错误信息
            console.log(err);
          }
        })
      }));  //promise end
    }//for end
    //将云存储中的fileID 一次性保存在云数据库集合中
    //4.在云数据库中添加集合comment 用于保存评论的内容与文件的id
    //5.等待数组中所有Promise任务结束
    Promise.all(promiseArr).then(res=>{
      //6.回调函数中
      //6.1在程序的最顶端初始化数据库
      //7.将评论内容，分数，电影i，上传图片所有id添加集合中
      db.collection("comment")  //指定集合
      .add({              //添加数据
        data:{            //数据
          content: this.data.value,      //评论内容
          score: this.data.score,        //评论分数
          movieid: this.data.movieid,    //电影id
          fileIds: this.data.fileIDS     //图片fileID
        }
      }).then(res=>{
        //8.隐藏加载提示框
        wx.hideLoading();     //隐藏加载提示框
        //9.显示提示框“发表成功”
        wx.showToast({
          title: '发表成功'
        })
      }).catch(err=>{
        //10.添加集合失败
        console.log(err)
        //11.隐藏加载提示框
        wx.hideLoading();     //隐藏加载提示框
        //12.显示提示框“评论失败”
        wx.showToast({
          title: '发表失败'
        })
      })
    })
  },
  selectImage(){
    //用户选择9张图片，并且保存在data中
    //1.在data中添加数组属性 image
    //2.调用wx.chooseImage选中图片
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:res=> {
        var files = res.tempFilePaths;
        this.setData({
          images:files
        });
      },
    })
    //3.将选中的9张图片保存在images中

  },
  onContentChange(event) {   /* 输入框对应的评论 */
    // event.detail 为当前输入的值
    this.setData({
      value:event.detail
    })
  },
  onScoreChange(event) {  /* 小星星  评价 */
    this.setData({
      score: event.detail,
    });
  },
  loadMore(){  //获取云函数返回的数据
    //1.接收电影列表传递参数id
    var id = this.data.movieid
    //2.显示数据加载提示框
    wx.showLoading({
      title: '加载中……',
    })
    //3.调用云函数
    wx.cloud.callFunction({
      name:"getDetail3",    //云函数名称
      data:{
        id: id
      }
    //4.获取云函数返回结果
    }).then(res=>{
      //4.1将云函数返回字符串转js对象
      var obj = JSON.parse(res.result);
      //4.2将js对象保存deail
      this.setData({
        list: obj
      })
      //4.3隐藏加载提示框
      wx.hideLoading()
      console.log(obj);
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.接收电影列表传递参数id
    //保存在data中movieid中
    this.setData({
      movieid: options.id
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})