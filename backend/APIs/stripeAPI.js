require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_KEY_PK)

app.post("/create-checkout-session", async (req, res) => {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                //stripe session

                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                line_items: [
                    {
                        // line items just like a normal checkout
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: '{{PRICE_ID}}',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                
        });
        res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
} 
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
    
)