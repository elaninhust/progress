const http=require('http');
const express=require('express');

let app=express();
let server=http.createServer(app);

module.exports={
	app:app,
	server:server
};