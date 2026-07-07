import express from "express";
import WishlistController from "../controller/Wishlist.controller.js";
import authMiddleware from "../middleware/auth.js";


const router = express.Router();


router.post(
  "/add",
  authMiddleware,
  WishlistController.addToWishlist
);


router.get(
  "/",
  authMiddleware,
  WishlistController.getWishlist
);


router.delete(
  "/remove/:productId",
  authMiddleware,
  WishlistController.removeFromWishlist
);


export default router;