const fs = require("fs");
const qs = require("querystring");
const {readFile, eachConfig} = require("../util.js");
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
      console.log(eachConfig(data.nginx, 0));
      res.end(new ResultModel("10000", "保存成功").getModel());
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
      res.end(new ResultModel("10000", eachConfig(JSON.parse(qs.parse(postData).json).nginx, 0)).getModel());
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
        res.end(new ResultModel("10000", JSON.parse(readFile("node/template/complete/empty.json"))).getModel());
      }
    }
  },
}

