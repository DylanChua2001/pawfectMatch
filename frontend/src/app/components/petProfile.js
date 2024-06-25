// components/PetProfile.js
import { useState } from 'react';
import { Box, Image, Text, SimpleGrid, VStack, Divider, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const PetProfile = ({ pet }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeButtonClick = () => {
    setLiked(!liked);
    console.log(`Pet liked: ${!liked}`);
  };

  return (
    <>
    <Box
      maxW="80vw"
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
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {pet.name}
            <IconButton
            icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
            onClick={handleLikeButtonClick}
            variant="ghost"
            colorScheme="red"
            aria-label="Like button"
            fontSize="6xl"
          />
          </Text>
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.breed}</Text>
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.age}</Text>
          <Text fontSize={["1rem", "5rem", "1.0rem", "1.5rem"]}>Description: {pet.description}</Text>
        </VStack>
      </HStack>
      <Divider my={3} />
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
    </>
  );
};

export default PetProfile;
