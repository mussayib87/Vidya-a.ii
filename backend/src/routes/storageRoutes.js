import { Router } from 'express';
import multer from 'multer';
import storageController from '../controllers/storageController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Configure Multer storage in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max
  },
});

router.use(authenticate);

router.post('/upload', upload.single('file'), storageController.uploadFile);
router.post('/signed-url', storageController.getSignedUrl);
router.delete('/file', storageController.deleteFile);

export default router;
