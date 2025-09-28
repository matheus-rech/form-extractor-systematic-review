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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../services/api'
import { useAuthStore } from '../utils/authStore'
import toast from 'react-hot-toast'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      const { user, token } = response.data.data
      login(user, token)
      toast.success('Account created successfully!')
      navigate('/dashboard', { replace: true })
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Registration failed'
      setError(message)
      toast.error(message)
    },
  })

  const onSubmit = (data: RegisterForm) => {
    setError(null)
    const { confirmPassword, ...registerData } = data
    registerMutation.mutate(registerData)
  }

  const password = watch('password')

  return (
    <Box py={20} minHeight="calc(100vh - 80px)" display="flex" alignItems="center">
      <Container maxW="md">
        <Card>
          <CardBody p={8}>
            <VStack spacing={6}>
              <Heading size="lg" textAlign="center">
                Create Account
              </Heading>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                    />
                    {errors.name && (
                      <Text color="red.500" fontSize="sm">
                        {errors.name.message}
                      </Text>
                    )}
                  </FormControl>

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
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                    />
                    {errors.password && (
                      <Text color="red.500" fontSize="sm">
                        {errors.password.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                    />
                    {errors.confirmPassword && (
                      <Text color="red.500" fontSize="sm">
                        {errors.confirmPassword.message}
                      </Text>
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    width="100%"
                    isLoading={registerMutation.isPending}
                  >
                    Create Account
                  </Button>
                </VStack>
              </Box>

              <Text textAlign="center">
                Already have an account?{' '}
                <Link as={RouterLink} to="/login" color="brand.500">
                  Sign in
                </Link>
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default RegisterPage