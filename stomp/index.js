const config=require('../configs/index.js')
const Stomp=require('stomp-client');
const socketArr=require('../controllers/index.js').socketArr;
const io=require('../controllers/index.js').io;
const blockData=require('../models/index.js').blockData;
const fileData=require('../models/index.js').fileData;
const taskData=require('../models/index.js').taskData;
const userData=require('../models/index.js').userData;
const _=require('lodash');

const client=new Stomp(config.mqConfig.url,config.mqConfig.port,config.mqConfig.opts.user,config.mqConfig.opts.pass);

client.connect(function(session){
	console.log(session);
	client.subscribe(config.mqConfig.opts.destination,function(body,header){
		progressInfo=JSON.parse(body);
		console.log(progressInfo);

		let taskUuid=progressInfo.taskUuid;
		let refUuid=progressInfo.refUuid;
		let indexArr=fnIndex(socketArr,progressInfo.userName);
		blockData.add(progressInfo);

		// console.log(blockData);
		// console.log(fileData);
		// console.log(taskData);
		// console.log(userData);

		if(indexArr.length !== 0){
			_.forEach(indexArr,function(ele){
				socketArr[ele].emit('task update',JSON.stringify(userData.get(taskUuid)));
			});

			_.forEach(taskData.get(taskUuid),function(n,index){
				if(n.refUuid == refUuid){
					io.to(taskUuid).emit('file update',JSON.stringify(n));
				}
			});
		}
	});
});

client.on('error',function(err){
	console.log(err);
})


function fnIndex(arr,userName){
	let _index=[];
	_.forEach(arr,function(ele,index){
		if(ele.userName == userName){
			_index.push(index);
		}
	});
	return _index;
}
