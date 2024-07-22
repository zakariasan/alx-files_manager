import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// Endpoint for user sign-in
router.get('/', async (req, res, next) => {
  try {
    await AuthController.getConnect(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint for user sign-out
router.get('/disconnect', async (req, res, next) => {
  try {
    await AuthController.getDisconnect(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
