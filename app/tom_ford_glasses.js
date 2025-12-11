'use client';

import { useState } from 'react';
import { Glasses, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function TomFordGlasses() {
  const [openAccordion, setOpenAccordion] = useState(null);
  
  // Mock product data with Unsplash images
  const products = [
    { name: 'TOM FORD FT5870', price: '12500', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5915', price: '8500', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5734', price: '12500', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5823', price: '13500', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5692', price: '10500', image: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a6?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5901', price: '12000', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5847', price: '9500', image: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5778', price: '11500', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5665', price: '8500', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5934', price: '12500', image: 'https://images.unsplash.com/photo-1608427992634-a2f2d04e8a4e?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5812', price: '10000', image: 'https://images.unsplash.com/photo-1620405891136-8f78549eec7c?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5723', price: '13000', image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5889', price: '9000', image: 'https://images.unsplash.com/photo-1606341154106-ca5171ce1c97?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5756', price: '11000', image: 'https://images.unsplash.com/photo-1628510807581-0b94e7df6390?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5801', price: '12500', image: 'https://images.unsplash.com/photo-1593539345815-4e97e0d69bc6?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
    { name: 'TOM FORD FT5678', price: '10500', image: 'https://images.unsplash.com/photo-1606412725994-d99d73cb0b89?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5945', price: '9500', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop', badges: ['Premium'] },
    { name: 'TOM FORD FT5834', price: '11500', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=600&fit=crop', badges: ['New', 'Premium'] },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-red-700 cursor-pointer">Home</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-900 font-medium">Tom Ford Glasses</span>
          </div>
        </div>
      </div>

      {/* Tom Ford Glasses Banner Section */}
      <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Tom Ford Glasses
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            Explore the best quality <span className="font-bold text-red-700">Tom Ford Glasses</span> for Men and Women in Pakistan at an affordable price. Shop online latest design of <span className="font-bold text-red-700">Tom Ford eyeglasses Frames</span> and Get new branded eyewear at your doorstep. <span className="font-bold text-red-700">Ainak.pk</span> offers premium quality glasses featuring master copies of branded eyewear. With a wide variety of latest and trending styles, you can now buy your favorite Tom Ford frames online with ease. Ainak.pk ensures an extensive range of affordable options for customers looking for high premium quality glasses in Pakistan. Whether you're looking to make a style statement or find practical glasses, Ainak.pk is your go-to destination. Purchase your perfect pair today and experience unbeatable quality and style without breaking the bank!
          </p>
        </div>
      </div>

      {/* Discount Banner */}
      <div className="bg-red-700 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
            <span className="text-white font-bold text-sm md:text-base">
              Pay with bank transfer and get
            </span>
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-2xl md:text-3xl font-black">flat 15% discount</span>
              <span className="text-sm md:text-base font-bold ml-2">at checkout</span>
              <div className="text-xs md:text-sm font-semibold text-gray-700">
                on glasses & sunglasses
              </div>
            </div>
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg border-2 border-white">
              <span className="text-lg md:text-xl font-black">10% discount</span>
              <div className="text-xs md:text-sm font-semibold">
                on contact lenses
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Tom Ford Collections */}
      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
            Shop Tom Ford Collections
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {[
              { name: 'Classic', color: 'from-yellow-300 to-yellow-400', frameColor: 'border-gray-900' },
              { name: 'Modern', color: 'from-amber-300 to-amber-400', frameColor: 'border-gray-900' },
              { name: 'Vintage', color: 'from-orange-300 to-orange-400', frameColor: 'border-gray-900' },
              { name: 'Bold', color: 'from-red-300 to-red-400', frameColor: 'border-gray-900' },
              { name: 'Minimal', color: 'from-stone-300 to-stone-400', frameColor: 'border-gray-900' }
            ].map((collection, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br ${collection.color} shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 mb-3`}>
                  <div className={`w-20 h-12 md:w-24 md:h-14 border-4 ${collection.frameColor} rounded-lg`}></div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 text-center">
                  {collection.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          
          {/* Filters Section */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Filters:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Gender</option>
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Price</option>
                <option>Rs 5000 - Rs 10000</option>
                <option>Rs 10000 - Rs 15000</option>
                <option>Above Rs 15000</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Material</option>
                <option>Acetate</option>
                <option>Titanium</option>
                <option>Metal</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Shape</option>
                <option>Round</option>
                <option>Square</option>
                <option>Rectangle</option>
                <option>Aviator</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Rim</option>
                <option>Full Rim</option>
                <option>Half Rim</option>
                <option>Rimless</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer">
                <option>Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
              <select className="bg-orange-100 border border-orange-200 text-gray-900 text-sm md:text-base font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer col-span-2 sm:col-span-3 lg:col-span-6">
                <option>Color</option>
                <option>Black</option>
                <option>Brown</option>
                <option>Transparent</option>
                <option>Blue</option>
                <option>Gold</option>
                <option>Silver</option>
              </select>
            </div>
          </div>

          {/* Results and Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <p className="text-gray-700 text-sm md:text-base mb-4 sm:mb-0">
              Showing 1–18 of 29 results
            </p>
            <select className="border border-gray-300 text-gray-900 text-sm md:text-base rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option>Sort by latest</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
              <option>Sort by popularity</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            
            {/* Tom Ford Products */}
            {products.map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800">
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  <div className="aspect-square flex items-center justify-center relative">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-300"></div>
                  </div>
                  {p.badges && (
                    <div className="flex gap-2 mt-4">
                      {p.badges.map((b, j) => (
                        <span key={j} className={`text-xs font-bold px-2 py-1 rounded ${b === 'New' ? 'bg-teal-700 text-white' : 'bg-yellow-400 text-gray-900'}`}>{b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{p.name}</h3>
                  <p className="text-sm text-red-600 mb-1">Medium (unisex)</p>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}

          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center gap-2 py-8">
            <button className="bg-red-700 text-white font-bold px-5 py-3 rounded hover:bg-red-800 transition-colors">
              1
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors">
              →
            </button>
          </div>

        </div>
      </div>

      {/* SEO Accordion Section */}
      <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            
            {/* Accordion 1 */}
            <div className="bg-white rounded-lg shadow-sm">
              <button 
                onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-base md:text-lg">Tom Ford Glasses in Pakistan</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 0 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 0 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p className="mb-4">
                    Being one of the largest online eyewear stores in Pakistan, we have a wide range of remarkably 
                    high-quality Tom Ford products that can make your life comfortable by offering you to live with style and elegance.
                  </p>
                  <p>
                    We have only one motto: to provide the best products at affordable prices with 100% customer satisfaction. 
                    We have an extensive range of Tom Ford frames with different eyeglasses, including rimless, semi-rimmed, 
                    full-rimmed, and all of the shapes like round, wayfarer, square, semi-square, rectangle, semi-rectangle, 
                    and cat-eye.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2 */}
            <div className="bg-white rounded-lg shadow-sm">
              <button 
                onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-base md:text-lg">Why Choose Tom Ford Eyeglasses?</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 1 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p className="mb-4">
                    For adding more value to your personality, you can grab the best Tom Ford frames in Pakistan with numerous colors 
                    like grey, black, brown, tortoise, black-silver, black-maroon that aesthetically refine your persona and 
                    make you look more vibrant and alive. Our stock is full of elegant, stylish, chic, sophisticated, and 
                    luxurious designs.
                  </p>
                  <p>
                    Talking about the uniqueness of Tom Ford eyeglasses, its iconic temple ends are the eye-catchers. We have 
                    luxurious frames with various materials like acetate material, metal material, lightweight TR, and plastic, 
                    and more to enrich our customers with eye-catching charisma.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3 */}
            <div className="bg-white rounded-lg shadow-sm">
              <button 
                onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 text-base md:text-lg">Tom Ford Glasses Price in Pakistan</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 2 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p className="mb-4">
                    From all across Pakistan, order any pair of Tom Ford eyeglasses at an affordable cost. 
                    It has a wide assortment of specs which will elevate your whole personality and be suitable for 
                    everyday look to formal look.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-3">Tom Ford Glasses Price Range:</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Rimless Tom Ford Glasses Frames</span>
                        <span className="font-bold text-red-700">Rs. 3,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>ClubMaster Tom Ford Glasses Frames</span>
                        <span className="font-bold text-red-700">Rs. 3,500</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Round Tom Ford Glasses Frames</span>
                        <span className="font-bold text-red-700">Rs. 4,500</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Black Tom Ford Glasses Frames</span>
                        <span className="font-bold text-red-700">Rs. 8,500</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}