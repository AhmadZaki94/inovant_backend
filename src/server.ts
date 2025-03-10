//  import app from "./app";
import express from "express";
 import cors from "cors";
 import { AppDataSource } from "./config/database";
 import productRoutes from "./routes/productRoutes";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-commerce Admin API is running 🚀");
});

app.use("/api/products", productRoutes);


AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Database!!!");
    app.listen(PORT, () => {
              console.log(`Server running on http://localhost:${PORT}`);
      });
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
});

//  AppDataSource.initialize().then(() => {
//     console.log("Database connected");
//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// }).catch((error) => console.log(error));

export default app;