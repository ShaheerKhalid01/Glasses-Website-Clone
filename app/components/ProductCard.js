'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={400}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white text-gray-400 hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
}