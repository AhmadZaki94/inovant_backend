"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  import app from "./app";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("E-commerce Admin API is running 🚀");
});
app.use("/api/products", productRoutes_1.default);
database_1.AppDataSource.initialize()
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
exports.default = app;
