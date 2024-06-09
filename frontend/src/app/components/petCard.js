// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const PetCard = ({ pet }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" maxH="220px">
      <Image src={pet.image} alt={pet.name} maxH="150px" objectFit="cover" />
      <Box p="4">
        <Text fontWeight="bold" fontSize="md" mb={1} isTruncated>
          {pet.name}
        </Text>
        <Text fontSize="sm" noOfLines={3}>
          {pet.description}
        </Text>
      </Box>
    </Box>
  );
};

export default PetCard;
