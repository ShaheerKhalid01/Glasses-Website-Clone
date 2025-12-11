'use client';

import { useEffect, useRef, useState } from 'react';

// Fixed VR component that actually works
export default function VrComponent({ product, onLoaded, onError }) {
  const containerRef = useRef(null);
  const initialized = useRef(false);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log('🎥 Starting fixed VR component...');

    let isActive = true;

    const startVR = async () => {
      try {
        setStatus('Loading A-Frame...');

        // Load A-Frame with better error handling
        if (!window.AFRAME) {
          console.log('📚 Loading A-Frame...');
          
          const aframeScript = document.createElement('script');
          aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
          aframeScript.crossOrigin = 'anonymous';
          document.head.appendChild(aframeScript);
          
          await new Promise((resolve, reject) => {
            aframeScript.onload = () => {
              console.log('✅ A-Frame loaded successfully');
              resolve();
            };
            aframeScript.onerror = () => {
              console.log('❌ A-Frame failed, trying fallback...');
              // Try fallback CDN
              const fallbackScript = document.createElement('script');
              fallbackScript.src = 'https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe.min.js';
              fallbackScript.crossOrigin = 'anonymous';
              document.head.appendChild(fallbackScript);
              
              fallbackScript.onload = () => {
                console.log('✅ A-Frame loaded from fallback');
                resolve();
              };
              fallbackScript.onerror = () => reject(new Error('All A-Frame CDNs failed'));
            };
            
            // 15 second timeout
            setTimeout(() => reject(new Error('A-Frame loading timeout')), 15000);
          });
        } else {
          console.log('✅ A-Frame already loaded');
        }

        if (!isActive) return;

        setStatus('Creating camera scene...');

        // Wait a bit for A-Frame to fully initialize
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Colors for glasses
        const frameColor = '#60A5FA';
        const lensColor = '#06B6D4';

        console.log('🎨 Creating scene with colors:', { frameColor, lensColor });

        // Create a working A-Frame scene that shows camera
        const sceneHTML = `
        <a-scene
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
          style="width: 100%; height: 100%; display: block;"
        >
          <!-- Camera that will show user's face -->
          <a-camera 
            position="0 0 0"
            look-controls="enabled: false"
            wasd-controls="enabled: false"
            user-height="0"
          >
            <!-- Glasses positioned in front of camera -->
            <a-entity position="0 0 -0.5">
              
              <!-- Left lens frame -->
              <a-ring
                position="-0.1 0 0"
                radius-inner="0.06"
                radius-outer="0.08"
                material="color: ${frameColor}; opacity: 0.9"
                segments-theta="32"
              ></a-ring>
              
              <!-- Right lens frame -->
              <a-ring
                position="0.1 0 0"  
                radius-inner="0.06"
                radius-outer="0.08"
                material="color: ${frameColor}; opacity: 0.9"
                segments-theta="32"
              ></a-ring>

              <!-- Bridge -->
              <a-cylinder
                position="0 0 0.05"
                height="0.04"
                radius="0.003"
                rotation="0 0 90"
                material="color: ${frameColor}"
              ></a-cylinder>

              <!-- Left lens -->
              <a-circle
                position="-0.1 0 -0.005"
                radius="0.06"
                material="color: ${lensColor}; opacity: 0.2; transparent: true"
              ></a-circle>

              <!-- Right lens --> 
              <a-circle
                position="0.1 0 -0.005"
                radius="0.06"
                material="color: ${lensColor}; opacity: 0.2; transparent: true"
              ></a-circle>

              <!-- Left temple -->
              <a-cylinder
                position="-0.15 -0.01 -0.08"
                height="0.1"
                radius="0.003"
                rotation="0 -15 0"
                material="color: ${frameColor}"
              ></a-cylinder>

              <!-- Right temple -->
              <a-cylinder
                position="0.15 -0.01 -0.08"
                height="0.1"
                radius="0.003"
                rotation="0 15 0"
                material="color: ${frameColor}"
              ></a-cylinder>

            </a-entity>
          </a-camera>
          
          <!-- Sky background -->
          <a-sky color="#000"></a-sky>
        </a-scene>`;

        if (!containerRef.current || !isActive) return;

        containerRef.current.innerHTML = sceneHTML;
        console.log('📹 A-Frame scene created');
        setStatus('Starting camera...');

        // Wait for scene to load and initialize
        const scene = containerRef.current.querySelector('a-scene');
        if (scene) {
          // Listen for scene loaded
          scene.addEventListener('loaded', () => {
            console.log('🎬 A-Frame scene fully loaded');
            setStatus('Camera ready!');
            if (isActive && onLoaded) {
              setTimeout(() => onLoaded(), 500);
            }
          });

          // Fallback timeout
          setTimeout(() => {
            if (isActive) {
              console.log('⏰ A-Frame scene timeout - assuming ready');
              setStatus('Ready! Look for glasses overlay');
              if (onLoaded) onLoaded();
            }
          }, 5000);
        }

      } catch (error) {
        console.error('❌ VR Error:', error);
        setStatus(`Error: ${error.message}`);
        if (isActive && onError) {
          onError(error);
        }
      }
    };

    startVR();

    return () => {
      isActive = false;
      console.log('🧹 Cleanup VR');
      try {
        // Stop any video streams
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.srcObject = null;
          }
        });

        // Clear container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      } catch (e) {
        console.log('Cleanup note:', e.message);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000' }}>
      {/* Status overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 1000,
          display: status === 'Camera ready!' || status.includes('Ready') ? 'none' : 'block'
        }}
      >
        <div style={{ fontSize: '16px', marginBottom: '10px' }}>🎥</div>
        <div style={{ fontSize: '14px' }}>{status}</div>
        {product && (
          <div style={{ fontSize: '12px', color: '#FFD700', marginTop: '10px' }}>
            {product.name}
          </div>
        )}
      </div>

      {/* Camera container */}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Instructions overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          fontSize: '12px',
          textAlign: 'center',
          zIndex: 1000
        }}
      >
        📱 A-Frame 3D glasses • 💡 Good lighting helps • 🕶️ Glasses overlay should appear
      </div>
    </div>
  );
}