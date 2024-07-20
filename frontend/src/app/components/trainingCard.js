// components/TrainingPackageCard.js
'use client'
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from "react";

const TrainingPackageCard = ({ trainingPackage, onClick, onAddToCart }) => {
  const trainID = trainingPackage.train_id
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    const fetchPhotoList = async() => {
      try {
        const photoresponse = await fetch(`https://pawfect-match-three.vercel.app/api/image/retrieveTrainingImage/${trainID}`, {
          method: 'GET'
        });
        const photoresponsedata = await photoresponse.json();
        const imageSrcUrl = photoresponsedata.trainImage[0].photo_url;
        console.log("Image Link :" , imageSrcUrl)
        setPhoto(imageSrcUrl)

      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchPhotoList()
  },[trainID])


  return (
    <Box
      maxW="250px"
      h= "100%"
      bg="gray.100"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
      onClick={onClick}
    >
      <Image src={photo} alt={trainingPackage.train_name}  boxSize="250px"/>
      <Box>
        <Box d="flex" alignItems="baseline" mt="10px">
          <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated textAlign="center">
            {trainingPackage.train_name}
          </Text>
        </Box>
        <Text mt={1} color="gray.500" noOfLines={2} textAlign="center" fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]}>
          {trainingPackage.train_desc}
        </Text>
        <Text mt={2} fontWeight="bold" fontSize={["0.65rem", "0.70rem", "0.75rem", "0.75rem"]} textAlign="center">
          ${trainingPackage.train_price}
        </Text>
      </Box>
    </Box>
  );
};

export default TrainingPackageCard;
