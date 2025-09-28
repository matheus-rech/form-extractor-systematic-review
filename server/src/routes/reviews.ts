import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createReview,
  getReviews, 
  getReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviewController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/reviews - Create review
router.post('/', createReview);

// GET /api/reviews - Get all reviews for user
router.get('/', getReviews);

// GET /api/reviews/:id - Get specific review
router.get('/:id', getReview);

// PUT /api/reviews/:id - Update review
router.put('/:id', updateReview);

// DELETE /api/reviews/:id - Delete review
router.delete('/:id', deleteReview);

export default router;