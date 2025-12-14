'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Eye, ChevronDown, User, Heart } from 'lucide-react'
import Link from 'next/link'

// Optimization: Static data moved outside to prevent recreation on re-renders
const navItems = [
  {
    name: 'Eyeglasses',
    href: '#eyeglasses',
    submenu: [
      {
        category: 'By Style',
        items: [
          { name: 'Rectangle', href: '#rectangle' },
          { name: 'Round', href: '#round' },
          { name: 'Cat Eye', href: '#cat-eye' },
          { name: 'Aviator', href: '#aviator' },
          { name: 'Square', href: '#square' },
          { name: 'Wayfarer', href: '#wayfarer' }
        ]
      },
      {
        category: 'By Material',
        items: [
          { name: 'Metal Frames', href: '#metal' },
          { name: 'Acetate', href: '#acetate' },
          { name: 'Titanium', href: '#titanium' },
          { name: 'TR-90', href: '#tr90' },
          { name: 'Wood', href: '#wood' }
        ]
      },
      {
        category: 'By Brand',
        items: [
          { name: 'Ray-Ban', href: '#rayban' },
          { name: 'Oakley', href: '#oakley' },
          { name: 'Tom Ford', href: '#tomford' },
          { name: 'Gucci', href: '#gucci' },
          { name: 'Prada', href: '#prada' }
        ]
      }
    ]
  },
  {
    name: 'Sunglasses',
    href: '#sunglasses',
    submenu: [
      {
        category: 'By Style',
        items: [
          { name: 'Aviator', href: '#aviator-sun' },
          { name: 'Wayfarer', href: '#wayfarer-sun' },
          { name: 'Cat Eye', href: '#cat-eye-sun' },
          { name: 'Round', href: '#round-sun' },
          { name: 'Sport', href: '#sport' },
          { name: 'Oversized', href: '#oversized' }
        ]
      },
      {
        category: 'By Protection',
        items: [
          { name: 'Polarized', href: '#polarized' },
          { name: 'UV400', href: '#uv400' },
          { name: 'Photochromic', href: '#photochromic' },
          { name: 'Blue Light', href: '#blue-light' }
        ]
      },
      {
        category: 'By Activity',
        items: [
          { name: 'Driving', href: '#driving' },
          { name: 'Sports', href: '#sports' },
          { name: 'Beach', href: '#beach' },
          { name: 'Everyday', href: '#everyday' }
        ]
      }
    ]
  },
  {
    name: 'Lenses',
    href: '#lenses',
    submenu: [
      {
        category: 'Lens Types',
        items: [
          { name: 'Single Vision', href: '#single-vision' },
          { name: 'Bifocal', href: '#bifocal' },
          { name: 'Progressive', href: '#progressive' },
          { name: 'Reading', href: '#reading' }
        ]
      },
      {
        category: 'Coatings',
        items: [
          { name: 'Anti-Glare', href: '#anti-glare' },
          { name: 'Scratch Resistant', href: '#scratch' },
          { name: 'Blue Light Filter', href: '#blue-filter' },
          { name: 'UV Protection', href: '#uv' }
        ]
      }
    ]
  },
  {
    name: 'Contact Lenses',
    href: '#contacts',
    submenu: [
      {
        category: 'By Duration',
        items: [
          { name: 'Daily', href: '#daily' },
          { name: 'Weekly', href: '#weekly' },
          { name: 'Monthly', href: '#monthly' },
          { name: 'Yearly', href: '#yearly' }
        ]
      },
      {
        category: 'By Type',
        items: [
          { name: 'Soft Lenses', href: '#soft' },
          { name: 'Hard Lenses', href: '#hard' },
          { name: 'Toric', href: '#toric' },
          { name: 'Multifocal', href: '#multifocal' }
        ]
      }
    ]
  },
  { name: 'Virtual Try-On', href: '/vr' },
  { name: 'About', href: '#about' }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [cartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Optimization: Simple boolean check is sufficient, but requestAnimationFrame could be used for heavy scroll logic
      setIsScrolled(window.scrollY > 50)
    }

    // Optimization: Passive listener for better scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-50 text-center py-2 px-4 text-sm font-mono">
        <div className="container mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Free shipping on orders over $100 | 30-day return policy | Expert fitting available
          </motion.p>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-white/10 backdrop-blur-md border-b border-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary-600"
              >
                <Eye className="w-8 h-8 text-primary-600" />
              </motion.div>
              <span className="font-serif text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                VisionCraft
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="h-full py-4" // Expand hit area
                    >
                      <button
                        className="flex items-center space-x-1 text-slate-800 hover:text-primary-600 font-medium transition-colors duration-300 text-sm"
                        aria-expanded={activeDropdown === index}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            className="absolute top-full left-0 w-[600px] -ml-20 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-6 z-50"
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="grid grid-cols-3 gap-6">
                              {item.submenu.map((category, catIndex) => (
                                <div key={catIndex}>
                                  <h3 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wide border-b border-slate-100 pb-2">
                                    {category.category}
                                  </h3>
                                  <ul className="space-y-2">
                                    {category.items.map((subItem, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={subItem.href}
                                          className="text-slate-600 hover:text-primary-600 transition-colors duration-200 text-xs block hover:translate-x-1 transform"
                                        >
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative text-slate-800 hover:text-primary-600 font-medium transition-colors duration-300 group text-sm py-2"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <motion.button whileHover={{ scale: 1.1 }} className="text-slate-800 hover:text-primary-600">
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} className="text-slate-800 hover:text-primary-600 hidden sm:block">
                <Heart className="w-5 h-5" />
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} className="text-slate-800 hover:text-primary-600 hidden sm:block">
                <User className="w-5 h-5" />
              </motion.button>

              <motion.button whileHover={{ scale: 1.1 }} className="relative text-slate-800 hover:text-primary-600">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden text-slate-800 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-100 absolute w-full max-h-[80vh] overflow-y-auto shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6">
                {navItems.map((item, index) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                    {item.submenu ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full py-4 text-slate-800 hover:text-primary-600 font-medium transition-colors"
                          onClick={() => handleDropdown(index)}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              className="pb-4 pl-4 bg-slate-50 rounded-lg mb-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.submenu.map((category, catIndex) => (
                                <div key={catIndex} className="mb-4 pt-4 last:mb-0">
                                  <h4 className="font-semibold text-slate-700 mb-2 text-xs uppercase tracking-wide">
                                    {category.category}
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {category.items.map((subItem, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        href={subItem.href}
                                        className="text-slate-500 hover:text-primary-600 text-sm py-1"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 text-slate-800 hover:text-primary-600 font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-6 space-y-3 pb-6">
                  <button className="w-full bg-slate-100 text-slate-800 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors">Sign In</button>
                  <button className="w-full bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-blue-200">Create Account</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Header
