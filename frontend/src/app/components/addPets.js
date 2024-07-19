import { useState } from "react";
import { useToast, Box, Button, Input, FormLabel, Textarea, Image, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddPet = () => {
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    pet_name: "",
    pet_type: "",
    pet_breed: "",
    pet_age: "",
    pet_price: "",
    pet_status: "Available",
    pet_size: "",
    pet_character: "",
    pet_physical_trait: "",
    pet_description: "",
    mainPhoto: null, // Added to handle file input
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, mainPhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Create the pet
      const createPetResponse = await axios.post('http://localhost:3001/api/pets/createPet', formData, {
        withCredentials: true
      });
      console.log("Pet created:", createPetResponse.data);

      // Step 2: Upload the main photo if selected
      if (formData.mainPhoto) {
        const formDataImage = new FormData();
        formDataImage.append('image', formData.mainPhoto);

        const uploadImageResponse = await axios.post(`http://localhost:3001/api/image/uploadPetImage/${createPetResponse.data.pet_id}`, formDataImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Image uploaded:", uploadImageResponse.data);
      }

      // Reset form fields after successful submission
      setFormData({
        pet_name: "",
        pet_type: "",
        pet_breed: "",
        pet_age: "",
        pet_price: "",
        pet_status: "Available",
        pet_size: "",
        pet_character: "",
        pet_physical_trait: "",
        pet_description: "",
        mainPhoto: null,
      });

      toast({
        title: 'Pet Added',
        description: 'Pet has been successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to appropriate page or handle navigation

    } catch (error) {
      console.error("Error creating pet:", error);
      toast({
        title: 'Error',
        description: 'Failed to add pet. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" backgroundColor="rgba(255, 255, 255, 0.7)">
      <VStack align="start" spacing={5}>
        <FormLabel>Name</FormLabel>
        <Input id="pet_name" value={formData.pet_name} onChange={handleChange} />
        <FormLabel>Type</FormLabel>
        <Input id="pet_type" value={formData.pet_type} onChange={handleChange} />
        <FormLabel>Breed</FormLabel>
        <Input id="pet_breed" value={formData.pet_breed} onChange={handleChange} />
        <FormLabel>Age</FormLabel>
        <Input type="number" id="pet_age" value={formData.pet_age} onChange={handleChange} />
        <FormLabel>Price</FormLabel>
        <Input type="number" id="pet_price" value={formData.pet_price} onChange={handleChange} />
        <FormLabel>Size</FormLabel>
        <Input id="pet_size" value={formData.pet_size} onChange={handleChange} />
        <FormLabel>Description</FormLabel>
        <Textarea id="pet_description" value={formData.pet_description} onChange={handleChange} />
        <FormLabel>Main Photo</FormLabel>
        <Input id="mainPhoto" type="file" onChange={handleChange} />
        {formData.mainPhoto && (
          <Image src={URL.createObjectURL(formData.mainPhoto)} alt="Main Pet Photo" borderRadius="md" objectFit="contain" height="40vh" width="40vh" />
        )}
        <FormLabel>Pet Character</FormLabel>
        <Input id="pet_character" value={formData.pet_character} onChange={handleChange} />
        <FormLabel>Pet Physical Trait</FormLabel>
        <Input id="pet_physical_trait" value={formData.pet_physical_trait} onChange={handleChange} />
        <Button onClick={handleSubmit} mt={4} colorScheme="teal" variant="solid">
          Add Pet
        </Button>
      </VStack>
    </Box>
  );
};

export default AddPet;
