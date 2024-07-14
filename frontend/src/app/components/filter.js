import React, { useState, useRef } from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useDisclosure,
  useOutsideClick,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import Cookie from 'js-cookie';

const FilterMenu = ({
  onSelectAge,
  onSelectSize,
  onSelectPrice,
  onSelectPet,
  ageMin,
  ageMax,
  priceMin,
  priceMax,
  selectedSize,
  selectedPet
}) => {
  const [ageValue, setAgeValue] = useState([ageMin, ageMax]);
  const [priceValue, setPriceValue] = useState([priceMin, priceMax]);
  // const [pet, setPet] = useState('Dog');

  const sizeRanges = ["Small", "Medium", "Large"];
  const pets = ["Dog", "Cat", "Rabbit"];

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  const handleAgeChange = (val) => {
    setAgeValue(val);
    onSelectAge(val);
  };

  const handleSizeChange = (size) => {
    onSelectSize(size);
  };

  const handlePriceChange = (val) => {
    setPriceValue(val);
    onSelectPrice(val);
  };

  const handlePetChange = (selectedPet) => {
    onSelectPet(selectedPet);
  };

  return (
    <>
      <Box p={4}>
        <Box mt={-2} mb={4}>
          <Text>Pet</Text>
          <Box>
            {pets.map((petName) => (
              <Button
                key={petName}
                onClick={() => handlePetChange(petName)}
                bg={selectedPet === petName ? 'blue.500' : 'gray.200'}
                color={selectedPet === petName ? 'white' : 'black'}
                mr={4}
              >
                {petName}
              </Button>
            ))}
          </Box>
        </Box>
        <Box mt={4} mb={8}>
          <Text>Size</Text>
          <Box>
            {sizeRanges.map((size) => (
              <Button
                key={size}
                onClick={() => handleSizeChange(size)}
                bg={selectedSize === size ? 'blue.500' : 'gray.200'}
                color={selectedSize === size ? 'white' : 'black'}
                mr={4}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>
        <Box mb={10}>
          <Text mb={8}>Age</Text>
          <Box pr={8}>
            <RangeSlider
              aria-label='age-slider'
              min={ageMin}
              max={ageMax}
              step={1}
              value={ageValue}
              onChange={handleAgeChange}
              ml={4} // Add ml={4} for left padding
              mr={4} // Add mr={4} for right padding
              width="calc(100% - 40px)" // Adjust width for equal length
            >
              <RangeSliderMark value={ageMin} {...labelStyles}>
                {ageMin}
              </RangeSliderMark>
              <RangeSliderMark value={Math.floor((ageMax - ageMin) / 2) + ageMin} {...labelStyles}>
                {Math.floor((ageMax - ageMin) / 2) + ageMin}
              </RangeSliderMark>
              <RangeSliderMark value={ageMax} {...labelStyles} ml="-1">
                {ageMax}
              </RangeSliderMark>
              <RangeSliderMark
                value={ageValue[0]}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='20'
                h='25'
                borderRadius='5px'
              >
                {ageValue[0]}
              </RangeSliderMark>
              <RangeSliderMark
                value={ageValue[1]}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='20'
                h='25'
                borderRadius='5px'
              >
                {ageValue[1]}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
        </Box>
        <Box>
          <Text mb={8}>Price</Text>
          <Box pr={8}>
            <RangeSlider
              aria-label='price-slider'
              min={priceMin}
              max={priceMax}
              step={100}
              value={priceValue}
              onChange={handlePriceChange}
              ml={4} // Add ml={4} for left padding
              mr={4} // Add mr={4} for right padding
              width="calc(100% - 40px)" // Adjust width for equal length
            >
              <RangeSliderMark value={priceMin} {...labelStyles}>
                ${priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={Math.floor((priceMax - priceMin) / 5) + priceMin} {...labelStyles}>
                ${Math.floor((priceMax - priceMin) / 5) + priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={Math.floor((priceMax - priceMin) * 2 / 5) + priceMin} {...labelStyles} ml="-1">
                ${Math.floor((priceMax - priceMin) * 2 / 5) + priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={Math.floor((priceMax - priceMin) * 3 / 5) + priceMin} {...labelStyles} ml="-1">
                ${Math.floor((priceMax - priceMin) * 3 / 5) + priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={Math.floor((priceMax - priceMin) * 4 / 5) + priceMin} {...labelStyles} ml="-1">
                ${Math.floor((priceMax - priceMin) * 4 / 5) + priceMin}
              </RangeSliderMark>
              <RangeSliderMark value={priceMax} {...labelStyles} ml="-1">
                ${priceMax}
              </RangeSliderMark>
              <RangeSliderMark
                value={priceValue[0]}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='20'
                h='25'
                borderRadius='5px'
              >
                ${priceValue[0]}
              </RangeSliderMark>
              <RangeSliderMark
                value={priceValue[1]}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='20'
                h='25'
                borderRadius='5px'
              >
                ${priceValue[1]}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const App = ({ applyFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = useRef();
  const [selectedAge, setSelectedAge] = useState([0, 20]); // State to hold the selected age
  const [selectedSize, setSelectedSize] = useState(null); // State to hold the selected size
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 5000]); // State to hold the selected price range
  const [selectedPet, setSelectedPet] = useState(null); // State to hold the selected pet
  const toast = useToast();

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  });

  const handleSaveChanges = async () => {
    console.log("Saved Size:", selectedSize); // Log the saved size
    console.log("Saved Age:", selectedAge); // Log the saved age
    console.log("Saved Price Range:", selectedPriceRange); // Log the saved price range
    console.log("Saved Pet:", selectedPet); // Log the saved pet
    let query = `min_age=${selectedAge[0]}&max_age=${selectedAge[1]}&min_price=${selectedPriceRange[0]}&max_price=${selectedPriceRange[1]}`;
    if (selectedSize) {
      query += `&pet_size=${selectedSize}`;
    }
    if (selectedPet) {
      query += `&pet_type=${selectedPet}`;
    }
    console.log(query)
    try {
      const response = await axios.get(`http://localhost:3001/api/filterPets?${query}`);
      const petIDs = response.data.map(pet => pet.pet_id);
      applyFilters(petIDs); // Pass petIDs to parent component
      onClose(); // Close the filter menu
      console.log(petIDs)
    } catch (error) {
      console.error("Error fetching filtered pets:", error);
      toast({
        title: 'No Such Pets',
        description: 'Try being a little less picky ;)',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClearFilters = () => {
    setSelectedAge([0, 20]);
    setSelectedSize(null);
    setSelectedPriceRange([0, 5000]);
    setSelectedPet(null);
  };

  return (
    <Box p={6}>
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} onClick={isOpen ? onClose : onOpen}>
          Filters
        </MenuButton>
        <MenuList ref={menuRef} p={4} minW="100vh" h="75vh" position="relative">
          <FilterMenu
            onSelectAge={setSelectedAge}
            onSelectSize={setSelectedSize}
            onSelectPrice={setSelectedPriceRange}
            onSelectPet={setSelectedPet}
            selectedPet={selectedPet}
            selectedSize={selectedSize} // Pass selectedSize state to FilterMenu
            ageMin={0}
            ageMax={20}
            priceMin={0}
            priceMax={5000}
          />
          <Box position="absolute" right="4" bottom="1">
            <Button onClick={handleSaveChanges} mr={4}>Show me the pets!</Button>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default App;
