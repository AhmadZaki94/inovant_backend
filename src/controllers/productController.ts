import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Product } from "../entities/product";

const productRepository = AppDataSource.getRepository(Product);

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await productRepository.find();
    res.json(products);
};

export const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const product = await productRepository.findOneBy({ id: Number(id)});

        if(!product){
            res.status(404).json({ message: "Product not found"});
            return;
        }
        res.json(product);
    }catch(error){
        console.error("Error fetching product:", error);    
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const { sku, name, images, price } = req.body;
    const product = productRepository.create({sku, name, images, price});
    await productRepository.save(product);
    res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id); // Ensure id is a number

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid product ID" });
            return;
        }

        // Check if the product exists
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        // Destructure updated fields from request body
        const { sku, name, images, price } = req.body;

        // Update product fields if provided
        product.sku = sku ?? product.sku;
        product.name = name ?? product.name;
        product.images = images ?? product.images;
        product.price = price ?? product.price;

        // Save updated product
        await productRepository.save(product);

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await productRepository.delete(id);
    res.json({ message: "Product deleted successfully" });
};