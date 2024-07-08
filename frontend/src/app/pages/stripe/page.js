'use client'

require('dotenv').config({ path: '../../../../dotenv' });
import { Box, Button } from '@chakra-ui/react';
import Header from "../../components/header";
import React, {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PK)
const stripe = require('stripe')('sk_test_51PMUR2Rp0e1tw1uxH3gNUIUwoaAzGOirfCDrkqRlxaFrsGVuHGQDLDMEnDkcHe8RLyhZaixmLnQ6YY4bkFLzCAae0096uzBRLV')

const userID  = 4

function StripePage() {
  console.log(stripePromise)
  const [cartItems, setCartItems] = useState([]);
  const [calculateGrandTotal, setCalculateGrandTotal] = useState(0);

  const StripeSessionPayment = async () => {

    try{
      const stripes = await stripePromise;
      console.log("Button clicked!");
      console.log('Stripe public key:', stripePromise);
      //const userID  = 4
      console.log('Received Trial userID:', userID);

      console.log("Success 1")

      const responseCart = await fetch(`http://localhost:3001/api/cart/getCart/${userID}`, {
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
      const lineItems = [];
      let stripeGrandTotal = 0

      for (const cartItem of cartItems){
        const responseOneTrainItem = await fetch (`http://localhost:3001/api/trainPack/getOneTrainingPackIdNameMoney/${cartItem}`)
        const OneTrainItem = await responseOneTrainItem.json();
        console.log (OneTrainItem)
        
        const responseOneTrainItemName = OneTrainItem.oneTrainPack[0].train_name

        console.log("Training Package Name : " + responseOneTrainItemName)
 
        const responseOneTrainItemPrice = parseFloat(OneTrainItem.oneTrainPack[0].train_price)

        stripeGrandTotal += responseOneTrainItemPrice

        const unitAmount = Math.round(responseOneTrainItemPrice * 100);

        console.log("Training Package Price : " + responseOneTrainItemPrice + typeof(responseOneTrainItemPrice))

        console.log ("END of Generating Packages")

        console.log("Success 5")

        itemCounts[cartItem] = (itemCounts[cartItem] || 0) + 1;

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

      const transactionData = {
        user_id : userID,
        txn_items : cartItems,
        txn_amt : gstGrandTotal,
        is_success : 'True'
      }

      localStorage.setItem('transactionData', JSON.stringify(transactionData));
  
      const session = await stripe.checkout.sessions.create({  //stripe session
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/pages/stripe/?success=true`,
            cancel_url: `http://localhost:3000/pages/stripe/?canceled=true`,
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
      const response = await fetch('http://localhost:3001/api/txn/createTxn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
  
      const data = await response.json();
      console.log('Transaction logged:', data);
    } catch (error) {
      console.error('Error logging transaction:', error);
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
      } else {
        console.error('No transaction data found in localStorage.');
      }
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, [cartItems, calculateGrandTotal]);


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