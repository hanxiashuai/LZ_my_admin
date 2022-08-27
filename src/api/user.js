// 专门出来用户相关的网络请求
import request from "@/utils/request";

export function login(data) {
  return request({
    method: "post",
    url: "/api/login",
    data,
  });
};

