// pages/add-training-package.js
import { useState } from "react";
import { Box, Button, Input, FormLabel, Textarea, Image, VStack, Divider,Text } from "@chakra-ui/react";

const AddTrainingPackage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mainPhoto, setMainPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newTrainingPackage = {
      name,
      price,
      description,
      mainPhoto,
    };
    console.log("New training package data:", newTrainingPackage);
    // You can add further logic to save data locally or perform other actions
    // Reset form fields after submission if needed
    setName("");
    setPrice("");
    setDescription("");
    setMainPhoto(null);
  };

  return (
    <>
    <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" backgroundColor="rgba(255, 255, 255, 0.7)">
      <VStack align="start" spacing={5}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <FormLabel>Price</FormLabel>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </VStack>
      <Divider my={5} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Main Photo
        </Text>
        {mainPhoto && (
          <Image src={URL.createObjectURL(mainPhoto)} alt="Main Training Package Photo" borderRadius="md" objectFit="contain" height="40vh" width="40vh" />
        )}
      </Box>
      <Input type="file" onChange={(e) => setMainPhoto(e.target.files[0])} />
      <Divider my={5} />
      <Button onClick={handleSubmit} mt={4} colorScheme="teal" variant="solid">Add Training Package</Button>
    </Box>
    </>
  );
};

export default AddTrainingPackage;
