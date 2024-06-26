"use client";
import React from "react";
import { Box , Flex} from "@chakra-ui/react";
import Header from "../../components/header";
import Training from "../../components/trainingList";

const HomePage = () => {
  return (
    <>
    <Box
      minHeight="100vh"
      paddingTop="3%" 
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Header />
      <Box >
        <Training/>
      </Box>
      <Flex justifyContent="center">
        <Box  
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
          >
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default HomePage;

