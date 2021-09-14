// pages/Demo/Demo.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
const api = require('../../api.js');
const app = getApp()
Page({
  data: {

  },
  onLoad: function () {

  },
  trainFind(){
    wx.cloud.init() 
    let key = 'GYNBZ-6QNE4-C3VU4-X4D3O-NNON2-SVBEJ';
    let referer = '地铁足迹系统'; 
    let startPoint =JSON.stringify({  //起点
      //天通苑,40.0752145100,116.4131069183
      'name': '天通苑',
      'latitude': 40.0752145100,
      'longitude': 116.4131069183
  }); 
    let endPoint = JSON.stringify({  //终点
      //南锣鼓巷,39.9331372740,116.4032471180
	      'name': '南锣鼓巷',
	      'latitude': 39.9331372740,
	      'longitude': 116.4032471180
	  });
	  wx.navigateTo({
	   url: 'plugin://subway/index?key=' + key + '&referer=' + referer 
	  });
  },
  routePlanning(){
	  let key = 'GYNBZ-6QNE4-C3VU4-X4D3O-NNON2-SVBEJ';
    let referer =JSON.stringify({  //起点
      //天通苑,40.0752145100,116.4131069183
      'name': '天通苑',
      'latitude': 40.0752145100,
      'longitude': 116.4131069183
  }); 
    let endPoint = JSON.stringify({  //终点
      //南锣鼓巷,39.9331372740,116.4032471180
	      'name': '南锣鼓巷',
	      'latitude': 39.9331372740,
	      'longitude': 116.4032471180
	  });
	  wx.navigateTo({
	      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
	  });
  },
  Location(){
	  let key = 'GYNBZ-6QNE4-C3VU4-X4D3O-NNON2-SVBEJ';
	  let referer = '地铁足迹系统'; 
	  const location = JSON.stringify({
	    latitude: 39.89631551,
	    longitude: 116.323459711
	  });
	  const category = '出行服务';
	   
	  wx.navigateTo({
	    url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
	  });
  },
  GetRequest(){
    let params={
      username:"Clay"
    }
    api.hello(params).then(res => {
         console.log(res);
       })
  },
  PostRequest(){
    let params={
      username:"Clay"
    };
    api.test(params).then(res => {
         console.log(res);
       })
  }
    
})
