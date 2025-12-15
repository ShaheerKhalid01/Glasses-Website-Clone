'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera } from 'lucide-react';

export default function VrComponents() {
  const router = useRouter();
  const sceneRef = useRef(null);
  const previewVideoRef = useRef(null);
  const [isArReady, setIsArReady] = useState(false);
  
  const isCapturingRef = useRef(false);
  const previewStreamRef = useRef(null);
  const isArSetupRef = useRef(false); // Track if AR init has started to prevent camera conflict

  // 0. Filter False Positive Errors (TensorFlow Lite INFO logs)
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      // Suppress specific WASM info logs that are incorrectly piped to console.error
      if (args[0] && typeof args[0] === 'string' && (
          args[0].includes('TensorFlow Lite XNNPACK delegate for CPU') ||
          args[0].includes('Created TensorFlow Lite XNNPACK delegate')
      )) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // 1. Instant Camera Preview
  useEffect(() => {
    let mounted = true;
    
    const startPreview = async () => {
      try {
        // Check if AR is already setting up; if so, don't start preview to save camera
        if (isArSetupRef.current || isArReady) return;

        console.log("📷 Requesting preview camera...");
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        
        // Race condition check: If AR started setting up while we were waiting for camera
        if (!mounted || isArSetupRef.current) {
            console.log("🛑 Preview camera arrived too late, stopping immediately.");
            stream.getTracks().forEach(t => t.stop());
            return;
        }
        
        console.log("✅ Preview camera active");
        previewStreamRef.current = stream;
        if (previewVideoRef.current) {
            previewVideoRef.current.srcObject = stream;
            previewVideoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.warn('Preview camera failed or was pre-empted', err);
      }
    };
    startPreview();

    return () => {
      mounted = false;
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach(t => t.stop());
        previewStreamRef.current = null;
      }
    };
  }, []); // Empty deps to run once on mount

  // 2. Initialize AR
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.pathname !== '/vr') return;

    let cleanup = null;
    let sceneInitialized = false;

    const initScene = async () => {
        if (sceneInitialized || !sceneRef.current) return;
        
        // Mark AR as setting up to block new preview requests
        isArSetupRef.current = true;
        sceneInitialized = true;

        console.log("🔄 transitioning from Preview to AR...");

        // 1. HARD STOP PREVIEW
        // We must ensure the camera hardware is released before MindAR asks for it
        if (previewStreamRef.current) {
            const tracks = previewStreamRef.current.getTracks();
            tracks.forEach(t => {
                t.stop();
                t.enabled = false;
            });
            previewStreamRef.current = null;
        }
        if (previewVideoRef.current) {
            previewVideoRef.current.srcObject = null;
            previewVideoRef.current.load();
        }

        // 2. SAFETY DELAY (Crucial for first load)
        // Give the browser 500ms to fully release the camera hardware lock
        await new Promise(resolve => setTimeout(resolve, 500)); 

        console.log("🚀 Injecting AR Scene...");
        
        // Add A-Frame scene with autoStart: false
        sceneRef.current.innerHTML = `
          <a-scene 
            loading-screen="enabled: false"
            mindar-face="autoStart: false; uiLoading: no; uiScanning: no; uiError: no; filterMinCF: 0.001; filterBeta: 1000"
            embedded color-space="sRGB" 
            renderer="colorManagement: true; physicallyCorrectLights: true; alpha: true; antialias: true;"
            vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"
            style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20;"
            background="color: transparent; transparent: true"
            id="ar-scene"
          >
            <a-light type="ambient" color="#ffffff" intensity="1.2"></a-light>
            <a-light type="directional" position="0.5 1 1" color="#ffffff" intensity="1.5"></a-light>
            <a-light type="point" position="0 0 0.5" color="#fff" intensity="0.5"></a-light>
            
            <a-entity mindar-face-target="anchorIndex: 168">
                <a-entity id="glasses-group" position="0 -0.01 0" rotation="0 0 0" scale="5.5 5.5 5.5">
                    <a-asset-item id="gold-material" src=""></a-asset-item>
                    
                    <a-torus position="-0.032 0 0" radius="0.026" radius-tubular="0.002" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2"
                        segments-tubular="64" segments-radial="16">
                    </a-torus>
                    
                    <a-torus position="0.032 0 0" radius="0.026" radius-tubular="0.002" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2"
                        segments-tubular="64" segments-radial="16">
                    </a-torus>
                    
                    <a-cylinder position="0 0 0" height="0.015" radius="0.0015" rotation="0 0 90" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>

                    <a-circle position="-0.032 0 0.001" radius="0.025" 
                        material="color: #4A9EFF; opacity: 0.5; transparent: true; metalness: 0.9; roughness: 0.0; side: double">
                    </a-circle>
                    <a-circle position="0.032 0 0.001" radius="0.025" 
                        material="color: #4A9EFF; opacity: 0.5; transparent: true; metalness: 0.9; roughness: 0.0; side: double">
                    </a-circle>

                    <a-cylinder position="-0.06 0 -0.07" height="0.14" radius="0.0015" rotation="90 0 0"
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>
                    <a-cylinder position="0.06 0 -0.07" height="0.14" radius="0.0015" rotation="90 0 0"
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>
                    
                    <a-sphere position="-0.01 -0.005 -0.005" radius="0.002" color="#cccccc"></a-sphere>
                    <a-sphere position="0.01 -0.005 -0.005" radius="0.002" color="#cccccc"></a-sphere>
                </a-entity>
            </a-entity>
            
            <a-camera position="0 0 0" active="true" look-controls="enabled: false"></a-camera>
          </a-scene>
        `;
        
        const sceneEl = document.getElementById('ar-scene');
        
        // 3. START MINDAR ONLY AFTER SCENE LOADS
        // This fixes the 'getObject3D' undefined error by ensuring the camera entity exists
        const startMindAR = () => {
            console.log("✅ Scene loaded. Starting MindAR system...");
            try {
                // Safely access the system
                const system = sceneEl.systems['mindar-face-system'];
                if (system && !system.active) {
                    system.start();
                }
            } catch (e) {
                console.error("Failed to start MindAR:", e);
            }
        };

        const onReady = () => {
            console.log("MindAR Ready event received");
            setIsArReady(true);
        };
        
        const onError = (e) => {
            console.error("AR Error event:", e);
        };

        if (sceneEl) {
            // Listen for scene load to start AR
            if (sceneEl.hasLoaded) {
                startMindAR();
            } else {
                sceneEl.addEventListener('loaded', startMindAR);
            }

            sceneEl.addEventListener('mindar-face-ready', onReady);
            sceneEl.addEventListener('arError', onError);
        }

        cleanup = () => {
            if (sceneEl) {
                sceneEl.removeEventListener('loaded', startMindAR);
                sceneEl.removeEventListener('mindar-face-ready', onReady);
                sceneEl.removeEventListener('arError', onError);
                try {
                    const sys = sceneEl.systems?.['mindar-face-system'];
                    if (sys) sys.stop();
                } catch(e) {}
                sceneEl.remove();
            }
            
            // Clean up video elements created by MindAR
            const videos = document.querySelectorAll('video');
            videos.forEach(v => {
                if (v !== previewVideoRef.current) {
                    if (v.srcObject) {
                       const tracks = v.srcObject.getTracks();
                       tracks.forEach(t => t.stop());
                    }
                    v.remove();
                }
            });
        };
    };

    const loadScripts = async () => {
        // Double check globals
        if (window.AFRAME && window.MINDAR) {
            initScene();
            return;
        }

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                let s = document.querySelector(`script[src="${src}"]`);
                if (s) {
                    if (s.dataset.loaded === 'true') {
                        resolve();
                    } else {
                        s.addEventListener('load', () => resolve());
                        s.addEventListener('error', (e) => reject(new Error(`Failed to load ${src}`)));
                    }
                    return;
                }
                
                s = document.createElement('script');
                s.src = src;
                s.async = false; 
                s.crossOrigin = 'anonymous'; 
                s.dataset.loaded = 'false';
                
                s.onload = () => {
                    s.dataset.loaded = 'true';
                    resolve();
                };
                s.onerror = (e) => reject(new Error(`Failed to load ${src}`));
                
                document.head.appendChild(s);
            });
        };

        try {
            await loadScript('https://cdn.jsdelivr.net/npm/aframe@1.4.2/dist/aframe-v1.4.2.min.js');
            
            await new Promise(resolve => {
                const check = setInterval(() => {
                    if (window.AFRAME) {
                        clearInterval(check);
                        resolve();
                    }
                }, 50);
            });

            await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-face-aframe.prod.js');
            
            initScene();
        } catch (err) {
            console.error("Error loading AR scripts:", err);
        }
    };

    loadScripts();

    return () => {
        if (cleanup) cleanup();
        isArSetupRef.current = false;
    };
  }, []);

  // 3. UI Cleaner
  useEffect(() => {
    const cleanUI = () => {
        const classesToCheck = [
            '.mindar-ui-overlay', 
            '.mindar-ui-loading', 
            '.mindar-ui-scanning', 
            '.a-loader-title', 
            '.a-fullscreen', 
            '.a-modal', 
            '.a-enter-vr', 
            '.a-enter-vr-button', 
            '.a-orientation-modal'
        ];
        
        document.querySelectorAll(classesToCheck.join(', ')).forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            el.remove();
        });

        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            // If it's NOT the preview video, it must be the AR video
            if (v !== previewVideoRef.current) {
                v.style.position = 'absolute';
                v.style.top = '0';
                v.style.left = '0';
                v.style.zIndex = '1';
                v.style.display = 'block';
                v.style.opacity = '1';
                v.style.width = '100%';
                v.style.height = '100%';
                v.style.objectFit = 'cover';
                
                // Ensure it plays
                if (v.paused) v.play().catch(() => {});
            }
        });

        const canvas = document.querySelector('.a-canvas');
        if (canvas) {
            canvas.style.zIndex = '20'; 
            canvas.style.display = 'block';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
        }
    };
    
    const interval = setInterval(cleanUI, 50);
    return () => clearInterval(interval);
  }, []);

  const capturePhoto = useCallback(() => {
    if (isCapturingRef.current) return;
    isCapturingRef.current = true;
    
    const videos = Array.from(document.querySelectorAll('video'));
    const arVideo = videos.find(v => v !== previewVideoRef.current);
    const sourceVideo = (isArReady && arVideo) ? arVideo : previewVideoRef.current;
    
    const scene = document.querySelector('a-scene');

    if (sourceVideo) {
        const canvas = document.createElement('canvas');
        canvas.width = sourceVideo.videoWidth || 1280;
        canvas.height = sourceVideo.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height);
        
        if (isArReady && scene) {
             const aCanvas = scene.components.screenshot?.getCanvas('perspective');
             if (aCanvas) ctx.drawImage(aCanvas, 0, 0, canvas.width, canvas.height);
        }

        const link = document.createElement('a');
        link.download = `visioncraft-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        setTimeout(() => isCapturingRef.current = false, 1000);
    } else {
        isCapturingRef.current = false;
    }
  }, [isArReady]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <style>{`
        .mindar-ui-loading, .mindar-ui-scanning, .mindar-ui-overlay, 
        .a-loader-title, .a-fullscreen, .a-modal, 
        .a-enter-vr, .a-enter-vr-button, .a-orientation-modal {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        #ar-scene {
            z-index: 20 !important;
            position: absolute !important;
            top: 0;
            left: 0;
        }
        
        .a-canvas {
            z-index: 20 !important;
            background-color: transparent !important;
        }
        
        video {
            display: block !important;
            opacity: 1 !important;
        }
      `}</style>

      {/* 1. Instant Preview Video - Fades out when AR is ready */}
      <video 
        ref={previewVideoRef} 
        className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 transition-opacity duration-1000 ${isArReady ? 'opacity-0' : 'opacity-100'}`}
        autoPlay 
        playsInline 
        muted
        style={{ zIndex: 5 }} 
      />

      {/* 2. AR Scene Container */}
      <div ref={sceneRef} className="absolute inset-0 z-20" />

      {/* 5. Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => router.push('/')} 
          className="pointer-events-auto p-3 bg-black/30 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={capturePhoto} 
          className={`pointer-events-auto p-4 backdrop-blur-md rounded-full text-white border border-white/20 active:scale-95 transition-all bg-white/20 hover:bg-white/30`}
        >
          <Camera size={28} />
        </button>
      </div>
    </div>
  );
}
