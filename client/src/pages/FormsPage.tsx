import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

const FormsPage = () => {
  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading>Extracted Forms</Heading>
          <Text>Forms management coming soon...</Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default FormsPage