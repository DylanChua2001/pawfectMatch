// components/PetList.js
import { Box, SimpleGrid } from '@chakra-ui/react';
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
    {
        id: 4,
        name: "Apollo",
        description: "A bouncy little Holland Hop Rabbit.",
        image: "/holland_hop_rabbit.jpg",
      },
      {
        id: 4,
        name: "Apollo",
        description: "A bouncy little Holland Hop Rabbit.",
        image: "/holland_hop_rabbit.jpg",
      },
      {
        id: 4,
        name: "Apollo",
        description: "A bouncy little Holland Hop Rabbit.",
        image: "/holland_hop_rabbit.jpg",
      },    {
        id: 4,
        name: "Apollo",
        description: "A bouncy little Holland Hop Rabbit.",
        image: "/holland_hop_rabbit.jpg",
      },
      {
        id: 4,
        name: "Apollo",
        description: "A bouncy little Holland Hop Rabbit.",
        image: "/holland_hop_rabbit.jpg",
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
    <Box maxW="100vw" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={6}>
      <Box display="flex" overflowX="auto">
        {pets.map((pet) => (
          <Box key={pet.id} flex="0 0 auto" maxW="sm" p={2}>
            <PetCard pet={pet} />
          </Box>
        ))}
      </Box>
    </Box>
    </>
  );
};

export default PetList;
