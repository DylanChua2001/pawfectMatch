// components/Profile.js
'use client'
import { useState } from "react";
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Tan",
    gender: "Male",
    mobile: "+65 81234567",
    email: "john.tan.2022@gmail.com",
    bio: "I love big dogs",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile Saved:', profile);
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
          <FormLabel>Name</FormLabel>
          <Editable defaultValue={profile.name} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="name" onChange={handleInputChange} value={profile.name} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Editable defaultValue={profile.gender} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="gender" onChange={handleInputChange} value={profile.gender} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Mobile Number</FormLabel>
          <Editable defaultValue={profile.mobile} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="mobile" onChange={handleInputChange} value={profile.mobile} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Editable defaultValue={profile.email} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="email" onChange={handleInputChange} value={profile.email} />
          </Editable>
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Editable defaultValue={profile.bio} isDisabled={!isEditing}>
            <EditablePreview />
            <Input as={EditableInput} name="bio" onChange={handleInputChange} value={profile.bio} />
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
