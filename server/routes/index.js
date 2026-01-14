import express from "express";
import authRoutes from './auth.route.js';
import productRoutes from './product.route.js';
import categoryRoutes from './category.route.js';
import supplierRoutes from './supplier.route.js';
import reportRoutes from './report.route.js';
import userRoutes from "./user.route.js";


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);


export default router;