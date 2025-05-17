import express from 'express';
import multer from 'multer';
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
} from '../controllers/productController.js';

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Save with a timestamp to avoid name conflicts
  }
});
const upload = multer({ storage });

// Routes for products
router.post('/', upload.array('images'), createProduct); // Create product with image upload
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.delete('/:id', deleteProduct); // Delete product by ID
router.put('/:id', upload.array('images'), updateProduct); // Update product (with image upload)

export default router;
