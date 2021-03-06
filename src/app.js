import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const DBService = require('../services/dbService');
const app = express();

var multer  = require('multer');
app.use(multer({
  dest: path.join(__dirname, '../uploads/')
}).any());

app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error.html', {
      message: err.message
    });
});

DBService.initTable();

export default app;
