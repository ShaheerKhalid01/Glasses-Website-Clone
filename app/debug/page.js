'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugPage() {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('Ready to test camera');
  const [browserInfo, setBrowserInfo] = useState('');
  const videoRef = useRef(null);
  const router = useRouter();

  // Detect browser and setup
  useEffect(() => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Safari')) {
      browser = 'Safari';
    } else if (userAgent.includes('Edge')) {
      browser = 'Edge';
    }
    
    const isHttps = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    setBrowserInfo(`${browser} | ${isHttps ? 'HTTPS ✅' : 'HTTP ⚠️'} | ${isLocalhost ? 'Localhost ✅' : 'Remote ⚠️'}`);
    
    if (!isHttps && !isLocalhost) {
      setMessage('⚠️ Camera requires HTTPS or localhost. Current connection may not work.');
    }
  }, []);

  const steps = [
    'Test basic camera access',
    'Test A-Frame loading',
    'Test MindAR loading',
    'Test simple scene',
    'Test with glasses'
  ];

  const testCamera = async () => {
    try {
      setMessage('🔍 Checking camera availability...');
      
      // First check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }
      
      setMessage('📱 Requesting camera permission...');
      console.log('🎥 About to request camera permission');
      
      // Check current permission status
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'camera' });
          console.log('📋 Current camera permission:', permission.state);
          setMessage(`📋 Camera permission: ${permission.state}`);
          
          if (permission.state === 'denied') {
            throw new Error('Camera permission is denied. Please enable in browser settings.');
          }
        } catch (permError) {
          console.log('⚠️ Permission query not supported');
        }
      }
      
      setMessage('📸 Starting camera stream...');
      
      // Try to get camera with more specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 }
        },
        audio: false
      });
      
      console.log('✅ Camera stream obtained:', stream);
      console.log('📊 Video tracks:', stream.getVideoTracks());
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load
        videoRef.current.onloadedmetadata = () => {
          console.log('📹 Video metadata loaded');
          videoRef.current.play()
            .then(() => {
              console.log('▶️ Video playing');
              setMessage('✅ Camera working! You should see yourself below.');
              setStep(1);
            })
            .catch(playError => {
              console.error('❌ Video play error:', playError);
              setMessage(`❌ Video play failed: ${playError.message}`);
            });
        };
        
        videoRef.current.onerror = (videoError) => {
          console.error('❌ Video error:', videoError);
          setMessage('❌ Video element error');
        };
        
        // Fallback timeout
        setTimeout(() => {
          if (videoRef.current && videoRef.current.videoWidth === 0) {
            setMessage('⚠️ Video not displaying. Check browser settings.');
          }
        }, 5000);
      }
      
    } catch (error) {
      console.error('❌ Camera error:', error);
      
      let errorMessage = `❌ Camera failed: ${error.name}`;
      
      if (error.name === 'NotAllowedError') {
        errorMessage = '❌ Camera permission denied. Please:\n1. Click allow when browser asks\n2. Or click camera icon in address bar\n3. Or check browser settings';
      } else if (error.name === 'NotFoundError') {
        errorMessage = '❌ No camera found. Please connect a camera.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = '❌ Camera is being used by another app. Close other camera apps.';
      } else if (error.name === 'SecurityError') {
        errorMessage = '❌ Security error. Try using HTTPS or localhost.';
      } else {
        errorMessage += `\n${error.message}`;
      }
      
      setMessage(errorMessage);
    }
  };

  const testAFrame = async () => {
    try {
      setMessage('Loading A-Frame...');
      
      if (!window.AFRAME) {
        const script = document.createElement('script');
        script.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          setTimeout(() => reject(new Error('Timeout')), 10000);
        });
      }
      
      setMessage('✅ A-Frame loaded successfully!');
      setStep(2);
    } catch (error) {
      setMessage(`❌ A-Frame failed: ${error.message}`);
    }
  };

  const testMindAR = async () => {
    try {
      setMessage('Loading MindAR...');
      
      if (!window.MINDAR) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-face-aframe.prod.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          setTimeout(() => reject(new Error('Timeout')), 10000);
        });
      }
      
      setMessage('✅ MindAR loaded successfully!');
      setStep(3);
    } catch (error) {
      setMessage(`❌ MindAR failed: ${error.message}`);
    }
  };

  const testScene = () => {
    try {
      setMessage('Creating basic A-Frame scene...');
      
      const sceneDiv = document.getElementById('scene-container');
      if (sceneDiv) {
        sceneDiv.innerHTML = `
          <a-scene embedded style="width: 300px; height: 200px; display: block;">
            <a-box position="0 0 -3" color="red"></a-box>
            <a-sky color="#000"></a-sky>
          </a-scene>
        `;
        setMessage('✅ Basic scene created! You should see a red box above.');
        setStep(4);
      }
    } catch (error) {
      setMessage(`❌ Scene failed: ${error.message}`);
    }
  };

  const testFullVR = () => {
    setMessage('Redirecting to full VR test...');
    router.push('/vr?product=1');
  };

  const resetTest = () => {
    setStep(0);
    setMessage('Ready to test camera');
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">🔧 VR Debug Tool</h1>
        
        {/* Browser info */}
        <div className="bg-gray-800 p-3 rounded mb-6 text-center text-sm">
          <div className="text-gray-400 mb-1">Browser Info:</div>
          <div className="text-yellow-400">{browserInfo}</div>
        </div>

        {/* Camera permission instructions */}
        <div className="bg-blue-900 border border-blue-700 p-4 rounded mb-6">
          <h3 className="font-bold mb-2">📱 Camera Permission Guide:</h3>
          <div className="text-sm space-y-1">
            <div><strong>Chrome:</strong> Click camera icon in address bar → Allow</div>
            <div><strong>Firefox:</strong> Click shield icon → Allow camera</div>
            <div><strong>Safari:</strong> Website menu → Camera → Allow</div>
            <div><strong>Mobile:</strong> Use HTTPS (not HTTP) for camera access</div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-4">Step {step + 1} of 5</div>
          <div className="space-y-2">
            {steps.map((stepName, index) => (
              <div 
                key={index}
                className={`p-3 rounded ${
                  index < step ? 'bg-green-800' :
                  index === step ? 'bg-yellow-800' : 'bg-gray-800'
                }`}
              >
                {index < step ? '✅' : index === step ? '⏳' : '⭕'} {stepName}
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-800 p-4 rounded mb-8 text-center">
          <div className="text-lg mb-2">{message}</div>
          
          {/* Action buttons */}
          <div className="space-x-2 space-y-2">
            {step === 0 && (
              <>
                <button 
                  onClick={testCamera}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
                >
                  Test Camera
                </button>
                <button 
                  onClick={async () => {
                    try {
                      setMessage('🔍 Checking camera permissions...');
                      const devices = await navigator.mediaDevices.enumerateDevices();
                      const cameras = devices.filter(device => device.kind === 'videoinput');
                      setMessage(`📹 Found ${cameras.length} camera(s). Labels: ${cameras.map(c => c.label || 'Unknown').join(', ')}`);
                    } catch (e) {
                      setMessage(`❌ Device check failed: ${e.message}`);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Check Devices
                </button>
                <button 
                  onClick={() => {
                    setMessage('🌐 Opening camera permission help...');
                    window.open('https://support.google.com/chrome/answer/2693767?hl=en', '_blank');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
                >
                  Permission Help
                </button>
              </>
            )}
            {step === 1 && (
              <button 
                onClick={testAFrame}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
              >
                Test A-Frame
              </button>
            )}
            {step === 2 && (
              <button 
                onClick={testMindAR}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
              >
                Test MindAR
              </button>
            )}
            {step === 3 && (
              <button 
                onClick={testScene}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
              >
                Test Scene
              </button>
            )}
            {step === 4 && (
              <button 
                onClick={testFullVR}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
              >
                Test Full VR
              </button>
            )}
            
            <button 
              onClick={resetTest}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Video feed */}
        {step >= 1 && (
          <div className="mb-8">
            <h3 className="text-xl mb-4">📹 Camera Feed:</h3>
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                height: 'auto',
                border: '2px solid #FFD700',
                borderRadius: '8px'
              }}
            />
          </div>
        )}

        {/* Scene container */}
        {step >= 3 && (
          <div className="mb-8">
            <h3 className="text-xl mb-4">🎮 A-Frame Scene:</h3>
            <div 
              id="scene-container" 
              style={{ 
                border: '2px solid #60A5FA',
                borderRadius: '8px',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1f2937'
              }}
            >
              Scene will appear here...
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="text-center">
          <button 
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}