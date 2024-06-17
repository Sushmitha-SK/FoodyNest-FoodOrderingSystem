const restaurantModel = require('../models/restaurantModel');

//Create restaurant
const createRestaurant = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        //Validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please provide title and address",
            });
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })

        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "New Resturant Created successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Resturant api",
            error,
        });
    }
}

//Get all restaurant
const getAllRestaurant = async (req, res) => {
    try {
        const resturants = await restaurantModel.find({});
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Availible",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get ALL Resturat API",
            error,
        });
    }
}

//Get restaurant by ID
const getRestaurantByID = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturnat ID",
            });
        }

        //Find Restaurant
        const resturant = await restaurantModel.findById(resturantId);
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "No resturant found",
            });
        }
        res.status(200).send({
            success: true,
            resturant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Resturarnt by id api",
            error,
        });
    }
}

//Delete Restaurant 
const deleteRestaurant = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found OR Provide Resturant ID",
            });
        }
        await restaurantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            message: "Resturant Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in delete resturant api",
            error,
        });
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurant,
    getRestaurantByID,
    deleteRestaurant
}