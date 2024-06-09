import React, { useState, useRef } from 'react'
import {
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useDisclosure,
  useOutsideClick,
  Text
} from '@chakra-ui/react'

const FilterMenu = ({ onSelectAge, onSelectSize, onSelectPrice, onSelectPet }) => {
  const [ageValue, setAgeValue] = useState(0) // Default age value
  const [sizeValue, setSizeValue] = useState(1) // Default size value
  const [priceValue, setPriceValue] = useState(0) // Default price value
  const [pet, setPet] = useState('Dog') // Default pet value

  const sizeRanges = ["Small", "Medium", "Large"] // Size options
  const pets = ["Dog", "Cat", "Rabbit"] // Pet options

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleAgeChange = (val) => {
    setAgeValue(val)
    onSelectAge(val) // Call onSelectAge prop with the selected age value
  }

  const handleSizeChange = (val) => {
    setSizeValue(val)
    onSelectSize(sizeRanges[val - 1]) // Pass the size label instead of the index
  }

  const handlePriceChange = (val) => {
    setPriceValue(val)
    onSelectPrice(val) // Call onSelectPrice prop with the selected price value
  }

  const handlePetChange = (selectedPet) => {
    setPet(selectedPet)
    onSelectPet(selectedPet) // Call onSelectPet prop with the selected pet
  }

  return (
    <>
      <Box p={4}>
        <Box mt={-2} mb={4}>
        <Box>
          <Text >Pet</Text>
          <Box>
            {pets.map((petName) => (
              <Button
                key={petName}
                onClick={() => handlePetChange(petName)}
                bg={pet === petName ? 'blue.500' : 'gray.200'}
                color={pet === petName ? 'white' : 'black'}
                mr={4}
              >
                {petName}
              </Button>
            ))}
          </Box>
        </Box>
          <Text mt={4} mb={8}>Size</Text>
          <Box pr={8}>
            <Slider
              aria-label='size-slider'
              min={1}
              max={3}
              step={1}
              value={sizeValue}
              onChange={handleSizeChange}
              ml={4} // Add ml={4} for left padding
              mr={4} // Add mr={4} for right padding
              width="calc(100% - 40px)" // Adjust width for equal length
            >
              <SliderMark value={1} {...labelStyles}>
                Small
              </SliderMark>
              <SliderMark value={2} {...labelStyles}>
                Medium
              </SliderMark>
              <SliderMark value={3} {...labelStyles} ml="-1">
                Large
              </SliderMark>
              <SliderMark
                value={sizeValue}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-10'
                w='20'
              >
                {sizeRanges[sizeValue - 1]}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
        <Box mb={10}>
          <Text mb={8}>Age</Text>
          <Box pr={8}>
            <Slider
              aria-label='age-slider'
              min={0}
              max={15}
              step={1}
              value={ageValue}
              onChange={handleAgeChange}
              ml={4} // Add ml={4} for left padding
              mr={4} // Add mr={4} for right padding
              width="calc(100% - 40px)" // Adjust width for equal length
            >
              <SliderMark value={0} {...labelStyles}>
                0
              </SliderMark>
              <SliderMark value={5} {...labelStyles}>
                5
              </SliderMark>
              <SliderMark value={10} {...labelStyles} ml="-1">
                10
              </SliderMark>
              <SliderMark value={15} {...labelStyles} ml="-1">
                15
              </SliderMark>
              <SliderMark
                value={ageValue}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-10'
                w='20'
              >
                {ageValue}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
        <Box>
          <Text mb={8}>Price</Text>
          <Box pr={8}>
            <Slider
              aria-label='price-slider'
              min={0}
              max={5000}
              step={100}
              value={priceValue}
              onChange={handlePriceChange}
              ml={4} // Add ml={4} for left padding
              mr={4} // Add mr={4} for right padding
              width="calc(100% - 40px)" // Adjust width for equal length
            >
              <SliderMark value={0} {...labelStyles}>
                $0
              </SliderMark>
              <SliderMark value={1000} {...labelStyles}>
                $1,000
              </SliderMark>
              <SliderMark value={2000} {...labelStyles} ml="-1">
                $2,000
              </SliderMark>
              <SliderMark value={3000} {...labelStyles} ml="-1">
                $3,000
              </SliderMark>
              <SliderMark value={4000} {...labelStyles} ml="-1">
                $4,000
              </SliderMark>
              <SliderMark value={5000} {...labelStyles} ml="-1">
                $5,000
              </SliderMark>
              <SliderMark
                value={priceValue}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-10'
                w='28'
              >
                ${priceValue}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const menuRef = useRef()
  const [selectedAge, setSelectedAge] = useState(18) // State to hold the selected age
  const [selectedSize, setSelectedSize] = useState(2) // State to hold the selected size
  const [selectedPriceRange, setSelectedPriceRange] = useState(5000); // State to hold the selected price range
  const [selectedPet, setSelectedPet] = useState('Dog'); // State to hold the selected pet

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  })

  const handleSaveChanges = () => {
    console.log("Saved Size:", selectedSize) // Log the saved size
    console.log("Saved Age:", selectedAge) // Log the saved age
    console.log("Saved Price Range:", selectedPriceRange); // Log the saved price range
    console.log("Saved Pet:", selectedPet); // Log the saved pet
    onClose();
  }

  return (
    <>
<Box p={6}>
  <Menu isOpen={isOpen}>
    <MenuButton as={Button} onClick={isOpen ? onClose : onOpen}>
      Filter
    </MenuButton>
    <MenuList ref={menuRef} p={4} minW="100vh" h="75vh" position="relative" >
      <FilterMenu 
        onSelectAge={setSelectedAge} 
        onSelectSize={setSelectedSize} 
        onSelectPrice={setSelectedPriceRange} 
        onSelectPet={setSelectedPet} 
      />
      <Box position="absolute" right="4" bottom="4">
        <Button onClick={handleSaveChanges}>Save Changes</Button> {/* Button to save changes */}
      </Box>
    </MenuList>
  </Menu>
</Box>

    </>
  )
}

export default App
