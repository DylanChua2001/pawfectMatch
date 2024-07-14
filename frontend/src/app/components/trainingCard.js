// components/TrainingPackageCard.js
'use client'
import { Box, Image, Text, Button } from '@chakra-ui/react';

const TrainingPackageCard = ({ trainingPackage, onClick, onAddToCart }) => {
  return (
    <Box
      maxW="sm"
      bg="gray.100"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
      onClick={onClick}
    >
      <Image src={trainingPackage.mainPhoto} alt={trainingPackage.train_name} boxSize="sm" objectFit="contain" />
      <Box>
        <Box d="flex" alignItems="baseline">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {trainingPackage.train_name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center">
          {trainingPackage.train_desc}
        </Text>
        <Text mt={2} fontWeight="bold" textAlign="center">
          ${trainingPackage.train_price}
        </Text>
      </Box>
    </Box>
  );
};

export default TrainingPackageCard;
