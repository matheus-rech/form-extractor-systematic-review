import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { FormExtractorService } from '../services/extractor';
import { Form } from '../models/Form';

export const extractFromHtml = [
  body('htmlContent').notEmpty().withMessage('HTML content is required'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('sourceUrl').optional().isURL().withMessage('Source URL must be valid'),

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

      const { htmlContent, title, description, sourceUrl } = req.body;

      // Extract form fields from HTML
      const extractionResult = await FormExtractorService.extractFromHtml(htmlContent);

      // Save extracted form to database
      const form = new Form({
        title: title || 'Extracted Form',
        description,
        htmlContent,
        extractedFields: extractionResult.fields,
        userId: req.user!._id,
        metadata: {
          sourceUrl,
          extractionMethod: 'automatic',
          confidence: extractionResult.confidence,
          processingTime: extractionResult.processingTime
        }
      });

      await form.save();

      res.status(201).json({
        success: true,
        data: {
          form,
          extraction: {
            fieldsCount: extractionResult.fields.length,
            confidence: extractionResult.confidence,
            processingTime: extractionResult.processingTime
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Extraction failed' }
      });
    }
  }
];

export const validateExtraction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { formId } = req.params;
    const { status, validatedFields } = req.body;

    const form = await Form.findById(formId);
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

    form.status = status;
    if (validatedFields) {
      form.extractedFields = validatedFields;
    }

    await form.save();

    res.json({
      success: true,
      data: { form }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error instanceof Error ? error.message : 'Validation failed' }
    });
  }
};