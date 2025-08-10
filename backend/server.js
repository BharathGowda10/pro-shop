import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoute from "./routes/productRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoute);

app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => console.log(`port is running on ${port}`));
