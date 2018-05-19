import { Router } from 'express';
var dragDrop = require('drag-drop');
var fs = require('fs');
var routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {

  res.render('index.html');
});

/**
 * POST upload records
 */
routes.post('/upload', (req, res) => {
  fs.readFile(req.files[0].path,'utf8', function(err, data){
    if (err) throw err;
  });
  res.render('index.html');
});

export default routes;
