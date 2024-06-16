// components/PetList.js
import { Box, SimpleGrid } from '@chakra-ui/react';
import PetCard from './petCard';
import pets from '../tempdata/pets.json'; // Adjust the path based on your project structure

const PetList = () => {
  return (
    <Box maxW="100vw" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4}>
      <Box display="flex" overflowX="auto">
        {pets.map((pet) => (
          <Box key={pet.id} flex="0 0 auto" maxW="sm" p={2}>
            <PetCard pet={pet} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PetList;
