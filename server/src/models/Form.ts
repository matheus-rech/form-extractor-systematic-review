import mongoose, { Document, Schema } from 'mongoose';

export interface IFormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  value?: string;
  attributes?: Record<string, string>;
}

export interface IForm extends Document {
  title: string;
  description?: string;
  htmlContent: string;
  extractedFields: IFormField[];
  extractedAt: Date;
  userId: mongoose.Types.ObjectId;
  reviewId?: mongoose.Types.ObjectId;
  metadata: {
    sourceUrl?: string;
    extractionMethod: 'manual' | 'automatic';
    confidence?: number;
    processingTime?: number;
  };
  status: 'pending' | 'validated' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const formFieldSchema = new Schema<IFormField>({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['text', 'email', 'number', 'select', 'checkbox', 'radio', 'textarea', 'file']
  },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String },
  options: [{ type: String }],
  value: { type: String },
  attributes: { type: Schema.Types.Mixed }
});

const formSchema = new Schema<IForm>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  extractedFields: [formFieldSchema],
  extractedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  },
  metadata: {
    sourceUrl: { type: String },
    extractionMethod: {
      type: String,
      enum: ['manual', 'automatic'],
      required: true
    },
    confidence: { type: Number, min: 0, max: 1 },
    processingTime: { type: Number }
  },
  status: {
    type: String,
    enum: ['pending', 'validated', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes for better performance
formSchema.index({ userId: 1, createdAt: -1 });
formSchema.index({ reviewId: 1 });
formSchema.index({ status: 1 });

export const Form = mongoose.model<IForm>('Form', formSchema);