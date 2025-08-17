import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  return res.status(200).json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(port, () => console.log(`port is running on ${port}`));
