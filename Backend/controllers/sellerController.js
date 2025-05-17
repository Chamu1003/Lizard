import bcrypt from 'bcryptjs';
import Seller from '../models/seller.js';

// Register Seller
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, whatsapp, address, country, city, postalCode, sellerType, companyName, companyAddress, companyPhone, password } = req.body;

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already registered with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name, email, phone, whatsapp, address, country, city, postalCode, sellerType, companyName, companyAddress, companyPhone, password: hashedPassword,
    });

    await newSeller.save();
    res.status(201).json({ message: 'Seller registration successful!' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login Seller
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: 'Seller not found' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Seller Profile by ID
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update Seller Profile
export const updateSellerProfile = async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.sellerId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller profile updated successfully', updatedSeller });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete Seller Account
export const deleteSellerAccount = async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.sellerId);
    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json({ message: 'Seller account deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
