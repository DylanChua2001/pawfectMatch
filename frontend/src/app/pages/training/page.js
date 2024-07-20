"use client";
import React, { useEffect } from "react";
import { Box, Flex, useToast, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/header";
import Training from "../../components/trainingList";
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const userID = Cookie.get('userID');
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!userID) {
      toast({
        title: 'Please login to view this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/pages/login'), // Replace with your actual login page route
      });
      return;
    }
  }, [userID, router, toast]); // Added the dependency array

  if (!userID) {
    return (
      <>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
      </Box>
      </>
    );
  }

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
          sx={{
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
          },
          '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
          'scrollbar-width': 'none', // Hide scrollbar for Firefox 
        }}
          >
          <Training />
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;

