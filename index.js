import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";  

import allRoutes from "./allRoutes.js";  
import { createUploadFolder } from './createFolder.js';
import { connectDB } from './db/db.js';
const PORT = process.env.PORT || 3000;
const app = express();
 

createUploadFolder()
connectDB()
app.use("/uploads", express.static("uploads"));   


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api",allRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})