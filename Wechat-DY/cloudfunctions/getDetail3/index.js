//云函数movielist3
//此函数功能：向豆瓣网发送请求
//获取电影详情
//1:引入第三方ajax库 request-promise
var rp = require("request-promise");
//2：创建main函数
exports.main = async (event,context) => {
  //3：创建变量url请求地址
  var url = `http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  //4:请求 rq函数发送请求并且将豆瓣返回
  return rp(url).then(res => {
  //5：返回豆瓣电影详情内容
    return res;
  }).catch(err => {
    console.log(err);
  })
}


/*// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/