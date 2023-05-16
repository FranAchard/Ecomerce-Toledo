import { Router } from "express";
import { getProducts, updateProduct } from "../controllers/productsController";

const router = Router();

router.get('/', getProducts)
router.get('/:id', getProducts)
router.put('/:id', updateProduct)



export default router