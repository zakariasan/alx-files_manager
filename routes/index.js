// routes/index.js
// routes/index.js
import express from 'express';
import appRoutes from './appRoutes';
import usersRoutes from './usersRoutes';
import authRoutes from './authRoutes';
import filesRoutes from './filesRoutes';

const router = express.Router();

// Mount the routes
router.use('/status', appRoutes);
router.use('/stats', appRoutes);
router.use('/users', usersRoutes);
router.use('/connect', authRoutes);
router.use('/disconnect', authRoutes);
router.use('/files', filesRoutes);

export default router;
