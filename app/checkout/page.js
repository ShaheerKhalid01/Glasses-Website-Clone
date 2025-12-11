'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, Check, X } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    phone: '',
    saveInfo: true,
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    saveCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'shipping') {
      setActiveTab('payment');
    } else if (activeTab === 'payment') {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  const orderSummary = {
    subtotal: 289.98,
    shipping: 9.99,
    tax: 23.99,
    total: 323.96,
    items: [
      {
        id: 1,
        name: 'Classic Black Frames',
        price: 129.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg',
      },
      {
        id: 2,
        name: 'Aviator Sunglasses',
        price: 159.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
      },
    ],
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Order confirmed!
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Thank you for your purchase. We've sent a confirmation email to{' '}
              <span className="font-medium text-gray-900">{formData.email}</span>.
            </p>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="sr-only">Order summary</h2>

              <div className="space-y-4">
                {orderSummary.items.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-md object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">Qty {product.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">${orderSummary.subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">${orderSummary.shipping.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax</dt>
                  <dd className="text-gray-900">${orderSummary.tax.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">${orderSummary.total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-10 border-t border-gray-200 py-6">
                <h3 className="text-sm font-medium text-gray-900">Shipping address</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  {formData.apartment && <p>{formData.apartment}</p>}
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <p>{formData.country}</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Continue Shopping <span aria-hidden="true"> &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div className="flex items-center mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900 ml-4">Checkout</h1>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Checkout form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleSubmit}>
                {activeTab === 'shipping' ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact information</h2>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email address"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-3 border"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping address</h2>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              placeholder="Street address"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                            Apartment, suite, etc. (optional)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="apartment"
                              name="apartment"
                              value={formData.apartment}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <div className="mt-1">
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border h-[38px]"
                              required
                            >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Australia">Australia</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State / Province
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                            ZIP / Postal code
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <div className="mt-1">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="saveInfo"
                        name="saveInfo"
                        type="checkbox"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                        Save this information for next time
                      </label>
                    </div>

                    <div className="pt-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="standard"
                              name="shippingMethod"
                              type="radio"
                              value="standard"
                              checked={formData.shippingMethod === 'standard'}
                              onChange={handleChange}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="standard" className="font-medium text-gray-700">
                              Standard Shipping
                            </label>
                            <p className="text-gray-500">3-5 business days • ${orderSummary.shipping.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="express"
                              name="shippingMethod"
                              type="radio"
                              value="express"
                              checked={formData.shippingMethod === 'express'}
                              onChange={handleChange}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="express" className="font-medium text-gray-700">
                              Express Shipping
                            </label>
                            <p className="text-gray-500">1-2 business days • $14.99</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md"
                      >
                        Continue to payment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Payment</h2>
                      <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                              Card number
                            </label>
                            <div className="mt-1 relative">
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="0000 0000 0000 0000"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                              Name on card
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                                Expiration date (MM/YY)
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="cardExpiry"
                                  name="cardExpiry"
                                  value={formData.cardExpiry}
                                  onChange={handleChange}
                                  placeholder="MM/YY"
                                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                                CVC
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="cardCvc"
                                  name="cardCvc"
                                  value={formData.cardCvc}
                                  onChange={handleChange}
                                  placeholder="CVC"
                                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm p-2 border"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <input
                              id="saveCard"
                              name="saveCard"
                              type="checkbox"
                              checked={formData.saveCard}
                              onChange={handleChange}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                              Save card for future purchases
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setActiveTab('shipping')}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        &larr; Back to shipping
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {orderSummary.items.map((product) => (
                    <li key={product.id} className="p-4 flex">
                      <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{product.name}</h3>
                            <p className="ml-4">${product.price.toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty {product.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${orderSummary.subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">${orderSummary.shipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Tax</dt>
                    <dd className="text-sm font-medium text-gray-900">${orderSummary.tax.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">${orderSummary.total.toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Lock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="text-red-600 font-medium hover:text-red-500"
                        onClick={() => router.push('/cart')}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}