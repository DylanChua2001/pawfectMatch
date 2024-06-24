// components/PetList.js
import { useState } from 'react';
import { Box, Button, Input, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import PetCard from './petCard';
import PetProfile from './petProfile';
import petsData from '../tempdata/pets.json'; // Adjust the path based on your project structure

const PetList = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState(petsData);

  const handlePetCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackToList = () => {
    setSelectedPet(null);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = petsData.filter(pet => 
      pet.name.toLowerCase().includes(lowercasedFilter) ||
      pet.description.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredPets(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilteredPets(petsData);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Box maxW="100vw" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4}>
        {selectedPet ? (
          <Box>
            <Button onClick={handleBackToList} mb={4}>Back to List</Button>
            <PetProfile pet={selectedPet} />
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
                <Box key={pet.id} flex="0 0 auto" maxW="sm" p={2}>
                  <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default PetList;
