'use client';

import { useEffect, useRef, useState } from 'react';

// Super simple camera test with HTML5 video
export default function VrComponentSimple({ product, onLoaded, onError }) {
  const videoRef = useRef(null);
  const initialized = useRef(false);
  const [status, setStatus] = useState('Click to start camera');
  const [cameraActive, setCameraActive] = useState(false);

  const startSimpleCamera = async () => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      setStatus('🎥 Requesting camera permission...');
      console.log('📱 Starting basic camera test...');

      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      console.log('✅ Camera stream obtained');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => {
              console.log('▶️ Video playing');
              setStatus('✅ Camera working!');
              setCameraActive(true);
              if (onLoaded) onLoaded();
            })
            .catch(error => {
              setStatus(`❌ Video play error: ${error.message}`);
            });
        };
      }

    } catch (error) {
      console.error('❌ Camera error:', error);
      
      let message = 'Camera failed';
      if (error.name === 'NotAllowedError') {
        message = '❌ Camera permission denied. Please allow camera access.';
      } else if (error.name === 'NotFoundError') {
        message = '❌ No camera found. Please connect a camera.';
      } else if (error.name === 'NotReadableError') {
        message = '❌ Camera in use by another app. Close other camera apps.';
      }
      
      setStatus(message);
      if (onError) onError(error);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#000', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Video element */}
      <video 
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: cameraActive ? '100%' : '80%',
          height: cameraActive ? '100%' : 'auto',
          maxHeight: '80%',
          borderRadius: cameraActive ? '0' : '15px',
          border: cameraActive ? 'none' : '3px solid #FFD700',
          objectFit: 'cover'
        }}
      />

      {/* Simple glasses overlay */}
      {cameraActive && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}>
          {/* SVG Glasses */}
          <svg width="200" height="80" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}>
            {/* Left lens */}
            <ellipse cx="50" cy="40" rx="35" ry="25" 
              fill="rgba(96, 165, 250, 0.3)" 
              stroke="#60A5FA" 
              strokeWidth="3" 
            />
            {/* Right lens */}
            <ellipse cx="150" cy="40" rx="35" ry="25" 
              fill="rgba(96, 165, 250, 0.3)" 
              stroke="#60A5FA" 
              strokeWidth="3" 
            />
            {/* Bridge */}
            <line x1="85" y1="40" x2="115" y2="40" 
              stroke="#60A5FA" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            {/* Left temple */}
            <line x1="15" y1="40" x2="45" y2="40" 
              stroke="#60A5FA" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            {/* Right temple */}
            <line x1="155" y1="40" x2="185" y2="40" 
              stroke="#60A5FA" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Status overlay */}
      {!cameraActive && (
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '20px',
          borderRadius: '15px',
          maxWidth: '90%'
        }}>
          <div style={{ fontSize: '18px', marginBottom: '15px' }}>
            📹 {status}
          </div>
          
          {product && (
            <div style={{ fontSize: '14px', color: '#FFD700', marginBottom: '15px' }}>
              Testing: {product.name}
            </div>
          )}

          {!initialized.current && (
            <button
              onClick={startSimpleCamera}
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎥 Start Camera
            </button>
          )}
        </div>
      )}

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '12px',
        textAlign: 'center',
        zIndex: 1000
      }}>
        📱 Simple camera test • 💡 Good lighting helps • 👤 Center your face
      </div>
    </div>
  );
}