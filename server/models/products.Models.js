import mongoose from "mongoose";
//name, desc, price, thumbnail, stock,
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require:false
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },


    category:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'category',
      required:true

    }
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;