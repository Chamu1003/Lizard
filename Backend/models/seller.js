import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  sellerType: { type: String, enum: ['solo', 'company'], required: true },
  companyName: { type: String, required: function () { return this.sellerType === 'company'; } },
  companyAddress: { type: String, required: function () { return this.sellerType === 'company'; } },
  companyPhone: { type: String, required: function () { return this.sellerType === 'company'; } },
  password: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const Seller = mongoose.model('Seller', SellerSchema);
export default Seller;
