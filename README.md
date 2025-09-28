# Form Extractor Systematic Review

A comprehensive full-stack application designed to extract and process forms from HTML documents for systematic review purposes.

## 🚀 Features

- **Form Extraction**: Intelligent extraction of form elements from HTML documents
- **Systematic Review Tools**: Purpose-built for academic and research systematic reviews
- **Full-Stack Architecture**: Modern React frontend with Node.js/Express backend
- **Scalable Structure**: Well-organized codebase supporting maintainability and growth
- **API-First Design**: RESTful APIs for seamless integration

## 📁 Project Structure

```
form-extractor-systematic-review/
├── client/                     # Frontend React application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── styles/           # CSS/SCSS styles
│   │   ├── utils/            # Utility functions
│   │   └── assets/           # Images, fonts, etc.
├── server/                    # Backend Node.js application
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── services/         # Business logic
│   │   └── utils/            # Server utilities
│   ├── tests/                # Server tests
│   └── config/               # Configuration files
├── docs/                     # Documentation
├── scripts/                  # Build and deployment scripts
└── shared/                   # Shared utilities and types
```

## 🛠️ Technologies

### Frontend
- **React 18+** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Material-UI/Chakra UI** - Component library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB/PostgreSQL** - Database
- **JWT** - Authentication
- **Express Validator** - Input validation
- **Jest** - Testing framework

### DevOps & Tools
- **ESLint & Prettier** - Code formatting
- **Husky** - Git hooks
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB/PostgreSQL (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/matheus-rech/form-extractor-systematic-review.git
   cd form-extractor-systematic-review
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run test` - Run all tests
- `npm run lint` - Lint both frontend and backend
- `npm start` - Start production server
- `npm run clean` - Clean all node_modules

## 📖 API Documentation

API documentation is available at `/docs/api.md` or when running the server at `http://localhost:3001/api-docs`.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run server tests only
npm run server:test

# Run client tests only
npm run client:test
```

## 🚢 Deployment

```bash
# Build for production
npm run build

# Deploy (configure your deployment targets)
npm run deploy
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for systematic review research workflows
- Designed with academic and research communities in mind
- Inspired by modern full-stack development practices