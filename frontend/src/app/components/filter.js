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
} from '@chakra-ui/react'

const SliderMarkExample = ({ onSelectAge, onSelectSize }) => {
  const [ageValue, setAgeValue] = useState(0) // Default age value
  const [sizeValue, setSizeValue] = useState(1) // Default size value

  const sizeRanges = ["Small", "Medium", "Large"] // Size options

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

  return (
    <Box p={4} pt={6}>
        <Box mb={10}>
        <Slider
          aria-label='size-slider'
          min={1}
          max={3}
          step={1}
          value={sizeValue}
          onChange={handleSizeChange}
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
      <Box mb={10}>
        <Slider
          aria-label='age-slider'
          min={0}
          max={15}
          step={1}
          value={ageValue}
          onChange={handleAgeChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box mt={2} textAlign="center">{ageValue}</Box>
      </Box>
    </Box>
  )
}

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const menuRef = useRef()
  const [selectedAge, setSelectedAge] = useState(18) // State to hold the selected age
  const [selectedSize, setSelectedSize] = useState(2) // State to hold the selected size

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  })

  const handleSaveChanges = () => {
    console.log("Saved Size:", selectedSize) // Log the saved size
    console.log("Saved Age:", selectedAge) // Log the saved age
  }

  return (
    <Box p={10}>
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} onClick={isOpen ? onClose : onOpen}>
          Open Filter
        </MenuButton>
        <MenuList ref={menuRef} p={6} minW="80vh" h="70vh" position="relative">
          <SliderMarkExample onSelectAge={setSelectedAge} onSelectSize={setSelectedSize} />
          <Box position="absolute" right="4" bottom="4">
            <Button onClick={handleSaveChanges}>Save Changes</Button> {/* Button to save changes */}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default App
