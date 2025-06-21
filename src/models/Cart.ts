// models/Cart.ts
import mongoose, { Schema } from 'mongoose';

const cartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // ✅ populate এর জন্য ref দিতে হয়
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// 🟢 Model conflict রোধে নিচের লাইনটি জরুরি
export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
