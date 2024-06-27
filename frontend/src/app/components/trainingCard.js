// components/TrainingPackageCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const TrainingPackageCard = ({ trainingPackage, onClick }) => {
  return (
    <>
    <Box
      maxW="sm"
      bg="gray.100"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      onClick={onClick}
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
    >
      <Image src={trainingPackage.mainPhoto} alt={trainingPackage.name} boxSize="sm" objectFit="contain" />
      <Box>
        <Box d="flex" alignItems="baseline">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {trainingPackage.name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center">
          {trainingPackage.description}
        </Text>
        <Text mt={2} fontWeight="bold" textAlign="center">
          ${trainingPackage.price}
        </Text>
      </Box>
    </Box>
    </>
  );
};

export default TrainingPackageCard;
