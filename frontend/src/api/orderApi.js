import axios from "axios";
let token = localStorage.getItem("token");

// Place Order
export async function placeOrder(orderData) {
    console.log('orderData', orderData)
    const url = `https://foodynest-backend.onrender.com/api/v1/food/placeorder`;
    try {
        const response = await axios.post(url, orderData, {
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

export async function updateFoodOrder(orderID, status) {
    const url = `https://foodynest-backend.onrender.com/api/v1/food/orders/${orderID}`

    try {
        const response = await axios.put(url, {
            "status": status
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        console.log('update order response', response)
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw new Error(error.response?.data?.message || "An error occurred while updating the order.");
    }
}

export async function getOrderDetailsByUserId(userId) {
    const url = `https://foodynest-backend.onrender.com/api/v1/food/orders/user/${userId}`
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        console.log('Get order response', response)
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw new Error(error.response?.data?.message || "An error occurred while retrieving the order details.");
    }

}

export async function getOrderDetailsByOrderId(orderId) {
    const url = `https://foodynest-backend.onrender.com/api/v1/food/orders/${orderId}`
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        console.log('Get order response by orderID', response)
        return response.data;
    } catch (error) {
        console.log('error', error)
        throw new Error(error.response?.data?.message || "An error occurred while retrieving the order details.");
    }

}

