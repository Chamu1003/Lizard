// controllers/orderController.js
import Order from '../models/order.js';

export const createOrders = async (req, res) => {
  const { buyer, seller, items } = req.body;
  if (!buyer || !seller || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid order payload' });
  }
  try {
    const newOrder = new Order({ buyer, seller, items, status: 'pending' });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

export const getOrdersByBuyer = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.buyerId })
      .populate('seller', 'name email')
      .populate('items.product')         // ← populate product info
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch buyer orders', error: err.message });
  }
};

export const getOrdersBySeller = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.params.sellerId })
      .populate('buyer', 'name email')
      .populate('items.product')         // ← populate product info
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch seller orders', error: err.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order confirmed', order: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to confirm order', error: err.message });
  }
};
