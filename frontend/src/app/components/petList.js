// components/PetList.js
import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PetCard from './petCard';
import PetProfile from './petProfile';
import pets from '../tempdata/pets.json'; // Adjust the path based on your project structure

const PetList = () => {
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackToList = () => {
    setSelectedPet(null);
  };

  return (
    <>
    <Box maxW="100vw" borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4} >
      {selectedPet ? (
        <Box>
          <Button onClick={handleBackToList} mb={-8}>Back to List</Button>
          <PetProfile pet={selectedPet} />
        </Box>
      ) : (
        <Box display="flex" overflowX="auto">
          {pets.map((pet) => (
            <Box key={pet.id} flex="0 0 auto" maxW="sm" p={2}>
              <PetCard pet={pet} onClick={() => handlePetCardClick(pet)} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
    </>
  );
};

export default PetList;
