// pages/add-pet.js
import { useState } from "react";
import { Box, Button, Input, FormLabel, Textarea, SimpleGrid, Image, VStack, Divider, HStack, IconButton,Text } from "@chakra-ui/react";


const AddPet = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [mainPhoto, setMainPhoto] = useState(null);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const [liked, setLiked] = useState(false);

  const handleLikeButtonClick = () => {
    setLiked(!liked);
    console.log(`Pet liked: ${!liked}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newPet = {
      name,
      type,
      breed,
      age,
      description,
      mainPhoto,
      additionalPhotos
    };
    console.log("New pet data:", newPet);
    // You can add further logic to save data locally or perform other actions
    // Reset form fields after submission if needed
    setName("");
    setType("");
    setBreed("");
    setAge("");
    setDescription("");
    setMainPhoto(null);
    setAdditionalPhotos([]);
  };

  return (
    <>
    <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" backgroundColor="rgba(255, 255, 255, 0.7)">
      <HStack spacing={5} align="start">
        
        <VStack align="start" justify="center" spacing={3}>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <FormLabel>Type</FormLabel>
          <Input value={type} onChange={(e) => setType(e.target.value)} />
          <FormLabel>Breed</FormLabel>
          <Input value={breed} onChange={(e) => setBreed(e.target.value)} />
          <FormLabel>Age</FormLabel>
          <Input value={age} onChange={(e) => setAge(e.target.value)} />
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </VStack>
      </HStack>
      <Divider my={5} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Main Photo
        </Text>
        {mainPhoto && (
          <Image src={URL.createObjectURL(mainPhoto)} alt="Main Pet Photo" borderRadius="md" objectFit="contain" height="40vh" width="40vh" />
        )}
      </Box>
      <Input type="file" onChange={(e) => setMainPhoto(e.target.files[0])} />
      <Divider my={5} />
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Additional Photos
        </Text>
        <SimpleGrid columns={[2, 3]} spacing={5}>
          {additionalPhotos.map((photo, index) => (
            <Image key={index} src={URL.createObjectURL(photo)} alt={`Additional Photo ${index + 1}`} borderRadius="md" objectFit="contain" height="30vh" width="100%" />
          ))}
        </SimpleGrid>
        <Input type="file" multiple onChange={(e) => setAdditionalPhotos([...additionalPhotos, ...Array.from(e.target.files)])} />
      </Box>
      <Divider my={5} />
      <Button onClick={handleSubmit} mt={4} colorScheme="teal" variant="solid">Add Pet</Button>
    </Box>
    </>
  );
};

export default AddPet;
