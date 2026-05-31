import rateLimit from "express-rate-limit";

class RateManagerLimit {
  constructor() {
    this.limiters = new Map();
    this.initializeLimiters();
  }

  initializeLimiters() {
    this.limiters.set(
      "payment",
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        message: {
          success: false,
          message: "Too many payment attempts, please try again later",
        },
        skipSuccessfulRequests: true,
        standardHeaders: true,
        legacyHeaders: false,
      })
    );

    this.limiters.set(
      "auth",
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 30,
        message: {
          success: false,
          message: "Too many authentication attempts, please try again later",
        },
        standardHeaders: true,
        legacyHeaders: false,
      })
    );

    this.limiters.set(
      "defaultApi",
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        message: {
          success: false,
          message: "Too many requests, please try again later",
        },
        standardHeaders: true,
        legacyHeaders: false,
      })
    );

    this.limiters.set(
      "upload",
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20,
        message: {
          success: false,
          message: "Too many file uploads, please try again later",
        },
        standardHeaders: true,
        legacyHeaders: false,
      })
    );
  }

  getPaymentLimiter() {
    return this.limiters.get('payment');
  }

  getAuthLimiter() {
    return this.limiters.get('auth');
  }

  getDefaultLimiter() {
    return this.limiters.get('defaultApi');
  }

  getUploadFilesLimiter() {
    return this.limiters.get('upload');
  }
}

const rateManager = new RateManagerLimit();
export default rateManager;