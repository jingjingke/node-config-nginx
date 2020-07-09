const fs = require("fs");
const qs = require("querystring");
const {readJSON, readFile, writeFile, JSONToString, StringToJSON} = require("../util.js");
const ResultModel = require("./ResultModel.js");

module.exports.interfaceList = {
  "/config/nginx/save": (res) => {
    let postData = "";
    let dataFn = (data) => {
      postData += data;
    }
    let endFn = () => {
      let query = qs.parse(postData);
      let data = JSON.parse(query.json);
      try {
        writeFile(JSONToString(data.nginx, 0), query.path);
        res.end(new ResultModel("10000", "保存成功").getModel());
      } catch (error) {
        res.end(new ResultModel("40001", error.message).getModel());
      }

    }
    return {
      dataFn: dataFn,
      endFn: endFn
    }
  },
  "/config/nginx/preview": (res) => {
    let postData = "";
    let dataFn = (data) => {
      postData += data;
    }
    let endFn = () => {
      res.end(new ResultModel("10000", JSONToString(JSON.parse(qs.parse(postData).json).nginx, 0)).getModel());
    }
    return {
      dataFn: dataFn,
      endFn: endFn
    }
  },
  "/config/nginx/read": (res) => {
    let postData = "";
    let dataFn = (data) => {
      postData += data;
    }
    let endFn = () => {
      let query = qs.parse(postData);
      readFile(query.path + '/nginx.conf', (error, data) => {
        if (error) {
          console.log(error);
          res.end(new ResultModel("30001", '未读取到配置,请检查路径是否正确').getModel());
        } else {
          res.end(new ResultModel("10000", StringToJSON(data)).getModel());
        }
      });
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
        res.end(new ResultModel("10000", JSON.parse(readJSON("node/template/complete/empty.json"))).getModel());
      }
    }
  },
}

