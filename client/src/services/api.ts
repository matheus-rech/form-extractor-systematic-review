import axios from 'axios'
import { useAuthStore } from '../utils/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
}

// Forms API
export const formsApi = {
  getForms: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get('/forms', { params }),
  getForm: (id: string) => api.get(`/forms/${id}`),
  updateForm: (id: string, data: any) => api.put(`/forms/${id}`, data),
  deleteForm: (id: string) => api.delete(`/forms/${id}`),
}

// Extractor API
export const extractorApi = {
  extractFromHtml: (data: {
    htmlContent: string
    title?: string
    description?: string
    sourceUrl?: string
  }) => api.post('/extractor/extract', data),
  validateExtraction: (formId: string, data: { status: string; validatedFields?: any }) =>
    api.put(`/extractor/validate/${formId}`, data),
}

// Reviews API
export const reviewsApi = {
  createReview: (data: any) => api.post('/reviews', data),
  getReviews: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get('/reviews', { params }),
  getReview: (id: string) => api.get(`/reviews/${id}`),
  updateReview: (id: string, data: any) => api.put(`/reviews/${id}`, data),
  deleteReview: (id: string) => api.delete(`/reviews/${id}`),
}

export default api