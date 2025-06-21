// models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'প্রোডাক্টের নাম আবশ্যক'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'ডিসক্রিপশন আবশ্যক'],
    },
    price: {
      type: Number,
      required: [true, 'দাম আবশ্যক'],
    },
    category: {
      type: String,
      required: [true, 'ক্যাটাগরি আবশ্যক'],
    },
    image: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 🟢 Model conflict রোধে নিচের লাইনটি জরুরি
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
