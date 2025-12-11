'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ChevronLeft, ChevronRight, Heart, Share2, Truck, RefreshCw, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// This would be replaced with actual data fetching in a real app
const product = {
  id: 1,
  slug: 'classic-black-frames',
  name: 'Classic Black Frames',
  brand: 'Adeel Bhai',
  price: 129.99,
  originalPrice: 159.99,
  rating: 4.7,
  reviewCount: 128,
  description: 'Timeless black frames that combine classic style with modern comfort. Perfect for any face shape and suitable for all occasions.',
  features: [
    'Lightweight acetate frame',
    'Spring hinges for added comfort',
    'UV400 protection',
    'Includes microfiber cleaning cloth and case',
    '1-year manufacturer warranty'
  ],
  colors: [
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    { name: 'Tortoise', class: 'bg-amber-800', selectedClass: 'ring-amber-800' },
    { name: 'Havana', class: 'bg-amber-600', selectedClass: 'ring-amber-600' },
    { name: 'Crystal', class: 'bg-blue-50', selectedClass: 'ring-gray-400' },
  ],
  sizes: [
    { name: 'Small', inStock: true },
    { name: 'Medium', inStock: true },
    { name: 'Large', inStock: false },
  ],
  images: [
    {
      id: 1,
      name: 'Front view',
      src: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg',
      alt: 'Front view of classic black frames',
    },
    {
      id: 2,
      name: 'Side view',
      src: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
      alt: 'Side view of classic black frames',
    },
    {
      id: 3,
      name: 'Detail view',
      src: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg',
      alt: 'Detail view of classic black frames',
    },
    {
      id: 4,
      name: 'On model',
      src: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg',
      alt: 'Classic black frames on model',
    },
  ],
};

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // In a real app, you would fetch the product data here
  // based on the slug from the URL
  useEffect(() => {
    // Fetch product data based on slug
    // const fetchProduct = async () => {
    //   const response = await fetch(`/api/products/${params.slug}`);
    //   const data = await response.json();
    //   setProduct(data);
    // };
    // fetchProduct();
  }, [params.slug]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const addToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      ...product,
      color: selectedColor.name,
      size: selectedSize.name,
      quantity,
    });
    // Show success message or redirect to cart
  };

  const tryOn = () => {
    router.push('/vr');
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-red-600 mb-6"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[currentImage].src}
                alt={product.images[currentImage].alt}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setCurrentImage(index)}
                    className={`overflow-hidden rounded-lg ${currentImage === index ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200'}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={200}
                      height={200}
                      className="h-24 w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Mobile navigation */}
            {product.images.length > 1 && (
              <div className="lg:hidden flex justify-between mt-4">
                <button
                  type="button"
                  onClick={prevImage}
                  className="p-2 bg-white rounded-full shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="p-2 bg-white rounded-full shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)}</p>
                {product.originalPrice > product.price && (
                  <p className="ml-4 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                )}
                {product.originalPrice > product.price && (
                  <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                  </span>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                      fill={rating < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Color picker */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none ${
                      color.name === selectedColor.name ? 'ring-2 ring-offset-2 ring-red-500' : 'ring-1 ring-gray-300'
                    }`}
                  >
                    <span
                      className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${color.class}`}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">Selected: {selectedColor.name}</p>
            </div>

            {/* Size picker */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
                  Size guide
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`flex items-center justify-center py-3 px-4 border rounded-md text-sm font-medium ${
                      size.name === selectedSize.name
                        ? 'bg-red-600 text-white border-transparent'
                        : 'border-gray-300 text-gray-900'
                    } ${
                      !size.inStock
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {size.name}
                    {!size.inStock && <span className="sr-only">Out of stock</span>}
                  </button>
                ))}
              </div>
              {!selectedSize.inStock && (
                <p className="mt-2 text-sm text-red-600">This size is out of stock</p>
              )}
            </div>

            {/* Quantity selector */}
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="mt-2 flex items-center">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  <span className="sr-only">Increase quantity</span>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col space-y-4">
              <button
                type="button"
                onClick={addToCart}
                disabled={!selectedSize.inStock}
                className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white ${
                  selectedSize.inStock
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSize.inStock ? 'Add to cart' : 'Out of stock'}
              </button>

              <button
                type="button"
                onClick={tryOn}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Glasses size={20} className="mr-2" />
                Try On Virtually
              </button>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Share2 size={24} />
                  <span className="sr-only">Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc pl-5 space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Policies */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Truck size={20} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw size={20} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">30-day returns</span>
                </div>
                <div className="flex items-center">
                  <Shield size={20} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">1-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Frame Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Frame Width</p>
                  <p className="font-medium">140mm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lens Width</p>
                  <p className="font-medium">50mm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bridge Width</p>
                  <p className="font-medium">18mm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Temple Length</p>
                  <p className="font-medium">145mm</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Materials & Care</h3>
              <p className="text-gray-600 mb-4">
                Made from high-quality cellulose acetate that's lightweight and durable. The frames are hand-polished for a smooth finish and feature spring hinges for added comfort.
              </p>
              <p className="text-gray-600">
                To clean, use the included microfiber cloth. Avoid using paper towels or clothing, as they can scratch the lenses.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">You may also like</h2>
            <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={`https://images.unsplash.com/photo-1511499767150-a48a237ac008?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&ixid=eyJhcHBfaWQiOjEyMDd9`}
                    alt={`Related product ${item}`}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        Related Product {item}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">${(89.99 + item * 10).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}