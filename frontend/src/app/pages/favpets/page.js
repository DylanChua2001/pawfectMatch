'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';


const FavPetsPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);
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
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
      </Box>
    );
  }

  useEffect(() => {
    // Load favorite pets from API
    const fetchFavPetsData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/favourites/getAllFavPets/${userID}`);
        const data = await response.json();
        console.log(data)
        setFavoritePets(data.userFavPets)
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchFavPetsData();
  }, [userID]);


  const handleRemoveFromFavorites = async (petID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/favourites/deleteFavPet/${userID}/delete/${petID}`, {
        method: 'PUT', // Use PUT method for update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete pet with ID ${petID}`);
      }
  
      const data = await response.json();
      console.log(data);
      const responseUpdate = await fetch(`http://localhost:3001/api/favourites/getAllFavPets/${userID}`);
      const dataUpdate = await responseUpdate.json();
      setFavoritePets(dataUpdate.userFavPets);

    } catch (error) {
      console.error('Error fetching deleting data:', error);
      // Handle error cases here (e.g., show a toast message or retry logic)
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <Box mt="60px">
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
          <FavoritePets favoritePets={favoritePets} onRemove={handleRemoveFromFavorites} />
      </Box>
    </Flex>
  );
};


export default FavPetsPage;

