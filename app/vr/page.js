'use client';

import VrComponents from './VrComponents';
import { useEffect, useState } from 'react';

export default function VRPage() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render if we're actually on the VR route
    if (typeof window !== 'undefined' && window.location.pathname === '/vr') {
      console.log('✅ VR Page: Authorized to render - user is on /vr route');
      setShouldRender(true);
    } else {
      console.log('🚫 VR Page: Not rendering - user is not on /vr route');
    }

    // Listen for route changes to stop rendering if user navigates away
    const handleRouteChange = () => {
      if (window.location.pathname !== '/vr') {
        console.log('🔄 VR Page: Route changed, stopping VR component');
        setShouldRender(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      setShouldRender(false);
    };
  }, []);

  if (!shouldRender) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Loading VR Experience...</h2>
          <p className="text-gray-400">Preparing camera access...</p>
        </div>
      </div>
    );
  }

  return <VrComponents />;
}