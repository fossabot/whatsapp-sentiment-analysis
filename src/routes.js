import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index.html');
});

export default routes;
