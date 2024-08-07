'use client'

import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/header';
import Cookie from 'js-cookie';
import axios from 'axios';

export default function SimpleCard() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',  // Assuming 'username' is what your backend expects
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://pawfect-match-backend-six.vercel.app/api/auth/login', formData, {
        withCredentials: true
      });
      console.log(response)
      const { userID, isAdmin } = response.data.session;
      Cookie.set('userID', userID);
      Cookie.set('isAdmin', isAdmin);
      router.push("/pages/loginLoading");
    } catch (error) {
      console.error('Axios Error:', error);

      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        toast({
          title: 'Login Error',
          description: error.response.data,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error('No Response Received:', error.request);
        toast({
          title: 'Login Error',
          description: 'No response received from the server',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error Message:', error.message);
        toast({
          title: 'Login Error',
          description: 'An error occurred',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
  <>
  <Flex direction="column" height="100vh">
      <Box marginBottom= "100px">
        <Header />
      </Box>
      <Box 
        position="fixed"
        top="70px"
        left="0"
        right="0"
        margin="auto"
        maxW={["90%", "92%", "97%"]}
        w="100%"
        h={["calc(100vh - 60px)", "calc(100vh - 70px)", "calc(100vh - 80px)"]}
        overflowY="auto"
        sx={{
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
        },
        '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
        'scrollbar-width': 'none', // Hide scrollbar for Firefox 
      }}
        >
          <Stack
            align={'center'}
            mx={'auto'}
            maxW={'xl'}>
            <Box
              borderRadius="10px"
              paddingLeft="8%"
              paddingRight="8%"
              bg="rgba(255, 250, 245, 0.7)"
              width={['90vw', '70vw', '50vw']}
              minHeight={['80vh', '85vh', '85vh']}
            >
              <Heading
                fontSize="180%"
                fontFamily="'Lilita One', cursive"
                fontWeight="bold"
                textAlign="center"
                mt="4%">
                Login
              </Heading>

              <Stack spacing={4}>

                <FormControl id="username">
                  <Input
                    onChange={handleChange}
                    type="text"
                    placeholder='Email'
                    width="100%"
                    padding="20px"
                    mt="4%"
                    size="100"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl id="password">
                  <Input
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    width="100%"
                    padding="20px"
                    mt="2%"
                    size="100"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <Stack>
                  <Button
                    onClick={handleSignIn}
                    _hover={{ cursor: 'pointer' }}
                    alignItems='center'
                    width="100%"
                    padding="30px"
                    mt="3%"
                    borderRadius="5px"
                    backgroundColor="#F8D3A7"
                    textColor='black'>
                    Login
                  </Button>
                </Stack>
                <Stack alignItems='center' mt="3%" fontFamily="sans-serif" fontSize="13" >
                  <Text>Don't have an account? {' '}
                    <Link href="/pages/signup" color='blue' background='none' border='none' cursor='pointer' display="inline-block" passHref >
                      <button style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Sign up</button>
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
      </Box>
    </Flex>
  </>
  )
}

