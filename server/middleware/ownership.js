import Product from "../models/Product.model.js";

export const checkOwnerProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const product = await Product.findOne({
      _id: id,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or deleted",
      });
    }

    if (!product.owner.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the owner of this product",
      });
    }

    req.product = product;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error during ownership verification",
    });
  }
};
