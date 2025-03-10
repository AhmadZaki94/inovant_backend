import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-commerce Admin Panel API is running 🚀");
});


app.use("/products", productRoutes);

export default app;
