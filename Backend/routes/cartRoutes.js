// routes/cartRoutes.js
import express from 'express';
import {
  addToCart,
  getCartByBuyer,
  deleteCartItem,
  updateCartQuantity
} from '../controllers/cartController.js';

const router = express.Router();

// POST /api/cart
router.post('/', addToCart);

// GET /api/cart/:buyerId
router.get('/:buyerId', getCartByBuyer);

// DELETE /api/cart/:id
router.delete('/:id', deleteCartItem);

// PUT /api/cart/:id
router.put('/:id', updateCartQuantity);

export default router;
