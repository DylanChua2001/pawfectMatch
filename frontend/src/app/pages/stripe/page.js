'use client'

require('dotenv').config({ path: '../../../../dotenv' });
import { Box, Button } from '@chakra-ui/react';
import Header from "../../components/header";
import React, {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PK)



function StripePage() {
  console.log(stripePromise)

  const StripeSessionPayment = async (req,res) => {

    try{
      const stripe = await stripePromise;
      console.log("Button clicked!");
      console.log('Stripe public key:', stripePromise);
      //const userID  = 4
      console.log('Received Trial userID:', userID);

      console.log("Success 1")

      const response = await fetch(`http://localhost:3001/api/cart/getCart/${userID}`, {
        method: 'GET',
      });

      console.log("Success 2")

      if (!responseCart.ok) {
        throw new Error(`HTTP error! status: ${responseCart.status}`);
      }
  
      console.log("Fetch Response:", response);
  
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const responseCart = await fetch (`http://localhost:3001/api/cart/getCart/${userID}`)
      console.log("Success 3")

      const responseData1 = await responseCart.json();

      const cartItems = responseData1.userCart.user_cart;
      console.log("Success 4")
      //console.log('Cart items:', cartItems);

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
          // Check if cartItems is not an array or if it's an empty array
          throw new Error('No cart items found.' + cartItems);
      }

      console.log("Test Start")

      const itemCounts = {};
      const lineItems = [];
      var calculateGrandTotal = 0

      for (const cartItem of cartItems){
        const responseOneTrainItem = await fetch (`http://localhost:3001/api/trainPack/getOneTrainingPackIdNameMoney/${cartItem}`)
        const OneTrainItem = await responseOneTrainItem.json();
        console.log (OneTrainItem)
        
        const responseOneTrainItemName = OneTrainItem.oneTrainPack[0].train_name

        console.log("Training Package Name : " + responseOneTrainItemName)
 
        const responseOneTrainItemPrice = parseFloat(OneTrainItem.oneTrainPack[0].train_price)

        calculateGrandTotal += responseOneTrainItemPrice

        const unitAmount = Math.round(responseOneTrainItemPrice * 100);

        console.log("Training Package Price : " + responseOneTrainItemPrice + typeof(responseOneTrainItemPrice))

        console.log ("END")

        itemCounts[cartItem] = (itemCounts[cartItem] || 0) + 1;

        // Create product in Stripe
        const product = await stripe.products.create({
            name : responseOneTrainItemName
        })

        const price = await stripe.prices.create({
          product : product.id,
          unit_amount : unitAmount,
          currency: 'sgd'
        })
  
        lineItems.push({
            price: price.id,
            quantity: itemCounts[cartItem], // Include the quantity here
        });

      }
  
      const session = await stripe.checkout.sessions.create({  //stripe session
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/?success=true`,
            cancel_url: `http://localhost:3000/?canceled=true`,
            automatic_tax: { enabled: true }
      })

      res.json({ url: session.url });

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
