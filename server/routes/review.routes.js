import { Router } from "express";
import { body, param, query, validationResult } from "express-validator"; // Добавляем validationResult
import reviewController from "../controller/review.controller.js";
import authMiddleware from "../middleware/auth.js";
import rateManager from "../middleware/rateLimit.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      details: errors.array({ onlyFirstError: true }),
    });
  }
  next();
};

const reviewRoutes = Router();

reviewRoutes.get(
  "/product/:productId",
  rateManager.getDefaultLimiter(),
  param("productId").isMongoId().withMessage("Invalid product ID"),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 50 }).toInt(),
  validate,
  reviewController.getProductReviews
);

reviewRoutes.post(
  "/product/:productId",
  authMiddleware,
  rateManager.getDefaultLimiter(),
  param("productId").isMongoId().withMessage("Invalid product ID"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .isString()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Comment must be between 10 and 1000 characters"),
  validate,
  reviewController.createReview
);
reviewRoutes.put(
  "/:reviewId",
  authMiddleware,
  rateManager.getDefaultLimiter(),
  param("reviewId").isMongoId().withMessage("Invalid review ID"),
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Comment must be between 10 and 1000 characters"),
  validate,
  reviewController.updateReview
);


reviewRoutes.delete(
  "/:reviewId",
  authMiddleware,
  rateManager.getDefaultLimiter(),
  param("reviewId").isMongoId().withMessage("Invalid review ID"),
  validate,
  reviewController.deleteReview
);
reviewRoutes.get(
  "/user/my",
  authMiddleware,
  rateManager.getDefaultLimiter(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 50 }).toInt(),
  validate,
  reviewController.getUserReviews
);

export default reviewRoutes;