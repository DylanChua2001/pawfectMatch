// components/TrainingPackageProfile.js
import { useState } from 'react';
import { Box, Image, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const TrainingPackageProfile = ({ trainingPackage }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeButtonClick = () => {
    setLiked(!liked);
    console.log(`Training Package liked: ${!liked}`);
  };

  return (
    <>
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
        <Image
          src={trainingPackage.mainPhoto}
          alt="Main Training Package Photo"
          borderRadius="md"
          height="40vh"
          width="40vh"
          objectFit="contain"
        />
        <VStack align="start" justify="center" spacing={3}>
          <Text fontSize="4xl" fontWeight="bold">
            {trainingPackage.name}
            <IconButton
              icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
              onClick={handleLikeButtonClick}
              variant="ghost"
              colorScheme="red"
              aria-label="Like button"
              fontSize="6xl"
            />
          </Text>
          <Text fontSize="3xl">Price: ${trainingPackage.price}</Text>
          <Text fontSize="3xl">Description: {trainingPackage.description}</Text>
        </VStack>
      </HStack>
    </Box>
    </>
  );
};

export default TrainingPackageProfile;
