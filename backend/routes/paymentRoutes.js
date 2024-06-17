const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const { stripe_payment_session } = require('../controllers/paymentController')

const router = express.Router();

//routes
router.post("/pay-session", authMiddleware, stripe_payment_session);


module.exports = router;