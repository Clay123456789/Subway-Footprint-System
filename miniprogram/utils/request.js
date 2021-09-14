/**
 * 获取header
 */
function getCommonHeader() {
  let header = {
    'Content-type': 'application/json'
  };
  // 如果token有值则带上
  let token = wx.getStorageSync("token");
 
  if (token) {
    header = Object.assign({}, header, {
      'Authorization': 'Bearer ' + token
    });
  }
  return header;
};
 
/**
 * 网络请求
 */
function request(url, data = {}, header = {}, method = "POST", config = {}) {
 
  // header 空值处理
  let _header = {
    "content-type": "application/json"
  };
  if (Object.keys(header).length > 0) {
    _header = header;
  }
 
  let showToast = true,
    showLoading = true,
    loadingTitle = "加载中";
  // 默认显示toast
  if (config['showToast'] != undefined && config['showToast'] == false) {
    showToast = false;
  }
  // 默认显示loading
  if (config['showLoading'] != undefined && config['showLoading'] == true) {
    showLoading = true;
  }
  if (config['loadingTitle']) {
    loadingTitle = config['loadingTitle'];
  }
 
  return new Promise((resolve, reject) => {
    // 是否显示loading
    if (showLoading) {
      wx.showLoading({ title: loadingTitle, icon: 'none', mask: true });
    }
 
    wx.request({
      url: url,
      data: data,
      header: _header,
      method: method,
      success: (res => {
        
        if (showLoading) {
          wx.hideLoading();
        }
 
        // 服务器 非200 错误
        if (res.statusCode && res.statusCode != 200) {
          wx.showToast({ title: '服务器 ' + res.statusCode + ' 错误', icon: 'none' });
          reject(res);
          return;
        }
 
        if (res.data && res.data.Success == false) {
          // 业务状态非0 是否提示
          if (showToast) {
            wx.showToast({ title: res.data.ServerMsg, icon: 'none' });
          }
          reject(res);
          return;
        }
        resolve(res.data);
      }),
      fail: (err => {
        if (showLoading) {
          wx.hideLoading();
        }
        if (err.errMsg.indexOf('url not in domain list') > -1) {
          wx.showToast({ title: '请求url不在合法域名中', icon: 'none' });
        }
        if(err.errMsg.indexOf('timeout')){
          wx.showToast({ title: '请求超时，请稍后重试', icon: 'none' });
        }
        reject(err);
      })
    });
  });
};
 
 
/**
 * get 网络请求
 */
function getRequest(url, data = {}, header = {}, config = {}){
  return request(url, data, header, "GET",config);
}
 
/**
 * post 网络请求
 */
function postRequest(url, data = {}, header = {}, config = {}){
  return request(url, data, header, "POST",config);
}
 
/**
 * put 网络请求
 */
function putRequest(url, data = {}, header = {}, config = {}){
  return request(url, data, header, "PUT",config);
}
 
/**
 * delete 网络请求
 */
function deleteRequest(url, data = {}, header = {}, config = {}){
  return request(url, data, header, "DELETE", config);
}
 
module.exports = {
  getCommonHeader,
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
}