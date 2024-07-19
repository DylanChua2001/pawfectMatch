// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const PetCard = ({ pet, onClick }) => {
  const [photo, setPhoto] = useState('');
  const petID = pet.pet_id;

  useEffect(() => {
    const fetchPhotoList = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/image/retrievePetImage/${petID}`, {
          method: 'GET'
        });
        const data = await response.json();
        if (data.petImage && data.petImage.length > 0) {
          const imageSrcUrl = data.petImage[0].photo_url;
          setPhoto(imageSrcUrl);
        } else {
          console.warn(`No image found for pet_id: ${petID}`);
          setPhoto(''); // Set to empty if no image found
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        setPhoto(''); // Set to empty on error
      }
    };

    fetchPhotoList();
  }, [petID]);

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
      <Image 
        src={photo || ''} // Use empty string if no photo
        alt={pet.pet_name || 'Pet Photo'}
        boxSize="250px"
        objectFit="cover" // Adjust as needed
      />
      <Box>
        <Box d="flex" alignItems="baseline" mt="10px">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {pet.pet_name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center" fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}>
          {pet.pet_breed}
        </Text>
      </Box>
    </Box>
    </>
  );
};

export default PetCard;
