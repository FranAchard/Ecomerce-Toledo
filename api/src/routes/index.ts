import { Router } from 'express';
import products from './productsRoutes';
import user from './userRoutes'
const router = Router();

router.use("/products/", products)
router.use("/user/", user)

export default router;