// components/TrainingPackageCard.js
import { Box, Image, Text } from '@chakra-ui/react';

const TrainingPackageCard = ({ trainingPackage, onClick }) => {
  return (
    <>
    <Box
      maxW="250px"
      bg="gray.100"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      onClick={onClick}
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
    >
      <Image src={trainingPackage.mainPhoto} alt={trainingPackage.name} boxSize="250px" objectFit="contain" />
      <Box>
        <Box d="flex" alignItems="baseline" mt="10px">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {trainingPackage.name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center"  fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}>
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
