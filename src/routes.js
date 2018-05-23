import { Router } from 'express';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
var routes = Router();
var ChatService = require('../services/chatService');

/**
 * GET home page
 */
routes.get('/', (req, res) => {	
  res.render('index', {result: null});
});	

/**
 * POST upload records
 */
routes.post('/upload', (req, res) => {
  fs.readFileAsync(req.files[0].path, 'utf8').then(function(data){
  	 ChatService.process(data).then(function(){
  	 	res.send('File uploaded!');
  	 });
  }).catch(function (err) {
	 	res.status(500).send(err);
	});

});

routes.get('/result', (req, res) => {
  	ChatService.getAnalysisResult(function(result){
  		res.render('index', {result: result});
  	});
});	


export default routes;
