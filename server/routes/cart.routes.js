import express from 'express';
import CartController from '../controller/Cart.controller.js';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.post("/add", authMiddleware, CartController.addToCart);
router.get("/", authMiddleware, CartController.getCart);
router.delete("/remove/:productId", authMiddleware, CartController.removeFromCart);
router.put("/update", authMiddleware, CartController.updateQuantity);
router.delete("/clear", authMiddleware, CartController.clearCart);

export default router;