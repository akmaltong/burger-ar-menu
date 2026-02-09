import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateBurgerSplatData } from '../models/burgerModels';

// Gaussian Splatting Shader
const vertexShader = `
  precision highp float;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float scale;
  
  attribute vec3 position;
  attribute vec3 color;
  attribute float opacity;
  
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vColor = color;
    vOpacity = opacity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = scale * 50.0 / gl_Position.w;
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    
    float alpha = (1.0 - dist * 2.0) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const GaussianBurger = ({ position, modelId = 'classic_burger', scale = 1 }) => {
  const pointsRef = useRef();
  const materialRef = useRef();

  // Generate Gaussian splat data based on model ID
  const { positions, colors, opacities, scales, rotations, modelInfo } = useMemo(() => {
    return generateBurgerSplatData(modelId);
  }, [modelId]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    return geom;
  }, [positions, colors, opacities]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle rotation animation
      pointsRef.current.rotation.y += 0.005;
      
      // Subtle floating animation
      pointsRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={position}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          scale: { value: scale },
        }}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GaussianBurger;