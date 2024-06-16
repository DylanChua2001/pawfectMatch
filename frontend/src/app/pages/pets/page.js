"use client"
import React from "react";
import { Box , Button } from "@chakra-ui/react";
import Header from "../../components/header";
import Filter from "../../components/filter";
import Pets from "../../components/petList";

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
      <Box mb={-1}>
        <Filter />
      </Box>
      <Box >
        <Pets/>
      </Box>
    </Box>
    </>
  );
};
export default HomePage;
