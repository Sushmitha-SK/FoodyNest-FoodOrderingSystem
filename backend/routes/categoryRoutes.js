const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

//routes
router.post("/create", authMiddleware, createCategory);
router.get("/getAll", getAllCategory);
router.put("/update/:id", authMiddleware, updateCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports = router;