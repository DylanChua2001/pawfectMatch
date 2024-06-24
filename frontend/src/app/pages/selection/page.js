"use client"
import { Box, Image, Text, VStack, Center, Flex, HStack, Stack, Heading} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";

const HomePage = () => {
  const router = useRouter();

  const handleImageClick = (route) => {
    router.push(route);
  };

  return (
    <Flex height="100vh"alignItems="center" justifyContent="center">
      <Header></Header>
      <Flex direction= "row" mt= "10px" justifyContent="center" alignItems="center" gap='10%' p='20px' maxWidth="100%">
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
              fontWeight= "bold"
              textAlign="center"
              mt= "4%">
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
              fontWeight= "bold"
              textAlign="center"
              mt= "4%">
              Training Packages 
            </Heading>
            <Image src="/training_option_1.png" alt="Training Packages" boxSize="100%" objectFit="cover" />
          </Box>
        </VStack>
      </Flex>

    </Flex>



    
   
  );
};

export default HomePage;

