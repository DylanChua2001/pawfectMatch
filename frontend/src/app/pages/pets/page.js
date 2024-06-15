"use client"
import React from "react";
import { Box , Button } from "@chakra-ui/react";
import Header from "../../components/header";
import Filter from "../../components/filter";
import Pets from "../../components/petList";
import { useRouter } from "next/navigation";

const HomePage = () => {

  const router = useRouter();

  const handleClick = (route) => {
    router.push(route);
  };
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
        <Button onClick={() => handleClick('/pages/petProfile')}>Go to Pets Profile</Button>
      </Box>
      <Box >
        <Pets/>
      </Box>
    </Box>
    </>
  );
};
export default HomePage;
