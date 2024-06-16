// components/PetProfile.js
import { Box, Image, Text, SimpleGrid, VStack, Divider, HStack } from '@chakra-ui/react'

const PetProfile = ({ pet }) => {
  return (
    <Box
      maxW="100vw"
      maxH="100vh"
      mx="auto"
      my={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <HStack spacing={5} align="start">
        <Image
          src={pet.mainPhoto}
          alt="Main Pet Photo"
          borderRadius="md"
          height="30vh"
          width="30vh"
          objectFit="contain"
        />
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="3xl" fontWeight="bold">
            {pet.name}
          </Text>
          <Text fontSize="2xl">Breed: {pet.breed}</Text>
          <Text fontSize="2xl">Age: {pet.age}</Text>
          <Text fontSize="2xl">Description: {pet.description}</Text>
        </VStack>
      </HStack>
      <Divider my={5} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Additional Photos
        </Text>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {pet.additionalPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Additional Photo ${index + 1}`}
              borderRadius="md"
              objectFit="contain"
              height="30vh"
              width="100%"
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default PetProfile
