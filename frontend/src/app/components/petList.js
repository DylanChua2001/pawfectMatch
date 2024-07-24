import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Flex, IconButton, Button, Spacer } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PetCard from './petCard';
import { useRouter } from 'next/navigation';
import FilterMenu from './filter';
import '../pages/pets/petList.css';

const PetList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const router = useRouter();
  const containerRef = useRef(null);

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
    router.push(`/pages/pets/${pet.pet_id}`);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = petsData.filter(pet =>
      pet.pet_name.toLowerCase().includes(lowercasedFilter) ||
      (pet.pet_breed && pet.pet_breed.toLowerCase().includes(lowercasedFilter))
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const navigateToFavorites = () => {
    router.push('/pages/favpets');
  };

  const applyFilters = (petIDs) => {
    const filteredData = petsData.filter(pet => petIDs.includes(pet.pet_id));
    setFilteredPets(filteredData);
  };

  const handleArrowNavigation = (event) => {
    if (containerRef.current) {
      if (event.key === 'ArrowRight') {
        containerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        containerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleArrowNavigation);
    return () => {
      window.removeEventListener('keydown', handleArrowNavigation);
    };
  }, []);

  return (
    <>
      <Box maxW="100vw" borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" px="20px">
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
            fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}
          >
            Favorites
          </Button>
        </Flex>
        <Box paddingBottom="10px" className="horizontal-scroll-wrapper">
          <Box
            paddingBottom="10px"
            className="horizontal-scroll-content"
            ref={containerRef}
          >
            {filteredPets.map((pet) => (
              <Box key={pet.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PetList;
