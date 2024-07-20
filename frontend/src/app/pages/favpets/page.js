'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text, Image } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FavPetsPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [petDetails, setPetDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petImages, setPetImages] = useState({});
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

    const fetchFavoritePetIds = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/favourites/getAllFavPets/${userID}`);
        const petIds = response.data.userFavPets.user_pet_fav;
        setFavoritePets(petIds);
      } catch (error) {
        setError('Failed to load favorite pets.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePetIds();
  }, [userID, router, toast]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pets/getAllPets');
        const pets = response.data;
        const petMap = pets.reduce((acc, pet) => {
          acc[pet.pet_id] = pet;
          return acc;
        }, {});
        setPetDetails(petMap);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = {};
      try {
        await Promise.all(favoritePets.map(async (petId) => {
          try {
            const response = await fetch(`http://localhost:3001/api/image/retrievePetImage/${petId}`);
            const data = await response.json();
            if (data.petImage && data.petImage.length > 0) {
              updatedImages[petId] = data.petImage[0].photo_url;
            } else {
              console.warn(`No image found for pet_id: ${petId}`);
              updatedImages[petId] = ''; // No image URL
            }
          } catch (error) {
            console.error(`Error fetching image for pet_id: ${petId}`, error);
            updatedImages[petId] = ''; // No image URL
          }
        }));
        setPetImages(updatedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (favoritePets.length > 0) {
      fetchImages();
    }
  }, [favoritePets]);

  const handlePetCardClick = (petId) => {
    router.push(`pets/${petId}`)
  };

  if (loading) {
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
        <Text fontSize="xl" color="black" mt={4}>Loading...</Text>
      </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Box>
      </>
    );
  }

  return (
    <>
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Flex justifyContent="center">
        <Box
          borderRadius= "15px"
          backgroundColor="rgba(255, 255, 255, 0.7)"
          position="fixed"
          p={4}
          top={["100px", "100px", "100px"]} // Adjust the top position as needed for different screen sizes
          left="0"
          right="0"
          margin="auto"
          maxW={["90%", "92%", "97%"]}
          w="100%"
          h={["calc(100vh - 120px)", "calc(100vh - 130px)", "calc(100vh - 140px)"]}
          overflowY="auto" 
            sx={{
            overflowY: 'hidden', // Hide horizontal scrollbar
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
            },
            '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
            'scrollbar-width': 'none', // Hide scrollbar for Firefox
            'overflow-y': 'auto',
          }}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Favorite Pets
          </Text>
          <Box 
            display="flex" 
            overflowX="auto"
            sx={{
              overflowX: 'hidden', // Hide horizontal scrollbar
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none', // Hide scrollbar for Firefox
              'overflow-x': 'auto',
            }}>
            {favoritePets.length > 0 ? (
              favoritePets.map(petId => {
                const pet = petDetails[petId];
                if (!pet) return null; // Skip if pet details are not available

                return (
                  <Box key={petId} flex="0 0 auto" maxW="sm" p={2}>
                    <Box
                      maxW="250px"
                      h="100%"
                      bg="gray.100"
                      borderRadius="lg"
                      overflow="hidden"
                      p={4}
                      cursor="pointer"
                      _hover={{ boxShadow: 'lg' }}
                      onClick={() => handlePetCardClick(petId)}
                    >
                      <Image 
                        src={petImages[petId] || ''} 
                        alt={pet.pet_name}
                        boxSize="250px"
                        objectFit="contain"
                      />
                      <Box>
                        <Text 
                          fontWeight="semibold" 
                          as="h4" 
                          lineHeight="tight" 
                          isTruncated 
                          textAlign="center"
                        >
                          {pet.pet_name}
                        </Text>
                        <Text 
                          mt={1} 
                          color="gray.500" 
                          noOfLines={2} 
                          textAlign="center"
                          fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}
                        >
                          {pet.pet_breed}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Text>No favorite pets added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
    </>
  );
};

export default FavPetsPage;
