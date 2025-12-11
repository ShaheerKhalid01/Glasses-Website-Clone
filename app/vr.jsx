'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function VRPage() {
  const router = useRouter();
  const [step, setStep] = useState('Starting...');
  const [showAR, setShowAR] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const init = async () => {
      try {
        setStep('Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStep('Camera access granted!');
        stream.getTracks().forEach(t => t.stop());
        
        await new Promise(r => setTimeout(r, 800));

        setStep('Loading AR libraries...');
        const aframe = document.createElement('script');
        aframe.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
        aframe.id = 'aframe';
        document.head.appendChild(aframe);
        
        await new Promise((resolve) => {
          aframe.onload = resolve;
          setTimeout(resolve, 5000);
        });

        if (!window.AFRAME) {
          setStep('ERROR: A-Frame not loaded!');
          return;
        }

        setStep('Loading face tracking...');
        await new Promise(r => setTimeout(r, 800));
        
        const mindar = document.createElement('script');
        mindar.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-face-aframe.prod.js';
        mindar.id = 'mindar';
        document.head.appendChild(mindar);
        
        await new Promise((resolve) => {
          mindar.onload = resolve;
          setTimeout(resolve, 5000);
        });

        if (!window.MINDAR) {
          setStep('ERROR: MindAR not loaded!');
          return;
        }

        setStep('Starting virtual try-on...');
        await new Promise(r => setTimeout(r, 800));
        
        setShowAR(true);
        setStep('');

      } catch (err) {
        setStep(`ERROR: ${err.message}`);
        console.error(err);
      }
    };

    init();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', margin: 0, padding: 0 }}>
      {!showAR && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: 'white',
          fontSize: '20px',
          textAlign: 'center',
          padding: '20px',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ fontSize: '48px' }}>👓</div>
          <div>{step}</div>
          {!step.includes('ERROR') && (
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #333',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          )}
        </div>
      )}

      <button
        onClick={() => {
          try {
            document.querySelectorAll('video').forEach(v => {
              if (v.srcObject) {
                v.srcObject.getTracks().forEach(t => t.stop());
              }
            });
          } catch(e) {}
          router.back();
        }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 99999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <X size={32} strokeWidth={3} />
      </button>

      {showAR && (
        <a-scene
          mindar-face
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <a-camera active="false" position="0 0 0"></a-camera>

          <a-entity mindar-face-target="anchorIndex: 168">
            <a-entity position="0 0.00 0">
              
              {/* Left Frame - Silver metal */}
              <a-torus 
                position="-0.22 0 0" 
                radius="0.14" 
                radius-tubular="0.010" 
                material="color: #C0C0C0; metalness: 0.9; roughness: 0.1" 
                segments-tubular="32" 
                segments-radial="16"
              ></a-torus>
              
              {/* Right Frame */}
              <a-torus 
                position="0.22 0 0" 
                radius="0.14" 
                radius-tubular="0.010" 
                material="color: #C0C0C0; metalness: 0.9; roughness: 0.1" 
                segments-tubular="32" 
                segments-radial="16"
              ></a-torus>
              
              {/* Bridge */}
              <a-cylinder 
                position="0 0 0.14" 
                height="0.12" 
                radius="0.006" 
                rotation="0 0 90" 
                material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              ></a-cylinder>
              
              {/* Left Lens - Blue tinted */}
              <a-circle 
                position="-0.22 0 0.001" 
                radius="0.135" 
                material="color: #4A9EFF; opacity: 0.3; transparent: true; metalness: 0.8; roughness: 0.05" 
                side="double"
              ></a-circle>
              
              {/* Right Lens - Blue tinted */}
              <a-circle 
                position="0.22 0 0.001" 
                radius="0.135" 
                material="color: #4A9EFF; opacity: 0.3; transparent: true; metalness: 0.8; roughness: 0.05" 
                side="double"
              ></a-circle>
              
              {/* Left Temple */}
              <a-box 
                position="-0.33 0 -0.10" 
                width="0.14" 
                height="0.008" 
                depth="0.008" 
                material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              ></a-box>
              
              {/* Right Temple */}
              <a-box 
                position="0.33 0 -0.10" 
                width="0.14" 
                height="0.008" 
                depth="0.008" 
                material="color: #C0C0C0; metalness: 0.9; roughness: 0.1"
              ></a-box>

            </a-entity>
          </a-entity>
        </a-scene>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}