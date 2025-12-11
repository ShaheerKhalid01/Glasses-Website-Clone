'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera } from 'lucide-react';

export default function VrComponents() {
  const router = useRouter();
  const sceneRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptsLoaded, setScriptsLoaded] = useState({ aframe: false, mindar: false });
  
  useEffect(() => {
    // Only initialize if we're actually on the VR page
    if (typeof window === 'undefined' || window.location.pathname !== '/vr') {
      console.log('🚫 Not on VR page, skipping camera initialization');
      return;
    }

    let isMounted = true;
    
    const initializeAR = async () => {
      if (!isMounted) return;
      await loadScriptsAndInitialize();
    };
    
    initializeAR();
    
    // Immediate cleanup function that runs before component unmounts
    return () => {
      console.log('🚨 Component unmounting - IMMEDIATE camera stop!');
      isMounted = false;
      
      // Force stop everything immediately
      forceStopEverything();
    };
  }, []);

  const forceStopEverything = () => {
    try {
      console.log('🛑 FORCE STOPPING everything...');
      
      // 1. Stop all video streams IMMEDIATELY
      const videos = document.querySelectorAll('video');
      videos.forEach((video, index) => {
        console.log(`📹 Force stopping video ${index}...`);
        
        if (video.srcObject) {
          const tracks = video.srcObject.getTracks();
          tracks.forEach((track, trackIndex) => {
            console.log(`🔴 Stopping track ${trackIndex}: ${track.kind} - ${track.readyState}`);
            track.stop();
            track.enabled = false;
          });
          video.srcObject = null;
        }
        
        // Force video element cleanup
        video.pause();
        video.removeAttribute('src');
        video.currentTime = 0;
        video.load();
        
        // Remove video element entirely
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });

      // 2. Stop MindAR immediately
      const scenes = document.querySelectorAll('a-scene');
      scenes.forEach(scene => {
        if (scene.systems && scene.systems['mindar-face-system']) {
          const mindAR = scene.systems['mindar-face-system'];
          console.log('🧠 Force stopping MindAR...');
          
          if (mindAR.stop) mindAR.stop();
          if (mindAR.destroy) mindAR.destroy();
          if (mindAR.el) mindAR.el.removeAttribute('mindar-face');
        }
        
        // Remove scene immediately
        if (scene.parentNode) {
          scene.parentNode.removeChild(scene);
        }
      });

      // 3. Clear scene container
      if (sceneRef.current) {
        sceneRef.current.innerHTML = '';
      }

      // 4. Global MediaStream cleanup
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            stream.getTracks().forEach(track => {
              console.log('🔴 Global track stop:', track.kind);
              track.stop();
              track.enabled = false;
            });
          })
          .catch(() => {}); // Ignore errors
      }

      console.log('✅ FORCE STOP completed');
      
    } catch (error) {
      console.error('❌ Force stop error:', error);
    }
  };

  const stopAllCameraStreams = () => {
    try {
      // Stop all video elements
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        console.log('📹 Stopping video stream...');
        if (video.srcObject) {
          const tracks = video.srcObject.getTracks();
          tracks.forEach(track => {
            console.log(`🔴 Stopping track: ${track.kind}`);
            track.stop();
          });
          video.srcObject = null;
        }
        // Pause and clear video
        video.pause();
        video.removeAttribute('src');
        video.load();
      });

      // Stop all MediaStream tracks globally
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => {}); // Ignore errors

      console.log('✅ All camera streams stopped');
    } catch (error) {
      console.warn('⚠️ Error stopping camera streams:', error);
    }
  };

  const cleanupMindAR = () => {
    try {
      const scene = document.querySelector('a-scene');
      if (scene && scene.systems && scene.systems['mindar-face-system']) {
        console.log('🧠 Stopping MindAR system...');
        const mindARSystem = scene.systems['mindar-face-system'];
        if (mindARSystem.stop) {
          mindARSystem.stop();
        }
        if (mindARSystem.destroy) {
          mindARSystem.destroy();
        }
      }
    } catch (error) {
      console.warn('⚠️ Error cleaning up MindAR:', error);
    }
  };

  const removeAllScenes = () => {
    try {
      const scenes = document.querySelectorAll('a-scene');
      scenes.forEach(scene => {
        console.log('🗑️ Removing A-Frame scene...');
        if (scene.parentNode) {
          scene.parentNode.removeChild(scene);
        }
      });
    } catch (error) {
      console.warn('⚠️ Error removing scenes:', error);
    }
  };

  const loadScriptsAndInitialize = async () => {
    try {
      // Double check we're on the right page
      if (typeof window !== 'undefined' && window.location.pathname !== '/vr') {
        console.log('🚫 Path check failed, aborting camera initialization');
        return;
      }

      console.log('🚀 Loading A-Frame and MindAR...');
      
      // Add global cleanup listeners
      const handlePageUnload = () => {
        console.log('📤 Page unloading - FORCE STOPPING camera...');
        forceStopEverything();
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          console.log('👁️ Page hidden - FORCE STOPPING camera...');
          forceStopEverything();
        }
      };

      const handleRouteChange = () => {
        console.log('🔄 Route changing - FORCE STOPPING camera...');
        forceStopEverything();
      };

      // Listen for page unload and visibility changes
      window.addEventListener('beforeunload', handlePageUnload);
      window.addEventListener('pagehide', handlePageUnload);
      window.addEventListener('blur', handlePageUnload); // Window loses focus
      window.addEventListener('popstate', handleRouteChange); // Browser back/forward
      window.addEventListener('focus', () => {
        // Check if we're still on VR page when returning focus
        if (window.location.pathname !== '/vr') {
          console.log('👁️ Focus returned but not on VR page - stopping camera');
          forceStopEverything();
        }
      });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Store cleanup function for later removal
      window.vrComponentsCleanup = () => {
        window.removeEventListener('beforeunload', handlePageUnload);
        window.removeEventListener('pagehide', handlePageUnload);
        window.removeEventListener('blur', handlePageUnload);
        window.removeEventListener('popstate', handleRouteChange);
        window.removeEventListener('focus', () => {});
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        forceStopEverything();
      };
      
      // Load A-Frame first and wait for it to be fully ready
      await loadScript('https://aframe.io/releases/1.4.2/aframe.min.js', 'aframe');
      
      // Wait for AFRAME to be available globally
      await waitForAFrame();
      setScriptsLoaded(prev => ({ ...prev, aframe: true }));
      
      // Load MindAR Face after A-Frame is ready
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-face-aframe.prod.js', 'mindar');
      setScriptsLoaded(prev => ({ ...prev, mindar: true }));
      
      // Wait longer for proper initialization
      setTimeout(() => {
        // Final check before creating scene
        if (window.location.pathname !== '/vr') {
          console.log('🚫 Final path check failed, not creating AR scene');
          return;
        }
        
        if (!document.querySelector('a-scene')) {
          createAdvancedARScene();
        }
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Failed to load scripts:', error);
      setIsLoading(false);
    }
  };

  const waitForAFrame = () => {
    return new Promise((resolve) => {
      const checkAFrame = () => {
        if (window.AFRAME && window.AFRAME.registerComponent) {
          console.log('✅ A-Frame is ready');
          resolve();
        } else {
          setTimeout(checkAFrame, 100);
        }
      };
      checkAFrame();
    });
  };

  const loadScript = (src, name) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        console.log(`✅ ${name} already loaded`);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log(`✅ ${name} loaded successfully`);
        resolve();
      };
      
      script.onerror = () => {
        console.error(`❌ Failed to load ${name}`);
        reject(new Error(`Failed to load ${name}`));
      };
      
      document.head.appendChild(script);
    });
  };

  const createAdvancedARScene = () => {
    if (!sceneRef.current || !window.AFRAME) {
      console.error('A-Frame or scene ref not available');
      return;
    }

    // Check if scene already exists
    if (document.querySelector('a-scene') || sceneRef.current.querySelector('a-scene')) {
      console.log('AR scene already exists, skipping creation');
      return;
    }

    console.log('🎯 Creating advanced AR scene with sophisticated glasses...');

    sceneRef.current.innerHTML = `
      <a-scene 
        mindar-face="autoStart: false; filterMinCF: 0.001; filterBeta: 1000"
        embedded
        color-space="sRGB" 
        renderer="colorManagement: true; physicallyCorrectLights: true; alpha: true; antialias: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"
        background="color: transparent; transparent: true"
      >
        <!-- Professional lighting setup -->
        <a-light type="ambient" color="#404040" intensity="0.6"></a-light>
        <a-light type="directional" position="1 1 1" color="#ffffff" intensity="0.8" shadow="cast: true"></a-light>
        <a-light type="point" position="0 2 0" color="#ffffff" intensity="0.3"></a-light>
        
        <!-- Sophisticated Glasses Design -->
        <a-entity mindar-face-target="anchorIndex: 151">
          <a-entity id="glasses-group" position="0 -0.3 0.15" scale="0.9 0.9 0.9">
            
            <!-- Left Lens Frame - Torus Design -->
            <a-torus
              position="-0.22 0 0"
              radius="0.14"
              radius-tubular="0.010"
              rotation="0 0 0"
              material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              segments-tubular="32"
              segments-radial="16"
              shadow="cast: true; receive: true"
            ></a-torus>
            
            <!-- Right Lens Frame -->
            <a-torus
              position="0.22 0 0"
              radius="0.14"
              radius-tubular="0.010"
              rotation="0 0 0"
              material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              segments-tubular="32"
              segments-radial="16"
              shadow="cast: true; receive: true"
            ></a-torus>
            
            <!-- Bridge Connection -->
            <a-cylinder
              position="0 0 0.14"
              height="0.12"
              radius="0.006"
              rotation="0 0 90"
              material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              shadow="cast: true"
            ></a-cylinder>
            
            <!-- Left Lens -->
            <a-circle
              position="-0.22 0 0.001"
              radius="0.135"
              material="color: #4A9EFF; opacity: 0.3; transparent: true; metalness: 0.5; roughness: 0.1; side: double"
              shadow="receive: true"
            ></a-circle>
            
            <!-- Right Lens -->
            <a-circle
              position="0.22 0 0.001"
              radius="0.135"
              material="color: #4A9EFF; opacity: 0.3; transparent: true; metalness: 0.5; roughness: 0.1; side: double"
              shadow="receive: true"
            ></a-circle>
            
            <!-- Left Temple Arm -->
            <a-box
              position="-0.33 0 -0.10"
              width="0.14"
              height="0.008"
              depth="0.008"
              material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              shadow="cast: true"
            ></a-box>
            
            <!-- Right Temple Arm -->
            <a-box
              position="0.33 0 -0.10"
              width="0.14"
              height="0.008"
              depth="0.008"
              material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              shadow="cast: true"
            ></a-box>
            
            <!-- Nose Pads -->
            <a-sphere
              position="-0.08 -0.08 0.12"
              radius="0.008"
              material="color: #E0E0E0; metalness: 0.3; roughness: 0.7; opacity: 0.9; transparent: true"
              shadow="cast: true"
            ></a-sphere>
            
            <a-sphere
              position="0.08 -0.08 0.12"
              radius="0.008"
              material="color: #E0E0E0; metalness: 0.3; roughness: 0.7; opacity: 0.9; transparent: true"
              shadow="cast: true"
            ></a-sphere>
            
            <!-- Lens Reflections -->
            <a-plane
              position="-0.15 0.05 0.002"
              width="0.06"
              height="0.03"
              rotation="0 0 -20"
              material="color: white; opacity: 0.15; transparent: true"
              animation="property: material.opacity; to: 0.25; dur: 2000; easing: easeInOutSine; loop: true; dir: alternate"
            ></a-plane>
            
            <a-plane
              position="0.15 0.05 0.002"
              width="0.06"
              height="0.03"
              rotation="0 0 20"
              material="color: white; opacity: 0.15; transparent: true"
              animation="property: material.opacity; to: 0.25; dur: 2000; easing: easeInOutSine; loop: true; dir: alternate"
            ></a-plane>
            
          </a-entity>
        </a-entity>
        
        <!-- Camera -->
        <a-camera active="false" position="0 0 0" look-controls="enabled: false" wasd-controls="enabled: false"></a-camera>
      </a-scene>
    `;

    console.log('✅ Advanced AR scene created with sophisticated torus-frame glasses');
    
    // Manually start MindAR after scene is ready (with control)
    setTimeout(() => {
      const scene = document.querySelector('a-scene');
      if (scene && scene.systems && scene.systems['mindar-face-system']) {
        console.log('🚀 Manually starting MindAR...');
        const mindAR = scene.systems['mindar-face-system'];
        if (mindAR.start) {
          mindAR.start();
        }
      }
    }, 500);
  };

  const capturePhoto = () => {
    try {
      console.log('📷 Capturing AR photo...');
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1280;
      canvas.height = 720;

      const video = document.querySelector('video');
      if (video && video.videoWidth > 0) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `ar-glasses-vrcomponents-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png', 0.95);

        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: white; opacity: 0.8; z-index: 1000; pointer-events: none;
          animation: flashFade 0.3s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `@keyframes flashFade { 0% { opacity: 0.8; } 100% { opacity: 0; } }`;
        document.head.appendChild(style);
        document.body.appendChild(flash);
        
        setTimeout(() => {
          if (document.body.contains(flash)) document.body.removeChild(flash);
          if (document.head.contains(style)) document.head.removeChild(style);
        }, 300);
        
        console.log('✅ Photo captured successfully!');
      } else {
        console.warn('⚠️ No video available for capture');
      }
    } catch (error) {
      console.error('❌ Failed to capture photo:', error);
    }
  };

  const cleanup = () => {
    console.log('🛑 Component cleanup triggered...');
    
    // Execute global cleanup if available
    if (window.vrComponentsCleanup) {
      window.vrComponentsCleanup();
      delete window.vrComponentsCleanup;
    }
    
    // Additional cleanup
    stopAllCameraStreams();
    cleanupMindAR();
    removeAllScenes();
    
    console.log('✅ Component cleanup completed');
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* AR Scene Container */}
      <div ref={sceneRef} className="absolute inset-0 z-10" />

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">Loading VrComponents AR Experience</h2>
            <p className="text-lg mb-4">Initializing professional AR glasses...</p>
            
            <div className="space-y-2 text-sm">
              <div className={`flex items-center justify-center space-x-2 ${scriptsLoaded.aframe ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-3 h-3 rounded-full ${scriptsLoaded.aframe ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <span>A-Frame WebGL Engine</span>
                <span>{scriptsLoaded.aframe ? '✅' : '⏳'}</span>
              </div>
              
              <div className={`flex items-center justify-center space-x-2 ${scriptsLoaded.mindar ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-3 h-3 rounded-full ${scriptsLoaded.mindar ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <span>MindAR Face Tracking</span>
                <span>{scriptsLoaded.mindar ? '✅' : '⏳'}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-4">
              Featuring: Torus lens frames • Metallic materials • Professional lighting
            </p>
          </div>
        </div>
      )}

      {/* Professional Controls */}
      {!isLoading && (
        <>
          {/* Top Header Bar - Minimal */}
          <div className="absolute top-0 left-0 right-0 p-4 z-20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  console.log('🔙 Back button clicked - FORCE STOPPING camera...');
                  
                  // Force stop everything immediately
                  forceStopEverything();
                  
                  // Navigate immediately
                  router.push('/');
                }}
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-200"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              
              <button
                onClick={capturePhoto}
                className="p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-200"
              >
                <Camera size={20} className="text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}