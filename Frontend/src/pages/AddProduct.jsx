import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Package, DollarSign, FileText, Grid, Tag } from "lucide-react";

function AddProduct() {
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    designMaterial: "",
    description: "",
    category: "",
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
      
      // Create preview URLs for the selected images
      const previews = [];
      for (let i = 0; i < files.length; i++) {
        previews.push(URL.createObjectURL(files[i]));
      }
      setPreviewImages(previews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!formData.designMaterial.trim()) newErrors.designMaterial = "Material is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.images.length) {
      newErrors.images = "At least one image is required.";
    } else {
      // Validate image type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        if (!allowedTypes.includes(file.type)) {
          newErrors.images = "Only JPG, JPEG, and PNG files are allowed.";
          break;
        }
        if (file.size > 2 * 1024 * 1024) {
          newErrors.images = "Each image must be under 2MB.";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      alert("Seller not logged in.");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("designMaterial", formData.designMaterial);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("seller", sellerId);

      for (let i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }

      await axios.post("http://localhost:4000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsSubmitting(false);
      // Show success message
      const successMessage = document.getElementById("successMessage");
      successMessage.classList.remove("hidden");
      
      // Hide success message after 3 seconds and navigate
      setTimeout(() => {
        navigate("/seller/productlist");
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission Error:", error);
      alert("Error adding product: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="mt-2 text-gray-600">Add a new product to your inventory</p>
      </div>

      {/* Success Message */}
      <div id="successMessage" className="hidden mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded flex items-center animate-pulse">
        <span className="mr-2">✅</span>
        Product added successfully! Redirecting...
      </div>

      {/* Product Form Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <h2 className="text-lg font-medium text-white">Product Information</h2>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate className="p-6 space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Package size={18} className="text-purple-500" />
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign size={18} className="text-purple-500" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            {/* Material */}
            <div className="space-y-2">
              <label htmlFor="designMaterial" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Grid size={18} className="text-purple-500" />
                Material
              </label>
              <input
                type="text"
                id="designMaterial"
                name="designMaterial"
                placeholder="Enter material (e.g., Cotton, Leather)"
                value={formData.designMaterial}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.designMaterial && <p className="text-red-500 text-sm">{errors.designMaterial}</p>}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag size={18} className="text-purple-500" />
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter product category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={18} className="text-purple-500" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="images" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ImagePlus size={18} className="text-purple-500" />
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Drag and drop your images here, or
                  </p>
                  <p className="mt-1">
                    <label htmlFor="images" className="text-sm font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
                      Browse files
                    </label>
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG up to 2MB</p>
              </div>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
              />
            </div>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            
            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;