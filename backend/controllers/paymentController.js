const stripe = require('stripe')(process.env.STRIPE_SK);
const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');

const stripe_payment_session = async (req, res) => {
    const { products } = req.body;
    const { orderId } = req.body
    console.log('test products', products, orderId)

    try {

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                    images: [product.imageUrl],
                },
                unit_amount: product.price * 100, 
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://foody-nest.vercel.app/paymentsuccess/${orderId}`,
            cancel_url: `https://foody-nest.vercel.app/paymentfailure/${orderId}`,
        });

        res.json({ id: session.id, orderId: orderId });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
}

module.exports = {
    stripe_payment_session,
}
