import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react'

const ReviewsPage = () => {
  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading>Systematic Reviews</Heading>
          <Text>Reviews management coming soon...</Text>
          <Button colorScheme="brand" disabled>
            Create New Review
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default ReviewsPage