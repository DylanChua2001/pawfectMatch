// components/TrainingPackagesList.js
import { useState, useEffect } from 'react';
import { Box, Button, Input, Flex, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import TrainingPackageCard from './trainingCard'; // Adjust the import path as necessary
import TrainingPackageProfile from './trainingPackageProfile'; // Assuming you have this component

const TrainingPackagesList = () => {
  const [selectedTrainingPackage, setSelectedTrainingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrainingPackages, setFilteredTrainingPackages] = useState([]);
  const [trainingPackagesData, setTrainingPackagesData] = useState([]);

  useEffect(() => {
    const fetchTrainingPackages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/trainPack/getAllTrainingPack');
        const data = await response.json();
        if (data.allTrainPack) {
          setTrainingPackagesData(data.allTrainPack);
          setFilteredTrainingPackages(data.allTrainPack);
        }
      } catch (error) {
        console.error('Error fetching training packages:', error);
      }
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
    const filteredData = trainingPackagesData.filter(trainingPackage => 
      trainingPackage.train_name.toLowerCase().includes(lowercasedFilter) ||
      trainingPackage.train_desc.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredTrainingPackages(filteredData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilteredTrainingPackages(trainingPackagesData);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box maxW="100vw" backgroundColor="rgba(255, 255, 255, 0.7)" overflowX="auto" p={4}>
      {selectedTrainingPackage ? (
        <Box>
          <Button onClick={handleBackToList} mb={4}>Back to List</Button>
          <TrainingPackageProfile trainingPackage={selectedTrainingPackage} />
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
                <TrainingPackageCard trainingPackage={trainingPackage} onClick={() => handleTrainingPackageCardClick(trainingPackage)} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TrainingPackagesList;
