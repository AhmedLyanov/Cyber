  import mongoose from "mongoose";
  import {
    PRODUCT_TYPES,
    PRODUCT_BRANDS,
    PROTECTION_CLASSES,
    SCREEN_TYPES,
    SCREEN_DIAGONALS,
    BUILT_IN_MEMORY,
    BATTERY_CAPACITY,
    CPU_TYPES
  } from "../constants/productTypes.js";

  const ProductSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      type: { type: String, required: true, enum: PRODUCT_TYPES },
      brand: { type: String, required: true, enum: PRODUCT_BRANDS },
      image: { type: String, required: false },
      specs: {
        screenType: { type: String, enum: SCREEN_TYPES },
        screenDiagonal: { type: String, enum: SCREEN_DIAGONALS },
        batteryCapacity: { type: String, enum: BATTERY_CAPACITY },
        builtInMemory: { type: String, enum: BUILT_IN_MEMORY },
        protectionClass: { type: String, enum: PROTECTION_CLASSES },
        cpu: {type: String, enum: CPU_TYPES}
      },

      images: [{ type: String }],
      originalPrice: { type: Number },
      discountPercentage: { type: Number, default: 0 },
      hasDiscount: { type: Boolean, default: false },
      discountStart: { type: Date },
      discountEnd: { type: Date },
      isDiscountActive: { type: Boolean, default: false },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true,
      },
      isActive: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    }
  );

  ProductSchema.methods.checkDiscountStatus = function () {
    if (this.discountPercentage <= 0) {
      this.isDiscountActive = false;
      return false;
    }

    const now = new Date();
    const hasDateRestrictions = this.discountStart && this.discountEnd;

    if (hasDateRestrictions) {
      this.isDiscountActive =
        now >= this.discountStart && now <= this.discountEnd;
    } else {
      this.isDiscountActive = true;
    }

    return this.isDiscountActive;
  };

  ProductSchema.methods.softDelete = function () {
    this.isActive = false;
    return this.save();
  };

  ProductSchema.methods.calculateDiscountPrice = function () {
    if (this.discountPercentage > 0 && this.originalPrice) {
      return Math.round(this.originalPrice * (1 - this.discountPercentage / 100));
    }
    return this.originalPrice || this.price;
  };

  ProductSchema.pre("save", function (next) {
    if (!this.originalPrice) {
      this.originalPrice = this.price;
    }

    this.checkDiscountStatus();

    if (this.isDiscountActive && this.discountPercentage > 0) {
      this.price = this.calculateDiscountPrice();
      this.hasDiscount = true;
    } else {
      this.price = this.originalPrice;
      this.hasDiscount = false;
    }

    next();
  });

  export default mongoose.model("Product", ProductSchema);
