import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import productsRoute from "./routes/products.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in req.body (middleware)

app.use("/api/products", productsRoute)

app.listen(5000, () => {
  connectDB()
  console.log('Express server listening on port 5000...');
});