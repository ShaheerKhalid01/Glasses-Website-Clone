'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic Black Frames',
      price: 129.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg',
      color: 'Black',
      prescription: 'Single Vision'
    },
    {
      id: 2,
      name: 'Aviator Sunglasses',
      price: 159.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
      color: 'Gold/Black',
      prescription: 'Non-prescription'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = (subtotal + shipping) * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/" 
          className="flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Continue Shopping
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Your Cart ({cartItems.length})</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/eyeglasses" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Shop Eyewear
            </Link>
          </div>
        ) : (
          <div className="lg:flex gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b">
                  <div className="col-span-6 font-medium text-gray-500">PRODUCT</div>
                  <div className="col-span-2 font-medium text-gray-500 text-center">PRICE</div>
                  <div className="col-span-2 font-medium text-gray-500 text-center">QUANTITY</div>
                  <div className="col-span-2 font-medium text-gray-500 text-right">TOTAL</div>
                </div>
                
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 border-b last:border-b-0 relative group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex items-start md:items-center md:w-1/2">
                        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Color: {item.color} • {item.prescription}
                          </p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="md:hidden mt-2 text-red-600 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:w-1/2 grid grid-cols-3 items-center">
                        <div className="text-center text-gray-900 font-medium">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        <div className="flex justify-center">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="hidden md:inline-block ml-4 text-gray-400 hover:text-red-600"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="px-4 py-2 border rounded-l-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="bg-gray-800 text-white px-6 py-2 rounded-r-md hover:bg-gray-700 transition-colors">
                    Apply
                  </button>
                </div>
                <button 
                  onClick={() => setCartItems([])}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md mt-6 transition-colors">
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      or{' '}
                      <Link href="/eyeglasses" className="text-red-600 hover:underline">
                        Continue Shopping
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium mb-4">Secure Payment</h3>
                <div className="flex space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">PP</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-medium">AP</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}