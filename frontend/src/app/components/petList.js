import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, IconButton, Button, Spacer } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PetCard from './petCard';
import PetProfile from './petProfile';
import { useRouter } from 'next/navigation';
import FilterMenu from './filter'; // Import the FilterMenu component

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

  useEffect(() => {
    const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
    setFavoritePets(savedFavoritePets);
  }, []);

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

  const applyFilters = (petIDs) => {
    // Filter petsData based on selected petIDs
    const filteredData = petsData.filter(pet => petIDs.includes(pet.pet_id));
    console.log(filteredData)
    // Only set filteredPets if searchTerm is empty
    setFilteredPets(filteredData);

  };

  return (
    <Box maxW="100vw" borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" px="20px">
      {selectedPet ? (
        <Box pt="70px">
          <Button 
            onClick={handleBackToList} 
            mb={4} 
            position="absolute"
            top="20px"
            right="25px"
            >
            Back to Pets</Button>
          <PetProfile pet={selectedPet} onLike={handleLikePet} />
        </Box>
      ) : (
        <>
          <Flex alignItems="center">
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
              bg="rgba(253, 222, 176, 1)"
              ml={2}
            />
            {searchTerm && (
              <IconButton
                aria-label="Clear filter"
                icon={<CloseIcon />}
                onClick={handleClearFilter}
                bg="rgba(253, 222, 176, 1)"
                ml={2}
              />
            )}
            <FilterMenu applyFilters={applyFilters} />
            <Spacer />
            <Button 
              onClick={navigateToFavorites}  
              bg="rgba(253, 222, 176, 1)" 
              fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}>
              Favorites
            </Button>
          </Flex>
          <Box
            paddingBottom= "10px"
            display="flex" 
            overflowX="auto"
            sx={{
              overflowX: 'hidden', // Hide horizontal scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none',     // Hide scrollbar for Firefox
              'overflow-x': 'auto',  
            }}
            >
            {filteredPets.map((pet) => (
              <Box key={pet.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PetList;
