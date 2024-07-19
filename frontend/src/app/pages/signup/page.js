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
    user_id: '',
    email_add: '',
    user_name: '',
    user_password: '',
    user_age: '',
    person_traits: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTraitChange = (e) => {
    const traits = e.target.value.split(',').map(trait => trait.trim());
    setFormData({ ...formData, person_traits: traits });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/users/createNewUser", formData);
      toast({
        title: 'Account Created Successfully',
        description: 'Taking you to the login page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/pages/login");
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
      <Header />
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Stack
          align={'center'}
          spacing={6}
          mx={'auto'}
          maxW={'xl'}
          mt={40}
        >
          <Box
            borderRadius="10px"
            paddingTop="3%"
            paddingBottom="3%"
            paddingLeft="10%"
            paddingRight="10%"
            bg="rgba(255, 250, 245, 0.7)"
            width={['90%', '70%', '50vw']}
            minHeight={['70vh', '85vh', '85vh']}
          >
            <Heading
              fontSize="180%"
              fontFamily="'Lilita One', cursive"
              fontWeight="bold"
              textAlign="center"
              mb={10}
            >
              Sign Up
            </Heading>

            <Stack spacing={4}>
              <FormControl id="email_add">
                <Input
                  onChange={handleChange}
                  type="email"
                  placeholder='Email Address'
                  size="lg"
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
                  size="lg"
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
                  size="lg"
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
                  size="lg"
                  borderRadius="5px"
                  borderColor="#D9D9D9"
                  _focus={{ bg: "white", borderColor: "blue.400" }}
                />
              </FormControl>
              <FormControl id="person_traits">
                <Input
                  onChange={handleTraitChange}
                  type="text"
                  placeholder='Traits (comma separated)'
                  size="lg"
                  borderRadius="5px"
                  borderColor="#D9D9D9"
                  _focus={{ bg: "white", borderColor: "blue.400" }}
                />
              </FormControl>
              <Button
                onClick={handleSignUp}
                _hover={{ cursor: 'pointer' }}
                width="100%"
                padding="10"
                borderRadius="5px"
                backgroundColor="#F8D3A7"
                textColor='black'
              >
                Register
              </Button>
              <Stack alignItems='center' mt="5">
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
      </Flex>
    </>
  );
}
