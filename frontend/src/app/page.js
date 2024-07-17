"use client"
import { Box, Image, VStack, Flex, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Header from "./components/header";
import Cookie from 'js-cookie';

const HomePage = () => {
  const router = useRouter();
  const userID = Cookie.get('userID');
  const toast = useToast();

  const handleImageClick = (route) => {
    if (!userID) {
      toast({
        title: 'Please Login to view this page',
        description: 'Redirecting to login page',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => router.push('/pages/login'), // Replace with your actual login page route
      });
      return;
    }
    router.push(route);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Header />
      <Flex direction="row" mt="10px" justifyContent="center" alignItems="center" gap="2.5%" p="20px" maxWidth="100%">
        <VStack onClick={() => handleImageClick('/pages/pets')} cursor="pointer">
          <Box
            borderRadius="10px"
            padding="3%"
            paddingRight="10%"
            bg="rgba(255, 250, 245, 0.7)"
            width={['50vw', '40vw', '30vw']}
            minHeight={['65vh', '55vh', '55vh']}
            textAlign="center"
          >
            <Heading
              fontSize="250%"
              fontFamily="'Lilita One', cursive"
              fontWeight="bold"
              textAlign="center"
              mt="4%"
            >
              Pets
            </Heading>
            <Image src="/pets_option.png" alt="Pets" boxSize="100%" objectFit="cover" />
          </Box>
        </VStack>
        <VStack onClick={() => handleImageClick('/pages/training')} cursor="pointer">
          <Box
            borderRadius="10px"
            paddingTop="3%"
            paddingBottom="3%"
            paddingLeft="10%"
            paddingRight="10%"
            bg="rgba(255, 250, 245, 0.7)"
            width={['50vw', '40vw', '30vw']}
            minHeight={['65vh', '55vh', '55vh']}
            textAlign="center"
          >
            <Heading
              fontSize={['200%', '200%', '250%', '250%']}
              fontFamily="'Lilita One', cursive"
              fontWeight="bold"
              textAlign="center"
              mt="4%"
            >
              Training Packages
            </Heading>
            <Image src="/training_option.png" alt="Training Packages" boxSize="100%" objectFit="cover" />
          </Box>
        </VStack>
         <VStack onClick={() => handleImageClick('/pages/chat')} cursor="pointer">
          <Box
            borderRadius="10px"
            paddingTop="7%"
            paddingBottom="7%"
            paddingLeft="10%"
            paddingRight="10%"
            bg="rgba(255, 250, 245, 0.7)"
            width={['50vw', '40vw', '30vw']}
            minHeight={['65vh', '55vh', '55vh']}
            textAlign="center"
          >
            <Heading
              fontSize={['200%', '200%', '250%', '250%']}
              fontFamily="'Lilita One', cursive"
              fontWeight="bold"
              textAlign="center"
              mb="4%"
            >
              PawAI
            </Heading>
            <Image src="../chick.png" alt="Training Packages" boxSize="100%" objectFit="cover" />
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default HomePage;
