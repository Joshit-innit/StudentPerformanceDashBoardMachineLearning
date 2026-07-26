import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Predictor3DOrbProps {
  score: number; // 0 to 100
}

export const Predictor3DOrb: React.FC<Predictor3DOrbProps> = ({ score }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 3, 15);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Score based color logic
    const getColor = (val: number) => {
      if (val >= 85) return new THREE.Color(0x2563eb); // Vivid Blue
      if (val >= 70) return new THREE.Color(0x3b82f6); // Sky Blue
      if (val >= 50) return new THREE.Color(0xd97706); // Amber
      return new THREE.Color(0xdc2626); // Red
    };

    const targetColor = getColor(score);

    // Core Sphere
    const geometry = new THREE.IcosahedronGeometry(1.6, 4);
    const material = new THREE.MeshPhysicalMaterial({
      color: targetColor,
      roughness: 0.15,
      metalness: 0.2,
      transmission: 0.6,
      ior: 1.5,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Outer Ring
    const ringGeo = new THREE.TorusGeometry(2.4, 0.08, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);
    ringRef.current = ringMesh;

    // Orbiting Particles
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI - Math.PI / 2;

      pPos[i] = radius * Math.cos(theta) * Math.cos(phi);
      pPos[i + 1] = radius * Math.sin(phi);
      pPos[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    scene.add(pPoints);

    // Animation
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (mesh) {
        mesh.rotation.y = elapsed * 0.4;
        mesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2;
      }

      if (ringMesh) {
        ringMesh.rotation.z = elapsed * 0.3;
        ringMesh.rotation.y = elapsed * 0.2;
      }

      pPoints.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [score]);

  return <div ref={mountRef} className="w-full h-48 sm:h-56 relative" />;
};
