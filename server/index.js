import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import dotenv from "dotenv";


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import authRouter from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js"
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGINS = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  process.env.CLIENT_URL_ALT || 'http://localhost:5173',
];

app.use(express.json());
app.use(cors({
  origin: CLIENT_ORIGINS,
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/product", productRoutes);
app.use("/auth", authRouter);
app.use('/cart/', cartRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Worked!" });
});


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log('DB connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server started, port:${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    process.exit(1);
  }
};

startServer();