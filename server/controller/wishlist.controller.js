import Wishlist from "../models/Wishlist.model.js";
import Product from "../models/Product.model.js";


const populateWishlist = async (userId) => {
  return await Wishlist.findOne({ userId })
    .populate("products");
};


class WishlistController {

  async addToWishlist(req, res) {
    try {
      const userId = req.user._id;
      const { productId } = req.body;


      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }


      let wishlist = await Wishlist.findOne({
        userId,
      });


      if (!wishlist) {
        wishlist = new Wishlist({
          userId,
          products: [productId],
        });

      } else {

        const exists = wishlist.products.some(
          (id) => id.toString() === productId
        );


        if (!exists) {
          wishlist.products.push(productId);
        }
      }


      await wishlist.save();


      const populatedWishlist = await populateWishlist(userId);


      return res.status(200).json({
        message: "Product added to wishlist",
        wishlist: populatedWishlist,
      });


    } catch(error) {

      console.error(
        "Add wishlist error:",
        error
      );

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }



  async getWishlist(req, res) {
    try {

      const userId = req.user._id;


      const wishlist = await populateWishlist(userId);


      if (!wishlist) {
        return res.status(200).json({
          wishlist: {
            products: [],
          },
        });
      }


      return res.status(200).json({
        wishlist,
      });


    } catch(error) {

      console.error(
        "Get wishlist error:",
        error
      );

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }




  async removeFromWishlist(req, res) {

    try {

      const userId = req.user._id;
      const { productId } = req.params;


      const wishlist = await Wishlist.findOne({
        userId,
      });


      if (!wishlist) {
        return res.status(404).json({
          message: "Wishlist not found",
        });
      }


      wishlist.products =
        wishlist.products.filter(
          (id) =>
            id.toString() !== productId
        );


      await wishlist.save();


      const populatedWishlist =
        await populateWishlist(userId);


      return res.status(200).json({
        message: "Product removed",
        wishlist: populatedWishlist,
      });


    } catch(error) {

      console.error(
        "Remove wishlist error:",
        error
      );


      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }


}


export default new WishlistController();