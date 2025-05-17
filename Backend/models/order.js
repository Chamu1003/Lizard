// models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  items: [
    {
      cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',      // ← ensures populate('items.product') works
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
