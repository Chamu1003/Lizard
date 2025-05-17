import express from 'express';
import {
  registerSeller,
  loginSeller,
  getSellerProfile,
  updateSellerProfile,
  deleteSellerAccount
} from '../controllers/sellerController.js';

const router = express.Router();

// Auth
router.post('/register', registerSeller);
router.post('/login', loginSeller);

// Profile Operations
router.get('/:sellerId', getSellerProfile);
router.put('/update/:sellerId', updateSellerProfile);
router.delete('/delete/:sellerId', deleteSellerAccount);

export default router;
