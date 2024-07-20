import { useState } from "react";
import { Box, Button, Input, FormLabel, Textarea, Image, VStack, Divider, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

const AddTrainingPackage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    train_name: "",
    train_price: "",
    train_desc: "",
    train_image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, train_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Create the training package
      const createTrainingPackageResponse = await axios.post('https://pawfect-match-backend-six.vercel.app//api/trainPack/createNewTrainingPack', formData, {
        withCredentials: true
      });
      const newTrainPack = createTrainingPackageResponse.data.newTrainPack;
      console.log("New Training Package created:", newTrainPack);
      console.log(formData.train_image)
      // Step 2: Upload the main photo if selected
      if (formData.train_image) {
        const formDataImage = new FormData();
        formDataImage.append('image', formData.train_image);

        const uploadImageResponse = await axios.post(`https://pawfect-match-backend-six.vercel.app//api/image/uploadTrainingImage/${newTrainPack.train_id}`, formDataImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Image uploaded:", uploadImageResponse.data);
      }

      // Reset form fields after successful submission
      setFormData({
        train_name: "",
        train_price: "",
        train_desc: "",
        train_image: null,
      });

      toast({
        title: 'Training Package Added',
        description: 'Training package has been successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Error adding training package:", error);
      // Handle error (e.g., show error message to user)
      toast({
        title: 'Error',
        description: 'Failed to add training package. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box px={4} py={2} mx="auto">
      <VStack align="start" spacing={1}>
        <FormLabel>Name</FormLabel>
        <Input id="train_name" value={formData.train_name} onChange={handleChange} />
        <FormLabel>Price</FormLabel>
        <Input type="number" id="train_price" value={formData.train_price} onChange={handleChange} />
        <FormLabel>Description</FormLabel>
        <Textarea id="train_desc" value={formData.train_desc} onChange={handleChange} />
        <FormLabel>Main Photo</FormLabel>
        <Input id="train_image" type="file" onChange={handleChange} pl="1px"/>
        {formData.train_image && (
          <Image src={URL.createObjectURL(formData.train_image)} alt="Main Training Package Photo" borderRadius="md" objectFit="contain" height="40vh" width="40vh" />
        )}
      </VStack>
      <Divider my={5} />
      <Button onClick={handleSubmit} mt={4} background="rgba(253, 222, 176, 1)" variant="solid">
        Add Training Package
      </Button>
    </Box>
  );
};

export default AddTrainingPackage;
