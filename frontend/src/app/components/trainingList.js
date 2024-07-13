// components/TrainingPackagesList.js
'use client'
import { useState, useEffect } from 'react';
import { Box, Button, Input, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import TrainingPackageCard from './trainingCard';
import TrainingPackageProfile from './trainingPackageProfile';
import { useRouter } from 'next/navigation';

const TrainingPackagesList = () => {
  const [selectedTrainingPackage, setSelectedTrainingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrainingPackages, setFilteredTrainingPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainingPackages = async () => {
      const response = await fetch('http://localhost:3001/api/trainPack/getAllTrainingPack');
      const data = await response.json();
      setFilteredTrainingPackages(data.allTrainPack);
    };
    fetchTrainingPackages();
  }, []);

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

  const handleAddToCart = (trainingPackage) => {
    setCart((prevCart) => [...prevCart, trainingPackage]);
    router.push('/pages/cart', { state: { cart } });
  };

  return (
    <>
      <Box maxW="100vw" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4}>
        {selectedTrainingPackage ? (
          <Box>
            <Button onClick={handleBackToList} mb={4}>Back to List</Button>
            <TrainingPackageProfile 
              trainingPackage={selectedTrainingPackage} 
              onAddToCart={handleAddToCart} // Pass the addToCart function
            />
          </Box>
        ) : (
          <>
            <Flex mb={4} alignItems="center">
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
                colorScheme="teal" 
                ml={2}
              />
              {searchTerm && (
                <IconButton
                  aria-label="Clear filter"
                  icon={<CloseIcon />}
                  onClick={handleClearFilter}
                  colorScheme="red"
                  ml={2}
                />
              )}
            </Flex>
            <Box display="flex" overflowX="auto">
              {filteredTrainingPackages.map((trainingPackage) => (
                <Box key={trainingPackage.train_id} flex="0 0 auto" maxW="sm" p={2}>
                  <TrainingPackageCard 
                    trainingPackage={trainingPackage} 
                    onClick={() => handleTrainingPackageCardClick(trainingPackage)} 
                  />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TrainingPackagesList;
