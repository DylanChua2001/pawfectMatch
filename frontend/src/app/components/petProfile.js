// components/PetProfile.js
'use client'
import { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { Box, Image, Text, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookie from 'js-cookie';

const PetProfile = ({ pet, onLike, showNameAndPhotoOnly }) => {
  const [liked, setLiked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sessionID = Cookie.get('userID'); 
  console.log(sessionID)
  console.log(pet.pet_id)

  // Check admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/id/${sessionID}`);
        setIsAdmin(response.data.is_admin); // Assuming API response has is_admin field
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkAdminStatus();
  }, [sessionID]);

  // Function to handle like button click
  const handleLikeButtonClick = async () => {
    const url = liked
      ? `http://localhost:3001/api/favourites/deleteFavPet/${sessionID}/delete/${pet.pet_id}`
      : `http://localhost:3001/api/favourites/addFavPet/${sessionID}/add/${pet.pet_id}`;

    try {
      const response = await axios.put(url, { liked: !liked });
      setLiked(!liked);

      if (onLike) {
        onLike(pet);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  // Function to handle modal open
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/pets/deletePet/${pet.pet_id}`, {
        withCredentials: true
      });
      console.log(response)
      toast({
        title: "Success",
        description: `${pet.pet_name} was deleted`,
        status: 'success',
        isClosable: true,
        duration: null, // Keeps the toast open until manually closed
        position: 'bottom-left',
        duration: 5000,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error creating pet:", error);
      // Handle error, show user feedback, etc.
    }
  };

  // Function to handle delete button click
  const handleDeleteButtonClick = async () => {
    toast({
      title: `Deleting ${pet.pet_name} is irreversible.`,
      description: (
        <Box textAlign="center">
          <Button bg="transparet" mr={3} onClick={handleDelete}>
            Confirm Deletion
          </Button>
        </Box>
      ),
      status: 'warning',
      isClosable: true,
      duration: null, // Keeps the toast open until manually closed
      position: 'bottom-left',
      duration: 5000,
    });
    console.log('Delete button clicked');
  };

  return (
    <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" position="relative">
      {isAdmin && (
        <Button
          onClick={handleDeleteButtonClick}
          position="absolute"
          bottom={2}
          right={2}
          colorScheme="red"
          aria-label="Delete button"
        >
          Delete Pet
        </Button>
      )}

      <Box>
        <Image
          src={pet.imageSrcUrl || pet.imageUrl}
          alt={pet.pet_name}
          borderRadius="md"
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        {!showNameAndPhotoOnly && (
          <VStack align="start" mt={4}>
            <Text fontSize="4xl" fontWeight="bold">
              {pet.pet_name}
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
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.pet_breed}</Text>
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.pet_age} years</Text>
            <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Description: {pet.pet_description || "No description available"}</Text>
            <Button colorScheme="blue" mt={4}>Match</Button>
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
