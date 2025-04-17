// const express = require('express');

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in req.body (middleware)

app.post("/api/products", async (req, res) => {
  console.log(req);
  console.log(res);

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
})

app.listen(5000, () => {
  connectDB()
  console.log('Express server listening on port 5000...');
});