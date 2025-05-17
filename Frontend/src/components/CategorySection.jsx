// src/components/CategorySection.jsx
import React from 'react';
import ProductCard from './ProductCard';

export default function CategorySection({ title, products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {products.length > 4 && (
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAuthenticated={true}
            userRole="buyer"
          />
        ))}
      </div>
    </section>
  );
}