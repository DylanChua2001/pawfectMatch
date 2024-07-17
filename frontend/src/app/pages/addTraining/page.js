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
        backgroundImage="url('/background.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the home page...</Text> {/* Add margin-top */}
      </Box>
    );
  }
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
      <Box >
        <AddTraining/>
      </Box>
      <Flex justifyContent="center">
        <Box  
          maxW={["90%", "92%", "97%"]}
          w="100%" 
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
          >
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default HomePage;
