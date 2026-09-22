import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);

// As entities are added, mount their routers here, e.g.:
// router.use("/products", productRoutes);

export default router;
