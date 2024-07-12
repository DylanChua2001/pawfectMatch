'use client'
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import Cookie from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(true); // Start with editing enabled
  const [profile, setProfile] = useState({
    user_name: '',
    age: '',
    person_traits: '',
    email: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const id = Cookie.get('userID'); // Assuming 'userID' is the cookie key storing the ID
      const response = await axios.get(`http://localhost:3001/api/users/id/${id}`);
      const { data } = response;
      console.log(data);
      setProfile({
        user_name: data.user_name,
        age: data.age,
        person_traits: data.person_traits.join(', '), // Join traits if necessary
        email: data.email_add,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle error fetching profile data
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:3001/api/profile", profile);
      console.log('Profile updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error updating profile
    }
  };

  return (
    <>
    <Box p={5} maxW="600px" mx="auto">
      <VStack spacing={4}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="/profile.jpg"
          alt="Profile Picture"
        />
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Editable defaultValue={profile.user_name} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="user_name" onChange={handleInputChange} value={profile.user_name} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Editable defaultValue={profile.age} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="age" onChange={handleInputChange} value={profile.age} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Person Traits</FormLabel>
          <Editable defaultValue={profile.person_traits} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="person_traits" onChange={handleInputChange} value={profile.person_traits} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Editable defaultValue={profile.email} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="email" onChange={handleInputChange} value={profile.email} />
          </Editable>
        </FormControl>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </VStack>
    </Box>
    </>
  );
};

export default Profile;
