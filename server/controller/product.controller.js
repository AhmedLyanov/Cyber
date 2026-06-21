import Product from "../models/Product.model.js";
import stripePackage from "stripe";
import fs from "fs";
import { cleanupProductFiles } from "../middleware/cleanUp.js";

const stripe = process.env.STRIPE_SECRET_KEY
  ? stripePackage(process.env.STRIPE_SECRET_KEY)
  : null;

class ProductController {
  async createProduct(req, res) {
    try {
      const {
        title,
        description,
        price,
        type,
        brand,
        originalPrice,
        discountPercentage = 0,
        discountStart,
        discountEnd,
        screenType,
        screenDiagonal,
        batteryCapacity,
        builtInMemory,
        protectionClass,
        cpu,
      } = req.body;

      const image = req.file ? req.file.filename : null;

      const specs = {};
      if (screenType) {
        specs.screenType = screenType;
      }
      if (screenDiagonal) {
        specs.screenDiagonal = screenDiagonal;
      }
      if (batteryCapacity) {
        specs.batteryCapacity = batteryCapacity;
      }
      if (builtInMemory) {
        specs.builtInMemory = builtInMemory;
      }
      if (protectionClass) {
        specs.protectionClass = protectionClass;
      }
      if (cpu) {
        specs.cpu = cpu;
      }

      const productData = {
        title,
        description,
        price: Number(price),
        type,
        brand,
        image,
        specs,
        originalPrice: originalPrice ? Number(originalPrice) : Number(price),
        discountPercentage: Number(discountPercentage),
        discountStart: discountStart || null,
        discountEnd: discountEnd || null,
        owner: req.user._id,
      };

      if (productData.discountPercentage > 0 && !originalPrice) {
        productData.originalPrice = Number(price);
      }

      const product = new Product(productData);
      await product.save();

      res.status(201).json({
        message: "Product created",
        product,
      });
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Create product error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation failed",
          details: Object.values(error.errors).map((e) => e.message),
        });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getProducts(req, res) {
  try {
    const {
      page = 1,
      limit = 9,

      type,
      brand,
      minPrice,
      maxPrice,
      hasDiscount,
      search,
      screenType,
      screenDiagonal,
      batteryCapacity,
      builtInMemory,
      protectionClass,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (type) {
      const types = Array.isArray(type) ? type : type.split(",");
      filter.type = { $in: types };
    }

    if (brand) {
      const brands = Array.isArray(brand) ? brand : brand.split(",");
      filter.brand = { $in: brands };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (hasDiscount !== undefined) {
      filter.hasDiscount = hasDiscount === "true";
    }

    if (screenType) {
      filter["specs.screenType"] = screenType;
    }

    if (screenDiagonal) {
      filter["specs.screenDiagonal"] = screenDiagonal;
    }

    if (batteryCapacity) {
      filter["specs.batteryCapacity"] = batteryCapacity;
    }

    if (builtInMemory) {
      filter["specs.builtInMemory"] = builtInMemory;
    }

    if (protectionClass) {
      filter["specs.protectionClass"] = protectionClass;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const currentPage = Number(page);
    const currentLimit = Number(limit);

    const skip = (currentPage - 1) * currentLimit;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(currentLimit);

    res.status(200).json({
      message: "Products list",

      products,

      pagination: {
        page: currentPage,
        limit: currentLimit,
        total,
        pages: Math.ceil(total / currentLimit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

  async getProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      const product = await Product.findOne({
        _id: id,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product details",
        product,
      });
    } catch (error) {
      console.error("Get product by ID error:", error);
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid product ID format" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = req.product;
      await product.softDelete();
      cleanupProductFiles(product).catch(console.error);
      res.json({
        message: "Product deleted successfully",
        deletedProduct: {
          id: product._id,
          title: product.title,
        },
      });
    } catch (error) {
      console.error("Delete product error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getDiscountProducts(req, res) {
    try {
      const products = await Product.find({
        hasDiscount: true,
        isDiscountActive: true,
      });
      res.json({
        message: "Discount products list",
        count: products.length,
        products,
      });
    } catch (error) {
      console.error("Get discount products error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateProductDiscount(req, res) {
    try {
      const { id } = req.params;
      const { discountPercentage, discountStart, discountEnd } = req.body;

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (discountPercentage !== undefined) {
        product.discountPercentage = Number(discountPercentage);
      }
      if (discountStart !== undefined) {
        product.discountStart = discountStart;
      }
      if (discountEnd !== undefined) {
        product.discountEnd = discountEnd;
      }

      await product.save();

      res.json({
        message: "Discount updated successfully",
        product,
      });
    } catch (error) {
      console.error("Update discount error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async buyProduct(req, res) {
    try {
      if (!stripe) {
        return res.status(500).json({
          message:
            "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.",
        });
      }

      const { productId } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const imageUrl = product.image
        ? `${process.env.API_URL || "http://localhost:5000"}/uploads/products/${
            product.image
          }`
        : null;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.title,
                description: product.description,
                ...(imageUrl && { images: [imageUrl] }),
              },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/cancel`,
      });

      res.json({
        id: session.id,
        url: session.url,
      });
    } catch (error) {
      console.error("Buy product error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async checkPayment(req, res) {
    try {
      if (!stripe) {
        return res.status(500).json({
          message:
            "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.",
        });
      }

      const { sessionId } = req.params;
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      res.json({
        status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
      });
    } catch (error) {
      console.error("Check payment error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

const productController = new ProductController();
export default productController;
