//云函数
//此函数功能：
//获取最新段子列表
//1:引入第三方ajax库 request-promise
var rp = require("request-promise");
//2：创建main函数
exports.main = async (event, context) => {
  //3：创建变量url请求地址
  var url = `https://www.apiopen.top/satinApi?type=1&page=${event.page}`;
  //4:请求 rq函数发送请求并且将段子返回
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
  //5：段子列表返回调用者
}