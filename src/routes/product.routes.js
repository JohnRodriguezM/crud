import { Router } from "express";

// ? import controllers
import { createProduct, getAllProducts } from "../controllers/products.controller.js";

const router = Router();

//* GET /products
router.get("/", getAllProducts);
router.post("/", createProduct);

export { router as productRouter };
