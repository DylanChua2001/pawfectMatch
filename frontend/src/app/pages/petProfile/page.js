"use client"
import { Box } from "@chakra-ui/react";
import Header from "../../components/header";
import PetProfile from '../../components/petProfile';

const petData = {
  name: "Georgie",
  breed: "Old English Sheepdog",
  age: "10 months old",
  description: "25 kg. Long and thick coat, highly intelligent, playful, affectionate, energetic",
  mainPhoto: "/old_english_sheepdog.jpg",
  additionalPhotos: [
    "/sheepdog2.jpg",
    "/sheepdog3.jpg",
  ],
}

const HomePage = () => {
  return (
    <>
    <Box>
      <Header/>
      <Box mt={70}>
        <PetProfile pet={petData} />
      </Box>
    </Box>
    </>
  );
};

export default HomePage;