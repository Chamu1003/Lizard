import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Kids() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const kidsProducts = res.data.filter(p => p.category.toLowerCase() === 'kids');
        setProducts(kidsProducts);
      })
      .catch(err => console.error('Error fetching kids products:', err));
  }, []);

  return (
    <div className="product-page">
      <h2>Kids' Wear</h2>
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
