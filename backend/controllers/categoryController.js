const categoryModel = require("../models/categoryModel")

//Create Category
const createCategory = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Please provide category title or image",
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: 'Category created',
            newCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create category API",
            error,
        });
    }
}

//Get all category
const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found",
            });
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all category API",
            error,
        });
    }
}

//Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category Found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error,
        });
    }
}

//Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Please provide Category ID",
            });
        }
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(500).send({
                success: false,
                message: "No category found with this id",
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category Deleted succssfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete category API",
            error,
        });
    }
}


module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}