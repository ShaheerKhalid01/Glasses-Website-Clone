'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Eye } from 'lucide-react'
import Link from 'next/link'

// Optimization: Move static data outside component
const stats = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '500+', label: 'Frame Styles' },
  { number: '99%', label: 'Satisfaction Rate' }
]

const floatingPositions = [
  { top: '10%', left: '10%', delay: 0 },
  { top: '20%', right: '10%', delay: 0.5 },
  { bottom: '20%', left: '15%', delay: 1 },
  { bottom: '10%', right: '15%', delay: 1.5 }
]

const Hero = () => {
  const handleScrollToProducts = () => {
    const element = document.getElementById('products')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-100">
      {/* Animated Background Elements - Optimized with will-change and reduced opacity for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse delay-1000 will-change-transform"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-primary-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hero Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-700 px-4 py-2 rounded-full text-sm font-mono font-semibold mb-6 border border-primary-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Premium Eyewear Collection
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-slate-900 mb-6 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block">Clear</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 block pb-2">Vision,</span>
              <span className="block">Bold Style</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover our curated collection of premium eyewear. From timeless classics to avant-garde designs, find frames that perfectly express your unique personality.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                className="bg-primary-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/20 group"
                onClick={handleScrollToProducts}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>

              <Link href="/vr" passHref legacyBehavior>
                <motion.a
                  className="bg-white/80 backdrop-blur-sm border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-mono font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg uppercase tracking-wider text-sm group cursor-pointer flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Virtual Try-On
                  </span>
                </motion.a>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 font-mono">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-500 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="relative flex items-center justify-center hidden lg:flex"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Glasses Illustration */}
              <motion.div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Eye className="w-32 h-32 md:w-40 md:h-40 text-white" />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary-300 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-300 rounded-full"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/50 via-primary-500/50 to-primary-600/50 blur-2xl scale-110 -z-10"></div>
            </div>

            {/* Floating Frame Icons */}
            {floatingPositions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute w-12 h-12 bg-white/60 backdrop-blur-md rounded-lg border border-primary-200 flex items-center justify-center shadow-lg"
                style={pos}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + pos.delay,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Eye className="w-6 h-6 text-primary-600" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center p-1"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-primary-600 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
