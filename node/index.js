const {openPage} = require("./util.js");
const {runNode} = require("./server/index.js");

// 打开Vue页面
openPage('http://localhost:8080');

// 启动Node服务
runNode("3000")