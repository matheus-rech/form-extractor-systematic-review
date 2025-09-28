import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { 
  getForms, 
  getForm, 
  updateForm, 
  deleteForm 
} from '../controllers/formController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/forms - Get all forms for user
router.get('/', getForms);

// GET /api/forms/:id - Get specific form
router.get('/:id', getForm);

// PUT /api/forms/:id - Update form
router.put('/:id', updateForm);

// DELETE /api/forms/:id - Delete form
router.delete('/:id', deleteForm);

export default router;