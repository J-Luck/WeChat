//云函数movielist3
//此函数功能：向豆瓣网发送请求
//获取最新热映电影列表
//1:引入第三方ajax库 request-promise
var rp = require("request-promise");
//2：创建main函数
exports.main = async (event, context) => {
  //3：创建变量url请求地址  https://www.apiopen.top/journalismApi
  var url = event.url;
  console.log(url)
  //4:请求 rq函数发送请求并且将豆瓣返回
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
  //5：电影列表返回调用者
}