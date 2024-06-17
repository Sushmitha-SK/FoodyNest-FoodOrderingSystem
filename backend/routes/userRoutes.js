const express = require("express");
const {
    getUser, updateUser, updatePassword, resetPassword, deleteProfile
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
router.get("/getUser", authMiddleware, getUser);
router.put("/updateUser", authMiddleware, updateUser);
router.post("/updatePassword", authMiddleware, updatePassword);
router.post("/resetPassword", authMiddleware, resetPassword);
router.delete("/deleteUser/:id", authMiddleware, deleteProfile);

module.exports = router;