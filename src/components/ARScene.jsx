import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import QRScanner from './QRScanner';
import GaussianBurger from './GaussianBurger';

const CameraFeed = () => {
  const videoRef = useRef();
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
      }}
    />
  );
};

const ARMarker = ({ position, onScan }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={() => onScan()}>
        <boxGeometry args={[0.1, 0.1, 0.01]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.05}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Scan QR Code
      </Text>
    </group>
  );
};

const Scene = ({ onQRScan }) => {
  const [scannedData, setScannedData] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const handleQRScan = (data) => {
    console.log('QR Code scanned:', data);
    setScannedData(data);
    setShowModel(true);
    if (onQRScan) onQRScan(data);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* AR Marker for scanning */}
      <ARMarker 
        position={[0, 0, -2]} 
        onScan={() => handleQRScan('burger_001')} 
      />
      
      {/* Gaussian Splatting Burger Model */}
      {showModel && (
        <GaussianBurger 
          position={[0, 0, -3]} 
          modelId={scannedData.replace('burger_', '') || 'classic_burger'}
        />
      )}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

const ARScene = ({ onBurgerSelect }) => {
  const handleQRScan = (data) => {
    if (onBurgerSelect) {
      // Map QR data to burger IDs
      const burgerMap = {
        'burger_001': 'classic_burger',
        'burger_002': 'cheese_burger',
        'burger_003': 'bacon_burger',
        'burger_004': 'veggie_burger',
        'burger_005': 'double_burger'
      };
      
      const burgerId = burgerMap[data] || 'classic_burger';
      onBurgerSelect(burgerId);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <CameraFeed />
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene onQRScan={handleQRScan} />
      </Canvas>
      <QRScanner onScan={handleQRScan} />
    </div>
  );
};

export default ARScene;