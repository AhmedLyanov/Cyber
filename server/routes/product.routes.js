import { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import productController from "../controller/product.controller.js";
import authMiddleware from "../middleware/auth.js";
import rateManager from "../middleware/rateLimit.js";
import { normalizeBody } from "../middleware/normalizeBody.js";
import { uploadSingle } from "../middleware/uploadRules.js";
import { PRODUCT_TYPES } from "../constants/productTypes.js";
import { checkOwnerProduct } from "../middleware/ownership.js";

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

const productRoutes = Router();

productRoutes.get(
  "/detailed/:id",
  rateManager.getDefaultLimiter(),
  productController.getProductById,
);
productRoutes.delete(
  "/:id",
  authMiddleware,
  rateManager.getDefaultLimiter(),
  checkOwnerProduct,
  productController.deleteProduct,
);

productRoutes.get(
  "/products",
  rateManager.getDefaultLimiter(),
  query("type")
    .optional()
    .isIn(PRODUCT_TYPES)
    .withMessage(`Invalid type. Must be one of: ${PRODUCT_TYPES.join(", ")}`),
  validate,
  productController.getProducts,
);

productRoutes.post(
  "/create",
  rateManager.getUploadFilesLimiter(),
  authMiddleware,
  normalizeBody,

  uploadSingle,
  body("title")
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title is required (1-200 chars)"),
  body("description")
    .isString()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("price")
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),
  body("type")
    .isIn(PRODUCT_TYPES)
    .withMessage(`Type must be one of: ${PRODUCT_TYPES.join(", ")}`),
  body("originalPrice").optional().isNumeric().toFloat().isFloat({ min: 0.01 }),
  body("discountPercentage")
    .optional()
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0, max: 100 }),
  body("discountStart").optional().isISO8601().toDate(),
  body("discountEnd").optional().isISO8601().toDate(),
  validate,
  productController.createProduct,
);

productRoutes.post(
  "/buy",
  authMiddleware,
  rateManager.getPaymentLimiter(),
  body("productId").isMongoId().withMessage("Invalid product ID"),
  validate,
  productController.buyProduct,
);

productRoutes.get(
  "/check/:sessionId",
  authMiddleware,
  param("sessionId")
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Session ID is required"),
  validate,
  productController.checkPayment,
);

productRoutes.patch(
  "/:id/discount",
  authMiddleware,
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("discountPercentage")
    .optional()
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),
  body("discountStart").optional().isISO8601().toDate(),
  body("discountEnd").optional().isISO8601().toDate(),
  validate,
  productController.updateProductDiscount,
);

export default productRoutes;
