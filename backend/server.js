require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const connectDB= require('./config/db');

const app = express();

const authRoutes = require("./routes/authRoute")
const invoiceRoutes = require("./routes/invoiceRoute")

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization"],
    }) 
);

connectDB();

app.use(express.json());

//routes

app.use("/api/auth",authRoutes)
app.use("/api/invoice",invoiceRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));



