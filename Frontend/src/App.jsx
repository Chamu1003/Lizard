// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import PostLoginNavbar from './components/PostLoginNavbar';

// Pages
import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import Cart from './pages/Cart';
import BuyerLogin from './pages/BuyerLogin';
import BuyerRegister from './pages/BuyerRegister';
import BuyerDashBoard from './pages/BuyerDashboard';
import UserProfile from './pages/UserProfile';
import SellerRegister from './pages/SellerRegister';
import SellerLogin from './pages/SellerLogin';
import SellerDashboard from './pages/SellerDashboard';
import ProfileSeller from './pages/ProfileSeller';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import SellerRequests from './pages/SellerRequest';
import UpdateProduct from './pages/UpdateProduct';

export default function App() {
  return (
    <Router>
      <AppWithConditionalNavbar />
    </Router>
  );
}

function AppWithConditionalNavbar() {
  const location = useLocation();
  const path = location.pathname;
  
  const isBuyerLoggedIn = !!localStorage.getItem("buyerId");
  
  const buyerFacingRoutes = [
    "/buyer/dashboard",
    "/buyer/profile",
    "/women",
    "/men",
    "/kids",
    "/cart"
  ];
  
  const isProductPage = path.startsWith('/product/');
  
  const showPostLoginNavbar = isBuyerLoggedIn && (buyerFacingRoutes.some(route => path.startsWith(route)) || isProductPage);
  
  const hideNavbarRoutes = [
    "/seller/dashboard",
    "/seller/productlist",
    "/seller/add-product",
    "/seller/profile",
    "/seller/requests"
  ];
  
  const hideNavbar = hideNavbarRoutes.includes(path);
  
  return (
    <>
      {!hideNavbar && (showPostLoginNavbar ? <PostLoginNavbar /> : <Navbar isLoggedIn={isBuyerLoggedIn} />)}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* Cart - Requires Login */}
        <Route path="/cart" element={<Cart />} />
        
        {/* Buyer Auth */}
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/buyer/dashboard" element={<BuyerDashBoard />} />
        <Route path="/buyer/profile" element={<UserProfile />} />
        
        {/* Seller Auth */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/profile" element={<ProfileSeller />} />
        <Route path="/seller/productlist" element={<ProductList />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/requests" element={<SellerRequests />} />
        <Route path="/seller/update-product/:id" element={<UpdateProduct />} />
        
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}