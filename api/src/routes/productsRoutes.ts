import { Router } from "express";
import { getProducts } from "../controllers/productsController";

const router = Router();

router.get('/', getProducts)
router.get('/:id', getProducts)



export default router