// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const PetCard = ({ pet }) => {
  return (
    <>
    <Box maxW="sm"  bg="gray.100" borderRadius="lg" overflow="hidden" p={4}>
      <Image src={pet.image} alt={pet.name} boxSize="sm" objectFit="contain" />
      <Box >
      <Box d="flex" alignItems="baseline">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {pet.name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center">
          {pet.description}
        </Text>
      </Box>
    </Box>
    </>
  );
};

export default PetCard;
