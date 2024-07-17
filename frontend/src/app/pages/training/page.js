"use client";
import React from "react";
import { Box , Flex} from "@chakra-ui/react";
import Header from "../../components/header";
import Training from "../../components/trainingList";

const HomePage = () => {
  return (
    <>
    <Flex direction="column" height="100vh">
        <Box marginBottom= "100px">
          <Header />
        </Box>
        <Box 
          position="fixed"
          top={["100px", "100px", "100px"]} // Adjust the top position as needed for different screen sizes
          left="0"
          right="0"
          margin="auto"
          maxW={["90%", "92%", "97%"]}
          w="100%"
          h={["calc(100vh - 60px)", "calc(100vh - 70px)", "calc(100vh - 80px)"]}
          overflowY="auto"
          >
          <Training />
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;

