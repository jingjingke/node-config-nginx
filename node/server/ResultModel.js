/***
 * ResultModel 接口返回数据模型
 * @param code 返回码
 * @param result 返回结果
 * */
class ResultModel {
  constructor(code, result) {
    this.code = code;
    this.result = result;

    switch (code) {
      case '10000':
        this.message = '运行正确';
        break;
      case '20001':
        this.message = '参数错误';
        break;
      case '30001':
        this.message = '地址错误';
        break;
      case '40001':
        this.message = '写入错误';
        break;
      default:
        this.message = '未知错误';
        break;
    }
  }

  getModel() {
    return JSON.stringify({
      code: this.code,
      message: this.message,
      result: this.result
    })
  }
}

module.exports = ResultModel;