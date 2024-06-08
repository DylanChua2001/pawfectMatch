'use client'
import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../../components/header";
import Filter from "../../components/filter";
import "../../styles/background.css";

const HomePage = () => {
  return (
    <Box textAlign="center" minHeight="100vh" paddingTop="100px"> {/* Adjust paddingTop as needed */}
      <Header />
      <Box marginTop="50px"> {/* Adjust marginTop as needed */}
        <Filter />
      </Box>
    </Box>
  );
};

export default HomePage;
