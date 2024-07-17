// components/PetProfile.js
'use client'
import { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import Cookie from 'js-cookie';

const PetProfile = ({ pet, onLike, showNameAndPhotoOnly }) => {
  const [liked, setLiked] = useState(false); //liked is a boolean, while setLiked sets the value of liked
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMatched, setIsUserMatched] = useState(false);

  const sessionID = Cookie.get('userID'); 
  console.log(sessionID)
  console.log(pet.pet_id)

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/id/${sessionID}`);
        const { user_pet_fav } = response.data;
        console.log(user_pet_fav)
        if (user_pet_fav == null) {
          setLiked(false)
        } else {
          setLiked(user_pet_fav.includes(pet.pet_id));
        }
        
        // console.log(liked);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    checkIfLiked();
  }, [sessionID, pet.pet_id]);

  useEffect(() => {
    const checkUserMatch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/match/checkUserMatch/${sessionID}`);
        const { matchedPetId } = response.data;
        setIsUserMatched(!!matchedPetId && matchedPetId !== pet.pet_id);
      } catch (error) {
        console.error('Error checking user match:', error);
      }
    };

    if (sessionID) {
      checkUserMatch();
    }
  }, [sessionID, pet.pet_id]);

  const handleLikeButtonClick = async () => {
    const url = liked
      ? `http://localhost:3001/api/favourites/deleteFavPet/${sessionID}/delete/${pet.pet_id}`
      : `http://localhost:3001/api/favourites/addFavPet/${sessionID}/add/${pet.pet_id}`;

    try {
      const response = await axios.put(url, { liked: !liked });
      console.log('Response from API:', response.data);
      setLiked(!liked); // Update state based on successful API response

      if (onLike) {
        onLike(pet); // Notify parent component of like action
      }

    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleModalOpen = async() => {
    if (isUserMatched) {
      alert('You are already matched with another pet.');
      return;
    }

    setIsModalOpen(true);

    try {
      const response = await axios.post(`http://localhost:3001/api/match/addAMatch/${sessionID}/${pet.pet_id}`);
      console.log('Response from API:', response.data);

    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Box>
        <Image
          src={pet.mainPhoto || pet.imageUrl} // Adjust based on your data structure
          alt={pet.pet_name} // Use pet_name for accessibility
          borderRadius="md"
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        {!showNameAndPhotoOnly && (
          <VStack align="start" mt={4}>
            <Text fontSize="4xl" fontWeight="bold">
              {pet.pet_name} {/* Use pet_name */}
              <IconButton
                icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                onClick={handleLikeButtonClick}
                variant="ghost"
                colorScheme="red"
                aria-label="Like button"
                fontSize="6xl"
                ml={2}
              />
            </Text>
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.pet_breed}</Text> {/* Use pet_breed */}
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.pet_age} years</Text> {/* Use pet_age */}
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Description: {pet.pet_description || "No description available"}</Text> {/* Adjust as necessary */}
            <Button colorScheme="blue" mt={4} onClick={handleModalOpen}>Match</Button>
          </VStack>
        )}

      </Box>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              Congratulations! You have been matched with {pet.pet_name}.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PetProfile;
