import express from 'express';
import {
  registerBuyer,
  loginBuyer,
  getBuyerById,
  updateBuyer,
  deleteBuyer
} from '../controllers/buyerController.js';

const router = express.Router();

router.post('/register', registerBuyer);
router.post('/login', loginBuyer);
router.get('/:id', getBuyerById);
router.put('/:id', updateBuyer);
router.delete('/:id', deleteBuyer);

export default router;
