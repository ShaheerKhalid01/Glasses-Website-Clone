'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Simple test version of VR component - safer DOM handling
export default function VrComponentSimple({ product, onLoaded, onError }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    let mounted = true;
    
    const initSimpleVR = async () => {
      if (!mounted || isInitialized.current) return;
      
      try {
        // Wait for A-Frame to be available
        if (typeof window !== 'undefined' && !window.AFRAME) {
          await new Promise((resolve) => {
            const checkAFrame = setInterval(() => {
              if (window.AFRAME) {
                clearInterval(checkAFrame);
                resolve();
              }
            }, 100);
            
            // Timeout after 10 seconds
            setTimeout(() => {
              clearInterval(checkAFrame);
              resolve();
            }, 10000);
          });
        }

        if (!mounted) return;

        // Create scene programmatically to avoid React conflicts
        if (containerRef.current && window.AFRAME && !sceneRef.current) {
          // Clear container first
          containerRef.current.innerHTML = '';
          
          // Create A-Frame scene
          const scene = document.createElement('a-scene');
          scene.setAttribute('embedded', '');
          scene.setAttribute('style', 'width: 100%; height: 100%;');
          scene.setAttribute('vr-mode-ui', 'enabled: false');
          
          // Create camera
          const camera = document.createElement('a-camera');
          camera.setAttribute('position', '0 0 0');
          scene.appendChild(camera);
          
          // Create glasses entity
          const glassesEntity = document.createElement('a-entity');
          glassesEntity.setAttribute('position', '0 0 -2');
          
          // Frame colors based on product
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
          
          // Left lens frame
          const leftFrame = document.createElement('a-torus');
          leftFrame.setAttribute('position', '-0.5 0 0');
          leftFrame.setAttribute('radius', '0.3');
          leftFrame.setAttribute('radius-tubular', '0.02');
          leftFrame.setAttribute('material', `color: ${frameColor}`);
          glassesEntity.appendChild(leftFrame);
          
          // Right lens frame
          const rightFrame = document.createElement('a-torus');
          rightFrame.setAttribute('position', '0.5 0 0');
          rightFrame.setAttribute('radius', '0.3');
          rightFrame.setAttribute('radius-tubular', '0.02');
          rightFrame.setAttribute('material', `color: ${frameColor}`);
          glassesEntity.appendChild(rightFrame);
          
          // Left lens
          const leftLens = document.createElement('a-circle');
          leftLens.setAttribute('position', '-0.5 0 0.01');
          leftLens.setAttribute('radius', '0.28');
          leftLens.setAttribute('material', `color: ${lensColor}; opacity: 0.3; transparent: true`);
          glassesEntity.appendChild(leftLens);
          
          // Right lens
          const rightLens = document.createElement('a-circle');
          rightLens.setAttribute('position', '0.5 0 0.01');
          rightLens.setAttribute('radius', '0.28');
          rightLens.setAttribute('material', `color: ${lensColor}; opacity: 0.3; transparent: true`);
          glassesEntity.appendChild(rightLens);
          
          // Product name text
          const nameText = document.createElement('a-text');
          nameText.setAttribute('position', '0 -0.8 0');
          nameText.setAttribute('align', 'center');
          nameText.setAttribute('color', 'white');
          nameText.setAttribute('value', product ? `Trying: ${product.name}` : 'VR Test Mode');
          glassesEntity.appendChild(nameText);
          
          // Price text
          const priceText = document.createElement('a-text');
          priceText.setAttribute('position', '0 -1.1 0');
          priceText.setAttribute('align', 'center');
          priceText.setAttribute('color', '#FFD700');
          priceText.setAttribute('value', product ? `$${product.price}` : 'Test Mode');
          glassesEntity.appendChild(priceText);
          
          scene.appendChild(glassesEntity);
          
          // Add rotation animation
          const animationEl = document.createElement('a-animation');
          animationEl.setAttribute('attribute', 'rotation');
          animationEl.setAttribute('to', '0 360 0');
          animationEl.setAttribute('dur', '10000');
          animationEl.setAttribute('repeat', 'indefinite');
          glassesEntity.appendChild(animationEl);
          
          sceneRef.current = scene;
          containerRef.current.appendChild(scene);
          
          // Wait for scene to initialize
          scene.addEventListener('loaded', () => {
            if (mounted) {
              console.log('Simple VR scene loaded');
              isInitialized.current = true;
              setTimeout(() => {
                if (onLoaded && mounted) {
                  console.log('Calling onLoaded for simple VR');
                  onLoaded();
                }
              }, 1000);
            }
          });
          
          // Fallback timeout
          setTimeout(() => {
            if (mounted && !isInitialized.current) {
              console.log('Simple VR fallback timeout');
              isInitialized.current = true;
              if (onLoaded) onLoaded();
            }
          }, 3000);
        }
        
      } catch (error) {
        console.error('Simple VR initialization error:', error);
        if (mounted && onError) {
          onError(error);
        }
      }
    };

    initSimpleVR();

    // Cleanup function
    return () => {
      mounted = false;
      
      // Safe cleanup
      if (containerRef.current && sceneRef.current) {
        try {
          // Remove event listeners
          sceneRef.current.removeEventListener('loaded', () => {});
          
          // Clear the container
          containerRef.current.innerHTML = '';
          sceneRef.current = null;
        } catch (e) {
          console.log('Cleanup warning (safe to ignore):', e.message);
        }
      }
    };
  }, [product, onLoaded, onError]);

  return (
    <>
      {/* Load A-Frame script */}
      <Script
        src="https://aframe.io/releases/1.4.2/aframe.min.js"
        strategy="afterInteractive"
        onLoad={() => console.log('A-Frame loaded for simple VR')}
        onError={(e) => {
          console.error('A-Frame script error:', e);
          if (onError) onError(new Error('Failed to load A-Frame'));
        }}
      />
      
      {/* Container for programmatically created A-Frame scene */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          position: 'relative'
        }}
      >
        {/* Loading fallback */}
        {!isInitialized.current && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div>Loading Simple VR...</div>
            {product && (
              <div style={{ marginTop: '10px', color: '#FFD700' }}>
                Testing: {product.name}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}