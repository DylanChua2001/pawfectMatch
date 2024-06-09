// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const PetCard = ({ pet }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={pet.image} alt={pet.name} />
      <Box p="6">
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {pet.name}
        </Text>
        <Text>{pet.description}</Text>
      </Box>
    </Box>
  );
};

export default PetCard;
