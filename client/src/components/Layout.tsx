import { Outlet } from 'react-router-dom'
import { Box, Flex, Spacer, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../utils/authStore'

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box minHeight="100vh">
      {/* Header */}
      <Box bg={bg} borderBottom="1px" borderColor={borderColor} px={4} py={3}>
        <Flex align="center" maxW="container.xl" mx="auto">
          <Text
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="brand.500"
            _hover={{ textDecoration: 'none' }}
          >
            Form Extractor
          </Text>
          
          <Spacer />
          
          <HStack spacing={4}>
            {isAuthenticated ? (
              <>
                <Button as={RouterLink} to="/dashboard" variant="ghost">
                  Dashboard
                </Button>
                <Button as={RouterLink} to="/extractor" variant="ghost">
                  Extractor
                </Button>
                <Button as={RouterLink} to="/reviews" variant="ghost">
                  Reviews
                </Button>
                <Button as={RouterLink} to="/forms" variant="ghost">
                  Forms
                </Button>
                <Text fontSize="sm" color="gray.600">
                  Welcome, {user?.name}
                </Text>
                <Button onClick={handleLogout} size="sm" variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={RouterLink} to="/login" variant="ghost">
                  Login
                </Button>
                <Button as={RouterLink} to="/register" colorScheme="brand">
                  Register
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout