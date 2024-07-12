// components/TrainingPackageProfile.js
import { useState } from 'react';
import { Box, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const TrainingPackageProfile = ({ trainingPackage }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeButtonClick = () => {
    setLiked(!liked);
    console.log(`Training Package liked: ${!liked}`);
  };

  return (
    <Box
      maxW="80vw"
      mx="auto"
      my={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <HStack spacing={5} align="start">
        {/* Replace 'mainPhoto' with an actual image URL if needed */}
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {trainingPackage.train_name}
            <IconButton
              icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
              onClick={handleLikeButtonClick}
              variant="ghost"
              colorScheme="red"
              aria-label="Like button"
              fontSize="6xl"
            />
          </Text>
          <Text fontSize="3xl">Price: ${trainingPackage.train_price}</Text>
          <Text fontSize="3xl">Description: {trainingPackage.train_desc}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TrainingPackageProfile;
