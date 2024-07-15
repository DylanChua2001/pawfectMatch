// components/PetProfile.js
'use client'
import { useState, useEffect } from 'react';
import { Box, Image, Text, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'next/navigation'
import Header from '../../../components/header';

const PetProfile = ({ onLike, showNameAndPhotoOnly }) => {
    const [liked, setLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pet_id = useParams().pet_id;
    const [pet, setPet] = useState(null);

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

    const handleLikeButtonClick = () => {
        setLiked(!liked);
        onLike(pet); // Notify parent component of like action
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <Box maxW="80vw" mx="auto" my={10} p={5} backgroundColor="rgba(255, 255, 255, 0.7)" borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Box>
                    <Image
                        src={pet.mainPhoto || pet.imageUrl} // Adjust based on your data structure
                        alt={pet.pet_name} // Use pet_name for accessibility
                        borderRadius="md"
                        height="40vh"
                        width="40vh"
                        objectFit="contain"
                    />
                    {!showNameAndPhotoOnly && (
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
                    )}

                </Box>

                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Match</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontSize="lg" fontWeight="bold" color="green.500">
                                Congratulations! You have been matched with {pet.pet_name}.
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default PetProfile;


