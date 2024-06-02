"use client"
import { Box, Image, Text, VStack, Center, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  return (
    <Box textAlign="center" height="100vh">
      <Box position="absolute" top={5} left={5}>
        <Text fontSize="2xl">Pawfect Match</Text>
      </Box>
      <Center height="100%">
        <Flex justify="center" align="center" gap={10}>
          <VStack>
            <Box boxSize="450px" border="1px solid" borderColor="gray.200">
              <Image src="/corgi.jpg" alt="Pets" boxSize="100%" objectFit="cover" />
            </Box>
            <Text>Pets</Text>
          </VStack>
        </Flex>
      </Center>
    </Box>
  );
};

export default HomePage;

