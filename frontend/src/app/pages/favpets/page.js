'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text, Image } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FavPetsPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);
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
        const favouritePets = await axios.get(`http://localhost:3001/api/favourites/getAllFavPets/${userID}`);
        
        setFavoritePets(favoritePets);
      } catch (error) {
        setError('Failed to load favorite training packages.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePetIds();
  }, [userID, router, toast]); // Added the dependency array

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = {};
      try {
        await Promise.all(favoritePets.map(async (pkg) => {
          try {
            const response = await fetch(`http://localhost:3001/api/image/retrievePetImage/${pkg.pet_id}`);
            const data = await response.json();
            if (data.petImage && data.petImage.length > 0) {
              updatedImages[pkg.pet_id] = data.petImage[0].photo_url;
            } else {
              console.warn(`No image found for pet_id: ${pkg.pet_id}`);
              updatedImages[pkg.pet_id] = ''; // No image URL
            }
          } catch (error) {
            console.error(`Error fetching image for pet_id: ${pkg.pet_id}`, error);
            updatedImages[pkg.pet_id] = ''; // No image URL
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

  const handlePetCardClick = (pet) => {
    setSelectedPet(pet);
  };

  if (loading) {
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
        <Text fontSize="xl" color="black" mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
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
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Box>
    );
  }

  // if (!userID) {
  //   return (
  //     <Box
  //       minHeight="100vh"
  //       display="flex"
  //       flexDirection="column"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <Spinner size="xl" />
  //       <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
  //     </Box>
  //   );
  // }

  // useEffect(() => {
  //   // Load favorite pets from localStorage on initial render
  //   const savedFavoritePets = JSON.parse(localStorage.getItem('favoritePets')) || [];
  //   setFavoritePets(savedFavoritePets);
  // }, []);

  // const handleRemoveFromFavorites = (petId) => {
  //   const updatedFavorites = favoritePets.filter(pet => pet.pet_id !== petId);
  //   setFavoritePets(updatedFavorites);
  //   localStorage.setItem('favoritePets', JSON.stringify(updatedFavorites)); // Update localStorage
  // };

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
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Favorite Pets
          </Text>
          <Box display="flex" overflowX="auto">
            {favoritePets.length > 0 ? (
              favoritePets.map(pkg => (
                <Box key={pkg.pet_id} flex="0 0 auto" maxW="sm" p={2}>
                  <Box
                    bg="gray.100"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    cursor="pointer"
                    _hover={{ boxShadow: 'lg' }}
                    onClick={() => handlePetCardClick(pkg.pet_name)}
                  >
                    <Image 
                      src={petImages[pkg.pet_id] || ''} 
                      alt={pkg.pet_name}
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
                        {pkg.pet_name}
                      </Text>
                      <Text 
                        mt={1} 
                        color="gray.500" 
                        noOfLines={2} 
                        textAlign="center"
                        fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}
                      >
                        {pkg.pet_breed}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No favorite pets added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

//   return (
//     <Flex direction="column" height="100vh">
//       <Box mt="60px">
//         <Header />
//       </Box>
//       <Box
//         position="fixed"
//         borderRadius= "15px"
//         backgroundColor="rgba(255, 255, 255, 0.7)"
//         top="70px" // Adjust the top position as needed for different screen sizes
//         left="0"
//         right="0"
//         margin="auto"
//         maxW={["70%", "70%", "50%"]}
//         w="100%"
//         h="calc(100vh - 90px)"
//         sx={{
//           overflowY: 'hidden', // Hide horizontal scrollbar
//           '&::-webkit-scrollbar': {
//             display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
//           },
//           '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
//           'scrollbar-width': 'none',     // Hide scrollbar for Firefox
//           'overflow-y': 'auto',  
//         }}
//         >
//           <FavoritePets favoritePets={favoritePets} onRemove={handleRemoveFromFavorites} onPetClick={handlePetClick}/>
//       </Box>
//     </Flex>
//   );
// };

export default FavPetsPage;

