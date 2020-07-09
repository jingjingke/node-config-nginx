const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");

/***
 * openPage 用于打开页面
 * @param url 页面地址
 * */
module.exports.openPage = (url) => {
  exec(`open ${url}`);
}

/***
 * readJSON 读取本地JSON文件并返回
 * @param path 文件地址
 * */
module.exports.readJSON = (path) => {
  return JSON.stringify(JSON.parse(fs.readFileSync(path)))
}

/***
 * readFile 读取本地(文本)文件并返回
 * @param path 文件地址
 * @param callBack 读取文件后的回调，接受error,data两个参数
 * */
module.exports.readFile = (path, callBack) => {
  fs.readFile(path, 'utf-8', callBack);
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
 * JSONToString 配置项由json转text的过程
 * @param obj 传入json对象
 * @param num 间隔单位深度
 * */
module.exports.JSONToString = (obj, num) => {
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
          strArr.push(exports.JSONToString(item, num + 1));
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
            strArr.push(exports.JSONToString(item.value, num + 1));
            strArr.push(exports.space(num) + "}");
          }
        });
      }
    } else if (obj[key] instanceof Object) {
      strArr.push("\n" + exports.space(num) + key + " " + "{");
      strArr.push(exports.JSONToString(obj[key], num + 1));
      strArr.push(exports.space(num) + "}");
    }
  }
  return strArr.join("\n");
}

/***
 * StringToJSON 配置项由text转json的过程
 * @param str 传入string对象
 * */
module.exports.StringToJSON = (string) => {
  // 清除多余空格
  string = string.replace(/[^\S(\r\n)(\n)]*#[^\S(\r\n)(\n)]*/g, "#");
  string = string.replace(/[^\S(\r\n)(\n)]*}[^\S(\r\n)(\n)]*/g, "}");
  string = string.replace(/{[^\S(\r\n)(\n)]*/g, "{");
  string = string.replace(/;[^\S(\r\n)(\n)]*/g, ";");
  string = string.replace(/[^\S(\r\n)(\n)]*[(\r\n)(\n)]+[^\S(\r\n)(\n)]*/g, "\n");
  string = string.replace(/[^\S(\r\n)(\n)]+/g, " ");
  // 清除多个相同字符
  string = string.replace(/#+/g, "#");
  string = string.replace(/\n+/g, "\n");

  // 定义返回的JSON
  let tree = new Object();
  // 匹配断句
  let tagArr = string.match(/[#{;}\n]/gi);
  // 记录断句的索引位置
  let indexArr = [];
  for (let i = 0; i < tagArr.length; i++) {
    //添加索引值
    indexArr.push(string.indexOf(tagArr[i]))
    //从字符数据中删除标签
    string = string.replace(tagArr[i], "")
  }
  let i = 0;
  while (i < tagArr.length - 1) {
    i = exports.getTree(tree, string, tagArr, indexArr, i, tagArr.length - 1);
    i++;
  }
  return tree
}

/***
 * exports.getTree 向传入的对象中添加数据结构并返回真实结束索引
 * @param data 传入对象，主要存放数据
 * @param string 传入字符串
 * @param tagArr 断句集合
 * @param indexArr 索引集合
 * @param start 开始索引
 * @param end 结束索引（非真实，只是最大范围）
 * */
module.exports.getTree = (data, string, tagArr, indexArr, start, end) => {
  let pieceIndex = start;
  if (data instanceof Array) {
    if (tagArr[start] === "#") {
      pieceIndex = exports.getPieceIndex("#", tagArr, start, end);
    } else if (tagArr[start] === ";") {
      let labelStr = string.substring(indexArr[start - 1], indexArr[start]);
      let splitIndex = labelStr.indexOf(" ");
      data.push({
        label: labelStr.substring(0, splitIndex),
        value: labelStr.substring(splitIndex, indexArr[start])
      })
    }
  } else if (data instanceof Object) {
    if (!(data.root instanceof Array)) {
      data.root = new Array();
    }
    if (tagArr[start] === "#") {
      pieceIndex = exports.getPieceIndex("#", tagArr, start, end);
    } else if (tagArr[start] === ";") {
      let labelStr = string.substring(indexArr[start - 1], indexArr[start]);
      let splitIndex = labelStr.indexOf(" ");
      data.root.push({
        label: labelStr.substring(0, splitIndex),
        value: labelStr.substring(splitIndex, indexArr[start])
      })
    } else if (tagArr[start] === "{") {
      pieceIndex = exports.getPieceIndex("{", tagArr, start, end);
      let labelArr = String(string.substring(indexArr[start - 1], indexArr[start])).split(" ");
      if (labelArr.length === 2 && ["http", "events"].includes(labelArr[0])) {
        data[labelArr[0]] = new Object();
        let j = start + 1;
        while (j < pieceIndex) {
          j = exports.getTree(data[labelArr[0]], string, tagArr, indexArr, j, pieceIndex);
          j++;
        }
        // exports.getTree(data[labelArr[0]], start+1, pieceIndex, 1);
      } else if (labelArr.length >= 2) {
        if (!(data[labelArr[0]] instanceof Array)) {
          data[labelArr[0]] = new Array();
        }
        if (labelArr.length === 3) {
          data[labelArr[0]].push({
            label: labelArr[1],
            value: new Array()
          })
          let j = start + 1;
          while (j < pieceIndex) {
            j = exports.getTree(data[labelArr[0]][data[labelArr[0]].length - 1].value, string, tagArr, indexArr, j, pieceIndex);
            j++;
          }
          // data[labelArr[0]].push({root: new Array());
        } else {
          data[labelArr[0]].push({
            root: new Array()
          })
          let j = start + 1;
          while (j < pieceIndex) {
            j = exports.getTree(data[labelArr[0]][data[labelArr[0]].length - 1], string, tagArr, indexArr, j, pieceIndex);
            j++;
          }
        }
      }
    }
  }
  return pieceIndex;
}

/***
 * exports.getPieceIndex 获取传入标签并返回真实结束索引
 * @param tag 传入标签
 * @param tagArr 断句集合
 * @param start 开始索引
 * @param end 结束索引（非真实，只是最大范围）
 * */
module.exports.getPieceIndex = (tag, tagArr, start, end) => {
  let pieceIndex = start;
  if (tag === "#") {
    while (pieceIndex < end) {
      pieceIndex++;
      if (tagArr[pieceIndex] === "\n") {
        break;
      }
    }
  } else if (tag === "{") {
    let pieceNum = 0;
    let level = 1;
    while (pieceIndex < end) {
      pieceIndex++;
      if (tagArr[pieceIndex] === "#") {
        pieceIndex = exports.getPieceIndex("#", tagArr, pieceIndex, end);
      } else if (tagArr[pieceIndex] === "{") {
        level++;
      } else if (tagArr[pieceIndex] === "}") {
        pieceNum++;
        if (level === pieceNum) {
          break;
        }
      }
    }
  }
  return pieceIndex;
}

/***
 * writeFile 写入文件内容
 * @param content 文件内容
 * @param path 文件路径
 * */
module.exports.writeFile = (content, path) => {
  exports.mkdirs(path, () => {
    let filePath = path + "/nginx.conf";
    // 写入
    fs.open(filePath, 'w', (error, fd) => {
        fs.appendFile(fd, content, "utf8", (error) => {
          fs.close(fd, (error) => {
            console.log(error)
          })
        });
    });
  });
}

/***
 * mkdirs 创建目录
 * @param dirname 文件夹路径
 * @param callBack 创建成功后回调
 * */
module.exports.mkdirs = (dirname, callBack) => {
  fs.exists(dirname, (exists) => {
    if (exists) {
      callBack();
    } else {
      exports.mkdirs(path.dirname(dirname), () => {
        fs.mkdir(dirname, callBack);
      })
    }
  })
}