"use client";
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

  const boxStyle = {
    borderRadius: "10px",
    padding: "3%",
    bg: "rgba(255, 250, 245, 0.7)",
    width: ['45vw', '30vw', '25vw'],
    height: ['50vh', '50vh', '70vh'],
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const headingStyle = {
    fontSize: ['150%', '150%', '200%', '200%'],
    fontFamily: "'Lilita One', cursive",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    objectFit: "contain",
  };

  return (
    <Flex direction="column" height="100vh">
      <Box>
        <Header />
      </Box>
      <Box
        position="fixed"
        top={["100px", "100px", "100px"]}
        left="0"
        right="0"
        margin="auto"
        maxW={["90%", "92%", "97%"]}
        w="100%"
        h={["calc(100vh - 60px)", "calc(100vh - 70px)", "calc(100vh - 80px)"]}
        overflow="auto"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
          },
          '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
          'scrollbar-width': 'none', // Hide scrollbar for Firefox
        }}
      >
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="2.5%"
          p="20px"
          maxWidth="100%"
          flexWrap="nowrap"
          overflowX="auto"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none', // Hide horizontal scrollbar for Chrome, Safari, and Edge
            },
            '-ms-overflow-style': 'none', // Hide horizontal scrollbar for Internet Explorer and Edge
            'scrollbar-width': 'none', // Hide horizontal scrollbar for Firefox
          }}
        >
          <VStack onClick={() => handleImageClick('/pages/pets')} cursor="pointer" flex="0 0 auto">
            <Box {...boxStyle}>
              <Heading {...headingStyle}>Pets</Heading>
              <Image src="/pets_option.png" alt="Pets" {...imageStyle} />
            </Box>
          </VStack>
          <VStack onClick={() => handleImageClick('/pages/training')} cursor="pointer" flex="0 0 auto">
            <Box {...boxStyle}>
              <Heading {...headingStyle}>Training Packages</Heading>
              <Image src="/training_option.png" alt="Training Packages" {...imageStyle} />
            </Box>
          </VStack>
          <VStack onClick={() => handleImageClick('/pages/chat')} cursor="pointer" flex="0 0 auto">
            <Box {...boxStyle}>
              <Heading {...headingStyle}>PawAI</Heading>
              <Image src="../chick.png" alt="PawAI" {...imageStyle} />
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HomePage;
