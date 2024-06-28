// components/AboutUs.js
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <>
    <Box
      maxW="100vw" 
      borderRadius="15px" 
      backgroundColor="rgba(255, 255, 255, 0.7)"
      overflowX="auto" p={4}
    >
      <VStack spacing={5} align="start">
        <Heading as="h1" size="2xl" textAlign="center" w="100%">
          About Us
        </Heading>
        <Text fontSize="lg">
          Every year, millions of animals enter shelters, while many individuals seek the companionship of a pet. However, the adoption process can be challenging, with 7% to 20% of adopted animals being returned to shelters. Common reasons for returns include behavioral issues, incompatibility with existing pets, and adopter health concerns such as allergies. Traditional adoption methods often involve brief interactions, which can lead to mismatched placements and subsequent returns. Additionally, first-time pet owners may encounter unexpected challenges due to insufficient knowledge and support.
        </Text>
        <Text fontSize="lg">
          Recognizing the need for a better approach to pet adoption, we match animals with prospective owners based on detailed profiles. By considering lifestyle, personality, living situations, and preferences, we aim to reduce mismatched placements and help shelter animals find suitable homes.
        </Text>
        <Text fontSize="lg">
          In addition to facilitating adoptions, we provide future pet owners with essential tools, resources, and knowledge. Through educational materials, personalized guidance, and expert advice, we ensure that every pet owner is well-prepared to care for their new companion.
        </Text>
      </VStack>
    </Box>
    </>
  );
};

export default AboutUs;
