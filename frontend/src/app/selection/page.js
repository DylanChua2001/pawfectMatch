"use client"
import { Box, Flex, Text, Image, SimpleGrid } from '@chakra-ui/react';


export default function PawfectMatch() {
  return (
    <Box bg="gray.100" p={10}>
      <Text fontSize="3xl" mb={6} textAlign="center">
        Pawfect Match
      </Text>
      <SimpleGrid columns={2} spacing={10}>
        <Flex direction="column" align="center" bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Image src="/corgi.jpg" alt="Pets" boxSize="150px" mb={4} />
          <Text fontSize="xl" fontWeight="bold">Pets</Text>
        </Flex>
        <Flex direction="column" align="center" bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Image src="/training.jpg" alt="Training Packages" boxSize="150px" mb={4} />
          <Text fontSize="xl" fontWeight="bold">Training Packages</Text>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
