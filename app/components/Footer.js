'use client'

import { motion } from 'framer-motion'
import { Eye, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Eyeglasses', href: '#eyeglasses' },
        { name: 'Sunglasses', href: '#sunglasses' },
        { name: 'Contact Lenses', href: '#contacts' },
        { name: 'Accessories', href: '#accessories' },
        { name: 'Gift Cards', href: '#gift-cards' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Virtual Try-On', href: '#virtual-tryon' },
        { name: 'Eye Examination', href: '#eye-exam' },
        { name: 'Prescription Service', href: '#prescription' },
        { name: 'Frame Adjustment', href: '#adjustment' },
        { name: 'Warranty', href: '#warranty' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '#contact' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Size Guide', href: '#size-guide' },
        { name: 'Returns & Exchanges', href: '#returns' },
        { name: 'Shipping Info', href: '#shipping' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Story', href: '#story' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press', href: '#press' },
        { name: 'Sustainability', href: '#sustainability' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  const contactInfo = [
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, text: 'hello@visioncraft.com', href: 'mailto:hello@visioncraft.com' },
    { icon: MapPin, text: '123 Fashion Ave, New York, NY 10001', href: '#' }
  ]

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-10 h-10 text-blue-500" />
                <span className="text-3xl font-serif font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  VisionCraft
                </span>
              </motion.div>

              <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
                Crafting premium eyewear that combines timeless elegance with cutting-edge technology. 
                See the world with clarity and style.
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">{info.text}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-8">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + sectionIndex * 0.1 }}
              >
                <h3 className="text-lg font-serif font-bold text-blue-400 mb-6 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + linkIndex * 0.05 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm block relative group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <motion.div
            className="mt-16 pt-12 border-t border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-3">
                  Stay Updated
                </h3>
                <p className="text-gray-300">
                  Subscribe to our newsletter for exclusive offers, new arrivals, and eyewear insights.
                </p>
              </div>

              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-mono font-semibold text-sm transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                  <Mail className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
                <p>© 2024 VisionCraft. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <a href="#privacy" className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#terms" className="hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                  <a href="#cookies" className="hover:text-white transition-colors duration-300">
                    Cookie Policy
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Designed with precision and care</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer