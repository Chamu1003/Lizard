// models/cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });

// ❌ Typo here: mongoose.miodel → ✅ mongoose.model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
