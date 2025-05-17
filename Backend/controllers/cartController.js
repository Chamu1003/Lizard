// controllers/cartController.js

import Cart from '../models/cart.js';

/**
 * Add a product to the cart.
 * - If the product is already in the cart, increase the quantity.
 * - If not, add it as a new item.
 */
export const addToCart = async (req, res) => {
  const { buyerId, productId, quantity } = req.body;
  try {
    // Check if this product is already in the cart for the same buyer
    let existingItem = await Cart.findOne({ buyerId, product: productId });

    if (existingItem) {
      // If it's already there, add the new quantity to the existing one
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem); // Send updated cart item
    }

    // If it's not in the cart yet, create a new cart item
    const newItem = new Cart({ buyerId, product: productId, quantity });
    await newItem.save();
    res.status(201).json(newItem); // Send new cart item
  } catch (err) {
    console.error('Error in addToCart:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all cart items for one buyer.
 * - Also get product details for each item.
 * - Remove any items where the product was deleted.
 */
export const getCartByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;

    // Get all cart items for this buyer and also get product info
    const cartItems = await Cart.find({ buyerId }).populate('product');

    // Remove items where the product doesn't exist anymore
    const validCartItems = cartItems.filter(item => item.product !== null);

    res.status(200).json(validCartItems); // Send only valid items
  } catch (err) {
    console.error('Error in getCartByBuyer:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a cart item by its ID.
 */
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the cart item by its ID and delete it
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error in deleteCartItem:', err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Change the quantity of a cart item by its ID.
 */
export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Update the quantity of the item and get the updated data
    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true } // Return the new data after update
    ).populate('product');

    // If the item wasn't found, show an error
    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updatedItem); // Send the updated item
  } catch (err) {
    console.error('Error in updateCartQuantity:', err);
    res.status(500).json({ error: err.message });
  }
};
