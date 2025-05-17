// routes/orderRoutes.js
import express from 'express';
import {
  createOrders,
  getOrdersByBuyer,
  getOrdersBySeller,
  confirmOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrders);
router.get('/buyer/:buyerId', getOrdersByBuyer);
router.get('/seller/:sellerId', getOrdersBySeller);
router.put('/:id/confirm', confirmOrder);

export default router;
