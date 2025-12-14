'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Heart, ShoppingCart, Star, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Optimization: Move static data outside component
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
    gradient: 'from-slate-400 to-slate-600'
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

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'eyeglasses', name: 'Eyeglasses' },
  { id: 'sunglasses', name: 'Sunglasses' },
  { id: 'premium', name: 'Premium' }
]

const Products = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState(new Set())

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

  const handleVirtualTryOn = (productId) => {
    router.push(`/vr?product=${productId}`)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-slate-300'
        }`}
      />
    ))
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-600 px-6 py-3 rounded-full text-sm font-mono font-semibold mb-6 border border-primary-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            Featured Collection
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Eyewear</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
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
            transition={{ duration: 0.4 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                    <Eye className="w-20 h-20 text-white/80 drop-shadow-lg" />
                    
                    {/* Animated Particles - inline rendering for simplicity in loop */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            top: `${20 + i * 25}%`,
                            left: `${15 + i * 30}%`,
                          }}
                          animate={{
                            y: [-5, 5, -5],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <motion.button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300"
                    onClick={() => toggleFavorite(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-white'
                      }`} 
                    />
                  </motion.button>

                  {/* Virtual Try-On Overlay */}
                  <div className="absolute inset-0 bg-primary-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <motion.button
                      className="flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-mono font-bold text-sm hover:bg-slate-50 transition-colors duration-300 shadow-lg"
                      onClick={() => handleVirtualTryOn(product.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      Virtual Try-On
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-slate-500 font-medium">
                      {product.rating} <span className="text-slate-400">({product.reviews})</span>
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 truncate">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium"
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
                      <span className="text-lg text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-mono font-semibold text-sm hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-slate-900/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    Add to Cart
                  </motion.button>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 hover:border-primary-200 hover:text-primary-600 transition-all duration-300"
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
