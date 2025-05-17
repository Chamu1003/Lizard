import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// ✅ ROUTES
import productRoutes from './routes/productRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; // ✅ Import cart routes
import orderRoutes from './routes/orderRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));

// ✅ Register routes
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/cart', cartRoutes); // Register cart routes
app.use('/api/orders', orderRoutes);
app.use('/api/buyers', buyerRoutes);


// 404 and error handling
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Database connection and server setup
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
