import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  title: string;
  description?: string;
  objective: string;
  keywords: string[];
  researchQuestions: string[];
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  userId: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  status: 'planning' | 'active' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  objective: {
    type: String,
    required: true,
    trim: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  researchQuestions: [{
    type: String,
    trim: true
  }],
  inclusionCriteria: [{
    type: String,
    trim: true
  }],
  exclusionCriteria: [{
    type: String,
    trim: true
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['planning', 'active', 'completed', 'paused'],
    default: 'planning'
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ userId: 1, createdAt: -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ collaborators: 1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);