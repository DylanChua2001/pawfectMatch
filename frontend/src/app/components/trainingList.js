'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import TrainingPackageCard from './trainingCard';
import TrainingPackageProfile from './trainingPackageProfile';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Cookie from 'js-cookie';
import '../pages/training/trainingPackagesList.css'; // Import the CSS file

const TrainingPackagesList = () => {
  const [selectedTrainingPackage, setSelectedTrainingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [trainingPackages, setTrainingPackages] = useState([]);
  const [filteredTrainingPackages, setFilteredTrainingPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [scrollingEnabled, setScrollingEnabled] = useState(true); // State to manage scrolling
  const [page, setPage] = useState(1); // State for pagination
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = Cookie.get('userID');
  const containerRef = useRef(null);

  const fetchTrainingPackages = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/trainPack/getAllTrainingPack');
      const data = await response.json();
      setTrainingPackages(data.allTrainPack);
      setFilteredTrainingPackages(data.allTrainPack);
    } catch (error) {
      console.error('Error fetching training packages:', error);
    }
  };

  useEffect(() => {
    fetchTrainingPackages();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cart/getCart/${userId}`);
        setCart(response.data.cart || []); // Ensure cart is an array
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart([]); // Fallback to an empty array in case of error
      }
    };

    fetchCart();
  }, [userId]);

  useEffect(() => {
    const filterFromQuery = searchParams.get('filter');
    if (filterFromQuery) {
      setSearchTerm(filterFromQuery);
      const lowercasedFilter = filterFromQuery.toLowerCase();
      const filteredData = trainingPackages.filter(trainingPackage =>
        trainingPackage.train_name.toLowerCase().includes(lowercasedFilter) ||
        trainingPackage.train_desc.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredTrainingPackages(filteredData);
    }
  }, [searchParams, trainingPackages]);

  useEffect(() => {
    if (scrollingEnabled && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPage(prevPage => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [scrollingEnabled]);

  useEffect(() => {
    const fetchMoreTrainingPackages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/trainPack/getAllTrainingPack`);
        const data = await response.json();
        setFilteredPets(prevPets => [...prevPets, ...data]);
      } catch (error) {
        console.error('Error fetching more pets:', error);
      }
    };

    if (page > 1) {
      fetchMoreTrainingPackages();
    }
  }, [page]);


  const handleTrainingPackageCardClick = (trainingPackage) => {
    setSelectedTrainingPackage(trainingPackage);
  };

  const handleBackToList = () => {
    console.log('Back to list clicked'); // Debugging statement
    setSelectedTrainingPackage(null);
    console.log('Selected training package after setting to null:', selectedTrainingPackage);
  };

  const handleSearch = () => {
    setScrollingEnabled(false); // Disable scrolling when searching
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = trainingPackages.filter(trainingPackage =>
      trainingPackage.train_name.toLowerCase().includes(lowercasedFilter) ||
      trainingPackage.train_desc.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredTrainingPackages(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilteredTrainingPackages(trainingPackages); // Reset to original list
    setScrollingEnabled(true); // Re-enable scrolling when clear filter
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToCart = async (trainingPackage) => {
    try {
      await axios.put(`http://localhost:3001/api/cart/addCart/${userId}/add/${trainingPackage.train_id}`);
      setCart(prevCart => [...prevCart, trainingPackage]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const navigateToFavorites = () => {
    router.push('/pages/favtraining'); // Navigate to favorites page
  };


  const navigateToCart = () => {
    router.push('/pages/cart');
  };

  useEffect(() => {
    if (!searchTerm && filteredTrainingPackages.length === trainingPackages.length) {
      setScrollingEnabled(true); // Re-enable scrolling when no search term or filters are applied
    }
  }, [searchTerm, filteredTrainingPackages, trainingPackages]);

  const handleContainerClick = () => {
    setScrollingEnabled(false); // Disable auto-scrolling when clicking anywhere in the container
  };

  return (
    <>
      <Box
        maxW="100vw"
        borderRadius="15px"
        backgroundColor="rgba(255, 255, 255, 0.7)"
        overflowX="auto"
        px="20px"
        onClick={handleContainerClick} // Add click handler to the container
      >
        {selectedTrainingPackage ? (
          <Box>
            <Button onClick={handleBackToList} mb={4} position="absolute" top="20px" right="25px" zIndex={10}>Back to Training</Button>
            <TrainingPackageProfile
              trainingPackage={selectedTrainingPackage}
              onAddToCart={handleAddToCart}
            />
          </Box>
        ) : (
          <>
            <Flex mt="15px" alignItems="center">
              <Input
                placeholder="Search training packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                maxW="300px"
              />
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={handleSearch}
                bg="rgba(253, 222, 176, 1)"
                ml={2}
              />
              {searchTerm && (
                <IconButton
                  aria-label="Clear filter"
                  icon={<CloseIcon />}
                  onClick={handleClearFilter}
                  bg="rgba(253, 222, 176, 1)"
                  ml={2}
                />
              )}
              <Spacer />
              <Button
                onClick={navigateToFavorites}
                bg="rgba(253, 222, 176, 1)"
                fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}
                mx= "10px"
              >
              Favorites
              </Button>
              <Button
                onClick={navigateToCart}
                bg="rgba(253, 222, 176, 1)"
                fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}>
                Cart
              </Button>
            </Flex>
            <Box
              paddingBottom="10px"
              className="infinite-scroll-wrapper"
            >
              <Box
                paddingBottom="10px"
                className={`infinite-scroll-content ${scrollingEnabled ? '' : 'no-scroll'}`}
                ref={containerRef}
              >
                {filteredTrainingPackages.map((trainingPackage) => (
                  <Box key={trainingPackage.train_id} flex="0 0 auto" maxW="sm" p={2}>
                    <TrainingPackageCard
                      trainingPackage={trainingPackage}
                      onClick={() => handleTrainingPackageCardClick(trainingPackage)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TrainingPackagesList;
