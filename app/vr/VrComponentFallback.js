'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// React-only VR fallback (no A-Frame conflicts)
export default function VrComponentFallback({ product, onLoaded, onError }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple timer to simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log('Fallback VR loaded');
      if (onLoaded) onLoaded();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  const frameColor = product?.gradient?.includes('yellow') ? '#FFD700' : 
                   product?.gradient?.includes('purple') ? '#8B5CF6' :
                   product?.gradient?.includes('blue') ? '#60A5FA' :
                   product?.gradient?.includes('rose') ? '#FB7185' :
                   product?.gradient?.includes('red') ? '#F87171' : '#C0C0C0';

  const lensColor = product?.gradient?.includes('yellow') ? '#FCD34D' :
                  product?.gradient?.includes('purple') ? '#EC4899' :
                  product?.gradient?.includes('blue') ? '#06B6D4' :
                  product?.gradient?.includes('rose') ? '#F472B6' :
                  product?.gradient?.includes('red') ? '#FB923C' : '#4A9EFF';

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-700 transform rotate-45 scale-150"></div>
      </div>

      {/* Animated glasses display */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Virtual Glasses SVG */}
        <motion.div
          className="mx-auto mb-8"
          animate={{ rotateY: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="300"
            height="150"
            viewBox="0 0 300 150"
            className="drop-shadow-2xl"
          >
            {/* Left lens frame */}
            <circle
              cx="75"
              cy="75"
              r="45"
              fill="none"
              stroke={frameColor}
              strokeWidth="6"
              className="filter drop-shadow-lg"
            />
            
            {/* Right lens frame */}
            <circle
              cx="225"
              cy="75"
              r="45"
              fill="none"
              stroke={frameColor}
              strokeWidth="6"
              className="filter drop-shadow-lg"
            />
            
            {/* Bridge */}
            <line
              x1="120"
              y1="75"
              x2="180"
              y2="75"
              stroke={frameColor}
              strokeWidth="4"
            />
            
            {/* Left lens */}
            <circle
              cx="75"
              cy="75"
              r="40"
              fill={lensColor}
              opacity="0.3"
              className="filter drop-shadow-sm"
            />
            
            {/* Right lens */}
            <circle
              cx="225"
              cy="75"
              r="40"
              fill={lensColor}
              opacity="0.3"
              className="filter drop-shadow-sm"
            />
            
            {/* Left temple */}
            <line
              x1="30"
              y1="75"
              x2="5"
              y2="85"
              stroke={frameColor}
              strokeWidth="4"
            />
            
            {/* Right temple */}
            <line
              x1="270"
              y1="75"
              x2="295"
              y2="85"
              stroke={frameColor}
              strokeWidth="4"
            />

            {/* Sparkle effects */}
            <motion.g
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="60" cy="60" r="2" fill="white" />
              <circle cx="240" cy="60" r="2" fill="white" />
              <circle cx="150" cy="50" r="1.5" fill="white" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {product ? (
            <>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-primary-400 text-2xl font-semibold mb-4">${product.price}</p>
              <div className="space-y-1 mb-6">
                {product.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-gray-300 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    ✓ {feature}
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2">VR Preview Mode</h2>
              <p className="text-gray-400 mb-6">Interactive glasses preview</p>
            </>
          )}
        </motion.div>

        {/* Interactive elements */}
        <motion.div
          className="flex justify-center space-x-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
          >
            Back to Products
          </motion.button>
          
          <motion.button
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (frameColor !== '#C0C0C0') {
                // Simulate color change
                window.location.reload();
              }
            }}
          >
            Change Color
          </motion.button>
        </motion.div>

        {/* Tech info */}
        <motion.div
          className="mt-12 text-xs text-gray-500 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="mb-2">
            🚀 This is a fallback preview mode. For full AR experience with face tracking, 
            enable camera access and try the advanced VR mode.
          </p>
          <p>
            Frame: <span style={{color: frameColor}}>●</span> {frameColor} • 
            Lens: <span style={{color: lensColor}}>●</span> {lensColor}
          </p>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}