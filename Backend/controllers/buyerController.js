import bcrypt from 'bcryptjs';
import Buyer from '../models/buyer.js';

// Register Buyer
export const registerBuyer = async (req, res) => {
  const {
    name, email, phone, whatsapp, address,
    country, city, postalCode, password
  } = req.body;

  try {
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Buyer already registered with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      name, email, phone, whatsapp, address,
      country, city, postalCode,
      password: hashedPassword
    });

    await newBuyer.save();
    res.status(201).json({ message: 'Buyer registration successful!' });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Login Buyer
export const loginBuyer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(400).json({ message: 'Buyer not found' });
    }

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', buyer });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Buyer by ID (without password)
export const getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id).select('-password');
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.json(buyer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buyer', error: error.message });
  }
};

// Update Buyer
export const updateBuyer = async (req, res) => {
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedBuyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ message: 'Buyer updated successfully', buyer: updatedBuyer });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// Delete Buyer
export const deleteBuyer = async (req, res) => {
  try {
    const deletedBuyer = await Buyer.findByIdAndDelete(req.params.id);
    if (!deletedBuyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
