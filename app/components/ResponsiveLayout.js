'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function ResponsiveLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isMobile={isMobile} 
        isMenuOpen={isMenuOpen} 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer isMobile={isMobile} />
    </div>
  );
}