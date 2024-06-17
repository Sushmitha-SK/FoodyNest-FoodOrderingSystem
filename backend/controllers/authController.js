const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

//Register
const register = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer, usertype } = req.body;
        //validation
        if (!userName || !email || !password || !phone || !address || !answer || !usertype) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            });
        }

        //Check User
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email already registered. Please Login",
            });
        }

        //Hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
            usertype
        });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};


//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email or password"
            });
        }

        //Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        //Check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }

        //Token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error,
        });
    }
}


module.exports = { register, login };