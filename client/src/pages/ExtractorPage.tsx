import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { extractorApi } from '../services/api'
import toast from 'react-hot-toast'

interface ExtractorForm {
  title: string
  description?: string
  sourceUrl?: string
  htmlContent: string
}

const ExtractorPage = () => {
  const [result, setResult] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExtractorForm>()

  const extractMutation = useMutation({
    mutationFn: extractorApi.extractFromHtml,
    onSuccess: (response) => {
      setResult(response.data.data)
      toast.success('Form extracted successfully!')
      reset()
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Extraction failed'
      toast.error(message)
    },
  })

  const onSubmit = (data: ExtractorForm) => {
    extractMutation.mutate(data)
  }

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading>HTML Form Extractor</Heading>

          <Card>
            <CardBody>
              <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6}>
                  <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Form Title</FormLabel>
                    <Input
                      {...register('title', {
                        required: 'Title is required',
                      })}
                      placeholder="Enter a title for this form"
                    />
                    {errors.title && (
                      <Text color="red.500" fontSize="sm">
                        {errors.title.message}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Description (Optional)</FormLabel>
                    <Input
                      {...register('description')}
                      placeholder="Brief description of the form"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Source URL (Optional)</FormLabel>
                    <Input
                      type="url"
                      {...register('sourceUrl')}
                      placeholder="https://example.com/form"
                    />
                  </FormControl>

                  <FormControl isInvalid={!!errors.htmlContent}>
                    <FormLabel>HTML Content</FormLabel>
                    <Textarea
                      {...register('htmlContent', {
                        required: 'HTML content is required',
                      })}
                      placeholder="Paste your HTML content here..."
                      minHeight="200px"
                    />
                    {errors.htmlContent && (
                      <Text color="red.500" fontSize="sm">
                        {errors.htmlContent.message}
                      </Text>
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    isLoading={extractMutation.isPending}
                    loadingText="Extracting..."
                  >
                    Extract Form Fields
                  </Button>
                </VStack>
              </Box>
            </CardBody>
          </Card>

          {result && (
            <Card>
              <CardBody>
                <VStack spacing={4} align="start">
                  <Heading size="md">Extraction Results</Heading>
                  <Alert status="success">
                    <AlertIcon />
                    Extracted {result.extraction.fieldsCount} form fields with{' '}
                    {Math.round(result.extraction.confidence * 100)}% confidence
                  </Alert>
                  <Text>
                    Processing time: {result.extraction.processingTime}ms
                  </Text>
                  <Text fontWeight="semibold">Form ID: {result.form._id}</Text>
                </VStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ExtractorPage