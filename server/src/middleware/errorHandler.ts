import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';

export interface CustomError extends Error {
  statusCode?: number;
  errors?: ValidationError[];
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // MongoDB duplicate key error
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // MongoDB validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values((error as any).errors).map((val: any) => val.message);
    message = errors.join(', ');
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};