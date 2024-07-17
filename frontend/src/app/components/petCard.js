// components/PetCard.js
import { Box, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from "react";

const PetCard = ({ pet, onClick }) => {
  const petID = pet.pet_id;
  const [photo, setPhoto] = useState('');
  const [petName, setPetName] = useState('');

  useEffect(() => {
    const fetchPhotoList = async () => {
      try {
        const photoResponse = await fetch(`http://localhost:3001/api/image/retrievePetImage/${petID}`, {
          method: 'GET'
        });
        const photoResponseData = await photoResponse.json();
        const imageSrcUrl = photoResponseData.petImage[0].photo_url;
        console.log("Image Link:", imageSrcUrl);
        setPhoto(imageSrcUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    const fetchPetName = async () => {
      try {
        const petResponse = await fetch('http://localhost:3001/api/pets/getAllPets', {
          method: 'GET'
        });
        const petResponseData = await petResponse.json();
        const petData = petResponseData.find(p => p.pet_id === petID);
        if (petData) {
          setPetName(petData.pet_name);
        }
      } catch (error) {
        console.error('Error fetching pet name:', error);
      }
    };

    fetchPhotoList();
    fetchPetName();
  }, [petID]);

  return (
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
      <Image src={photo} alt={petName} boxSize="250px" objectFit="contain" />
      <Box>
        <Box d="flex" alignItems="baseline" mt="10px">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {petName}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PetCard;
