// components/FavoritePets.js
'use client'
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PetProfile from './petProfile'; // Assuming PetProfile is used to display detailed pet information


const FavoriteTrainPacks = ({ favoriteTrainPacks, onRemove, onPetClick }) => {
  //const [photo, setPhoto] = useState('')

  const [trainPackProfiles, setTrainPackProfiles] = useState([]);
  const trainPackList = favoriteTrainPacks?.user_train_fav || [];
  

  useEffect(() => {
    
    const fetchTrainPackProfiles = async () => {

      const profiles = [];

      for (const trainID of trainPackList) {
        try{

          // Fetch Image for Pet
          console.log("USER Train ID is" , trainID)

          const trainPackresponse = await fetch (`http://localhost:3001/api/trainPack/getOneTrainingPackIdNameMoney/${trainID}`)

          const trainPackesponsedata = await petresponse.json();

          const photoresponse = await fetch (`http://localhost:3001/api/image/retrieveTrainingImage/${trainID}`)

          const photoresponsedata = await photoresponse.json();

          const imageSrcUrl = photoresponsedata.trainImage[0].photo_url;

          // Fetch Pet Details

        
          profiles.push({
            train_id: trainID,
            train_name: trainPackesponsedata.train_name,
            imageSrcUrl: imageSrcUrl
          });

        } catch (error) {

          console.log(`Error Fetching Image for Pet ID ${trainID}`)

        }
      }
      setTrainPackProfiles(profiles);
      
    }

    fetchTrainPackProfiles()

  }, [favoriteTrainPacks])



  return (
    <Box mt={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Favorite Training Packages
      </Text>

      <Box display="flex" overflowX="auto">
        {trainPackProfiles.length > 0 ? (
          trainPackProfiles.map((profile) => (
            <Box key={profile.train_id} flex="0 0 auto" maxW="sm" p={2}>
              <PetProfile 
                pet={profile} 
                onLike={() => onPetClick(profile.train_id)} 
                showNameAndPhotoOnly={true}
              /> {/* Pass showNameAndPhotoOnly prop */}

              <Box mt={2}>
                <Text fontWeight="bold" fontSize="lg">
                  {profile.train_name}
                </Text>
              </Box>
              <Button onClick={() => onRemove(profile.train_id)} colorScheme="red" mt={2}>
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

export default FavoriteTrainPacks;
