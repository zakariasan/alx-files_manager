// routes/index.js
// routes/index.js
import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

// Define routes and link them to the controller methods
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);  // Add this line for the new endpoint

// Export a function to use the routes in the app
export default (app) => {
  app.use('/', router);
};
