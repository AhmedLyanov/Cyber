import { Router } from "express";
import { body, validationResult } from 'express-validator';
import authController from '../controller/auth.controller.js';
import authMiddleware from "../middleware/auth.js";
import {validateRegistration, validateLogin} from '../middleware/validations/auth.validator.js'
import rateManager from "../middleware/rateLimit.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      details: errors.array({ onlyFirstError: true })
    });
  }
  next();
};

const authRouter = Router();

authRouter.post('/registration',
  validateRegistration,
  rateManager.getAuthLimiter(),
  body('name').isString().trim().isLength({ min: 1, max: 50 }).withMessage('Name is required (1-50 chars)'),
  body('surname').isString().trim().isLength({ min: 1, max: 50 }).withMessage('Surname is required (1-50 chars)'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate,
  authController.registration
);

authRouter.post('/login',
  validateLogin,
  rateManager.getAuthLimiter(),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isString().isLength({ min: 1 }).withMessage('Password is required'),
  validate,
  authController.login
);

authRouter.get('/profile', rateManager.getDefaultLimiter(), authMiddleware, authController.getMe);
authRouter.get('/users', rateManager.getDefaultLimiter(), authMiddleware, authController.usersList);

export default authRouter;