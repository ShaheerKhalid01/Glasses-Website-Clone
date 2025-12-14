'use client'

import { motion } from 'framer-motion'
import { Award, Truck, RotateCcw, Users, Shield, Sparkles } from 'lucide-react'

// Optimization: Move static data outside component
const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handcrafted frames with premium materials and exceptional attention to detail.',
    gradient: 'from-primary-400 to-primary-600'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary shipping on all orders with tracking and insurance included.',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns and exchanges with no questions asked.',
    gradient: 'from-green-400 to-green-600'
  },
  {
    icon: Users,
    title: 'Expert Service',
    description: 'Professional optical consultations and personalized fitting services.',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'Comprehensive protection against manufacturing defects and wear.',
    gradient: 'from-red-400 to-red-600'
  },
  {
    icon: Sparkles,
    title: 'Virtual Try-On',
    description: 'Advanced AR technology to try frames virtually before you buy.',
    gradient: 'from-pink-400 to-pink-600'
  }
]

const trustStats = [
  { value: '50K+', label: 'Satisfied Customers' },
  { value: '99.8%', label: 'Quality Rating' },
  { value: '24/7', label: 'Customer Support' },
  { value: '5★', label: 'Average Review' }
]

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">VisionCraft</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the perfect blend of style, comfort, and quality with our premium eyewear collection.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <motion.div
                  className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50 scale-110 -z-10 group-hover:opacity-75 transition-opacity duration-300`} />
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="relative text-xl font-serif font-bold text-slate-900 mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                
                <p className="relative text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {trustStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-mono font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
