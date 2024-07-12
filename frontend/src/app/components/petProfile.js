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
          src={pet.mainPhoto || pet.imageUrl} // Adjust based on your data structure
          alt={pet.pet_name} // Use pet_name for accessibility
          borderRadius="md"
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {pet.pet_name} {/* Use pet_name */}
            <IconButton
              icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
              onClick={handleLikeButtonClick}
              variant="ghost"
              colorScheme="red"
              aria-label="Like button"
              fontSize="6xl"
            />
          </Text>
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.pet_breed}</Text> {/* Use pet_breed */}
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.pet_age} years</Text> {/* Use pet_age */}
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Description: {pet.pet_description || "No description available"}</Text> {/* Adjust as necessary */}
        </VStack>
      </HStack>
      <Divider my={3} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Additional Characteristics
        </Text>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {pet.pet_character.map((character, index) => (
            <Text key={index} borderWidth="1px" borderRadius="md" p={2}>
              {character}
            </Text>
          ))}
        </SimpleGrid>
        <Text fontSize="xl" fontWeight="bold" mt={5}>
          Physical Traits
        </Text>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {pet.pet_physical_trait.map((trait, index) => (
            <Text key={index} borderWidth="1px" borderRadius="md" p={2}>
              {trait}
            </Text>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default PetProfile;
