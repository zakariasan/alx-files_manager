import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

// Endpoint to check if Redis and DB are alive
router.get('/', async (req, res, next) => {
  try {
    await AppController.getStatus(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to get the number of users and files
router.get('/stats', async (req, res, next) => {
  try {
    await AppController.getStats(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
