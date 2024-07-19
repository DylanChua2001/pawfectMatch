'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import FavoriteTrainPacks from '../../components/favtrains'; // Assuming FavoritePets component exists
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';


const FavTrainingPacksPage = () => {
  const [favoriteTrainPacks, setFavoriteTrainPacks] = useState([]);
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

  useEffect(() => {
    // Load favorite pets from API
    const fetchFavTrainPacksData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/favourites/getAllFavTrainPacks/${userID}`);
        const data = await response.json();
        console.log(data)
        setFavoriteTrainPacks(data.userFavTrainPacks)
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchFavTrainPacksData();
  }, []);


  const handleRemoveFromFavorites = async (trainPackID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/favourites/deleteFavTrainPack/${userID}/delete/${trainPackID}`, {
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
      const responseUpdate = await fetch(`http://localhost:3001/api/favourites/getAllFavTrainPacks/${userID}`);
      const dataUpdate = await responseUpdate.json();
      setFavoriteTrainPacks(dataUpdate.userFavTrainPacks);

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
      <Flex justifyContent="center">
        <Box
          maxW={["90%", "92%", "97%"]}
          w="100%"
          maxHeight={["calc(100vh - 200px)", "calc(100vh - 150px)", "calc(100vh - 180px)"]}
        >
          <FavoriteTrainPacks favoriteTrainPacks={favoriteTrainPacks} onRemove={handleRemoveFromFavorites} />
        </Box>
      </Flex>
    </Flex>
  );
};


export default FavTrainingPacksPage;

