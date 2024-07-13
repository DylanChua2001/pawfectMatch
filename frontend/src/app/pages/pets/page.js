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
      <Flex direction="column" height="100vh">
        <Box mt="60px">
          <Header />
        </Box>
        <Box>
          <Filter />
        </Box>
        <Box >
          <Pets />
        </Box>
      </Flex>
    </>
  );
};


export default HomePage;