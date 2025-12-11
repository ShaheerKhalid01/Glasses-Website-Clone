'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Heart, ShoppingCart, Star, Sparkles } from 'lucide-react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState(new Set())

  const products = [
    {
      id: '1',
      name: 'Classic Aviator Gold',
      price: 189,
      originalPrice: 249,
      rating: 4.8,
      reviews: 142,
      badge: 'New',
      category: 'sunglasses',
      features: ['UV Protection', 'Polarized', 'Premium Frame'],
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: '2',
      name: 'Designer Frame Elite',
      price: 299,
      rating: 4.9,
      reviews: 98,
      badge: 'Premium',
      category: 'eyeglasses',
      features: ['Blue Light Filter', 'Anti-Glare', 'Titanium Frame'],
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: '3',
      name: 'Retro Sunglasses Pro',
      price: 149,
      originalPrice: 199,
      rating: 4.7,
      reviews: 203,
      badge: 'Popular',
      category: 'sunglasses',
      features: ['Vintage Style', 'UV Protection', 'Gradient Lens'],
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: '4',
      name: 'Modern Square Black',
      price: 159,
      rating: 4.6,
      reviews: 87,
      category: 'eyeglasses',
      features: ['Lightweight', 'Flexible Frame', 'Scratch Resistant'],
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      id: '5',
      name: 'Cat Eye Vintage Rose',
      price: 179,
      originalPrice: 229,
      rating: 4.8,
      reviews: 156,
      badge: 'Trending',
      category: 'eyeglasses',
      features: ['Fashion Forward', 'Comfortable Fit', 'Unique Design'],
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      id: '6',
      name: 'Sports Sunglasses Pro',
      price: 199,
      rating: 4.9,
      reviews: 234,
      badge: 'Best Seller',
      category: 'sunglasses',
      features: ['Sport Design', 'Impact Resistant', 'Wrap Around'],
      gradient: 'from-red-400 to-orange-500'
    }
  ]

  // Products loaded (localStorage removed to fix storage error)
  useEffect(() => {
    console.log('✅ Products ready:', products.length);
  }, [])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'eyeglasses', name: 'Eyeglasses' },
    { id: 'sunglasses', name: 'Sunglasses' },
    { id: 'premium', name: 'Premium' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleVirtualTryOn = (product) => {
    // Navigate directly to VR page with product ID
    if (typeof window !== 'undefined') {
      window.location.href = `/vr?product=${product.id}`
    }
  }

  const handleCloseVR = () => {
    setIsVROpen(false)
    setSelectedProduct(null)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderParticles = () => {
    return [...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/30 rounded-full"
        style={{
          top: `${20 + i * 15}%`,
          left: `${15 + i * 10}%`,
        }}
        animate={{
          y: [-5, 5, -5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))
  }

  return (
    <section id="products" className="section-padding bg-gradient-to-br from-cream-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-600 px-6 py-3 rounded-full text-sm font-mono font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4" />
            Featured Collection
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-dark-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium <span className="text-gradient">Eyewear</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-dark-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Handpicked favorites from our latest collection, combining style with functionality.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-mono font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-dark-700 hover:bg-primary-50 border border-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                    <Eye className="w-20 h-20 text-white/80" />
                    
                    {/* Animated Particles */}
                    <div className="absolute inset-0">
                      {renderParticles()}
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <motion.div
                      className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      {product.badge}
                    </motion.div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300"
                    onClick={() => toggleFavorite(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-white hover:text-red-300'
                      }`} 
                    />
                  </motion.button>

                  {/* Virtual Try-On Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                  >
                    <motion.button
                      className="flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-mono font-bold text-sm hover:bg-primary-50 transition-colors duration-300"
                      onClick={() => handleVirtualTryOn(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      Virtual Try-On
                    </motion.button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-dark-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-serif font-bold text-dark-900 mb-2">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-gray-100 text-dark-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    className="w-full bg-dark-900 text-white py-3 rounded-xl font-mono font-semibold text-sm hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    Add to Cart
                  </motion.button>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Products