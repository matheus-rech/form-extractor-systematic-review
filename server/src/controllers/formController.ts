import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Form } from '../models/Form';

export const getForms = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, reviewId } = req.query;
    
    const query: any = { userId: req.user!._id };
    if (status) query.status = status;
    if (reviewId) query.reviewId = reviewId;

    const forms = await Form.find(query)
      .populate('reviewId', 'title')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Form.countDocuments(query);

    res.json({
      success: true,
      data: {
        forms,
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
      error: { message: error instanceof Error ? error.message : 'Failed to get forms' }
    });
  }
};

export const getForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const form = await Form.findById(req.params.id).populate('reviewId', 'title');
    
    if (!form) {
      res.status(404).json({
        success: false,
        error: { message: 'Form not found' }
      });
      return;
    }

    // Check if user owns the form
    if (form.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to access this form' }
      });
      return;
    }

    res.json({
      success: true,
      data: { form }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to get form' }
    });
  }
};

export const updateForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const form = await Form.findById(req.params.id);
    
    if (!form) {
      res.status(404).json({
        success: false,
        error: { message: 'Form not found' }
      });
      return;
    }

    // Check if user owns the form
    if (form.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to modify this form' }
      });
      return;
    }

    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: { form: updatedForm }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to update form' }
    });
  }
};

export const deleteForm = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const form = await Form.findById(req.params.id);
    
    if (!form) {
      res.status(404).json({
        success: false,
        error: { message: 'Form not found' }
      });
      return;
    }

    // Check if user owns the form
    if (form.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        error: { message: 'Not authorized to delete this form' }
      });
      return;
    }

    await Form.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: { message: 'Form deleted successfully' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Failed to delete form' }
    });
  }
};