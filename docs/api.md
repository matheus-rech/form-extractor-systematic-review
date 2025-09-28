# API Documentation

## Base URL
`http://localhost:3001/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "researcher"
    },
    "token": "jwt_token"
  }
}
```

#### POST /auth/login
Login with existing credentials.

#### GET /auth/profile
Get current user profile (requires authentication).

### Form Extraction

#### POST /extractor/extract
Extract form fields from HTML content.

#### PUT /extractor/validate/:formId
Validate and update extracted form.

### Forms Management

#### GET /forms
Get all forms for the authenticated user.

#### GET /forms/:id
Get a specific form by ID.

#### PUT /forms/:id
Update a form.

#### DELETE /forms/:id
Delete a form.

### Reviews Management

#### POST /reviews
Create a new systematic review.

#### GET /reviews
Get all reviews for the authenticated user.

For complete API documentation with request/response examples, see the full documentation.