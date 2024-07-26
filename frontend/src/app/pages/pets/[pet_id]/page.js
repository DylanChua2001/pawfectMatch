'use client'
import { useState, useEffect } from 'react';
import { Spinner, Box, Image, Text, VStack, HStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast, Flex, Spacer } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/header';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const PetProfile = ({ onLike, showNameAndPhotoOnly }) => {
    const [liked, setLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pet_id = useParams().pet_id;
    const [pet, setPet] = useState(null);
    const [photo, setPhoto] = useState('');
    const userID = Cookie.get('userID');
    const toast = useToast();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserMatched, setIsUserMatched] = useState(false);

    useEffect(() => {
        const adminStatus = Cookie.get('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

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
    }, [userID, router, toast]);

    if (!userID) {
        return (
            <>
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
            </>
        );
    }

    useEffect(() => {
        const fetchPet = async () => {
            try {
                if (!pet_id) return;

                const response = await fetch(`https://pawfect-match-backend-six.vercel.app/api/pets/id/${pet_id}`);
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
                const photoresponse = await fetch(`https://pawfect-match-backend-six.vercel.app/api/image/retrievePetImage/${pet_id}`, {
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

    useEffect(() => {
        const fetchFavoritePets = async () => {
            try {
                const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/favourites/getAllFavPets/${userID}`);
                const favoritePets = response.data.userFavPets.user_pet_fav;
                setLiked(favoritePets.includes(pet_id));
            } catch (error) {
                console.error('Error fetching favorite pets:', error);
            }
        };

        if (userID && pet_id) {
            fetchFavoritePets();
        }
    }, [userID, pet_id]);

    const handleLikeButtonClick = async () => {
        const url = liked
            ? `https://pawfect-match-backend-six.vercel.app/api/favourites/deleteFavPet/${userID}/delete/${pet.pet_id}`
            : `https://pawfect-match-backend-six.vercel.app/api/favourites/addFavPet/${userID}/add/${pet.pet_id}`;

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

    useEffect(() => {
        const checkUserMatch = async () => {
            try {
                const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/match/checkUserMatch/${userID}`);
                const { matchedPetId } = response.data;
                setIsUserMatched(!!matchedPetId && matchedPetId !== pet_id);
            } catch (error) {
                console.error('Error checking user match:', error);
            }
        };

        if (userID) {
            checkUserMatch();
        }
    }, [userID, pet_id]);

    useEffect(() => {
        const checkUserMatch = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/match/checkUserMatch/${userID}`);
                const { matchedPetId } = response.data;
                setIsUserMatched(!!matchedPetId && matchedPetId !== pet_id);
            } catch (error) {
                console.error('Error checking user match:', error);
            }
        };

        if (userID) {
            checkUserMatch();
        }
    }, [userID, pet_id]);

    useEffect(() => {
        const checkUserMatch = async () => {
          try {
            const response = await axios.get(`https://pawfect-match-backend-six.vercel.app/api/match/checkUserMatch/${userID}`);
            const { matchedPetId } = response.data;
            setIsUserMatched(!!matchedPetId && matchedPetId !== pet_id);
          } catch (error) {
            console.error('Error checking user match:', error);
          }
        };
    
        if (userID) {
          checkUserMatch();
        }
      }, [userID, pet_id]);

    const handleModalOpen = async () => {
        if (isUserMatched) {
            alert('You are already matched with another pet.');
            return;
        }

        setIsModalOpen(true);

        try {
            await axios.post(`https://pawfect-match-backend-six.vercel.app/api/match/addAMatch/${userID}/${pet.pet_id}`);
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
    const handleDelete = async () => {
        try {
            await axios.delete(`https://pawfect-match-backend-six.vercel.app/api/pets/deletePet/${pet.pet_id}`, {
                isAdmin: true
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

    const handleBackToPets = () => {
        router.push('/pages/pets');
    };

    if (!pet_id) {
        return <><div>Loading...</div></>;
    }

    if (!pet) {
        return <><div>Unable to find pet with ID: {pet_id}</div></>;
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
                borderRadius="15px"
                pl="20px"
                pt="40px"
                pr="20px"
            >
                <Button
                    position="absolute"
                    top="10px"
                    right="10px"
                    colorScheme="blue"
                    onClick={handleBackToPets}
                >
                    Back to Pets
                </Button>
                <HStack>
                    <Image
                        src={photo || pet.imageUrl}
                        alt={pet.pet_name}
                        borderRadius="md"
                        height={["40vh", "40vh", "50vh"]}
                        width={["40vh", "40vh", "50vh"]}
                        objectFit="contain"
                        mr={["20px", "30px", "50px"]}
                        ml={["20px", "30px", "40px"]}
                    />
                    {!showNameAndPhotoOnly && (
                        <VStack
                            align="start"
                            maxW="100%" // Adjust based on your design
                            maxH="210px" // Adjust height to control how much of the content is visible
                            overflowY="auto" // Enable vertical scrolling
                            overflowX="hidden" // Prevent horizontal scrolling
                            sx={{
                                '&::-webkit-scrollbar': {
                                    display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
                                },
                                '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
                                'scrollbar-width': 'none', // Hide scrollbar for Firefox
                                overflowY: 'auto', // Allow vertical scrolling
                            }}
                        >
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
                            <Text>ID: {parseInt(pet.pet_id, 10)}</Text>
                            <Text>Type: {pet.pet_type}</Text>
                            <Text>Breed: {pet.pet_breed}</Text>
                            <Text>Age: {pet.pet_age}</Text>
                            <Text>Description: {pet.pet_description}</Text>
                            <Text>Price: ${pet.pet_price}</Text>
                        </VStack>
                    )}
                </HStack>
                <HStack mt={4} width="100%">
                                        {!isAdmin && (
                    <Button
                        colorScheme="blue"
                        onClick={handleModalOpen}
                        isDisabled={isUserMatched}
                    >
                        Match
                    </Button>
                                                )}
                    <Spacer />
                    {isAdmin && (
                        <Button
                            colorScheme="red"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    )}
                </HStack>
            </Box>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Match</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>You've successfully matched with {pet.pet_name}!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PetProfile;
