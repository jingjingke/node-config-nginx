import axios from "axios";
import qs from "qs";

let requestHeader = {};
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    if (config.requestHeader === "json") {
      config.headers = Object.assign(
        config.headers || {},
        requestHeader || {},
        {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json;charset:utf-8",
        }
      );
      if (config.method === "post") {
        // 序列化
        config.data = JSON.stringify(config.data);
      }
    } else {
      config.headers = Object.assign(
        config.headers || {},
        requestHeader || {},
        {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      );
      if (config.method === "post") {
        // 序列化
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/***
 * request 简单接口请求（$net）
 * @param url 接口url
 * @param requestObj 请求参数相关（现在只是一个简单的请求方式和参数，后面可以定主header相关参数）
 * @param successBack 成功回调
 * @param errorBack 失败回调
 * */
let request = (url, requestObj, successBack, errorBack) => {

  let postParams = {
    url: url
  };

  if (requestObj.method === 'get') {
    postParams.method = 'get';
    postParams.params = requestObj.params;
  } else {
    postParams.method = 'post';
    postParams.data = requestObj.params;
  }

  axios
    .request(postParams)
    .then(
      response => {
        if (response.data.code === '10000') {
          if (successBack) successBack(response.data);
        } else if (errorBack) {
          errorBack(response.data);
        } else {
          alert(typeof response.data === 'string' ? response.data : response.data.message
          )
        }
        return response;
      }
    )
    .catch(err => {
      if (errorBack) {
        errorBack(err)
      } else {
        console.log(err);
      }
    });
}

export default request;