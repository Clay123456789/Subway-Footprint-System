const utils = require('./utils/request');
const baseUrl = 'http://10.28.173.235:8888/'; 
 
module.exports = {
 
  // GET示例
  hello: function (data, config = {}) {
    return utils.getRequest(
      `${baseUrl}hello`,
      data,
      utils.getCommonHeader(),
      config
    );
  },
 
   // post示例
   test: function (data, config = {}) {
    return utils.postRequest(
      `${baseUrl}test`,
      data,
      utils.getCommonHeader(),
      config
    );
  },
}