'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, Sun, Contact, Sparkles } from 'lucide-react'
import Link from 'next/link'

// Optimization: Move static data outside component
const categories = [
  {
    id: 'eyeglasses',
    title: 'Eyeglasses',
    description: 'Classic and contemporary frames for everyday wear and professional settings.',
    icon: Eye,
    gradient: 'from-primary-500 to-primary-700',
    href: '#eyeglasses',
    features: ['Prescription Lenses', 'Anti-Glare Coating', 'Blue Light Filter']
  },
  {
    id: 'sunglasses',
    title: 'Sunglasses',
    description: 'Premium UV protection with designer styles for every season and activity.',
    icon: Sun,
    gradient: 'from-primary-600 to-primary-800',
    href: '#sunglasses',
    features: ['100% UV Protection', 'Polarized Options', 'Designer Brands']
  },
  {
    id: 'contacts',
    title: 'Contact Lenses',
    description: 'Daily, weekly, and monthly contacts from trusted brands with clear vision guarantee.',
    icon: Contact,
    gradient: 'from-primary-400 to-primary-600',
    href: '#contacts',
    features: ['Daily Disposables', 'Color Options', 'Comfort Technology']
  }
]

const Categories = () => {
  return (
    <section id="categories" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Elements - optimized opacity and blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute inset-0 bg-slate-900/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-500/10 text-primary-400 px-6 py-2 rounded-full text-sm font-mono font-semibold mb-6 border border-primary-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            Explore Our Collections
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Shop by <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Category</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                className="group relative h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="relative h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-all duration-300 overflow-hidden group-hover:border-primary-500/30 flex flex-col"
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Top Section */}
                  <div className="relative z-10 flex-grow">
                    {/* Icon */}
                    <div className="mb-8">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg relative group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                        {/* Icon Glow */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} blur-xl opacity-40 scale-110 -z-10`} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-8 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="relative z-10 mt-auto">
                    <Link
                      href={category.href}
                      className="inline-flex items-center gap-2 text-primary-400 hover:text-white font-semibold group/link transition-colors duration-300"
                    >
                      Explore Collection
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors duration-500 pointer-events-none" />
                  
                  {/* Bottom Border Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-primary-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
