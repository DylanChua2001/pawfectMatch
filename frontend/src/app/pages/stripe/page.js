'use client'

require('dotenv').config({ path: '../../../../dotenv' });
import { Box, Button } from '@chakra-ui/react';
import Header from "../../components/header";
import React, {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PK)


function StripePage() {
  console.log(stripePromise)

  const StripeSessionPayment = async () => {
    try{
      console.log("Button clicked!");
      console.log('Stripe public key:', stripePromise);
      const userID  = 4
  
      const stripe = await stripePromise;
  
      const response = await fetch(`http://localhost:3001/api/cart/stripepay/${userID}`, {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
        }
      })
  
      console.log("Fetch Response:", response);
  
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
  
      const session = await response.json();
  
      if (session.url) {
        console.log("Redirecting to Stripe Checkout:", session,url)
        window.location.href = session.url;
      } else {
        console.error('Error creating checkout session:', session);
      }
    } catch (error) {
      console.error('Error in StripeSessionPayment:', error);
      // Handle error (e.g., display error message to user)
    }
  };
   
  useEffect(() => {
      const query = new URLSearchParams(window.location.search);
  
      if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
      }
  
      if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }, []);


  useEffect(() => {
      const query = new URLSearchParams(window.location.search);
  
      if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
      }
  
      if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }, []);


  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Header />
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Button onClick={StripeSessionPayment}>Click Me</Button>
        </Box>
      </Box>
    </>
  );
};

export default StripePage;
