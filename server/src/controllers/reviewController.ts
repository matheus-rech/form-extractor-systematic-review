import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { Review } from '../models/Review';

export const createReview = [
  body('title').notEmpty().withMessage('Title is required'),
  body('objective').notEmpty().withMessage('Objective is required'),

  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: { message: 'Validation failed', details: errors.array() }
        });
        return;
      }

      const review = new Review({
        ...req.body,
        userId: req.user!._id
      });

      await review.save();

      res.status(201).json({
        success: true,
        data: { review }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Failed to create review' }
      });
    }
  }
];

export const getReviews = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query: any = {
      $or: [
        { userId: req.user!._id },
        { collaborators: req.user!._id }
      ]
    };
    if (status) query.status = status;

    const reviews = await Review.find(query)
      .populate('userId', 'name email')
      .populate('collaborators', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / Number(limit)),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to get reviews' }
    });
  }
};

export const getReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('collaborators', 'name email');
    
    if (!review) {
      res.status(404).json({
        success: false,
        error: { message: 'Review not found' }
      });
      return;
    }

    // Check if user owns the review or is a collaborator
    const isOwner = review.userId._id.toString() === req.user!._id.toString();
    const isCollaborator = review.collaborators.some(
      collaborator => collaborator._id.toString() === req.user!._id.toString()
    );

    if (!isOwner && !isCollaborator) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to access this review' }
      });
      return;
    }

    res.json({
      success: true,
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to get review' }
    });
  }
};

export const updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      res.status(404).json({
        success: false,
        error: { message: 'Review not found' }
      });
      return;
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to modify this review' }
      });
      return;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: { review: updatedReview }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to update review' }
    });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      res.status(404).json({
        success: false,
        error: { message: 'Review not found' }
      });
      return;
    }

    // Check if user owns the review
    if (review.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to delete this review' }
      });
      return;
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: { message: 'Review deleted successfully' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to delete review' }
    });
  }
};