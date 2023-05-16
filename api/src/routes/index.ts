import { Router } from 'express';
import products from './productsRoutes';
const router = Router();

router.use("/products/", products)

export default router;