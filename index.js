import express from "express";
import dotenv from "dotenv"
import colors from "colors"
import bodyParser from "body-parser"
import connectDB from "./config/DB.js";
import cors from "cors"
import authRoutes from "./routes/authRoute.js"
import todoRoutes from "./routes/todoRoute.js"


// config dotenv
dotenv.config();

connectDB();
// express
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/auth', todoRoutes)

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
