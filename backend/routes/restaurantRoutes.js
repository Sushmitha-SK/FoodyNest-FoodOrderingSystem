const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
    createRestaurant,
    getAllRestaurant,
    getRestaurantByID,
    deleteRestaurant
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
router.post("/create", authMiddleware, createRestaurant);
router.get("/getAll", getAllRestaurant);
router.get("/get/:id", getRestaurantByID);
router.delete("/delete/:id", authMiddleware, deleteRestaurant);

module.exports = router;