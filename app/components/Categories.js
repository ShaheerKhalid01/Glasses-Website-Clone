'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, Sun, ContactIcon, Sparkles } from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      id: 'eyeglasses',
      title: 'Eyeglasses',
      description: 'Classic and contemporary frames for everyday wear and professional settings.',
      icon: Eye,
      gradient: 'from-blue-500 to-blue-700',
      href: '#eyeglasses',
      features: ['Prescription Lenses', 'Anti-Glare Coating', 'Blue Light Filter']
    },
    {
      id: 'sunglasses',
      title: 'Sunglasses',
      description: 'Premium UV protection with designer styles for every season and activity.',
      icon: Sun,
      gradient: 'from-blue-600 to-blue-800',
      href: '#sunglasses',
      features: ['100% UV Protection', 'Polarized Options', 'Designer Brands']
    },
    {
      id: 'contacts',
      title: 'Contact Lenses',
      description: 'Daily, weekly, and monthly contacts from trusted brands with clear vision guarantee.',
      icon: ContactIcon,
      gradient: 'from-blue-400 to-blue-600',
      href: '#contacts',
      features: ['Daily Disposables', 'Color Options', 'Comfort Technology']
    }
  ]

  return (
    <section id="categories" className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="pattern-bg absolute inset-0 opacity-20"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-mono font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4" />
            Explore Our Collections
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shop by <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Category</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our carefully curated collections designed for every style, occasion, and vision need.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <motion.div
                  className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden group-hover:border-blue-500/50"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Top Section */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                      {/* Icon Glow */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} blur-xl opacity-50 scale-110 -z-10 group-hover:opacity-75 transition-opacity duration-500`} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {category.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href={category.href}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-white font-semibold group/link transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Explore Collection
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-colors duration-500" />
                  
                  {/* Bottom Border Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full`} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories