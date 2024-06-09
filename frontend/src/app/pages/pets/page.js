"use client"
import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../../components/header";
import Filter from "../../components/filter";


const HomePage = () => {
  return (
    <>
    <Box
      minHeight="100vh"
      paddingTop="5%" 
      backgroundImage="url('/background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Header />
      <Box >
        <Filter />
      </Box>
    </Box>
    </>
  );
};
export default HomePage;
