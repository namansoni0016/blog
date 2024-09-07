import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

const categoryController = {
    //create category
    createCategory: asyncHandler(async (req, res) => {
        const { categoryName, description } = req.body;
        //check if category exists
        const categoryFound = await Category.findOne({ categoryName, description });
        if(categoryFound) {
            throw new Error("Category Exists");
        }
        //creating the category
        const categoryCreated = await Category.create({
            categoryName,
            author: req.user,
        });
        res.json({
            status: "success",
            message: "Category created successfully!",
            categoryCreated,
        });
    }),
    //list all categories
    fetchAllCategories: asyncHandler(async (req, res) => {
        const categories = await Category.find();
        res.json({
            status: "success",
            message: "Categories fetched successfully!",
            categories,
        });
    }),
    //get a single category
    getCategory: asyncHandler(async (req, res) => {
        //get the category id from params
        const categoryId = req.params.categoryId;
        //finding that category from id
        const categoryFound = await Category.findById(categoryId);
        res.json({
            status: 'success',
            message: "Category found successfully",
            categoryFound,
        });
    }),
    //delete a category
    delete: asyncHandler(async (req, res ) => {
        const categoryId = req.params.categoryId;
        await Category.findByIdAndDelete(categoryId);
        res.json({
            status: "success",
            message: "Category deleted successfully!",
        });
    }),
    //updating the category
    update: asyncHandler( async(req, res) => {
        const categoryId = req.params.categoryId;
        const categoryFound = await Category.findById(categoryId);
        if(!categoryFound) {
            throw new Error("Category not found!");
        }
        const categoryUpdated = await Category.findByIdAndUpdate(
            categoryId,
            { categoryName: req.body.categoryName, description: req.body.description },
            { new: true }
        );
        res.json({
            status: "success",
            message: "Category updated successfully!",
            categoryUpdated,
        });
    }),
}

export default categoryController; 