import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ExtractorPage from './pages/ExtractorPage'
import ReviewsPage from './pages/ReviewsPage'
import FormsPage from './pages/FormsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Box minHeight="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="extractor" element={
            <ProtectedRoute>
              <ExtractorPage />
            </ProtectedRoute>
          } />
          <Route path="reviews" element={
            <ProtectedRoute>
              <ReviewsPage />
            </ProtectedRoute>
          } />
          <Route path="forms" element={
            <ProtectedRoute>
              <FormsPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Box>
  )
}

export default App