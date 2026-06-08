const Product = require("../Models/Productmodel");

// CREATE PRODUCT
const createProduct = async (req, res) => {

    try {

        const newProduct = new Product(req.body);

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product Added Successfully",
            data: savedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// READ PRODUCTS
const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// READ PRODUCT BY ID
const getProductById = async (req, res) => {

    try {
        const { id } = req.params;

        // Validate ObjectId using mongoose
        const mongoose = require("mongoose");
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product fetched successfully", data: product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// UPDATE PRODUCT BY ID
const updateProduct = async (req, res) => {

    try {
        const { id } = req.params;

        // Validate ObjectId using mongoose (safer than relying on model static)
        // eslint-disable-next-line no-undef
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const { productName, price, category } = req.body;

        if (!productName || price === undefined) {
            return res.status(400).json({ message: "productName and price are required" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, price, category },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE PRODUCT BY ID
const deleteProduct = async (req, res) => {

    try {
        const { id } = req.params;

        // Validate ObjectId using mongoose
        const mongoose = require("mongoose");
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
