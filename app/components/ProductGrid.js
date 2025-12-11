'use client';

import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (!products || !Array.isArray(products)) {
    console.error('Invalid products prop:', products);
    return <div>No products available</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;