"use client";
import React from "react";
<<<<<<< HEAD
import { Box, Flex, VStack } from "@chakra-ui/react";
=======
import { Box , Button } from "@chakra-ui/react";
>>>>>>> 6ba67a87a61f192840c4c98faea8219d16ef0e83
import Header from "../../components/header";
import Filter from "../../components/filter";
import Pets from "../../components/petList";

const HomePage = () => {
  return (
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Box>
        <Filter />
      </Box>
      <Flex justifyContent="center">
        <Box  
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
          >
          <Pets/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomePage;
