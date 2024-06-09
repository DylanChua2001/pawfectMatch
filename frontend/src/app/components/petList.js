// components/PetList.js
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import PetCard from './petCard';

const PetList = () => {
  const pets = [
    {
      id: 1,
      name: "Milo",
      description: "A cute little corgi.",
      image: "/milo_corgi.jpg",
    },
    {
      id: 2,
      name: "Georgie",
      description: "A curious and fluffy Old English Sheepdog.",
      image: "/old_english_sheepdog.jpg",
    },
    {
      id: 3,
      name: "Smokey",
      description: "An energetic Scottish Fold Cat",
      image: "/scottish_fold_cat.jpg",
    },
    {
      id: 4,
      name: "Apollo",
      description: "A bouncy little Holland Hop Rabbit.",
      image: "/holland_hop_rabbit.jpg",
    },
  ];

  return (
    <>
    <Box overflowX="auto">
      <SimpleGrid columns={[1, 2, 3]} spacing={6} p={6}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </SimpleGrid>
    </Box>
    </>
  );
};

export default PetList;
