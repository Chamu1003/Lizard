import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';


export default function Men() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const menProducts = res.data.filter(p => p.category.toLowerCase() === 'men');
        setProducts(menProducts);
      })
      .catch(err => console.error('Error fetching men products:', err));
  }, []);

  return (
    <div className="category-page">
      <h2 className="page-title">Men's Wear</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
