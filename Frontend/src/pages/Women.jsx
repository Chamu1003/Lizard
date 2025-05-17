import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';


export default function Women() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const womenProducts = res.data.filter(p => p.category.toLowerCase() === 'women');
        setProducts(womenProducts);
      })
      .catch(err => console.error('Error fetching women products:', err));
  }, []);

  return (
    <div className="product-page">
      <h2>Women's Wear</h2>
      <div className="grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
