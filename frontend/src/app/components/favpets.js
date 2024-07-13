// components/FavoritePets.js
import { Box, Text,Button } from '@chakra-ui/react';
import PetCard from './petCard'; // Assuming PetCard is used to display favorite pets

const FavoritePets = ({ favoritePets, onRemove, onPetClick }) => {
    return (
      <Box mt={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Favorite Pets</Text>
        <Box display="flex" overflowX="auto">
          {favoritePets.length > 0 ? (
            favoritePets.map((pet) => (
              <Box key={pet.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                <PetCard pet={pet} onClick={() => onPetClick(pet)} /> {/* Pass pet to onPetClick */}
                <Button onClick={() => onRemove(pet.pet_id)} colorScheme="red" mt={2}>Remove</Button>
              </Box>
            ))
          ) : (
            <Text>No favorite pets added yet.</Text>
          )}
        </Box>
      </Box>
    );
  };
  
  export default FavoritePets;
