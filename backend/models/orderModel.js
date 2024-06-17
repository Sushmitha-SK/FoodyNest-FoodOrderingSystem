const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
    {
        foods: [
            {
                foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Foods" },
                title: String,
                imageUrl: String,
                quantity: { type: Number, default: 1 }
            }
        ],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        userDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            country: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true }
        },
        status: {
            type: String,
            enum: ["preparing", "prepare","ready", "on the way", "delivered", "pending", "placed", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Orders", ordersSchema);
