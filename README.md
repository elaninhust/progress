# 这是一个利用node/stomp.js/socket.io实现后端实时推送数据的简单功能。

## DONE

- ./index.js 入口js文件
- ./configs 环境配置参数文件夹
- ./server node服务端相关
- ./static web前端静态资源
- ./stomp stomp-client相关
- ./models 数据模型相关
- ./controllers socket.io相关

## TODO

- 删除算法；当每条任务传输完成时，或者当单条任务一定时间段未更新时，及时清除缓存中的相应数据。

## 环境搭建

1. 安装node
2. 命令行进入到progress文件夹，执行`npm index.js`命令
