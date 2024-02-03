import { Schema, model } from "mongoose";

const productModel = new Schema(
  {
    name: {
      unique: true,
      type: String,
      required: [true, "Name is required, please provide it"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required, please provide it"],
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
      min: [0, "Quantity should be a positive number"],
    },
    price: {
      type: Number,
      required: [true, "Price is required, please provide it"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
      min: [0, "Price should be a positive number"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productModel);

export { Product };
