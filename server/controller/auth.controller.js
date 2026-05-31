import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.js";
import transporter from '../config/mailer.js'


function generateToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_CONFIG.JWT_SECRET, {
    expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
  });
}

class AuthController {
  async registration(req, res) {
    try {
      const { name, surname, password, email } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, surname, email, password: hashedPassword });
      await user.save();

      await transporter.sendMail({
        from: 'Cyber <amoshal1997@gmail.com>',
        to: email,
        subject: "Congratulation!",
        text: "тестовое сообщение приветсвия",
        html: `<p>Вы зарегистрировались в workout</p>`
      })

      const token = generateToken(user);
      return res.status(201).json({ message: user, token });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: "Validation failed", 
          details: Object.values(error.errors).map(e => e.message) 
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: `User with email ${email} not found`,
        });
      }
      
      const passwordValidation = await bcrypt.compare(password, user.password);
      if (!passwordValidation) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);

      return res.status(200).json({
        message: "Login completed",
        token,
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getMe(req, res) {
    try {
      res.json({
        user: {
          user: req.user._id,
          name: req.user.name,
          surname: req.user.surname,
          email: req.user.email,
        },
      });
    } catch (error) {
      console.error("Get current user error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async usersList(req, res) {
    try {
      const users = await User.find().select("-password");

      res.json({
        message: "Users retrieved successfully",
        count: users.length,
        users: users.map((user) => ({
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          createdAt: user.createdAt,
        })),
      });
    } catch (error) {
      console.error("Get users error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

const authController = new AuthController();
export default authController;