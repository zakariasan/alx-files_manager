import express from 'express';
import FilesController from '../controllers/FilesController';

const router = express.Router();

// Endpoint to upload a new file
router.post('/', async (req, res, next) => {
  try {
    await FilesController.postUpload(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to get a file by ID
router.get('/:id', async (req, res, next) => {
  try {
    await FilesController.getShow(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to list files with pagination
router.get('/', async (req, res, next) => {
  try {
    await FilesController.getIndex(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to publish a file
router.put('/:id/publish', async (req, res, next) => {
  try {
    await FilesController.putPublish(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to unpublish a file
router.put('/:id/unpublish', async (req, res, next) => {
  try {
    await FilesController.putUnpublish(req, res);
  } catch (error) {
    next(error);
  }
});

// Endpoint to get file content
router.get('/:id/data', async (req, res, next) => {
  try {
    await FilesController.getFile(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
