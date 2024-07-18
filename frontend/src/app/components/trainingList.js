'use client'
import { useState, useEffect } from 'react';
import { Box, Button, Input, Flex, IconButton, Spacer} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import TrainingPackageCard from './trainingCard';
import TrainingPackageProfile from './trainingPackageProfile';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookie from 'js-cookie';

const TrainingPackagesList = () => {
  const [selectedTrainingPackage, setSelectedTrainingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrainingPackages, setFilteredTrainingPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const userId = Cookie.get('userID');

  useEffect(() => {
    const fetchTrainingPackages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/trainPack/getAllTrainingPack');
        const data = await response.json();
        setFilteredTrainingPackages(data.allTrainPack);
      } catch (error) {
        console.error('Error fetching training packages:', error);
      }
    };

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

  const handleTrainingPackageCardClick = (trainingPackage) => {
    setSelectedTrainingPackage(trainingPackage);
  };

  const handleBackToList = () => {
    setSelectedTrainingPackage(null);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = filteredTrainingPackages.filter(trainingPackage =>
      trainingPackage.train_name.toLowerCase().includes(lowercasedFilter) ||
      trainingPackage.train_desc.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredTrainingPackages(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    fetchTrainingPackages();
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

  const navigateToCart = () => {
    router.push('/pages/cart');
  };

  return (
    <>
      <Box maxW="100vw"  borderRadius="15px" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" px= "20px">
        {selectedTrainingPackage ? (
          <Box>
            <Button onClick={handleBackToList} mb={4} position="absolute" top="20px" right="25px">Back to Training</Button>
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
              <Spacer/>
              <Button 
                onClick={navigateToCart}
                bg="rgba(253, 222, 176, 1)" 
                fontSize={["0.70rem", "0.80rem", "0.95rem", "1rem"]}>
              Cart
            </Button>
            </Flex>
            <Box 
            paddingBottom= "10px"
            display="flex" 
            overflowX="auto"
            sx={{
              overflowX: 'hidden', // Hide horizontal scrollbar
              '&::-webkit-scrollbar': {
                display: 'none',  // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none',  // Hide scrollbar for Internet Explorer and Edge
              'scrollbar-width': 'none',     // Hide scrollbar for Firefox
              'overflow-x': 'auto',  
            }}>
              {filteredTrainingPackages.map((trainingPackage) => (
                <Box key={trainingPackage.train_id} flex="0 0 auto" maxW="sm" p={2}>
                  <TrainingPackageCard
                    trainingPackage={trainingPackage}
                    onClick={() => handleTrainingPackageCardClick(trainingPackage)}
                  />
                </Box>
              ))}
            </Box>
            {/* <Button onClick={navigateToCart} mt={4} colorScheme="blue">Go to Cart</Button> */}
          </>
        )}
      </Box>
    </>
  );
};

export default TrainingPackagesList;
