'use client'
import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from "../../components/header"; // Replace with your header component
import FavoritePets from '../../components/favpets'; // Assuming FavoritePets component exists

const FavPetsPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    // Load favorite pets from localStorage on initial render
    const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
    setFavoritePets(savedFavoritePets);
  }, []);

  const handleRemoveFromFavorites = (petId) => {
    const updatedFavorites = favoritePets.filter(pet => pet.pet_id !== petId);
    setFavoritePets(updatedFavorites);
    localStorage.setItem('favoritePets', JSON.stringify(updatedFavorites)); // Update localStorage
  };

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

