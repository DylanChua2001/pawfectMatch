import { useState } from "react";
import { Box, Button, Input, FormLabel, Textarea, SimpleGrid, Image, VStack } from "@chakra-ui/react";
import axios from "axios";

const AddPet = () => {
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:3001/api/pets/createPet', formData, {
        withCredentials: true
      });

      console.log("Pet created:", response.data);
      // Optionally handle response or redirect user after successful submission

      // Reset form fields after submission
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
      });
    } catch (error) {
      console.error("Error creating pet:", error);
      // Handle error, show user feedback, etc.
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
        <Input id="pet_age" value={formData.pet_age} onChange={handleChange} />
        <FormLabel>Price</FormLabel>
        <Input id="pet_price" value={formData.pet_price} onChange={handleChange} />
        {/* <FormLabel>Status</FormLabel>
        <Input id="pet_status" value={formData.pet_status} onChange={handleChange} /> */}
        <FormLabel>Size</FormLabel>
        <Input id="pet_size" value={formData.pet_size} onChange={handleChange} />
        <FormLabel>Description</FormLabel>
        <Textarea id="pet_description" value={formData.pet_description} onChange={handleChange} />
        {/* <FormLabel>Main Photo</FormLabel>
        <Input id="mainPhoto" type="file" onChange={handleChange} />
        {formData.mainPhoto && (
          <Image src={URL.createObjectURL(formData.mainPhoto)} alt="Main Pet Photo" borderRadius="md" objectFit="contain" height="40vh" width="40vh" />
        )} */}
        {/* <FormLabel>Additional Photos</FormLabel>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {formData.additionalPhotos.map((photo, index) => (
            <Image key={index} src={URL.createObjectURL(photo)} alt={`Additional Photo ${index + 1}`} borderRadius="md" objectFit="contain" height="30vh" width="100%" />
          ))}
        </SimpleGrid> */}
        {/* <Input id="additionalPhotos" type="file" multiple onChange={handleChange} /> */}
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
