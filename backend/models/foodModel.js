const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Food title is required"],
            index: true,
        },
        description: {
            type: String,
            required: [true, " Food description is required"],
        },
        price: {
            type: Number,
            required: [true, "Food price is required"],
        },
        imageUrl: {
            type: String,
            default:
                "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
        },
        foodTags: {
            type: String,
            index: true,
        },
        category: {
            type: String,
            index: true,
        },
        code: {
            type: String,
        },
        isAvailabe: {
            type: Boolean,
            default: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resturant",
            index: true,
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,
        },
    },
    { timestamps: true }
);

foodSchema.index({ title: 'text', description: 'text', foodTags: 'text', category: 'text' });

module.exports = mongoose.model("Foods", foodSchema);