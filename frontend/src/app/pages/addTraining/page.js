"use client";
import React, { useState, useEffect } from "react";
import { Box , Flex, useToast, Spinner, Text }  from "@chakra-ui/react";
import Header from "../../components/header";
import AddTraining from "../../components/addTraining";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';

const HomePage = () => {
  const router = useRouter();
  const toast = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = Cookie.get('isAdmin') === 'true';
    if (!adminStatus) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to view this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/'), // Redirect to login or another appropriate page
      });
    } else {
      setIsAdmin(true);
    }
  }, [router, toast]);

  if (!isAdmin) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column" // Stack elements vertically
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the home page...</Text> {/* Add margin-top */}
      </Box>
    );
  }
  return (
    <>
    <Flex direction="column" height="100vh">
          <Box>
            <Header />
          </Box>
          <Box 
            position="fixed"
            borderRadius= "15px"
            backgroundColor="rgba(255, 255, 255, 0.7)"
            top="70px" // Adjust the top position as needed for different screen sizes
            left="0"
            right="0"
            margin="auto"
            maxW={["70%", "70%", "50%"]}
            w="100%"
            h="calc(100vh - 90px)"
            sx={{
              overflowY: 'hidden', // Hide horizontal scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none',     // Hide scrollbar for Firefox
              'overflow-y': 'auto',  
            }}
            >
            <AddTraining />
          </Box>
      </Flex>
    </>
  );
};

export default HomePage;
