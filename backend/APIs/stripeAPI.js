require('dotenv').config()

//const stripe = require('stripe')(process.env.STRIPE_KEY_SK)
const stripe = require('stripe')('sk_test_51PMUR2Rp0e1tw1uxH3gNUIUwoaAzGOirfCDrkqRlxaFrsGVuHGQDLDMEnDkcHe8RLyhZaixmLnQ6YY4bkFLzCAae0096uzBRLV')

const createCheckoutSession = async(req,res) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    try {
        //Send UserID into the sequeunce 
        const userID = req.params.userID; // Extract userID from params
        console.log('Received userID:', userID);

        const responseCart = await fetch (`https://pawfect-match-three.vercel.app/api/cart/getCart/${userID}`)
        const responseData1 = await responseCart.json();

        const cartItems = responseData1.userCart.user_cart;
        //console.log('Cart items:', cartItems);
        
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            // Check if cartItems is not an array or if it's an empty array
            throw new Error('No cart items found.' + cartItems);
        }
        console.log("Test Start")
        const itemCounts = {};
        const lineItems = [];

        for (const cartItem of cartItems){
            const responseOneTrainItem = await fetch (`https://pawfect-match-three.vercel.app/api/trainPack/getOneTrainingPackIdNameMoney/${cartItem}`)
            const OneTrainItem = await responseOneTrainItem.json();
            console.log (OneTrainItem)
            
            const responseOneTrainItemName = OneTrainItem.oneTrainPack[0].train_name

            console.log("Training Package Name : " + responseOneTrainItemName)
     
            const responseOneTrainItemPrice = parseFloat(OneTrainItem.oneTrainPack[0].train_price)

            const unitAmount = Math.round(responseOneTrainItemPrice * 100);

            console.log("Training Package Price : " + responseOneTrainItemPrice + typeof(responseOneTrainItemPrice))

            console.log ("END")

            itemCounts[cartItem] = (itemCounts[cartItem] || 0) + 1;

            // Create product in Stripe
            const product = await stripe.products.create({
                name : responseOneTrainItemName
            })

            /*lineItems.push({
                price_data: {
                    currency: 'sgd',
                    product: product.id,
                    unit_amount: unitAmount,
                },
                quantity: itemCounts[cartItem],
            });
            */

            //productData.push({product,price})

            //Create price for the product
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

        //const lineItems = productData.map((item) => ({
        //    price: item.price.id,
        //    quantity: itemCounts[item.product.name]
        //}));

        const session = await stripe.checkout.sessions.create({  //stripe session
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/?success=true`,
            cancel_url: `http://localhost:3000/?canceled=true`,
            automatic_tax: { enabled: true }
        })

        // Redirect to the Stripe Checkout page
        res.json({ url: session.url });
            
    } catch (err){
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    createCheckoutSession
};