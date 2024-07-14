// pages/cart.js
'use client'
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.train_price), 0);

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCart([]);
    router.push('/pages/stripe');
  };

  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5}>Your Cart</Text>
      <VStack spacing={4} align="stretch">
        {cart.map((item, index) => (
          <HStack key={index} justify="space-between" p={4} bg="gray.100" borderRadius="md">
            <Text>{item.train_name}</Text>
            <Text>${item.train_price}</Text>
          </HStack>
        ))}
      </VStack>
      <Text fontSize="xl" fontWeight="bold" mt={5}>Total: ${totalPrice.toFixed(2)}</Text>
      <Button colorScheme="teal" mt={4} onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
};

export default Cart;
