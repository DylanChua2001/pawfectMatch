// components/PetProfile.js
'use client'
import { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, HStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import Cookie from 'js-cookie';

const PetProfile = ({ pet, onLike, showNameAndPhotoOnly }) => {
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState('')
  const petID = pet.pet_id    
  const [isUserMatched, setIsUserMatched] = useState(false);

  const sessionID = Cookie.get('userID');
  const [isAdmin, setIsAdmin] = useState(false); // State to check admin status
  const toast = useToast();

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

  useEffect(() => {
    const fetchPhotoList = async() => {
      try {
        const photoresponse = await fetch(`http://localhost:3001/api/image/retrievePetImage/${petID}`, {
          method: 'GET'
        });
        const photoresponsedata = await photoresponse.json();
        const imageSrcUrl = photoresponsedata.petImage[0].photo_url;
        console.log("Image Link :" , imageSrcUrl)
        setPhoto(imageSrcUrl)

      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchPhotoList()
  },[petID])

  // Function to handle like button click

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
      setLiked(!liked);

      if (onLike) {
        onLike(pet);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  // Function to handle modal open
  const handleModalOpen = async() => {
    if (isUserMatched) {
      toast({
        title: 'Sorry! You have already matched with another pet.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
    <Box 
      maxW="100vw" 
      mx="auto" 
      borderRadius="15px" 
      position="relative"
      pb= "90px"
      pt= "20px"
      >
      {isAdmin && (
        <Button
          onClick={handleDeleteButtonClick}
          position="absolute"
          bottom={4}
          right={2}
          colorScheme="red"
          aria-label="Delete button"
        >
          Delete Pet
        </Button>
      )}

        <HStack>
          <Image
            src={photo || pet.imageUrl} // Adjust based on your data structure
            alt={pet.pet_name} // Use pet_name for accessibility
            borderRadius="md"
            height={["40vh", "40vh", "50vh"]}
            width={["40vh", "40vh", "50vh"]}
            objectFit="contain"
            mr= {["20px", "30px", "50px" ]}
            ml= {["20px", "30px", "40px" ]}
          />
          {!showNameAndPhotoOnly && (
            <VStack align="start" mt={4}>
              <HStack>
                <Text fontSize={["1.2rem", "1.5rem", "1.7rem", "2rem"]} fontWeight="bold">
                  {pet.pet_name}
                </Text>
                <IconButton
                  icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                  onClick={handleLikeButtonClick}
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Like button"
                  fontSize={["3xl", "3xl", "4xl", "4xl"]}
                />
              </HStack>
              <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Breed: {pet.pet_breed}</Text>
              <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Age: {pet.pet_age} years</Text>
              <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Description: {pet.pet_description || "No description available"}</Text>
              <Button 
                bg="rgba(253, 222, 176, 1)" 
                color='black' 
                mt={4}
                position="absolute"
                bottom={4}
                left={2}
                onClick={handleModalOpen}
                >
                Match
              </Button>  
            </VStack>
          )}

        </HStack>

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