import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FiUpload, FiSearch, FiDatabase, FiUsers } from 'react-icons/fi'

const HomePage = () => {
  const features = [
    {
      icon: FiUpload,
      title: 'HTML Form Extraction',
      description: 'Upload HTML files and automatically extract form fields with intelligent parsing.',
    },
    {
      icon: FiSearch,
      title: 'Systematic Review Tools',
      description: 'Purpose-built tools for academic and research systematic reviews.',
    },
    {
      icon: FiDatabase,
      title: 'Data Management',
      description: 'Organize and manage extracted form data with validation and quality control.',
    },
    {
      icon: FiUsers,
      title: 'Collaboration',
      description: 'Work with team members on systematic reviews with shared access and permissions.',
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="2xl" fontWeight="bold">
              Form Extractor for Systematic Reviews
            </Heading>
            <Text fontSize="xl" maxW="600px">
              Streamline your research workflow with intelligent HTML form extraction
              and comprehensive systematic review management tools.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/register"
                size="lg"
                colorScheme="white"
                variant="solid"
                color="brand.500"
              >
                Get Started
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                Sign In
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Key Features</Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Everything you need to conduct efficient systematic reviews with automated form extraction.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {features.map((feature, index) => (
                <Card key={index} height="100%">
                  <CardBody>
                    <VStack spacing={4} align="start" height="100%">
                      <Icon as={feature.icon} boxSize={8} color="brand.500" />
                      <Heading size="md">{feature.title}</Heading>
                      <Text color="gray.600" flex={1}>
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="lg">Ready to get started?</Heading>
            <Text fontSize="lg" color="gray.600">
              Join researchers worldwide who trust our platform for their systematic reviews.
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="brand"
            >
              Start Your First Review
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage