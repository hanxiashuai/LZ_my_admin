// 专门出来用户相关的网络请求
import request from "@/utils/request";
//获取文章标题的接口

export function expents() {
  return request({
    method: "get",
    url: "/api/allarticle",
  });
}
//根据id获取内容的接口
export function article(id) {
  return request({
    method: "get",
    url: "/api/article",
    params: {
      id,
    },
  });
}
//上传文章内容
export function table(value, text, title, time, contentText) {
  return request({
    method: "post",
    url: "/api/table",
    data: {
      content: value,
      text: text,
      title: title,
      time: time,
      contentText: contentText,
    },
  });
}
//修改内容的接口
export function Modifyarticle(id, value) {
  return request({
    method: "post",
    url: "/api/Modifyarticle",
    data: {
      id: id,
      content: value,
    },
  });
}
//修改内容的删除
export function delectinterface(id) {
  return request({
    method: "delete",
    url: "/api/delectinterface",
    data: {
      id: id,
    },
  });
}
//获取所有集团信息
export function groups() {
  return request({
    method: "get",
    url: "/api/groups",
  });
}
//根据id获取内容信息
export function doctors(id) {
  return request({
    method: "get",
    url: "/api/getDoct",
    params:{
    groupId:id
    }
  });
}
//获取全部医生内容信息
export function doctor(){
    return request({
        method: "get",
        url: "/api/doctors",
      });
}
