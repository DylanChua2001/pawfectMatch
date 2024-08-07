'use client'
import { useState, useEffect, useRef } from 'react';
import { Box, Flex, useToast, Spinner, Text, Image } from "@chakra-ui/react";
import Header from "../../components/header";
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
  const scrollContainerRef = useRef(null);
  console.log(favoritePackages)

  useEffect(() => {
    if (!userID) {
      toast({
        title: 'Please login to view this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/pages/login'),
      });
      return;
    }

    const fetchFavoritePackageIds = async () => {
      try {
        const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/favourites/getAllFavTrainPacks/${userID}`);
        const favoriteIds = response.data.userFavPets.user_train_fav || [];

        const allPackagesResponse = await axios.get('https://pawfect-match-backend-six.vercel.app/api/trainPack/getAllTrainingPack');
        const allTrainPacks = allPackagesResponse.data.allTrainPack || [];

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
            const response = await fetch(`https://pawfect-match-backend-six.vercel.app/api/image/retrieveTrainingImage/${pkg.train_id}`);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!scrollContainerRef.current) return;

      if (event.key === 'ArrowRight') {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const handleCardClick = (trainName) => {
    router.push(`/pages/training?filter=${encodeURIComponent(trainName)}`);
  };

  return (
    <>
    <Flex direction="column" height="100vh">
      <Box mt="60px">
        <Header />
      </Box>
      <Flex justifyContent="center">
        <Box
          borderRadius="15px"
          backgroundColor="rgba(255, 255, 255, 0.7)"
          position="fixed"
          p={4}
          top={["100px", "100px", "100px"]}
          left="0"
          right="0"
          margin="auto"
          maxW={["90%", "92%", "97%"]}
          w="100%"
          h={["calc(100vh - 120px)", "calc(100vh - 130px)", "calc(100vh - 140px)"]}
          overflowY="auto" 
            sx={{
            overflowY: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            'overflow-y': 'auto',
          }}>
        
          <Text fontSize="2xl" fontWeight="bold" pl={3} mb={3}>
            Favorite Training Packages
          </Text>
          <Box 
            display="flex" 
            overflowX="auto" 
            ref={scrollContainerRef} // Attach ref here
            sx={{
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            'overflow-x': 'auto',
          }}>
            {favoritePackages.length > 0 ? (
              favoritePackages.map(pkg => (
                <Box key={pkg.train_id} flex="0 0 auto" maxW="sm" p={2}>
                  <Box
                    maxW="250px"
                    h="100%"
                    bg="gray.100"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    cursor="pointer"
                    _hover={{ boxShadow: 'lg' }}
                    onClick={() => handleCardClick(pkg.train_name)}
                  >
                    <Image 
                      src={packageImages[pkg.train_id] || ''} 
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
                      <Text mt={2} fontWeight="bold" fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]} textAlign="center">
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
    </>
  );
};

export default FavTrainingPackagesPage;
