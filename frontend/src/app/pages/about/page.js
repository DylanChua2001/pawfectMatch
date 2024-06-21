// pages/about.js
import { Box } from '@chakra-ui/react';
import Header from "../../components/header";
import AboutUs from '../../components/aboutus';


const AboutPage = () => {
  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <AboutUs />
      </Box>
    </Box>
    </>
  );
};

export default AboutPage;
