import express from 'express';
import UsersController from '../controllers/UsersController';

const router = express.Router();

// Endpoint to create a new user
router.post('/', async (req, res, next) => {
  try {
    await UsersController.postNew(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to retrieve the current user
router.get('/me', async (req, res, next) => {
  try {
    await UsersController.getMe(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
