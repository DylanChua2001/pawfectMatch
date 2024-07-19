// components/FavoritePets.js
'use client'
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PetProfile from './petProfile'; // Assuming PetProfile is used to display detailed pet information
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';


const FavoritePets = ({ favoritePets, onRemove, onPetClick }) => {
  //const [photo, setPhoto] = useState('')

  const [petProfiles, setPetProfiles] = useState([]);
  const petList = favoritePets?.user_pet_fav || [];
  const router = useRouter();
  const userID = Cookie.get('userID');
  

  useEffect(() => {
    
    const fetchPetProfiles = async () => {

      const profiles = [];

      for (const petID of petList) {
        try{

          // Fetch Image for Pet
          console.log("USER PET ID is" , petID)

          const petresponse = await fetch (`http://localhost:3001/api/pets/id/${petID}`)

          const petresponsedata = await petresponse.json();

          const photoresponse = await fetch (`http://localhost:3001/api/image/retrievePetImage/${petID}`)

          const photoresponsedata = await photoresponse.json();

          const imageSrcUrl = photoresponsedata.petImage[0].photo_url;

          // Fetch Pet Details

        
          profiles.push({
            pet_id: petID,
            pet_name: petresponsedata.pet_name,
            imageSrcUrl: imageSrcUrl
          });

        } catch (error) {

          console.log(`Error Fetching Image for Pet ID ${petID}`)

        }
      }
      setPetProfiles(profiles);
      
    }

    fetchPetProfiles()

  }, [favoritePets])

  const handlePetClick = (petID) => {
    console.log(`Pet with ID ${petID} clicked`);
    router.push(`/pages/pets/${petID}`);
  };


  return (
    <Box mt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Favorite Pets
      </Text>

      <Box display="flex" overflowX="auto">
        {petProfiles.length > 0 ? (
          petProfiles.map((profile) => (
            <Box key={profile.pet_id} flex="0 0 auto" maxW="sm" p={2}>
              <PetProfile 
                pet={profile} 
                onLike={() => handlePetClick(profile.pet_id)} 
                showNameAndPhotoOnly={true}
              /> {/* Pass showNameAndPhotoOnly prop */}
              <Button onClick={() => onRemove(profile.pet_id)} colorScheme="red" mt={2}>
                Remove
              </Button>
     
            </Box>
          ))
        ) : (
          <Text>No favorite pets added yet.</Text>
        )}
      </Box>
  
    </Box>
  );
};

export default FavoritePets;
