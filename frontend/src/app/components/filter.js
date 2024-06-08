"use client"
import React, { useState } from 'react'
import { Box, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'

const SliderMarkExample = () => {
  const [sliderValue, setSliderValue] = useState(50)

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const handleSliderChange = (val) => {
    setSliderValue(val)
  }

  return (
    <Box p={4} pt={6}>
      <Slider aria-label='slider-ex-6' onChange={handleSliderChange}>
        <SliderMark value={25} {...labelStyles}>
          25%
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          50%
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
          75%
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {sliderValue}%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

export default SliderMarkExample
