import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

const populateCart = async (userId) => {
  return await Cart.findOne({ userId })
    .populate("items.productId");
};

class CartController {
  async addToCart(req, res) {
    try {
      const userId = req.user._id;
      const { productId, quantity = 1 } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({
          userId,
          items: [
            {
              productId,
              quantity,
              price: product.price,
            },
          ],
        });
      } else {
        const existingItem = cart.items.find(
          (item) =>
            item.productId.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.price = product.price;
        } else {
          cart.items.push({
            productId,
            quantity,
            price: product.price,
          });
        }
      }

      await cart.save();

      const populatedCart = await populateCart(userId);

      return res.status(200).json({
        message: "Product added to cart",
        cart: populatedCart,
      });
    } catch (error) {
      console.error("Add to cart error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getCart(req, res) {
    try {
      const userId = req.user._id;

      const cart = await populateCart(userId);

      if (!cart) {
        return res.status(200).json({
          cart: {
            items: [],
            total: 0,
          },
        });
      }

      return res.status(200).json({
        cart,
      });
    } catch (error) {
      console.error("Get cart error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async removeFromCart(req, res) {
    try {
      const userId = req.user._id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      cart.items = cart.items.filter(
        (item) =>
          item.productId.toString() !== productId
      );

      await cart.save();

      const populatedCart = await populateCart(userId);

      return res.status(200).json({
        message: "Item removed",
        cart: populatedCart,
      });
    } catch (error) {
      console.error("Remove from cart error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async updateQuantity(req, res) {
    try {
      const userId = req.user._id;
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      const item = cart.items.find(
        (item) =>
          item.productId.toString() === productId
      );

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      item.quantity = quantity;

      await cart.save();

      const populatedCart = await populateCart(userId);

      return res.status(200).json({
        message: "Quantity updated",
        cart: populatedCart,
      });
    } catch (error) {
      console.error(
        "Update quantity error:",
        error
      );

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async clearCart(req, res) {
    try {
      const userId = req.user._id;

      await Cart.findOneAndDelete({
        userId,
      });

      return res.status(200).json({
        message: "Cart cleared",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error", error,
      });
    }
  }
}

export default new CartController();