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
  useToast,
  HStack
} from '@chakra-ui/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/header';
import axios from 'axios';

export default function RegisterCard() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email_add: '',
    user_name: '',
    user_password: '',
    confirm_password: '',
    user_age: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTraitChange = (e) => {
    const traits = e.target.value.split(',').map(trait => trait.trim());
    setFormData({ ...formData, person_traits: traits });
  };

  const handleSignUp = async () => {
    if (formData.user_password !== formData.confirm_password) {
      toast({
        title: 'Password Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const emailCheckResponse = await axios.get('https://pawfect-match-backend-six.vercel.app/api/users/getAllUser');
      const emailExists = emailCheckResponse.data.some(user => user.email_add === formData.email_add);

      if (emailExists) {
        toast({
          title: 'Registration Error',
          description: 'Email is already in use',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const response = await axios.post('https://pawfect-match-backend-six.vercel.app/api/users/createNewUser', formData);
      toast({
        title: 'Account Created Successfully',
        description: 'Taking you to the login page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push('/pages/login');
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error('Axios Error:', error);

      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        toast({
          title: 'Registration Error',
          description: error.response.data,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error('No Response Received:', error.request);
        toast({
          title: 'Registration Error',
          description: 'No response received from the server',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error Message:', error.message);
        toast({
          title: 'Registration Error',
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
      {/* <Header /> */}
      <Flex direction="column" height="100vh">
        <Box marginBottom= "100px">
          <Header />
        </Box>
        <Box 
          position="fixed"
          top="60px"
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
            maxW={'xl'}
          >
            <Box
              borderRadius="10px"
              paddingTop="3%"
              paddingBottom="3%"
              paddingLeft="10%"
              paddingRight="10%"
              bg="rgba(255, 250, 245, 0.7)"
              width={['90vw', '70vw', '50vw']}
              minHeight={['70vh', '85vh', '85vh']}
            >
              <Heading
                fontSize="180%"
                fontFamily="'Lilita One', cursive"
                fontWeight="bold"
                textAlign="center"
                mb="10px"
              >
                Sign Up
              </Heading>

              <Stack spacing={4}>
                <FormControl id="email_add">
                  <Input
                    onChange={handleChange}
                    type="email"
                    placeholder='Email'
                    width="100%"
                    padding="10px"
                    size="md"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl id="user_name">
                  <Input
                    onChange={handleChange}
                    type="text"
                    placeholder='Username'
                    width="100%"
                    padding="10px"
                    size="md"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl id="user_password">
                  <Input
                    onChange={handleChange}
                    type="password"
                    placeholder='Password'
                    width="100%"
                    padding="10px"
                    size="md"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl id="confirm_password">
                  <Input
                    onChange={handleChange}
                    type="password"
                    placeholder='Confirm Password'
                    width="100%"
                    padding="10px"
                    size="md"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <FormControl id="user_age">
                  <Input
                    onChange={handleChange}
                    type="number"
                    placeholder='Age'
                    width="100%"
                    padding="10px"
                    size="md"
                    borderRadius="5px"
                    borderColor="#D9D9D9"
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                </FormControl>
                <Button
                  onClick={handleSignUp}
                  _hover={{ cursor: 'pointer' }}
                  width="100%"
                  padding="30px"
                  borderRadius="5px"
                  backgroundColor="#F8D3A7"
                  textColor='black'
                >
                  Register
                </Button>
                <Stack alignItems='center' mt="2">
                  <Text fontFamily="sans-serif" fontSize="13">
                    Already have an account? {" "}
                    <Link href="/pages/login" passHref>
                      <button style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Login</button>
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
