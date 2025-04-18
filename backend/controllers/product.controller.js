import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  console.log(res, 'res')
  try {
    const products = await Product.find({}) // an empty object means find all
    res.status(200).json({ success: true, products })
  } catch (error) {
    console.error(`Error in fetching products: ${error.message}`)
    res.status(500).json({ success: false, message: `Server Error: ${error.message}` })
  }
}
export const createProduct = async (req, res) => {

  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(200).json({ success: true, product: newProduct });
  } catch (error) {
    console.log(`Error in create product: ${error.message}`);
    res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
  }
}
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: '' })
    console.error(`Something went wrong: ${error.message}`)
  }
}
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Product deleted successfully' })
  } catch ( error ) {
    console.error("Error in deleting product:", error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}