import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { extractFromHtml, validateExtraction } from '../controllers/extractorController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/extractor/extract - Extract form fields from HTML
router.post('/extract', extractFromHtml);

// PUT /api/extractor/validate/:formId - Validate extracted form
router.put('/validate/:formId', validateExtraction);

export default router;