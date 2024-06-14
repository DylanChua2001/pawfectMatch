// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const PetCard = ({ pet }) => {
  return (
    <>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
      <Image src={pet.image} alt={pet.name} boxSize="sm" objectFit="cover" mx="auto" />
      <Box >
        <Box d="flex" alignItems="baseline">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {pet.name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2}>
          {pet.description}
        </Text>
      </Box>
    </Box>
    </>
  );
};

export default PetCard;
