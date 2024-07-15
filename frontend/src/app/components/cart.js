'use client'
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [trainingPackages, setTrainingPackages] = useState([]);
  const userId = Cookie.get('userID');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cart/getCart/${userId}`);
        const cartItemIds = response.data.userCart.user_cart;

        // Fetch details for each training package ID in user_cart
        const fetchTrainingPackages = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/trainPack/getAllTrainingPack`);
            const allTrainPack = response.data.allTrainPack;
            
            const cartItemsData = cartItemIds.map(itemId => {
              const item = allTrainPack.find(trainPackage => trainPackage.train_id === itemId);
              return item;
            });
            setCart(cartItemsData);
          } catch (error) {
            console.error('Error fetching training packages:', error);
          }
        };

        fetchTrainingPackages();
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart([]); // Fallback to an empty array in case of error
      }
    };

    fetchCart();
  }, [userId]);

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.train_price), 0);

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCart([]);
    router.push('/pages/stripe');
  };

  const handleRemoveFromCart = async (item) => {
    try {
      await axios.put(`http://localhost:3001/api/cart/deleteCart/${userId}/delete/${item.train_id}`);
      setCart(cart.filter(cartItem => cartItem.train_id !== item.train_id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5}>Your Cart</Text>
      <VStack spacing={4} align="stretch">
        {cart.map((item, index) => (
          <HStack key={index} justify="space-between" p={4} bg="gray.100" borderRadius="md">
            <Text>{item.train_name}</Text>
            <Text>${item.train_price}</Text>
            <Button colorScheme="red" onClick={() => handleRemoveFromCart(item)}>Remove</Button>
          </HStack>
        ))}
      </VStack>
      <Text fontSize="xl" fontWeight="bold" mt={5}>Total: ${totalPrice.toFixed(2)}</Text>
      <Button colorScheme="teal" mt={4} onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
};

export default Cart;
