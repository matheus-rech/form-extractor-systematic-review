import { useState } from 'react'
import {
  Box,
  Container,
  Card,
  CardBody,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../services/api'
import { useAuthStore } from '../utils/authStore'
import toast from 'react-hot-toast'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, token } = response.data.data
      login(user, token)
      toast.success('Welcome back!')
      
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Login failed'
      setError(message)
      toast.error(message)
    },
  })

  const onSubmit = (data: LoginForm) => {
    setError(null)
    loginMutation.mutate(data)
  }

  return (
    <Box py={20} minHeight="calc(100vh - 80px)" display="flex" alignItems="center">
      <Container maxW="md">
        <Card>
          <CardBody p={8}>
            <VStack spacing={6}>
              <Heading size="lg" textAlign="center">
                Sign In
              </Heading>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <Text color="red.500" fontSize="sm">
                        {errors.email.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                    />
                    {errors.password && (
                      <Text color="red.500" fontSize="sm">
                        {errors.password.message}
                      </Text>
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    width="100%"
                    isLoading={loginMutation.isPending}
                  >
                    Sign In
                  </Button>
                </VStack>
              </Box>

              <Text textAlign="center">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/register" color="brand.500">
                  Sign up
                </Link>
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default LoginPage