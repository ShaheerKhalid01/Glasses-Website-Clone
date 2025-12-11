'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCartItems([
      {
        id: 1,
        name: 'Ray Ban Aviator Polarized',
        color: 'Black',
        price: 13500,
        image: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Aviator+Glasses'
      }
    ]);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black text-gray-900 text-center mb-8">Cart</h1>

        {cartItems.length > 0 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-gray-800 font-medium">
                "{cartItems[0].name}" has been added to your cart.
              </p>
            </div>
            <button
              onClick={handleContinueShopping}
              className="text-gray-700 hover:text-gray-900 font-medium underline whitespace-nowrap"
            >
              Continue shopping
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={handleContinueShopping}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-200 last:border-0">
                    <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name} | {item.color}
                      </h3>
                      <p className="text-2xl font-black text-gray-900 mb-4">
                        Rs {item.price.toLocaleString()}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Subtotal <span className="ml-4 sm:ml-20">Rs {item.price.toLocaleString()}</span>
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        <span className="w-4 h-4 bg-red-600 text-white flex items-center justify-center text-xs rounded">
                          ✕
                        </span>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded whitespace-nowrap transform hover:scale-105 transition-all duration-300"
                    >
                      Apply coupon
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
                    Cart totals
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-bold text-gray-900">Subtotal</span>
                      <span className="font-bold text-gray-900">Rs {subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">Rs {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}