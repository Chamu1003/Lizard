import Product from "../models/Product.js";

// Add a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, designMaterial, description, category, seller } = req.body;
    const images = req.files?.length ? req.files.map((file) => file.filename) : []; // Handle image filenames

    const newProduct = new Product({
      name,
      price,
      designMaterial,
      description,
      category,
      seller,
      images, // Save image filenames here
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, designMaterial, description, category, seller } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Only allow the seller to update their own product
    if (product.seller.toString() !== seller) {
      return res.status(403).json({ message: "Unauthorized: Not your product" });
    }

    // Handle image uploads (keep old images if no new ones are uploaded)
    const images = req.files?.length ? req.files.map((file) => file.filename) : product.images;

    // Update fields
    product.name = name;
    product.price = price;
    product.designMaterial = designMaterial;
    product.description = description;
    product.category = category;
    product.images = images;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Get all products (or filter by seller)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
