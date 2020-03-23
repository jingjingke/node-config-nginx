const qs = require("querystring");
const http = require("http");
const url = require("url");

const {interfaceList} = require("./interface.js");

/***
 * runNode 启动Node,监听指定端口
 * @param port 端口号
 * */
module.exports.runNode = (port) => {
  let server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("content-type", "text/html;charset=UTF-8");
    if (req.method === "POST") {
      let params = url.parse(req.url, true, true);
      if (Object.hasOwnProperty.call(interfaceList, params.path)) {
        let callBack = interfaceList[params.path](res);
        if (callBack.dataFn) {
          req.addListener("data", callBack.dataFn);
        }
        if (callBack.endFn) {
          req.addListener("end", callBack.endFn);
        }
      } else {
        res.end("不正确的路由");
      }
    } else {
      res.end("请使用POST请求");
    }
  });
  server.listen(port, () => {
    console.log("Node服务已经启动,端口号为：" + port);
  });
}
