"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });

    // Mock login success
    if (email === 'user@example.com' && password === 'password') {
      // Redirect to home page or dashboard after successful login
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      m="20px auto"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="md" width="full">
          Login
        </Button><br></br>
        <Button onClick={() => router.push('/selection')}>Go to selection</Button>
      </form>
    </Box>
  );
}
