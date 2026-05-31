import { body } from 'express-validator';
import { handleValidationErrors } from './error.validator.js';
import User from '../../models/User.model.js'

const checkEmailUnique = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email уже используется');
  }
  return true;
};


export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Имя обязательно')
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя должно быть от 2 до 50 символов')
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/)
    .withMessage('Имя может содержать только буквы, пробелы и дефисы'),

  body('surname')
    .trim()
    .notEmpty()
    .withMessage('Фамилия обязательна')
    .isLength({ min: 2, max: 50 })
    .withMessage('Фамилия должна быть от 2 до 50 символов')
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/)
    .withMessage('Фамилия может содержать только буквы, пробелы и дефисы'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email адрес')
    .custom(checkEmailUnique),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен быть не менее 6 символов')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Пароль должен содержать хотя бы одну заглавную букву, одну строчную и одну цифру'),


  handleValidationErrors
];


export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email адрес'),

  body('password')
    .notEmpty()
    .withMessage('Пароль обязателен'),

  handleValidationErrors
];