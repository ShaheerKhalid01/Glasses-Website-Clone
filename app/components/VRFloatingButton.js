'use client'

import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

const VRFloatingButton = () => {
  const router = useRouter()

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
    >
      <motion.button
        onClick={() => router.push('/vr')}
        className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 10px 30px rgba(14, 165, 233, 0.3)',
            '0 15px 40px rgba(14, 165, 233, 0.5)',
            '0 10px 30px rgba(14, 165, 233, 0.3)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        aria-label="Launch Virtual Try-On"
      >
        <Eye className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip */}
        <div
          className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg"
        >
          Virtual Try-On
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default VRFloatingButton
