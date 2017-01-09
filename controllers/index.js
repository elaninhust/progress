const socket=require('socket.io');
const _=require('lodash');
const server=require('../server/server.js').server;
const socketArr=[];
const io=socket(server);

io.on('connection',function(socket){
	socket.userName='';
	socket.roomInfo=[];

	socketArr.push(socket);

	socket.on('user name',function(userName){
		socket.userName=userName;
		console.log(socket.userName+'上线了',socketArr.length)
	});

	socket.on('detail on',function(taskUuid){
		socket.join(taskUuid);
		console.log('加入房间'+taskUuid);
	});

	socket.on('detail off',function(taskUuid){
		socket.leave(taskUuid);
		console.log('离开房间'+taskUuid);
	})

	socket.on('disconnect',function(){
		_.remove(socketArr,socket);
		console.log(socket.userName+'下线了',socketArr.length)
	})
})



io.on('error',function(err){
	console.log(err);
})

module.exports={
	io:io,
	socketArr:socketArr
};



