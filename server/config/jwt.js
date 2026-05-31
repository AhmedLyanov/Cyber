import dotenv from "dotenv";
dotenv.config();

export const JWT_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: '1d' 
};

export default JWT_CONFIG;