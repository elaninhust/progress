// progressInfo={ 
// 	speed: 10,
// 	percent: 50,
// 	userName: 'anni',
// 	refUuid: '01',
// 	blockName: '001',
// 	blockUuid: '0011',
// 	blockCount: 3,
// 	timeStamp: 1483003452676,
// 	taskUuid:11111
// }

const _=require('lodash');

// const blockStorage=20;
const blockData=new BlockData();
const fileData=new FileData();
const taskData=new TaskData();
const userData=new UserData();
//文件块的一个集合
function BlockData(){
	this.keys=[];
}

//增
BlockData.prototype.add=function(progressInfo){
	// console.log(this.exist(progressInfo),1);
	if(!this.exist(progressInfo)){
		this.keys.push(progressInfo.refUuid);
		this[progressInfo.refUuid]=[];
		this[progressInfo.refUuid].push(progressInfo);
		this[progressInfo.refUuid].sort(function(a,b){
			return a.blockUuid<b.block_uuid;
		})

	}else{
		let index=_.findIndex(this[progressInfo.refUuid],function(ele){
			return ele.blockUuid === progressInfo.blockUuid;
		});
		if(index === -1){
			this[progressInfo.refUuid].push(progressInfo);
			this[progressInfo.refUuid].sort(function(a,b){
				return a.blockUuid - b.blockUuid;
			})
		}else{
			this[progressInfo.refUuid][index]=_.merge(this[progressInfo.refUuid][index],progressInfo,function(a,b){
				if(this[progressInfo.refUuid][index].timeStamp > progressInfo.timeStamp){
					return a;
				}else{
					return b;
				}
			})
		}
	}
	fileData.init(this);
}

//删
BlockData.prototype.delete=function(taskUuid){
	var _this=this;
	_.forEach(_this.keys,function(refUuid){
		if(_this[refUuid][0].taskUuid==taskUuid){
			_this[refUuid]=null;
			_.remove(_this.keys,refUuid);
		}
	})
}

//检测是否存在
BlockData.prototype.exist=function(progressInfo){
	if(this[progressInfo.refUuid]){
		return true;
	}else{
		return false;
	}
}


//文件数据集合
function FileData(){}

FileData.prototype.init=function(blockData){
	_this=this;
	this.keys=[];
	_.forEach(blockData.keys,function(fileInfo){
		let speed=0,
		percent=0,
		userName=blockData[fileInfo][0].userName,
		blockCount=blockData[fileInfo][0].blockCount,
		taskUuid=blockData[fileInfo][0].taskUuid;

		_.forEach(blockData[fileInfo],function(n,index){
			speed+=Number(n.speed);
			percent+=Number(n.percent);
		})

		_this.keys.push(fileInfo);
		_this[fileInfo]={
			speed:speed,
			percent:(percent/blockCount).toFixed(4),
			userName:userName,
			taskUuid:taskUuid,
			blockCount:blockCount,
			refUuid:fileInfo
		};
	});

	// taskData=new TaskData(this);
	taskData.init(this);
}


//任务数据集合
function TaskData(fileData){
	this.keys=[];
	// this.init(fileData);
}


TaskData.prototype.init=function(fileData){
	_this=this;
	this.clear();
	_.forEach(fileData.keys,function(taskInfo){
		if(!_this[fileData[taskInfo].taskUuid]){
			_this[fileData[taskInfo].taskUuid]=[];
			_this.keys.push(fileData[taskInfo].taskUuid);
			_this[fileData[taskInfo].taskUuid].push({
				refUuid:fileData[taskInfo].refUuid,
				speed:fileData[taskInfo].speed,
				percent:fileData[taskInfo].percent,
				userName:fileData[taskInfo].userName,
				blockCount:fileData[taskInfo].blockCount,
			});
		}else{
			_this[fileData[taskInfo].taskUuid].push({
				refUuid:fileData[taskInfo].refUuid,
				speed:fileData[taskInfo].speed,
				percent:fileData[taskInfo].percent,
				userName:fileData[taskInfo].userName,
				blockCount:fileData[taskInfo].blockCount,
			});
		}
	})

	// userData=new UserData(this);
	userData.init(this);
}

TaskData.prototype.clear=function(){
	_this=this;
	_.forEach(this.keys,function(ele){
		_this[ele]=null;
	});
	this.keys=[];
}

TaskData.prototype.get=function(key){
	return this[key];
}

//用户数据集合
function UserData(taskData){
	this.keys=[];
	// this.init(taskData);
}

UserData.prototype.init=function(taskData){
	_this=this;
	this.clear();
	_.forEach(taskData.keys,function(userInfo){
		let speed=0,
			percent=0,
			count=0,
			userName=taskData[userInfo][0].userName,
			taskUuid=userInfo;
		_.forEach(taskData[userInfo],function(n,index){
			speed+=Number(n.speed);
			percent+=Number(n.percent);
		});
		_this.keys.push(taskUuid);
		_this[taskUuid]={
			speed:speed,
			percent:percent,
			taskUuid:taskUuid,
			userName:userName,
		};
	})
}

UserData.prototype.clear=function(){
	_this=this;
	_.forEach(this.keys,function(ele){
		_this[ele]=null;
	});
	this.keys=[];
}

UserData.prototype.get=function(key){
	return this[key];
}

module.exports= {
	blockData:blockData,
	fileData:fileData,
	taskData:taskData,
	userData:userData,
}
















