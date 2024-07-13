// components/PetList.js

'use client'

import { useState, useEffect } from 'react';
import { Box, Button, Input, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PetCard from './petCard';
import PetProfile from './petProfile';
import { useRouter } from 'next/navigation';

const PetList = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [petsData, setPetsData] = useState([]);

  const [favoritePets, setFavoritePets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/pets/getAllPets');
        const data = await response.json();
        setPetsData(data);
        setFilteredPets(data);
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchPetsData();
  }, []);

  // Load favorite pets from localStorage on initial render
  useEffect(() => {
    const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
    setFavoritePets(savedFavoritePets);
  }, []);

  // Update localStorage whenever favoritePets changes
  useEffect(() => {
    localStorage.setItem('favoritePets', JSON.stringify(favoritePets));
  }, [favoritePets]);

  const handlePetCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackToList = () => {
    setSelectedPet(null);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = petsData.filter(pet =>
      pet.pet_name.toLowerCase().includes(lowercasedFilter) ||
      (pet.pet_description && pet.pet_description.toLowerCase().includes(lowercasedFilter))
    );
    setFilteredPets(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilteredPets(petsData);
  };

  const handleLikePet = (pet) => {
    if (!favoritePets.some(favPet => favPet.pet_id === pet.pet_id)) {
      setFavoritePets([...favoritePets, pet]);
    }
  };

  const handleRemoveFromFavorites = (petId) => {
    const updatedFavorites = favoritePets.filter(pet => pet.pet_id !== petId);
    setFavoritePets(updatedFavorites);
  };

  const handleFavoritePetClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const navigateToFavorites = () => {
    router.push('/pages/favpets'); // Navigate to favorites page
  };

  return (
    <Box maxW="100vw" borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4}>
      {selectedPet ? (
        <Box>
          <Button onClick={handleBackToList} mb={4}>Back to List</Button>
          <PetProfile pet={selectedPet} onLike={handleLikePet} />
        </Box>
      ) : (
        <>
          <Flex mb={4} alignItems="center">
            <Input
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              maxW="300px"
            />
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={handleSearch}
              colorScheme="teal"

              ml={2}
            />
            {searchTerm && (
              <IconButton
                aria-label="Clear filter"
                icon={<CloseIcon />}
                onClick={handleClearFilter}
                colorScheme="red"
                ml={2}
              />
            )}
          </Flex>
          <Box display="flex" overflowX="auto">
            {filteredPets.map((pet) => (
              <Box key={pet.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
              </Box>
            ))}
          </Box>
          <Button onClick={navigateToFavorites} mt={4} colorScheme="blue">Go to Favorites</Button>
        </>
      )}
    </Box>
  );
};

export default PetList;
