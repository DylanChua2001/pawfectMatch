'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import FavoritePets from '../../components/favpets'; // Assuming FavoritePets component exists
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const FavPetsPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const userID = Cookie.get('userID');
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!userID) {
      toast({
        title: 'Please login to view this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/pages/login'), // Replace with your actual login page route
      });
      return;
    }
  }, [userID, router, toast]); // Added the dependency array

  if (!userID) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backgroundImage="url('/background.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
      </Box>
    );
  }

  // useEffect(() => {
  //   // Load favorite pets from localStorage on initial render
  //   const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
  //   setFavoritePets(savedFavoritePets);
  // }, []);

  // const handleRemoveFromFavorites = (petId) => {
  //   const updatedFavorites = favoritePets.filter(pet => pet.pet_id !== petId);
  //   setFavoritePets(updatedFavorites);
  //   localStorage.setItem('favoritePets', JSON.stringify(updatedFavorites)); // Update localStorage
  // };

  return (
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Flex justifyContent="center">
        <Box
          maxW={["90%", "92%", "97%"]}
          w="100%"
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
        >
          <FavoritePets favoritePets={favoritePets} onRemove={handleRemoveFromFavorites} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default FavPetsPage;

