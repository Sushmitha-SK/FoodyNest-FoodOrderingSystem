const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
    createFood,
    getAllFoods,
    getSingleFood,
    getFoodByRestaurant,
    getFoodByCategory,
    updateFoodItem,
    deleteFood,
    placeOrder,
    orderStatus,
    createPaymentIntent,
    searchFood,
    getPopularFoods,
    getPopularFoodsByCategory,
    getOrderStatusByUser,
    createCheckoutSession,
    updateOrder,
    getOrderDetailsByOrderId,
    getOrderDetailsByUserId
} = require("../controllers/foodController");

const router = express.Router();



router.post("/create", authMiddleware, createFood);
router.get("/getAll", getAllFoods);
router.get("/get/:id", getSingleFood);
router.get("/getByResturant/:id", getFoodByRestaurant);
router.get("/category/:category", getFoodByCategory);
router.get("/search", searchFood)
router.get("/popular", getPopularFoods)
router.get("/popular/:category", getPopularFoodsByCategory)
router.put("/update/:id", authMiddleware, updateFoodItem);
router.delete("/delete/:id", authMiddleware, deleteFood);
router.post("/placeorder", authMiddleware, placeOrder);
router.post("/orderStatus/:id", authMiddleware, orderStatus);
router.post("/orders/user/:userId", authMiddleware, getOrderStatusByUser);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-checkout-session", createCheckoutSession);
router.put('/orders/:id', updateOrder);
router.get('/orders/:id', getOrderDetailsByOrderId);
router.get('/orders/user/:userId', getOrderDetailsByUserId); 

module.exports = router;