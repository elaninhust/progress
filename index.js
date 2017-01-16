const config=require('./configs/index.js');
const socketio=require('./controllers/index.js').socketio;
const express=require('express');
const server=require('./server/server.js').server;
const app=require('./server/server.js').app;
require('./stomp/index.js');

app.use('/',express.static(__dirname+'/static'));

server.listen(config.app.port,function(){
	console.log('server starts at localhost:'+config.app.port);
})
