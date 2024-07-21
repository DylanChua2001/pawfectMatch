'use client'
import { Box, Button, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PK)
const stripe = require('stripe')('sk_test_51PMUR2Rp0e1tw1uxH3gNUIUwoaAzGOirfCDrkqRlxaFrsGVuHGQDLDMEnDkcHe8RLyhZaixmLnQ6YY4bkFLzCAae0096uzBRLV')


const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [trainingPackages, setTrainingPackages] = useState([]);
  const userId = Cookie.get('userID');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://pawfect-match-three.vercel.app/api/cart/getCart/${userId}`);
        const cartItemIds = response.data.userCart.user_cart;

        // Fetch details for each training package ID in user_cart
        const fetchTrainingPackages = async () => {
          try {
            const response = await axios.get(`https://pawfect-match-three.vercel.app/api/trainPack/getAllTrainingPack`);
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

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.train_price), 0) * 1.09;

  console.log(stripePromise)
  const [cartItems, setCartItems] = useState([]);
  const [calculateGrandTotal, setCalculateGrandTotal] = useState(0);

  const StripeSessionPayment = async () => {

    try{
      const stripes = await stripePromise;
      console.log("Button clicked!");
      console.log('Stripe public key:', stripePromise);
      console.log('Received Trial userID:', userId);

      console.log("Success 1")

      const responseCart = await fetch(`https://pawfect-match-backend-six.vercel.app/api/cart/getCart/${userId}`, {
        method: 'GET',
      });

      console.log("Success 2")

      if (!responseCart.ok) {
        throw new Error(`HTTP error! status: ${responseCart.status}`);
      }
  
      console.log("Fetch Response:", responseCart);
  
      if (!responseCart.ok) {
        throw new Error('Failed to create checkout session');
      }

      const responseData1 = await responseCart.json();

      const cartItems = responseData1.userCart.user_cart;
      console.log("Success 4")
      console.log('Cart items:', cartItems);

      setCartItems(cartItems)
      console.log(setCartItems(cartItems))

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
          // Check if cartItems is not an array or if it's an empty array
          throw new Error('No cart items found.' + cartItems);
      }

      console.log("Test Start")

      const itemCounts = {};
      for (const cartItem of cartItems) {
        itemCounts[cartItem] = (itemCounts[cartItem] || 0) + 1;
      }

      const lineItems = [];
      let stripeGrandTotal = 0

      for (const cartItem in itemCounts){
        const responseOneTrainItem = await fetch (`https://pawfect-match-backend-six.vercel.app/api/trainPack/getOneTrainingPackIdNameMoney/${cartItem}`)
        const OneTrainItem = await responseOneTrainItem.json();
        console.log (OneTrainItem)
        
        const responseOneTrainItemName = OneTrainItem.oneTrainPack[0].train_name

        console.log("Training Package Name : " + responseOneTrainItemName)
 
        const responseOneTrainItemPrice = parseFloat(OneTrainItem.oneTrainPack[0].train_price)

        stripeGrandTotal += responseOneTrainItemPrice * itemCounts[cartItem];

        const unitAmount = Math.round(responseOneTrainItemPrice * 100);

        console.log("Training Package Price : " + responseOneTrainItemPrice + typeof(responseOneTrainItemPrice))

        console.log ("END of Generating Packages")

        console.log("Success 5")

        // Create product in Stripe
        const product = await stripe.products.create({
            name : responseOneTrainItemName
        })

        console.log("Success 6 Creating Product in Stripe")

        const price = await stripe.prices.create({
          product : product.id,
          unit_amount : unitAmount,
          currency: 'sgd'
        })

        console.log("Success 7 Creating Pricing in Stripe")
  
        lineItems.push({
            price: price.id,
            quantity: itemCounts[cartItem], // Include the quantity here
        });

        console.log("Success 8 Created Line Items Successfuly")

      }

      let gstGrandTotal = stripeGrandTotal * 1.09

      setCalculateGrandTotal(gstGrandTotal)

      console.log(userId)

      const transactionData = {
        user_id : userId,
        txn_items : cartItems,
        txn_amt : gstGrandTotal,
        is_success : 'True'
      }

      localStorage.setItem('transactionData', JSON.stringify(transactionData));
  
      const session = await stripe.checkout.sessions.create({  //stripe session
            line_items: lineItems,
            mode: 'payment',
            success_url: `https://pawfect-match-backend-six.vercel.app`,
            cancel_url: `https://pawfect-match-backend-six.vercel.app/pages/cart`,
            automatic_tax: { enabled: true }
      })

      console.log("Success 9 Stripe Session Ready")

      if (session.url) {
        console.log("Redirecting to Stripe Checkout:", session.url)
        window.location.href = session.url;
      } else {
        console.error('Error creating checkout session:', session);
      }
    } catch (error) {
      console.error('Error in StripeSessionPayment:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  const logTxnData = async(transactionData) => {
    try {
      const response = await fetch('https://pawfect-match-backend-six.vercel.app/api/txn/createTxn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
  
      const data = await response.json();
      console.log('Transaction logged:', data);

      localStorage.removeItem('transactionData');
      console.log('Local storage cleared.');

    } catch (error) {

      console.error('Error logging transaction:', error);
      
    }
  }

  const emptyUserCart = async() => {
    try {
      const response = await fetch(`https://pawfect-match-backend-six.vercel.app/api/cart/resetCart/${userId}`, {
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('User cart reset:', data);

    } catch (error) {

      console.error('Error emptying user cart:', error);

    }

  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      const storedTransactionData = JSON.parse(localStorage.getItem('transactionData'));
      if (storedTransactionData) {
        console.log('Order placed! You will receive an email confirmation.');
        console.log('Current cartItems:', storedTransactionData.txn_items);
        console.log('Current calculateGrandTotal:', storedTransactionData.txn_amt);

        localStorage.setItem('orderConfirmation', 'Order placed! You will receive an email confirmation.');
        logTxnData(storedTransactionData);
        emptyUserCart()
      } else {
        console.error('No transaction data found in localStorage.');
      }
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, [cartItems, calculateGrandTotal]);
  

  const handleRemoveFromCart = async (item) => {
    try {
      await axios.put(`https://pawfect-match-backend-six.vercel.app/api/cart/deleteCart/${userId}/delete/${item.train_id}`);
      //setCart(cart.filter(cartItem => cartItem.train_id !== item.train_id));
      const index = cart.findIndex(cartItem => cartItem.train_id === item.train_id);
      if (index !== -1) {
        // Create a new array without the first occurrence of the item
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
      }

    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={4} h="80vh" display="flex" flexDirection="column">
      <Text fontSize="2xl" fontWeight="bold" mb={2} flexShrink={0}>Your Cart</Text>
      <Box 
        // maxHeight= "70vh" 
        overflowY="auto" 
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        }}>
        <VStack spacing={3} align="stretch">
          {cart.map((item, index) => (
            <HStack key={index} justify="space-between" p={4} bg="gray.100" borderRadius="md">
              <Text>{item.train_name}</Text>
              <Text>${item.train_price}</Text>
              <Button colorScheme="red" onClick={() => handleRemoveFromCart(item)}>Remove</Button>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Box mt={4} flexShrink={0} position="relative">
        <Text fontSize="xl" fontWeight="bold">Total: ${totalPrice.toFixed(2)}</Text>
        <Button bg="rgba(253, 222, 176, 1)" mt={4} width="100%" onClick={StripeSessionPayment}>Checkout</Button>
      </Box>
    </Box>
  );
};

export default Cart;

{/* <Box maxW="800px" mx="auto" p={5}>
//       <Text fontSize="2xl" fontWeight="bold" mb={5}>Your Cart</Text>
//       <VStack spacing={4} align="stretch">
//         {cart.map((item, index) => ( */}
//           <HStack key={index} justify="space-between" p={4} bg="gray.100" borderRadius="md">
//             <Text>{item.train_name}</Text>
//             <Text>${item.train_price}</Text>
//             <Button colorScheme="red" onClick={() => handleRemoveFromCart(item)}>Remove</Button>
//           </HStack>
//         ))}
//       </VStack>
//       <Text fontSize="xl" fontWeight="bold" mt={5}>Total: ${totalPrice.toFixed(2)}</Text>
//       <Button bg="rgba(253, 222, 176, 1)" mt={4} onClick={StripeSessionPayment}>Checkout</Button>
      
//     </Box>
