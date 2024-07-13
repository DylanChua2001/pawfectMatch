"use client";
import React from "react";
import { Box , Flex} from "@chakra-ui/react";
import Header from "../../components/header";
import Training from "../../components/trainingList";

const HomePage = () => {
  return (
    <>
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Flex justifyContent="center" mt="20px">
        <Box  
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
          >
          <Training/>
        </Box>
      </Flex>
    </Flex>
    </>
  );
};

export default HomePage;

