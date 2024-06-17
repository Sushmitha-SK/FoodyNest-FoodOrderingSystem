import axios from "axios";
let token = localStorage.getItem("token");

// Place Order
export async function create_StripePaymentIntent(paymentData) {
    const url = `https://foodynest-backend.onrender.com/api/v1/payments/create-stripe-paymentIntent`;
    try {
        const response = await axios.post(url, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw new Error(error.response?.data?.message || "An error occurred while placing the order.");
    }
}
