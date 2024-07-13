// components/PetProfile.js
import { useState, useEffect } from 'react';
import { Box, Image, Text, SimpleGrid, VStack, Divider, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';

const PetProfile = ({ pet, userID }) => {
  const [liked, setLiked] = useState(false); //liked is a boolean, while setLiked sets the value of liked

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`/getUser/${userID}`);
        const { user_pet_fav } = response.data;
        setLiked(user_pet_fav.includes(pet.id));
        console.log(liked);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    checkIfLiked();
  }, [userID, pet.id]);

  const handleLikeButtonClick = async () => {

    const url = liked
      ? `/deleteFavPet/${userID}/delete/${pet.id}`
      : `/addFavPet/${userID}/add/${pet.id}`;

    try {
      const response = await axios.post(url, { liked: !liked });
      console.log('Response from API:', response.data);
      setLiked(!liked); // Update state based on successful API response

    } catch (error) {
      console.error('Error updating like status:', error);
    }

  };

  return (
    <>
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
          src={pet.mainPhoto}
          alt="Main Pet Photo"
          borderRadius="md"
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {pet.name}
            <IconButton
            icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
            onClick={handleLikeButtonClick}
            variant="ghost"
            colorScheme="red"
            aria-label="Like button"
            fontSize="6xl"
          />
          </Text>
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.breed}</Text>
          <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.age}</Text>
          <Text fontSize={["1rem", "5rem", "1.0rem", "1.5rem"]}>Description: {pet.description}</Text>
        </VStack>
      </HStack>
      <Divider my={3} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Additional Photos
        </Text>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {pet.additionalPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Additional Photo ${index + 1}`}
              borderRadius="md"
              objectFit="contain"
              height="30vh"
              width="100%"
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
    </>
  );
};

export default PetProfile;
