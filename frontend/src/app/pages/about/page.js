// pages/about.js
import { Box, Flex } from '@chakra-ui/react';
import Header from "../../components/header";
import AboutUs from '../../components/aboutus';


const AboutPage = () => {
  return (
    <>
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Flex justifyContent="center">
        <Box  
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
          >
          <AboutUs/>
        </Box>
      </Flex>
    </Flex>
    </>
    
  );
};

export default AboutPage;
