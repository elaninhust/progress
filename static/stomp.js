window.onload=function(){
	const userName='anni';
	const app=new App(userName);
	app.init();
};

function App(userName){
	this.socket=null;
	this.userName=userName;
}

App.prototype.init=function(){
	_this=this;
	this.socket=io.connect('localhost:2016');

	this.socket.on('connect',function(){
		console.log('连接socket成功！');

		_this.socket.emit('user name',_this.userName);
	});

	this.socket.on('task update',function(data){
		console.log('任务进度更新',JSON.parse(data));
	})

	this.socket.on('file update',function(data){
		console.log('文件进度更新',JSON.parse(data));
	})
};