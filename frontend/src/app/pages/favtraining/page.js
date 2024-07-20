'use client'
import { useState, useEffect } from 'react';
import { Box, Flex, useToast, Spinner, Text, Image } from "@chakra-ui/react";
import Header from "../../components/header"; // Replace with your header component
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FavTrainingPackagesPage = () => {
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageImages, setPackageImages] = useState({});
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

    const fetchFavoritePackageIds = async () => {
      try {
        // Fetch favorite training package IDs
        const response = await axios.get(`http://localhost:3001/api/favourites/getAllFavTrainPacks/${userID}`);
        const favoriteIds = response.data.userFavPets.user_train_fav || [];

        // Fetch all training packages
        const allPackagesResponse = await axios.get('http://localhost:3001/api/trainPack/getAllTrainingPack');
        const allTrainPacks = allPackagesResponse.data.allTrainPack || [];

        // Filter the packages to get only favorites
        const favoritePackages = allTrainPacks.filter(pkg => favoriteIds.includes(pkg.train_id));

        setFavoritePackages(favoritePackages);
      } catch (error) {
        setError('Failed to load favorite training packages.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePackageIds();
  }, [userID, router, toast]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = {};
      try {
        await Promise.all(favoritePackages.map(async (pkg) => {
          try {
            const response = await fetch(`http://localhost:3001/api/image/retrieveTrainingImage/${pkg.train_id}`);
            const data = await response.json();
            if (data.trainImage && data.trainImage.length > 0) {
              updatedImages[pkg.train_id] = data.trainImage[0].photo_url;
            } else {
              console.warn(`No image found for train_id: ${pkg.train_id}`);
              updatedImages[pkg.train_id] = ''; // No image URL
            }
          } catch (error) {
            console.error(`Error fetching image for train_id: ${pkg.train_id}`, error);
            updatedImages[pkg.train_id] = ''; // No image URL
          }
        }));
        setPackageImages(updatedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (favoritePackages.length > 0) {
      fetchImages();
    }
  }, [favoritePackages]);

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
            Favorite Training Packages
          </Text>
          <Box display="flex" overflowX="auto">
            {favoritePackages.length > 0 ? (
              favoritePackages.map(pkg => (
                <Box key={pkg.train_id} flex="0 0 auto" maxW="sm" p={2}>
                  <Box
                    bg="gray.100"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    cursor="pointer"
                    _hover={{ boxShadow: 'lg' }}
                  >
                    <Image 
                      src={packageImages[pkg.train_id] || ''} // No image URL handling
                      alt={pkg.train_name}
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
                        {pkg.train_name}
                      </Text>
                      <Text 
                        mt={1} 
                        color="gray.500" 
                        noOfLines={2} 
                        textAlign="center"
                        fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}
                      >
                        {pkg.train_desc}
                      </Text>
                      <Text fontSize="sm" textAlign="center">
                        ${pkg.train_price}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No favorite training packages added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FavTrainingPackagesPage;
