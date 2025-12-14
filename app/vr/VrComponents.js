'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera } from 'lucide-react';

export default function VrComponents() {
  const router = useRouter();
  const sceneRef = useRef(null);
  const previewVideoRef = useRef(null);
  const [isArReady, setIsArReady] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  
  const isCapturingRef = useRef(false);
  const previewStreamRef = useRef(null);

  // 1. Instant Camera Preview
  useEffect(() => {
    let mounted = true;
    
    const startPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (!mounted) {
            stream.getTracks().forEach(t => t.stop());
            return;
        }
        previewStreamRef.current = stream;
        if (previewVideoRef.current) {
            previewVideoRef.current.srcObject = stream;
            previewVideoRef.current.play().catch(() => {});
        }
      } catch (err) {
        // Silent failure for preview
      }
    };
    startPreview();

    return () => {
      mounted = false;
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // 2. Initialize AR
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.pathname !== '/vr') return;

    let cleanup = null;
    let sceneInitialized = false;

    const initScene = () => {
        if (sceneInitialized || !sceneRef.current) return;
        sceneInitialized = true;
        
        // Fix: Camera must be active for MindAR to find it via getObject3D('camera')
        // Glasses Scale: 1 unit = 1 meter.
        // Anchor 168: Nose Tip.
        
        sceneRef.current.innerHTML = `
          <a-scene 
            loading-screen="enabled: false"
            mindar-face="autoStart: true; uiLoading: no; uiScanning: no; uiError: no; filterMinCF: 0.001; filterBeta: 1000"
            embedded color-space="sRGB" 
            renderer="colorManagement: true; physicallyCorrectLights: true; alpha: true; antialias: true; preserveDrawingBuffer: true;"
            vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"
            style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20;"
            background="color: transparent; transparent: true"
            id="ar-scene"
          >
            <!-- Lighting -->
            <a-light type="ambient" color="#ffffff" intensity="1.2"></a-light>
            <a-light type="directional" position="0.5 1 1" color="#ffffff" intensity="1.5"></a-light>
            <a-light type="point" position="0 0 0.5" color="#fff" intensity="0.5"></a-light>
            
            <!-- Face Tracking Target -->
            <a-entity mindar-face-target="anchorIndex: 168">
                <!-- Glasses Group -->
                <!-- Positioned slightly forward (z: 0.0) and adjusted for nose bridge -->
                <!-- SCALED 5.5X AS REQUESTED -->
                <a-entity id="glasses-group" position="0 -0.01 0" rotation="0 0 0" scale="5.5 5.5 5.5">
                
                    <!-- Frame Color Material -->
                    <a-asset-item id="gold-material" src=""></a-asset-item>
                    
                    <!-- Left Lens Frame -->
                    <a-torus position="-0.032 0 0" radius="0.026" radius-tubular="0.002" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2"
                        segments-tubular="64" segments-radial="16">
                    </a-torus>
                    
                    <!-- Right Lens Frame -->
                    <a-torus position="0.032 0 0" radius="0.026" radius-tubular="0.002" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2"
                        segments-tubular="64" segments-radial="16">
                    </a-torus>
                    
                    <!-- Bridge -->
                    <a-cylinder position="0 0 0" height="0.015" radius="0.0015" rotation="0 0 90" 
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>

                    <!-- Lenses (Blue Tint) -->
                    <a-circle position="-0.032 0 0.001" radius="0.025" 
                        material="color: #4A9EFF; opacity: 0.5; transparent: true; metalness: 0.9; roughness: 0.0; side: double">
                    </a-circle>
                    <a-circle position="0.032 0 0.001" radius="0.025" 
                        material="color: #4A9EFF; opacity: 0.5; transparent: true; metalness: 0.9; roughness: 0.0; side: double">
                    </a-circle>

                    <!-- Temples (Arms) -->
                    <a-cylinder position="-0.06 0 -0.07" height="0.14" radius="0.0015" rotation="90 0 0"
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>
                    <a-cylinder position="0.06 0 -0.07" height="0.14" radius="0.0015" rotation="90 0 0"
                        material="color: #FFD700; metalness: 0.8; roughness: 0.2">
                    </a-cylinder>
                    
                    <!-- Nose Pads -->
                    <a-sphere position="-0.01 -0.005 -0.005" radius="0.002" color="#cccccc"></a-sphere>
                    <a-sphere position="0.01 -0.005 -0.005" radius="0.002" color="#cccccc"></a-sphere>

                </a-entity>
            </a-entity>
            
            <!-- Camera MUST be active for MindAR to work -->
            <a-camera position="0 0 0" active="true" look-controls="enabled: false"></a-camera>
          </a-scene>
        `;
        
        const sceneEl = document.getElementById('ar-scene');
        
        const onReady = () => {
            console.log("MindAR Ready");
            setIsArReady(true);
            
            // Cleanup preview video stream once AR is ready to free up camera resource if needed
            // although MindAR usually shares it or takes over.
            if (previewStreamRef.current) {
                // We don't stop tracks immediately to avoid black flash, wait a bit
                setTimeout(() => {
                    // previewStreamRef.current?.getTracks().forEach(t => t.stop()); 
                    // Note: MindAR might be using the same device. Stopping tracks might kill MindAR if they share the source.
                    // Safest is just to hide the preview video element.
                    setIsPreviewActive(false); 
                }, 500);
            }
        };
        
        const onError = (e) => {
            console.error("AR Error", e);
        };

        if (sceneEl) {
            sceneEl.addEventListener('mindar-face-ready', onReady);
            sceneEl.addEventListener('arError', onError);
        }

        cleanup = () => {
            if (sceneEl) {
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

    // Script Loading Logic
    const loadScripts = () => {
        if (window.AFRAME && window.MINDAR) {
            initScene();
            return;
        }

        const scripts = [
            'https://aframe.io/releases/1.4.2/aframe.min.js',
            'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-face-aframe.prod.js'
        ];

        scripts.forEach(src => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
            }
        });

        const timer = setInterval(() => {
            if (window.AFRAME && window.MINDAR) {
                clearInterval(timer);
                initScene();
            }
        }, 100);

        setTimeout(() => clearInterval(timer), 15000);
        return () => clearInterval(timer);
    };

    const stopPolling = loadScripts();

    return () => {
        if (stopPolling) stopPolling();
        if (cleanup) cleanup();
    };
  }, []);

  // 3. UI Cleaner & Visibility Enforcer
  useEffect(() => {
    const cleanUI = () => {
        // 1. Remove Annoying Elements
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

        // 2. Remove Text Nodes (Cautiously)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            const text = node.nodeValue?.trim();
            if (text === 'Initializing VR...' || text === 'Loading...' || text === 'VR') {
                const parent = node.parentElement;
                if (parent && 
                    parent.tagName !== 'SCRIPT' && 
                    parent.tagName !== 'STYLE' && 
                    !sceneRef.current?.contains(parent)) {
                    parent.style.display = 'none';
                }
            }
        }

        // 3. Enforce Layers
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            if (v !== previewVideoRef.current) {
                // MindAR Video
                v.style.position = 'absolute';
                v.style.top = '0';
                v.style.left = '0';
                v.style.zIndex = '1';
                v.style.display = 'block';
                v.style.opacity = '1';
                v.style.width = '100%';
                v.style.height = '100%';
                v.style.objectFit = 'cover';
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
