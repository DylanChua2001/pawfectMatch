import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Avatar,
  Input,
  VStack,
  Flex, 
  HStack
} from "@chakra-ui/react";
import Cookie from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state for profile data
  const [profile, setProfile] = useState({
    user_name: '',
    user_age: '',
    person_traits: '',
    email_add: '',
    imageSrcUrl: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = Cookie.get('userID'); // Assuming 'userID' is the cookie key storing the ID
        const response = await axios.get(`http://localhost:3001/api/users/id/${id}`);
        const photoresponse = await fetch(`http://localhost:3001/api/image/retrieveImage/${id}`, {
          method: 'GET'
        });

        const photoresponsedata = await photoresponse.json();
        const imageSrcUrl = photoresponsedata.userImage[0].photo_url;
        const { data } = response;
        setProfile({
          user_name: data.user_name || '',
          user_age: data.user_age || '',
          // person_traits: data.person_traits ? data.person_traits.join(', ') : '',
          email_add: data.email_add || '',
          imageSrcUrl: imageSrcUrl || '' // Ensure it's set even if undefined
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store the selected image file
    setProfile({ ...profile, imageSrcUrl: URL.createObjectURL(e.target.files[0]) }); // Update preview immediately
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      const id = Cookie.get('userID');
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const imageResponse = await axios.post(`http://localhost:3001/api/image/uploadImage/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Update profile image URL after successful upload
        setProfile((prevProfile) => ({
          ...prevProfile,
          imageSrcUrl: imageResponse.data.photo_url
        }));
      }

      const response = await axios.put(`http://localhost:3001/api/users/updateUser/${id}`, profile);
      console.log('Profile updated:', response.data);
      setIsEditing(false);
      window.location.reload();

    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error updating profile (e.g., show error message)
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>; // Placeholder for loading state
  }

  return (
    <Box p={5} mx="auto">
      <VStack spacing={2}>
        <Avatar
          borderRadius="full"
          boxSize="150px"
          src={profile.imageSrcUrl}
        />
        {isEditing && (
          <FormControl>
            <FormLabel fontSize="sm">Change Profile Picture</FormLabel>
            <Input type="file" onChange={handleImageChange} fontSize="sm" border="none" pl={1}/>
          </FormControl>
        )}
        <FormControl>
          <HStack>
            <FormLabel fontSize="sm" minWidth="100px" marginBottom={0}>Username</FormLabel>
            <Box flex="1" minWidth="0" // Allow the box to shrink if necessary
            >
              <Editable value={profile.user_name} isDisabled={!isEditing} fontSize="sm">
                <EditablePreview minHeight="36px" width="100%"  />
                <Input
                  as={EditableInput}
                  name="user_name"
                  onChange={handleInputChange}
                  value={profile.user_age}
                  fontSize="sm"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  _focus={{ boxShadow: 'none' }}
                />
              </Editable>
            </Box>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack>
            <FormLabel fontSize="sm" minWidth="100px" marginBottom={0}>Age</FormLabel>
            <Box flex="1" minWidth="0" // Allow the box to shrink if necessary
            >
              <Editable value={profile.user_age} isDisabled={!isEditing} fontSize="sm">
                <EditablePreview minHeight="36px" width="100%"  />
                <Input
                  as={EditableInput}
                  name="user_age"
                  onChange={handleInputChange}
                  value={profile.user_age}
                  fontSize="sm"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  _focus={{ boxShadow: 'none' }} // Remove focus box-shadow
        
                />
              </Editable>
            </Box>
          </HStack>
        </FormControl>

        {/* <FormControl>
          <HStack>
            <FormLabel fontSize="sm" minWidth="100px" marginBottom={0}>Your traits</FormLabel>
            <Box flex="1" minWidth="0" // Allow the box to shrink if necessary
            >
              <Editable value={profile.person_traits} isDisabled={!isEditing} fontSize="sm">
                <EditablePreview minHeight="36px" width="100%"  />
                <Input
                  as={EditableInput}
                  name="person_traits"
                  onChange={handleInputChange}
                  value={profile.person_traits}
                  fontSize="sm"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  _focus={{ boxShadow: 'none' }}
                />
              </Editable>
            </Box>
          </HStack>
        </FormControl> */}
        <FormControl>
        <HStack>
            <FormLabel fontSize="sm" minWidth="100px" marginBottom={0}>Email</FormLabel>
            <Box flex="1" minWidth="0" // Allow the box to shrink if necessary
            >
              <Editable value={profile.email_add} isDisabled={!isEditing} fontSize="sm">
                <EditablePreview minHeight="36px" width="100%"  />
                <Input
                  as={EditableInput}
                  name="email_add"
                  onChange={handleInputChange}
                  value={profile.email_add}
                  fontSize="sm"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  _focus={{ boxShadow: 'none' }}
                />
              </Editable>
            </Box>
          </HStack>
        </FormControl>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
