'use client'
import { useState, useEffect } from 'react';
import { Spinner, Box, Image, Text, VStack, HStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast, Flex} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/header';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const PetProfile = ({ onLike, showNameAndPhotoOnly, isAdmin }) => {
    const [liked, setLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pet_id = useParams().pet_id;
    const [pet, setPet] = useState(null);
    const [photo, setPhoto] = useState('');
    const userID = Cookie.get('userID');
    const toast = useToast();
    const router = useRouter();
  
    useEffect(() => {
      if (!userID) {
        toast({
          title: 'Please login to view this page',
          status: 'error',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => router.push('/pages/login'), // Replace with your actual login page route
        });
        return;
      }
    }, [userID, router, toast]); // Added the dependency array
  
    if (!userID) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
          <Text fontSize="xl" color="black" mt={4}>Redirecting to the login page...</Text>
        </Box>
      );
    }  

    useEffect(() => {
        const fetchPet = async () => {
            try {
                if (!pet_id) return;

                const response = await fetch(`http://localhost:3001/api/pets/id/${pet_id}`);
                const data = await response.json();
                setPet(data);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPet();
    }, [pet_id]);

    useEffect(() => {
        const fetchPhotoList = async () => {
            try {
                const photoresponse = await fetch(`http://localhost:3001/api/image/retrievePetImage/${pet_id}`, {
                    method: 'GET'
                });
                const photoresponsedata = await photoresponse.json();
                const imageSrcUrl = photoresponsedata.petImage[0]?.photo_url;
                setPhoto(imageSrcUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchPhotoList();
    }, [pet_id]);

    const handleLikeButtonClick = async () => {
        const url = liked
            ? `http://localhost:3001/api/favourites/deleteFavPet/${sessionID}/delete/${pet.pet_id}`
            : `http://localhost:3001/api/favourites/addFavPet/${sessionID}/add/${pet.pet_id}`;

        try {
            await axios.put(url, { liked: !liked });
            setLiked(!liked);

            if (onLike) {
                onLike(pet);
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/pets/deletePet/${pet.pet_id}`, {
                withCredentials: true
            });
            toast({
                title: "Success",
                description: `${pet.pet_name} was deleted`,
                status: 'success',
                isClosable: true,
                duration: 5000,
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting pet:", error);
            toast({
                title: "Error",
                description: "There was an error deleting the pet.",
                status: 'error',
                isClosable: true,
                duration: 5000,
            });
        }
    };

    const handleDeleteButtonClick = async () => {
        toast({
            title: `Deleting ${pet.pet_name} is irreversible.`,
            description: (
                <Box textAlign="center">
                    <Button bg="transparent" mr={3} onClick={handleDelete}>
                        Confirm Deletion
                    </Button>
                </Box>
            ),
            status: 'warning',
            isClosable: true,
            duration: null,
            position: 'bottom-left',
        });
        console.log('Delete button clicked');
    };

    if (!pet_id) {
        return <div>Loading...</div>;
    }

    if (!pet) {
        return <div>Unable to find pet with ID: {pet_id}</div>;
    }

    return (
        <>
            <Header />
            <Box
                position="fixed"
                top={["100px", "100px", "100px"]} // Adjust the top position as needed for different screen sizes
                left="0"
                right="0"
                margin="auto"
                maxW={["90%", "92%", "97%"]}
                w="100%"
                h={["calc(100vh - 200px)", "calc(100vh - 180px)", "calc(100vh - 150px)"]}
                overflowY="auto"
                bg="rgba(255, 250, 245, 0.7)"
                borderRadius= "15px"
                pl= "20px"
                pt= "40px"
            >
                <HStack>
                    <Image
                        src={photo || pet.imageUrl}
                        alt={pet.pet_name}
                        borderRadius="md"
                        height={["40vh", "40vh", "50vh"]}
                        width={["40vh", "40vh", "50vh"]}
                        objectFit="contain"
                        mr= {["20px", "30px", "50px" ]}
                        ml= {["20px", "30px", "40px" ]}
                    />
                    {!showNameAndPhotoOnly && (
                        <VStack align="start" mt={4}>
                            <HStack>
                                <Text fontSize={["1.2rem", "1.5rem", "1.7rem", "2rem"]} fontWeight="bold">
                                    {pet.pet_name}
                                </Text>
                                <IconButton
                                    icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                                    onClick={handleLikeButtonClick}
                                    variant="ghost"
                                    colorScheme="red"
                                    aria-label="Like button"
                                    fontSize={["3xl", "3xl", "4xl", "4xl"]}
                                    ml={2}
                                />
                            </HStack>
                            <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Breed: {pet.pet_breed}</Text>
                            <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Age: {pet.pet_age} years</Text>
                            <Text fontSize={["0.90rem", "0.95rem", "1rem", "1.2rem"]}>Description: {pet.pet_description || "No description available"}</Text>
                            <Button bg="rgba(253, 222, 176, 1)" onClick={handleModalOpen} color='black'  position="absolute" bottom={4} left={4}>Match</Button>
                        </VStack>
                    )}
                </HStack>
          

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

