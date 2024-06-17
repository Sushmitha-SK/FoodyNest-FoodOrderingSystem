const stripe = require('stripe')(process.env.STRIPE_SK);
const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');

console.log('process.env.STRIPE_SK', process.env.STRIPE_SK)
//Create food
const createFood = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        });

        await newFood.save();
        const createdFood = await foodModel.findById(newFood._id);

        if (!createdFood) {
            return res.status(404).send({
                success: false,
                message: "Failed to retrieve newly created food item",
            });
        }
        res.status(201).send({
            success: true,
            message: "New food item created",
            newFood: createdFood,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in create food API",
            error,
        });
    }
}


//Get all foods
const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No food items was found",
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get all foods API",
            error,
        })
    }
}

//Get single food
const getSingleFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with this id",
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get single food API",
            error,
        })
    }
}

//Get food by restaurant
const getFoodByRestaurant = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "please provide id",
            });
        }
        const food = await foodModel.find({ restaurant: resturantId });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with htis id",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food based on restaurant",
            food,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in get food by restaurant API",
            error,
        })
    }
}


// Get food by category
const getFoodByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Please provide a category",
            });
        }

        const foods = await foodModel.find({ category: category });
        if (!foods || foods.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No food items found for this category",
            });
        }

        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by category API",
            error: error.message,
        });
    }
};

//Search for Food items
const searchFood = async (req, res) => {
    try {
        const { query } = req.query;

        const foods = await foodModel.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No matching food items found.'
            });
        }

        res.status(200).json({
            success: true,
            totalFoods: foods.length,
            foods
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error searching for food items.',
            error: error.message
        });
    }
};

// Get popular foods
const getPopularFoods = async (req, res) => {
    try {
        const popularFoods = await foodModel.find({}).sort({ rating: -1 }).limit(10);
        if (!popularFoods || popularFoods.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No popular foods found",
            });
        }

        res.status(200).send({
            success: true,
            totalFoods: popularFoods.length,
            popularFoods,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching popular foods",
            error: error.message,
        });
    }
};

// Get popular foods by category
const getPopularFoodsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const popularFoods = await foodModel.find({ category: category }).sort({ rating: -1 }).limit(10);

        if (!popularFoods || popularFoods.length === 0) {
            return res.status(404).send({
                success: false,
                message: `No popular foods found in category: ${category}`,
            });
        }

        res.status(200).send({
            success: true,
            totalFoods: popularFoods.length,
            popularFoods,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching popular foods by category",
            error: error.message,
        });
    }
};

//Update Food Item
const updateFoodItem = async (req, res) => {
    try {
        const foodID = req.params.id;
        if (!foodID) {
            return res.status(404).send({
                success: false,
                message: "no food id was found",
            });
        }
        const food = await foodModel.findById(foodID);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found",
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            restaurant,
            rating,
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodID,
            {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                isAvailabe,
                restaurant,
                rating,
            },
            { new: true }
        );


        await updatedFood.save();

        res.status(200).send({
            success: true,
            message: "Food Item Was Updated",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update food item API",
            error,
        })
    }
}

//Delete Food
const deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "provide food id",
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with this id",
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Deleted ",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete food item API",
            error,
        })
    }
}

// Handle payment intent creation
const createPaymentIntent = async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd'
        });

        res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating payment intent.' });
    }
};

const placeOrder = async (req, res) => {
    try {
        const { cart, userDetails } = req.body;

        console.log('test backend', req.body)

        if (!cart || !userDetails) {
            return res.status(400).send({
                success: false,
                message: "Please provide food cart and user details",
            });
        }

        const { name, email, phone, country, city, postalCode } = userDetails;

        if (!name || !email || !phone || !country || !city || !postalCode) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required user details",
            });
        }

        let total = 0;
        let foodsInOrder = [];

        cart.forEach(item => {
            total += item.price * (item.quantity || 1);
            foodsInOrder.push({
                foodId: item.foodId,
                title: item.title,
                imageUrl: item.imageUrl,
                quantity: item.quantity || 1
            });
        });

        const newOrder = new orderModel({
            foods: foodsInOrder,
            payment: total,
            buyer: req.body.id,
            userDetails: {
                name,
                email,
                phone,
                country,
                city,
                postalCode
            }
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in place order API",
            error,
        });
    }
};


const createCheckoutSession = async (req, res) => {
    const { products, userDetails } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.title,
                images: [product.imageUrl],
            },
            unit_amount: Math.round(product.totalPrice * 100),
        },
        quantity: product.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://foody-nest.vercel.app/paymentsuccess',
            cancel_url: 'https://foody-nest.vercel.app/paymentfailure',
            customer_email: userDetails.email,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'IN'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send({ error: 'An error occurred while creating the checkout session.' });
    }
};
//Change order status
const orderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please provide valid order id",
            });
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        //Extra
        await order.save();

        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in order status API",
            error,
        })
    }
}

//getOrderStatusByUser
const getOrderStatusByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid user ID",
            });
        }
        const orders = await orderModel.find({ buyer: userId });
        if (!orders || orders.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No orders found for this user",
            });
        }
        res.status(200).send({
            success: true,
            totalOrders: orders.length,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching order status by user",
            error: error.message,
        });
    }
};

//Update order
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedData = req.body;

        if (!orderId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid order ID",
            });
        }
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            updatedData,
            { new: true }
        );

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating order",
            error: error.message,
        });
    }
};

// Get order details by order ID
const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid order ID",
            });
        }
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).send({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error fetching order details",
            error: error.message,
        });
    }
};

const getOrderDetailsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid user ID",
            });
        }

        const orders = await orderModel.find({ buyer: userId });

        if (!orders || orders.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No orders found for this user",
            });
        }

        res.status(200).send({
            success: true,
            totalOrders: orders.length,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching order details by user ID",
            error: error.message,
        });
    }
};

module.exports = {
    createFood,
    getAllFoods,
    getSingleFood,
    getFoodByRestaurant,
    getFoodByCategory,
    getPopularFoodsByCategory,
    searchFood,
    getPopularFoods,
    updateFoodItem,
    deleteFood,
    createPaymentIntent,
    createCheckoutSession,
    placeOrder,
    orderStatus,
    getOrderStatusByUser,
    updateOrder,
    getOrderDetailsByOrderId,
    getOrderDetailsByUserId
}
