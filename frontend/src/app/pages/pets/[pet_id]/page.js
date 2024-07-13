// pages/pets/[pet_id].js
'use client'
import { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, IconButton, Button } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'next/navigation'

const PetProfile = () => {
    const pet_id = useParams().pet_id;

    const [pet, setPet] = useState(null);
    const [liked, setLiked] = useState(false);

    // Function to handle like button click
    const handleLikeButtonClick = () => {
        setLiked(!liked);
        // Implement logic for liking the pet
    };

    useEffect(() => {
        const fetchPet = async () => {
            try {
                if (!pet_id) return; // Exit early if pet_id is undefined

                const response = await fetch(`http://localhost:3001/api/pets/id/${pet_id}`);
                const data = await response.json();
                setPet(data);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPet();
    }, [pet_id]);

    if (!pet_id) {
        return <div>Loading...</div>; // Handle initial loading state
    }

    if (!pet) {
        return <div>Unable to find pet with ID: {pet_id}</div>; // Handle case where pet data is not found
    }

    return (
        <Box maxW="80vw" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Box>
                <Image
                    src={pet.mainPhoto || pet.imageUrl} // Adjust based on your data structure
                    alt={pet.pet_name} // Use pet_name for accessibility
                    borderRadius="md"
                    height="40vh"
                    width="40vh"
                    objectFit="contain"
                />
                <VStack align="start" mt={4}>
                    <Text fontSize="4xl" fontWeight="bold">
                        {pet.pet_name} {/* Use pet_name */}
                        <IconButton
                            icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                            onClick={handleLikeButtonClick}
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Like button"
                            fontSize="6xl"
                            ml={2}
                        />
                    </Text>
                    <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Breed: {pet.pet_breed}</Text> {/* Use pet_breed */}
                    <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Age: {pet.pet_age} years</Text> {/* Use pet_age */}
                    <Text fontSize={["1rem", "0.75rem", "1.0rem", "1.5rem"]}>Description: {pet.pet_description || "No description available"}</Text> {/* Adjust as necessary */}
                    <Button colorScheme="blue" mt={4}>Match</Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default PetProfile;
