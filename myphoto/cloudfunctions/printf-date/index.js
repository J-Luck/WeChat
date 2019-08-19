// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event) => {
  const newdate = event.ms.getFullYear() + "/" + (event.ms.getMonth() + 1) + "/" + event.ms.getDate() + "/ " + event.ms.getHours() + ":" + event.ms.getMinutes() + ":" + event.ms.getSeconds();
  return {
     newdate
    }
  }