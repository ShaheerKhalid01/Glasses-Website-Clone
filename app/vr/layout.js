'use client';

import { useEffect, useState } from 'react';

export default function VRLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}