"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getSingleProduct = exports.getAllProducts = void 0;
const database_1 = require("../config/database");
const product_1 = require("../entities/product");
const productRepository = database_1.AppDataSource.getRepository(product_1.Product);
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productRepository.find();
    res.json(products);
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productRepository.findOneBy({ id: Number(id) });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleProduct = getSingleProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sku, name, images, price } = req.body;
    const product = productRepository.create({ sku, name, images, price });
    yield productRepository.save(product);
    res.status(201).json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id); // Ensure id is a number
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }
        // Check if the product exists
        const product = yield productRepository.findOne({ where: { id } });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        // Destructure updated fields from request body
        const { sku, name, images, price } = req.body;
        // Update product fields if provided
        product.sku = sku !== null && sku !== void 0 ? sku : product.sku;
        product.name = name !== null && name !== void 0 ? name : product.name;
        product.images = images !== null && images !== void 0 ? images : product.images;
        product.price = price !== null && price !== void 0 ? price : product.price;
        // Save updated product
        yield productRepository.save(product);
        res.status(200).json({ message: "Product updated successfully", product });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield productRepository.delete(id);
    res.json({ message: "Product deleted successfully" });
});
exports.deleteProduct = deleteProduct;
