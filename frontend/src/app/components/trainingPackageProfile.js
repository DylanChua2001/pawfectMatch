'use client'
import { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, IconButton, Button, useToast } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import Cookie from 'js-cookie';

const TrainingPackageProfile = ({ trainingPackage, onAddToCart }) => {
  const [liked, setLiked] = useState(false); //liked is a boolean, while setLiked sets the value of liked
  const toast = useToast();
  const [isAdmin, setIsAdmin] = useState(false); // State to check admin status
  const sessionID = Cookie.get('userID'); 
  console.log(sessionID)
  console.log(trainingPackage.train_id)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/users/id/${sessionID}`);
        setIsAdmin(response.data.is_admin); // Assuming API response has is_admin field
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkAdminStatus();
  }, [sessionID]);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/users/id/${sessionID}`);
        const { user_train_fav } = response.data;
        console.log(user_train_fav)
        if (user_train_fav == null) {
          setLiked(false)
        } else {
          setLiked(user_train_fav.includes(trainingPackage.train_id));
        }
        
        // console.log(liked);
      } catch (error) {
        console.error('Error fetching user favorite training packages:', error);
      }
    };

    checkIfLiked();
  }, [sessionID, trainingPackage.train_id]);

  const handleLikeButtonClick = async () => {
    const url = liked
      ? `https://pawfect-match-backend-six.vercel.app/api/favourites/deleteFavTrainPack/${sessionID}/delete/${trainingPackage.train_id}`
      : `https://pawfect-match-backend-six.vercel.app/api/favourites/addFavTrainPack/${sessionID}/add/${trainingPackage.train_id}`;

    try {
      const response = await axios.put(url, { liked: !liked });
      console.log('Response from API:', response.data);
      setLiked(!liked); // Update state based on successful API response
      console.log(`Training Package liked: ${!liked}`);

      if (onLike) {
        onLike(trainingPackage); // Notify parent component of like action
      }

    } catch (error) {
      console.error('Error updating like status:', error);
    }

  };

  const handleAddToCart = () => {
    onAddToCart(trainingPackage);
    console.log(`Added ${trainingPackage.train_name} to cart`);
  };
  
  const handleDelete = async () => {
    try {
      console.log('hi', trainingPackage.train_id)
      const response = await axios.delete(`https://pawfect-match-backend-six.vercel.app/api/trainPack/deleteTrainingPack/${trainingPackage.train_id}`, {
        withCredentials: true
      });
      console.log(response)
      toast({
        title: "Success",
        description: `${trainingPackage.train_name} was deleted`,
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
      title: `Deleting ${trainingPackage.train_name} is irreversible.`,
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
      pt= "100px"
    >
      <HStack spacing={5} align="start" pl='10px'>
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {trainingPackage.train_name}
            <IconButton
              icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
              onClick={handleLikeButtonClick}
              variant="ghost"
              colorScheme="red"
              aria-label="Like button"
              fontSize={["3xl", "3xl", "4xl", "4xl"]}
            />
          </Text>
          <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Price: ${trainingPackage.train_price}</Text>
          <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Description: {trainingPackage.train_desc}</Text>
          <Button
            bg="rgba(253, 222, 176, 1)" 
            color='black' 
            onClick={handleAddToCart}
            mt={4}
            position="absolute"
            bottom={4}
            left={2}
          >
            Add to Cart
          </Button>
        </VStack>
      </HStack>
      {isAdmin && (
        <Button
          colorScheme="red"
          onClick={handleDeleteButtonClick}
          position="absolute"
          bottom={4}
          right={4}
        >
          Delete Training Package
        </Button>
      )}
    </Box>
  );
};

export default TrainingPackageProfile;
