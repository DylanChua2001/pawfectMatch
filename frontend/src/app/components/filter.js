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

const SliderMarkExample = ({ onSelect }) => {
  const [sliderValue, setSliderValue] = useState(1)

  const sizes = ["Small", "Medium", "Large"]

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleSliderChange = (val) => {
    setSliderValue(val)
    onSelect(sizes[val - 1]) // Call onSelect prop with the selected option
  }

  return (
    <Box p={4} pt={6}>
      <Slider
        aria-label='slider-ex-6'
        min={1}
        max={3}
        step={1}
        value={sliderValue}
        onChange={handleSliderChange}
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
          value={sliderValue}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-10'
          w='20'
        >
          {sizes[sliderValue - 1]}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const menuRef = useRef()
  const [selectedOption, setSelectedOption] = useState("Small") // State to hold the selected option

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  })

  const handleSaveChanges = () => {
    console.log("Saved Option:", selectedOption) // Log the saved option
  }

  return (
    <Box p={10}>
      <Menu isOpen={isOpen}>
        <MenuButton as={Button} onClick={isOpen ? onClose : onOpen}>
          Open Filter
        </MenuButton>
        <MenuList ref={menuRef} p={6} minW="500px" minH="450px" position="relative">
          <SliderMarkExample onSelect={setSelectedOption} />
          <Box position="absolute" right="4" bottom="4">
            <Button onClick={handleSaveChanges}>Save Changes</Button> {/* Button to save changes */}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default App
