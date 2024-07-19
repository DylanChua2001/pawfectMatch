// pages/about.js
'use client'
import React, { useEffect } from "react";
import { Box, useToast, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/header";
import Profile from '../../components/userProfile';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
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
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backgroundImage="url('/background.png')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Box>
          <Header />
        </Box>
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Profile />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;