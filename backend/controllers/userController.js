const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

//Get user info

const getUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getUser API",
            error,
        });
    }
};


//Update user
const updateUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        const { username, address, phone } = req.body;
        if (username) user.userName = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in udpate user API",
            error,
        });
    }
}

//Update user password
const updatePassword = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                sucess: false,
                message: "Please provide old or new password"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in password update API",
            error,
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Privide All Fields",
            });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found or invlaid answer",
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in password reset API",
            error,
        });
    }
}

//Delete profile account
const deleteProfile = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete profile API",
            error,
        });
    }
}

module.exports = { getUser, updateUser, updatePassword, resetPassword, deleteProfile }