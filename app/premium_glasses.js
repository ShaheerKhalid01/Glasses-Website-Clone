'use client';

import { useState } from 'react';
import { Glasses, ChevronDown } from 'lucide-react';

export default function PremiumGlasses() {
  const [openAccordion, setOpenAccordion] = useState(null);
  
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-red-700 cursor-pointer">Home</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-900 font-medium">Premium Glasses</span>
          </div>
        </div>
      </div>

      {/* Premium Glasses Banner Section */}
      <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Premium Glasses
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            <span className="font-bold text-red-700">Ainak.pk</span> offers premium quality glasses featuring master copies of branded eyewear like Moscot glasses, <span className="font-bold text-red-700">David Beckham glasses</span>, <span className="font-bold text-red-700">Tom Ford glasses</span>, <span className="font-bold text-red-700">Ray-Ban glasses</span>, Celine glasses, Prada glasses, and Gucci glasses. With a wide variety of latest and trending styles, you can now buy your favorite frames online with ease. Ainak.pk ensures an extensive range of affordable options for customers looking for high premium quality glasses in Pakistan. Whether you're looking to make a style statement or find practical glasses, Ainak.pk is your go-to destination. Purchase your perfect pair today and experience unbeatable quality and style without breaking the bank!
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

      {/* Shop by Premium Brands */}
      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
            Shop by premium brands
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {[
              { name: 'Tom Ford', color: 'from-yellow-300 to-yellow-400', frameColor: 'border-gray-900' },
              { name: 'Ray Ban', color: 'from-blue-200 to-blue-300', frameColor: 'border-gray-400' },
              { name: 'Gucci', color: 'from-green-300 to-green-400', frameColor: 'border-gray-900' },
              { name: 'Prada', color: 'from-pink-200 to-pink-300', frameColor: 'border-gray-900' },
              { name: 'Moscot', color: 'from-gray-200 to-gray-300', frameColor: 'border-gray-900' }
            ].map((brand, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br ${brand.color} shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 mb-3`}>
                  <div className={`w-20 h-12 md:w-24 md:h-14 border-4 ${brand.frameColor} rounded-lg`}></div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 text-center">
                  {brand.name}
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
              Showing 1–18 of 250 results
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
            
            {/* Premium Products */}
            {[
              { name: 'TOM FORD FT5870', price: '12500', color: 'border-gray-900', badges: ['New', 'Premium'] },
              { name: 'RAY BAN RB5154', price: '7500', color: 'border-gray-900', badges: ['Premium'] },
              { name: 'GUCCI GG15360', price: '12500', color: 'border-gray-900', badges: ['New', 'Premium'] },
              { name: 'PRADA VPR A10V', price: '13500', color: 'border-gray-900', badges: ['Premium'] },
              { name: 'MOSCOT LEMTOSH', price: '10500', color: 'border-gray-900', badges: ['New', 'Premium'] },
              { name: 'MONT BLANC MB0351O', price: '12000', color: 'border-amber-700', badges: ['Premium'] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800">
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  <div className="aspect-square flex items-center justify-center">
                    <div className={`w-full h-16 border-4 ${p.color} rounded-lg`}></div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className={`w-6 h-6 ${p.color.includes('amber') ? 'bg-amber-700' : 'bg-gray-900'} rounded-full border-2 border-gray-300`}></div>
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
              3
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors">
              4
            </button>
            <span className="text-gray-500 px-2 font-bold">...</span>
            <button className="bg-white border-2 border-gray-300 text-gray-700 font-bold px-5 py-3 rounded hover:bg-gray-100 transition-colors">
              12
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
                <span className="font-bold text-gray-900 text-base md:text-lg">Premium Quality Glasses in Pakistan</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 0 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 0 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p>
                    Content for Premium Quality Glasses in Pakistan will go here.
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
                <span className="font-bold text-gray-900 text-base md:text-lg">Designer Branded Eyewear Collection</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 1 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p>
                    Content for Designer Branded Eyewear Collection will go here.
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
                <span className="font-bold text-gray-900 text-base md:text-lg">Luxury Glasses Frames Online</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 2 && (
                <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                  <p>
                    Content for Luxury Glasses Frames Online will go here.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}