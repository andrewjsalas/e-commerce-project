import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';

// Get all products
router.get('/', asyncHandler(async (req, res) => {
    // Pass in empty object to find all products
    const products = await Product.find({});
    res.json(products);
}));

// Get single product by ID
router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    }

    res.status(404).json({ message: 'Product not found' });
    res.json(product);
}));

export default router;