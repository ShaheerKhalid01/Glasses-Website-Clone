'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, Eye, ChevronDown, User, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const handleVirtualTryOn = () => {
    router.push('/vr')
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-dark-950 text-cream-50 text-center py-2 px-4 text-sm font-mono">
        <div className="container-custom">
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
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-white/20' 
            : 'bg-white/10 backdrop-blur-md border border-white/20'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center space-x-2 font-serif text-xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-6 h-6 text-primary-600" />
              <span>VisionCraft</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <motion.button
                      className="flex items-center space-x-1 text-dark-800 hover:text-primary-600 font-medium transition-colors duration-300 text-sm"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </motion.button>
                  ) : (
                    <motion.a
                      href={item.href}
                      onClick={item.name === 'Virtual Try-On' ? handleVirtualTryOn : undefined}
                      className="relative text-dark-800 hover:text-primary-600 font-medium transition-colors duration-300 group text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </motion.a>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === index && (
                      <motion.div
                        className="absolute top-full left-0 w-screen max-w-3xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl mt-2 p-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActiveDropdown(index)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {item.submenu.map((category, catIndex) => (
                            <div key={catIndex}>
                              <h3 className="font-semibold text-dark-900 mb-3 text-xs uppercase tracking-wide">
                                {category.category}
                              </h3>
                              <ul className="space-y-1">
                                {category.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a
                                      href={subItem.href}
                                      className="text-dark-600 hover:text-primary-600 transition-colors duration-200 text-xs block py-1"
                                    >
                                      {subItem.name}
                                    </a>
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
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="p-2 text-dark-800 hover:text-primary-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-2 text-dark-800 hover:text-primary-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-2 text-dark-800 hover:text-primary-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="relative p-2 text-dark-800 hover:text-primary-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 text-dark-800 hover:text-primary-600 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-6">
                {navItems.map((item, index) => (
                  <div key={item.name} className="border-b border-gray-200 last:border-b-0">
                    {item.submenu ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full py-4 text-dark-800 hover:text-primary-600 font-medium transition-colors duration-300"
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
                              className="pb-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.submenu.map((category, catIndex) => (
                                <div key={catIndex} className="mb-4">
                                  <h4 className="font-semibold text-dark-700 mb-2 text-sm uppercase tracking-wide">
                                    {category.category}
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {category.items.map((subItem, subIndex) => (
                                      <a
                                        key={subIndex}
                                        href={subItem.href}
                                        className="text-dark-600 hover:text-primary-600 transition-colors duration-200 text-sm py-1"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
  href={item.href}
  onClick={(e) => {
    if (item.name === 'Virtual Try-On') {
      e.preventDefault();
      handleVirtualTryOn();
    }
    setIsMobileMenuOpen(false);
  }}
  className="block py-4 text-dark-800 hover:text-primary-600 font-medium transition-colors duration-300"
>
  {item.name}
</a>
                    )}
                  </div>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-6 space-y-3">
                  <button className="w-full btn-primary">Sign In</button>
                  <button className="w-full btn-secondary">Create Account</button>
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