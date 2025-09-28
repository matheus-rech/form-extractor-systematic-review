// Shared TypeScript type definitions

export interface User {
  _id: string
  name: string
  email: string
  role: 'researcher' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface Form {
  _id: string
  title: string
  description?: string
  htmlContent: string
  extractedFields: FormField[]
  extractedAt: string
  userId: string
  reviewId?: string
  metadata: {
    sourceUrl?: string
    extractionMethod: 'manual' | 'automatic'
    confidence?: number
    processingTime?: number
  }
  status: 'pending' | 'validated' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface FormField {
  name: string
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  value?: string
  attributes?: Record<string, string>
}

export interface Review {
  _id: string
  title: string
  description?: string
  objective: string
  keywords: string[]
  researchQuestions: string[]
  inclusionCriteria: string[]
  exclusionCriteria: string[]
  userId: string
  collaborators: string[]
  status: 'planning' | 'active' | 'completed' | 'paused'
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: any
  }
}