'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, Heart, MapPin, CreditCard, LogOut, ChevronRight } from 'lucide-react';

const tabs = [
  { name: 'My Orders', icon: ShoppingBag, current: true },
  { name: 'My Details', icon: User, current: false },
  { name: 'Addresses', icon: MapPin, current: false },
  { name: 'Payment Methods', icon: CreditCard, current: false },
  { name: 'Wishlist', icon: Heart, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const orders = [
  {
    id: 1,
    date: 'July 12, 2023',
    status: 'Delivered',
    total: 289.98,
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
  },
  {
    id: 2,
    date: 'June 5, 2023',
    status: 'Delivered',
    total: 89.99,
    items: [
      {
        id: 3,
        name: 'Round Tortoise Frames',
        price: 89.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg',
      },
    ],
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('My Orders');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    // Simulate sign out
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'My Orders':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => router.push('/eyeglasses')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Placed on {order.date}
                        </p>
                      </div>
                      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4">
                        <p className="text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <span
                          className={classNames(
                            'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap',
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          )}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900 mt-1 sm:mt-0">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="button"
                        onClick={() => router.push(`/orders/${order.id}`)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        View Order Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'My Details':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-50 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'Addresses':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add New Address
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2].map((address) => (
                <div key={address} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">
                      {address === 1 ? 'Home' : 'Work'}
                    </h3>
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    123 Main St<br />
                    Apt 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Phone: (555) 123-4567
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {address === 1 ? 'Default' : 'Secondary'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Payment Methods':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((card) => (
                <div key={card} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">
                          {card === 1 ? 'VISA' : 'MC'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {card === 1 ? 'Visa ending in 4242' : 'Mastercard ending in 4444'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Expires {card === 1 ? '12/25' : '03/26'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                  {card === 1 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Default
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'Wishlist':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
            {[1, 2, 3].length === 0 ? (
              <div className="text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                <p className="mt-1 text-gray-500">Save items you love for easy access later.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => router.push('/eyeglasses')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Start Browsing
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img
                        src={`https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1&fit=crop&crop=faces&q=80&w=500`}
                        alt="Product"
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          type="button"
                          className="p-2 rounded-full bg-white text-gray-400 hover:text-red-500 focus:outline-none"
                        >
                          <Heart className="h-6 w-6" />
                          <span className="sr-only">Remove from wishlist</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Classic Black Frames
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Eyeglasses</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">$129.99</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full bg-red-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">My Account</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, John Doe
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoading}
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing out...' : (
                <>
                  <LogOut className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Sign out
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar navigation */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setCurrentTab(tab.name)}
                  className={classNames(
                    currentTab === tab.name
                      ? 'bg-red-50 border-red-500 text-red-700 hover:bg-red-50 hover:text-red-700'
                      : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full text-left'
                  )}
                >
                  <tab.icon
                    className={classNames(
                      currentTab === tab.name ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500',
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}