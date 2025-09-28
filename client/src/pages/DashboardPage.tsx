import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  Button,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { formsApi, reviewsApi } from '../services/api'

const DashboardPage = () => {
  const { data: formsData } = useQuery({
    queryKey: ['forms'],
    queryFn: () => formsApi.getForms(),
  })

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => reviewsApi.getReviews(),
  })

  const totalForms = formsData?.data.data.pagination.total || 0
  const totalReviews = reviewsData?.data.data.pagination.total || 0

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading>Dashboard</Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Forms</StatLabel>
                  <StatNumber>{totalForms}</StatNumber>
                  <StatHelpText>Extracted forms</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Reviews</StatLabel>
                  <StatNumber>{totalReviews}</StatNumber>
                  <StatHelpText>Active reviews</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Pending</StatLabel>
                  <StatNumber>--</StatNumber>
                  <StatHelpText>Awaiting validation</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Completed</StatLabel>
                  <StatNumber>--</StatNumber>
                  <StatHelpText>This month</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack spacing={4} align="start">
                  <Heading size="md">Quick Actions</Heading>
                  <VStack spacing={2} align="stretch" width="100%">
                    <Button as={RouterLink} to="/extractor" colorScheme="brand">
                      Extract New Form
                    </Button>
                    <Button as={RouterLink} to="/reviews" variant="outline">
                      Create Review
                    </Button>
                    <Button as={RouterLink} to="/forms" variant="outline">
                      View All Forms
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4} align="start">
                  <Heading size="md">Recent Activity</Heading>
                  <Text color="gray.500">No recent activity</Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default DashboardPage