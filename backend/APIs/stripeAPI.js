require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_KEY_PK)

const createCheckoutSession = async(req,res) => {
    try {
        //Send UserID into the sequeunce 
        const { userID } = req.body

        const responseCart = await fetch (`localhost:3000/api/cart/getCart/${userID}`)
        const responseData1 = await responseCart.json();
        const cartItems = responseData1.userCart
        
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            // Check if cartItems is not an array or if it's an empty array
            throw new Error('No cart items found.');
        }

        itemCounts = {}

        const productData = [];

        for (const cartItem of cartItems){
            const responseOneTrainItem = await fetch (`localhost:3000/api/trainPack/getOneTrainingPackIdNameMoney/${cartItem}`)
            const OneTrainItem = await responseOneTrainItem.json();
            const responseOneTrainItemName = OneTrainItem.train_item
            const responseOneTrainItemPrice = OneTrainItem.train_price

            itemCounts[cartItem] = (itemCounts[cartItem] || 0) + 1;

            const product = await stripe.products.create({
                name : responseOneTrainItemName
            })

            const price = await stripe.prices.create({
                product : product.id,
                unit_amount : responseOneTrainItemPrice,
                currency: 'sgd'
            })

            productData.push({product,price})
        }

        const lineItems = productData.map((item) => ({
            price: item.price.id,
            quantity: itemCounts[item.product.name]
        }));

        const session = await stripe.checkout.sessions.create({   //stripe session
            line_items: lineItems,
            mode: 'payment',
            success_url: `${window.location.origin}/?success=true`,
            cancel_url: `${window.location.origin}/?canceled=true`,
            automatic_tax: { enabled: true }
        })

        // Redirect to the Stripe Checkout page
        window.location.href = session.url;
            
    }catch (err){
        console.error(err)
    }
}

module.exports = createCheckoutSession