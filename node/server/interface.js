const fs = require("fs");
const qs = require("querystring");
const {readFile, eachConfig} = require("../util.js");

module.exports.interfaceList = {
  "/config/nginx/save": (res) => {
    let postData = "";
    let dataFn = (data) => {
      postData += data;
    }
    let endFn = () => {
      let query = qs.parse(postData);
      let data = JSON.parse(query.json);
      console.log(eachConfig(data.nginx, 0));
      res.end("保存成功");
    }
    return {
      dataFn: dataFn,
      endFn: endFn
    }
  },
  "/config/template/empty": (res) => {
    return {
      dataFn: () => {
      },
      endFn: () => {
        res.end(readFile("node/template/complete/empty.json"));
      }
    }
  },
}

