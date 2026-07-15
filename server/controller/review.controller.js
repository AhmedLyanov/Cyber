import mongoose from "mongoose";
import Review from "../models/Review.model.js";
import Product from "../models/Product.model.js";

class ReviewController {
  getProductReviews = async (req, res) => {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
      }

      const [total, reviews] = await Promise.all([
        Review.countDocuments({ product: productId }),
        Review.find({ product: productId })
          .populate("user", "name avatar")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
      ]);

      const ratingStats = await Review.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: "$rating",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            stats: { $push: { rating: "$_id", count: "$count" } },
            averageRating: { $avg: "$_id" },
          },
        },
      ]);

      const statsMap = {
        5: { label: "Excellent", value: 0 },
        4: { label: "Good", value: 0 },
        3: { label: "Average", value: 0 },
        2: { label: "Below Average", value: 0 },
        1: { label: "Poor", value: 0 },
      };

      if (ratingStats.length > 0 && ratingStats[0].stats) {
        ratingStats[0].stats.forEach((stat) => {
          if (statsMap[stat.rating]) {
            statsMap[stat.rating].value = stat.count;
          }
        });
      }

      const formattedStats = Object.values(statsMap).map((item) => ({
        ...item,
        percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
      }));

      res.status(200).json({
        message: "Reviews fetched successfully",
        reviews,
        averageRating:
          ratingStats.length > 0
            ? ratingStats[0].averageRating.toFixed(1)
            : "0",
        stats: formattedStats,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get product reviews error:", error);

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid product ID format" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
  createReview = async (req, res) => {
    try {
      const { productId } = req.params;
      const { rating, comment } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingReview = await Review.findOne({
        product: productId,
        user: req.user._id,
      });

      if (existingReview) {
        return res.status(400).json({
          message: "You have already reviewed this product",
        });
      }

      const review = await Review.create({
        product: productId,
        user: req.user._id,
        rating,
        comment,
      });

      await this.updateProductRating(productId);

      const populatedReview = await Review.findById(review._id).populate(
        "user",
        "name avatar"
      );

      res.status(201).json({
        message: "Review created successfully",
        review: populatedReview,
      });
    } catch (error) {
      console.error("Create review error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation failed",
          details: Object.values(error.errors).map((e) => e.message),
        });
      }

      if (error.code === 11000) {
        return res.status(400).json({
          message: "You have already reviewed this product",
        });
      }

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
  updateReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "Not authorized to update this review",
        });
      }

      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      if (review.createdAt < sevenDaysAgo) {
        return res.status(400).json({
          message: "You can only edit review within 7 days after creation",
        });
      }

      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
      await review.save();

      await this.updateProductRating(review.product);

      const populatedReview = await Review.findById(review._id).populate(
        "user",
        "name avatar"
      );

      res.status(200).json({
        message: "Review updated successfully",
        review: populatedReview,
      });
    } catch (error) {
      console.error("Update review error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation failed",
          details: Object.values(error.errors).map((e) => e.message),
        });
      }

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
  deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      const isAuthor = review.user.toString() === req.user._id.toString();
      const isAdmin = req.user.role === "admin";

      if (!isAuthor && !isAdmin) {
        return res.status(403).json({
          message: "Not authorized to delete this review",
        });
      }

      const productId = review.product;
      await review.deleteOne();

      await this.updateProductRating(productId);

      res.status(200).json({
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.error("Delete review error:", error);

      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
  getUserReviews = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [total, reviews] = await Promise.all([
        Review.countDocuments({ user: req.user._id }),
        Review.find({ user: req.user._id })
          .populate("product", "title image")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
      ]);

      res.status(200).json({
        message: "User reviews fetched successfully",
        reviews,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get user reviews error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // Helper method to update product rating
  updateProductRating = async (productId) => {
    try {
      const stats = await Review.aggregate([
        { $match: { product: new mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: "$product",
            averageRating: { $avg: "$rating" },
            numReviews: { $sum: 1 },
          },
        },
      ]);

      const updateData =
        stats.length > 0
          ? {
              rating: Math.round(stats[0].averageRating * 10) / 10,
              numReviews: stats[0].numReviews,
            }
          : { rating: 0, numReviews: 0 };

      await Product.findByIdAndUpdate(productId, updateData);
    } catch (error) {
      console.error("Update product rating error:", error);
    }
  };
}

const reviewController = new ReviewController();
export default reviewController;