import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import productsRoute from "./routes/products.route.js";
import * as path from "node:path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept JSON data in req.body (middleware)

app.use("/api/products", productsRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, ".frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, ".frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB()
  console.log(`Express server listening on port ${PORT}...`);
});