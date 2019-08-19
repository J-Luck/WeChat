// pages/home/home.js
const db = wx.cloud.database();
const app = getApp()
Page({
  // 页面的初始数据
  data: {
    fileIDsArr:[],
    babypic:'',
    uname:'',
    bir:'',
    imagewidth: 320, // 缩放后的宽
    imageheight: 0, // 缩放后的高
  },

  imageUtil: function (e) {
    var imageSize = {};
    var originalWidth = 320;          //e.detail.width; // 图片原始宽
    var originalHeight = e.detail.height; // 图片原始高
    console.log(originalWidth + ":"+originalHeight)
    var originalScale = originalHeight / originalWidth; /*图片高宽比*/
    //console.log(originalScale)
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = 320;          //res.windowWidth;                    //res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;   /*屏幕高宽比*/
        //console.log(windowscale)
        if (originalScale < windowscale) { // 图片高宽比小于屏幕高宽比
          //图片缩放后的宽为屏幕宽
          //imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else { // 图片高宽比大于屏幕高宽比
          //图片缩放后的高为屏幕高
          imageSize.imageHeight = windowHeight;
          //imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      }
    })
    return imageSize;
  },

  imageLoad: function (e) {
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  //用户点击相册跳转album组件，选择相册上传照片
   upload: function () {
    wx.switchTab({
       url: '../album/album'
     })
  },
  
  //用户点击跳转addBaby组件，修改宝宝信息
  babyMsg: function (e) {
    wx.navigateTo({
      url: '/pages/addBaby/addBaby',
    });
  },
  onLoad() {
    //console.log(app.globalData._id)
    db.collection('user').doc('890198e15d4cd5910f51814e64bdcb83').get().then(res=>{
      const photos=res.data.albums[0].photos;
      //console.log(photos)
      const babypic=res.data.babyMsgs.babypic
      const uname=res.data.babyMsgs.uname
      const bir=res.data.babyMsgs.bir
      let fileIDsArr=[]
      for (var i in photos){
        var temp={
          fileId:photos[i].fileID
        }
        //console.log(temp)
        fileIDsArr.push(temp)
      }
    //console.log(fileIDsArr)
      const that=this
      that.setData({
        fileIDsArr:fileIDsArr,
        babypic: babypic,
        uname: uname,
        bir: bir
      })
      console.log(that.data.babypic)
      //console.log(that.data.fileIDsArr)
      //console.log('222222:'+that.data.bir)
      //console.log('222222:'+that.data.uname)
    }).catch(err=>{
      console.log(err)
    })
  }
  
})
