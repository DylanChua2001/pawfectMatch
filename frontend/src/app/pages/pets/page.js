"use client";
"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../components/header";
import Filter from "../../components/filter";
import Pets from "../../components/petList";

const HomePage = () => {
  return (
    <>
      <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
        <Box>
          <Header />
        </Box>
        <Box 
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 170px)", "calc(100vh - 150px)", "calc(100vh - 200px)"]}>
          <Pets />
        </Box>
      </Flex>
    </>
  );
};


export default HomePage;