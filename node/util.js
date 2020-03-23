const fs = require("fs");
const {exec} = require("child_process");

/***
 * openPage 用于打开页面
 * @param url 页面地址
 * */
module.exports.openPage = (url) => {
  exec(`open ${url}`);
}

/***
 * readFile 读取本地JSON文件并返回
 * @param path 文件地址
 * */
module.exports.readFile = (path) => {
  return JSON.stringify(JSON.parse(fs.readFileSync(path)))
}

/***
 * space 和于转换空白字符
 * @param num 间隔单位数
 * @param notTab 是否tab，若为tab需要转为4个间隔单位
 * */
module.exports.space = (num, notTab) => {
  let str = "";
  let i = 0;
  while (i < num) {
    str += !notTab ? exports.space(4, true) : " ";
    i++;
  }
  return str;
}


/***
 * labelHold 用于计算衡量label开头与value开头之间的空白
 * @param label字段值
 * */
module.exports.labelHold = (label) => {
  // 预定24个长度
  if (label.length < 24) {
    return label + exports.space(24 - label.length, true);
  } else {
    return label + " ";
  }
}

/***
 * eachConfig 配置项由json转text的过程
 * @param obj 传入json对象
 * @param num 间隔单位深度
 * */
module.exports.eachConfig = (obj, num) => {
  let strArr = [];
  for (let key in obj) {
    if (key === "root") {
      obj[key].forEach((item) => {
        strArr.push(exports.space(num) + exports.labelHold(item.label) + item.value + ";");
      });
    } else if (obj[key] instanceof Array) {
      if (obj[key][0].root instanceof Array) {
        obj[key].forEach((item) => {
          strArr.push("\n" + exports.space(num) + key + " " + "{");
          strArr.push(exports.eachConfig(item, num + 1));
          strArr.push(exports.space(num) + "}");
        });
      } else {
        obj[key].forEach((item) => {
          if (item.value instanceof Array) {
            strArr.push("\n" + exports.space(num) + key + " " + item.label + " " + "{");
            item.value.forEach((sub) => {
              strArr.push(
                exports.space(num + 1) + exports.labelHold(sub.label) + sub.value + ";"
              );
            });
            strArr.push(exports.space(num) + "}");
          } else if (item.value instanceof Object) {
            strArr.push("\n" + exports.space(num) + key + item.label + " " + "{");
            strArr.push(exports.eachConfig(item.value, num + 1));
            strArr.push(exports.space(num) + "}");
          }
        });
      }
    } else if (obj[key] instanceof Object) {
      strArr.push("\n" + exports.space(num) + key + " " + "{");
      strArr.push(exports.eachConfig(obj[key], num + 1));
      strArr.push(exports.space(num) + "}");
    }
  }
  return strArr.join("\n");
}