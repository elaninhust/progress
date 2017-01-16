//开发环境
let config = {
  app: {    //server配置
    url:'localhost',
    port: 2016
  },
  debug:true,
  env:'development',
  mqConfig: { // stomp配置
    url: '172.16.1.88',
    port:61613,
    opts:{
      user:'admin',
      pass:'admin',
      destination:'/queue/FirstQueue1'
    }
  }
};

module.exports=config
