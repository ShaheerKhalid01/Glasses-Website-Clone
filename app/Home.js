'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Shield, Truck, RefreshCcw, Star, Glasses, ChevronDown } from 'lucide-react';

export default function HomeContent() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleTryOnClick = () => {
    router.push('/vr');
  };

  const handleProductClick = (product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    router.push(`/product/${slug}`);
  };

  const glassesImages = [
    'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://cdn.pixabay.com/photo/2019/07/11/14/24/reading-4330761_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/24/00/06/book-3698816_1280.jpg',
    'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://cdn.pixabay.com/photo/2016/03/27/18/53/fashion-1283615_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/03/51/eyeglasses-1867173_640.jpg',
    'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=600',
    ''
  ];

  const slides = [
    {
      id: 1,
      badge: '',
      title: 'Virtual Try-On',
      subtitle: 'Find frames that fit your face with our handy Virtual Try-On feature.',
      buttonText: 'Try-on now!',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      bgGradient: 'from-purple-50 via-pink-50 to-white',
      image: glassesImages[1],
      clickable: true
    },
    {
      id: 2,
      badge: 'Premium Glasses',
      title: 'Flat 15%',
      subtitle: 'discount at checkout',
      buttonText: 'Shop now',
      buttonColor: 'bg-red-700 hover:bg-red-800',
      bgGradient: 'from-orange-200 via-orange-100 to-amber-100',
      image: glassesImages[0]
    },
    {
      id: 3,
      badge: 'Premium Sunglasses',
      title: 'Flat 15%',
      subtitle: 'discount at checkout',
      buttonText: 'Shop now',
      buttonColor: 'bg-red-700 hover:bg-red-800',
      bgGradient: 'from-lime-300 via-yellow-200 to-green-100',
      image: glassesImages[3]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const handleSlideClick = (slide) => {
    if (slide.id === 1) {
      router.push('/vr');
    }
  };

  const handleButtonClick = (slide) => {
    if (slide.id === 1) {
      router.push('/vr');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.id} className={`min-w-full relative bg-gradient-to-br ${slide.bgGradient}`}>
              <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                  <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
                    <div 
                      className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${slide.clickable ? 'cursor-pointer transform hover:scale-105 transition-transform duration-300' : ''}`}
                      onClick={() => handleSlideClick(slide)}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      {slide.clickable && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white bg-opacity-95 px-6 py-3 rounded-full">
                            <span className="text-red-600 font-bold">Click to Try On!</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2">
                    {slide.id === 1 ? (
                      <>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">{slide.title}</h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0">{slide.subtitle}</p>
                      </>
                    ) : (
                      <>
                        {slide.badge && (
                          <div className="inline-block mb-6">
                            <span className="bg-gradient-to-r from-green-300 to-blue-200 text-black text-lg md:text-xl font-bold px-6 py-3 rounded-full inline-block">{slide.badge}</span>
                          </div>
                        )}
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-2 leading-none">{slide.title}</h1>
                        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-8">{slide.subtitle}</p>
                      </>
                    )}
                    <button 
                      onClick={() => handleButtonClick(slide)}
                      className={`${slide.buttonColor} text-white text-xl md:text-2xl font-bold px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      {slide.buttonText}
                    </button>
                    <div className="flex justify-center md:justify-start gap-2 mt-8">
                      {slides.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-400'}`} aria-label={`Go to slide ${idx + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:block" aria-label="Previous slide"><ChevronLeft className="w-6 h-6 text-gray-800" /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:block" aria-label="Next slide"><ChevronRight className="w-6 h-6 text-gray-800" /></button>
      </div>

      <div className="bg-gray-100 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-red-600 flex-shrink-0" />
              <span className="text-sm md:text-base lg:text-lg font-medium text-gray-800 whitespace-nowrap">Premium Quality Products</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400"></div>
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 md:w-7 md:h-7 text-red-600 flex-shrink-0" />
              <span className="text-sm md:text-base lg:text-lg font-medium text-gray-800 whitespace-nowrap">Free Delivery In Pakistan</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400"></div>
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-6 h-6 md:w-7 md:h-7 text-red-600 flex-shrink-0" />
              <span className="text-sm md:text-base lg:text-lg font-medium text-gray-800 whitespace-nowrap">7 Days Exchange or Return</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400"></div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <div className="relative w-5 h-5 md:w-6 md:h-6 overflow-hidden">
                  <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400 absolute" />
                  <div className="absolute inset-0 w-1/2 bg-gray-100"></div>
                </div>
              </div>
              <span className="text-sm md:text-base lg:text-lg font-medium text-gray-800 whitespace-nowrap">12K+ Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 text-center mb-12 md:mb-16">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 lg:gap-6">
            {[
              { name: 'Eyeglasses', color: 'from-teal-400 to-teal-500' },
              { name: 'Tom Ford\nGlasses', color: 'from-yellow-300 to-yellow-400' },
              { name: 'Premium\nGlasses', color: 'from-green-400 to-green-500' },
              { name: 'Sunglasses', color: 'from-emerald-200 to-emerald-300' },
              { name: 'Premium\nSunglasses', color: 'from-gray-300 to-gray-400' },
              { name: 'Tom Ford\nSunglasses', color: 'from-orange-400 to-orange-500' },
              { name: 'Ray ban\nSunglasses', color: 'from-red-500 to-red-600' }
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br ${cat.color} shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 mb-4`}>
                  <Glasses className="w-16 h-16 md:w-20 md:h-20 text-gray-800" />
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 text-center whitespace-pre-line">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Premium Sunglasses</h2>
            <p className="text-sm md:text-base text-gray-600">Acetate Material | Premium Finishing | Life Long Quality</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'RAY BAN AVIATOR POLARIZED', price: '13500', badges: ['New', 'Polarized', 'Premium'], image: glassesImages[0] },
              { name: 'LOUIS VUITTON Z1505E', price: '15000', badges: ['New', 'Premium'], image: glassesImages[1] },
              { name: 'LOUIS VUITTON Z1584U', price: '15000', badges: ['New', 'Premium'], image: glassesImages[2] },
              { name: 'TOM FORD FT0711', price: '15000', badges: ['Premium'], image: glassesImages[3] },
              { name: 'TOM FORD FT1077', price: '15000', badges: ['New', 'Premium'], image: glassesImages[4] },
              { name: 'TOM FORD FT1017', price: '15000', badges: ['New', 'Premium'], image: glassesImages[5] },
              { name: 'RAY BAN PUFFER WAYFARER', price: '15000', badges: [], restock: true, image: glassesImages[6] },
              { name: 'RAY BAN WAYFARER REVERSE', price: '14000', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  {p.restock && <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">Restocking On 6th December</span>}
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  {p.badges.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {p.badges.map((b, j) => (
                        <span key={j} className={`text-xs font-bold px-2 py-1 rounded ${b === 'New' ? 'bg-teal-700 text-white' : b === 'Polarized' ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-gray-900'}`}>{b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Premium Sunglasses</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Online Glasses In Pakistan</h2>
            <p className="text-sm md:text-base text-gray-600">Luxury Designs | Finest Quality Material | 6 Months Warranty</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'PRADA VPR A10V', price: '13500', badges: ['New', 'Premium'], image: glassesImages[0] },
              { name: 'MONT BLANC MB0122O', price: '12500', soldOut: true, image: glassesImages[1] },
              { name: 'GUCCI GG0966OA', price: '13500', badges: ['New', 'Premium'], image: glassesImages[2] },
              { name: 'TOM FORD FT5870', price: '12500', badges: ['New', 'Premium'], image: glassesImages[3] },
              { name: 'TOM FORD FT0711', price: '13500', soldOut: true, image: glassesImages[4] },
              { name: 'TOM FORD FT0847', price: '13500', badges: ['New', 'Premium'], image: glassesImages[5] },
              { name: 'MONT BLANC MB0351O', price: '12000', badges: ['New', 'Premium'], image: glassesImages[6] },
              { name: 'DOLCE & GABBANA DG3382', price: '12500', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  {p.soldOut && <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">Sold out</span>}
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
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
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Collection</button>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Eyeglasses For Men</h2>
            <p className="text-sm md:text-base text-gray-600">400 + Eyeglasses Frames | Lowest Prices | Anti-Glare Lens</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'FAME 3243', price: '2000', image: glassesImages[0] },
              { name: 'VISION 2311', price: '2000', image: glassesImages[1] },
              { name: 'FAME 3238', price: '1800', image: glassesImages[2] },
              { name: 'RAY BAN RB5154', price: '7500', soldOut: true, image: glassesImages[3] },
              { name: 'GUCCI 2283', price: '3500', soldOut: true, image: glassesImages[4] },
              { name: 'GUCCI GG15360', price: '12500', badges: ['New', 'Premium'], image: glassesImages[5] },
              { name: 'RAY BAN RB5417', price: '7500', badges: ['New', 'Premium'], image: glassesImages[6] },
              { name: 'RAY BAN RB5418', price: '7000', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  {p.soldOut && <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">Sold out</span>}
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
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
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Men Eyeglasses</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Eyeglasses For Women</h2>
            <p className="text-sm md:text-base text-gray-600">400+ Stylish Designer Glasses Frames | Prescription Glasses Price in Pakistan</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'AMORE 1676', price: '1800', badges: [], image: glassesImages[0] },
              { name: 'PRADA VPR A04V', price: '13500', badges: ['Premium'], image: glassesImages[1] },
              { name: 'ROMY 5217', price: '2000', badges: ['New'], image: glassesImages[2] },
              { name: 'DOLCE & GABBANA DG3361', price: '12500', badges: ['New', 'Premium'], image: glassesImages[3] },
              { name: 'GUCCI GG14240', price: '13500', badges: ['New', 'Premium'], image: glassesImages[4] },
              { name: 'PRADA VPR A03V', price: '13500', badges: ['New', 'Premium'], image: glassesImages[5] },
              { name: 'EMBER 1007', price: '2500', badges: ['New'], image: glassesImages[6] },
              { name: 'GUCCI GG09270', price: '12500', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  {p.badges && p.badges.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {p.badges.map((b, j) => (
                        <span key={j} className={`text-xs font-bold px-2 py-1 rounded ${b === 'New' ? 'bg-teal-700 text-white' : 'bg-yellow-400 text-gray-900'}`}>{b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Women Eyeglasses</button>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Sunglasses For Men</h2>
            <p className="text-sm md:text-base text-gray-600">UV Protected | Gradient Tinted | Polarized Filters</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'RAYBAN AVIATOR', price: '9000', badges: ['New', 'Premium'], image: glassesImages[0] },
              { name: 'RAY BAN 5801', price: '4500', soldOut: true, image: glassesImages[1] },
              { name: 'LOUIS VUITTON Z1910E', price: '15000', badges: ['Premium'], image: glassesImages[2] },
              { name: 'MONT BLANC MB0124S', price: '15000', badges: ['Premium'], image: glassesImages[3] },
              { name: 'LOUIS VUITTON LV Z1952', price: '15000', badges: ['New', 'Premium'], image: glassesImages[4] },
              { name: 'RAY BAN RB4343', price: '4500', image: glassesImages[5] },
              { name: 'RAY BAN RB4730', price: '4500', soldOut: true, image: glassesImages[6] },
              { name: 'TOM FORD FT1176', price: '15000', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  {p.soldOut && <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">Sold out</span>}
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
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
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Men Sunglasses</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Sunglasses For Women</h2>
            <p className="text-sm md:text-base text-gray-600">Stylish Collection | Mirrored Designs | UV Protection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'RAY BAN RB5670', price: '4500', image: glassesImages[0] },
              { name: 'TOM FORD FT1101', price: '14000', badges: ['Premium'], image: glassesImages[1] },
              { name: 'PRADA SPR 26ZS', price: '15000', badges: ['New', 'Premium'], image: glassesImages[2] },
              { name: 'TOM FORD FT1086', price: '15000', badges: ['New', 'Premium'], image: glassesImages[3] },
              { name: 'RAY BAN RB3016', price: '12000', badges: ['New', 'Premium'], image: glassesImages[4] },
              { name: 'RAY BAN RB2286', price: '12000', badges: ['New', 'Premium'], image: glassesImages[5] },
              { name: 'GUCCI GG1668S', price: '14000', badges: ['New', 'Premium'], image: glassesImages[6] },
              { name: 'GUCCI GG0001S', price: '15000', badges: ['New', 'Premium'], image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleTryOnClick(); }}
                    className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-800 z-10"
                  >
                    <Glasses className="w-4 h-4" /> Try on
                  </button>
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="aspect-square flex items-center justify-center relative cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
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
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Women Sunglasses</button>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3">Contact Lenses</h2>
            <p className="text-sm md:text-base text-gray-600">Colored Lenses | Branded Contact Lenses | Transparent Lenses</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {[
              { name: 'HYDRO', price: '3600', image: glassesImages[0] },
              { name: 'ACUVUE OASYS', price: '11000', image: glassesImages[1] },
              { name: 'FLEXCON', price: '7200', image: glassesImages[2] },
              { name: 'BIOMEDICS 55', price: '3500', image: glassesImages[3] },
              { name: 'BELLA ELITE LENSES', price: '5200', image: glassesImages[4] },
              { name: 'FRESHLOOK LENSES', price: '6500', image: glassesImages[5] },
              { name: 'AVAIRA VITALITY', price: '4350', image: glassesImages[6] },
              { name: 'FRESHKON MOSAIC', price: '4500', image: glassesImages[7] }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50 p-6">
                  <div className="aspect-square flex items-center justify-center relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1">{p.name}</h3>
                  <p className="text-lg font-black text-gray-900">Rs {p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-red-700 hover:bg-red-800 text-white text-base md:text-lg font-bold px-8 py-3 rounded shadow-lg transform hover:scale-105 transition-all duration-300">Explore Contact Lenses</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-base md:text-lg">Glasses Price in Pakistan</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 0 ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 0 && (
                  <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                    <p>Eyeglasses prices in Pakistan vary due to the different qualities and variety of glasses. Generally, you can get decent plastic frame glasses of good quality within 1500-2500 Rs/-.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">FAQ</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-base md:text-lg">How to Buy Online Glasses in Pakistan?</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 3 ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 3 && (
                  <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                    <p>Buying glasses online in Pakistan is easy and affordable with Ainak.pk.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}