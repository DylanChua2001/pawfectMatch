// components/AboutUs.js
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <>
    <Box
      // maxW="100vw" 
      borderRadius="15px" 
      backgroundColor="rgba(255, 255, 255, 0.7)"
      // overflowX="auto" 
      px="20px"
      py="10px"
      // position= "sticky"
      position="fixed"
      top={["70px", "70px", "70px"]} // Adjust the top position as needed for different screen sizes
      left="0"
      right="0"
      margin="auto"
      fontSize={["0.45rem", "0.45rem", "0.65rem", "0.65rem"]}
      maxW={["90%", "92%", "97%"]}
      w="100%"
      h={["calc(100vh - 100px)", "calc(100vh - 100px)", "calc(100vh - 120px)"]}
      overflowY="auto" 
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
        },
        '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
        'scrollbar-width': 'none',     // Hide scrollbar for Firefox
      }}
    >
      <VStack spacing={5} align="start" position= "sticky">
        <Heading as="h1" size="2xl" textAlign="center" w="100%">
          About Us
        </Heading>
        <Text fontSize={["0.75rem", "0.8rem", "0.9rem", "1rem"]} >
          Every year, millions of animals enter shelters, while many individuals seek the companionship of a pet. However, the adoption process can be challenging, with 7% to 20% of adopted animals being returned to shelters. Common reasons for returns include behavioral issues, incompatibility with existing pets, and adopter health concerns such as allergies. Traditional adoption methods often involve brief interactions, which can lead to mismatched placements and subsequent returns. Additionally, first-time pet owners may encounter unexpected challenges due to insufficient knowledge and support.
        </Text>
        <Text  fontSize={["0.75rem", "0.8rem", "0.9rem", "1rem"]}>
          Recognizing the need for a better approach to pet adoption, we match animals with prospective owners based on detailed profiles. By considering lifestyle, personality, living situations, and preferences, we aim to reduce mismatched placements and help shelter animals find suitable homes.
        </Text>
        <Text  fontSize={["0.75rem", "0.8rem", "0.9rem", "1rem"]}>
          In addition to facilitating adoptions, we provide future pet owners with essential tools, resources, and knowledge. Through educational materials, personalized guidance, and expert advice, we ensure that every pet owner is well-prepared to care for their new companion.
        </Text>
      </VStack>
    </Box>
    </>
  );
};

export default AboutUs;
