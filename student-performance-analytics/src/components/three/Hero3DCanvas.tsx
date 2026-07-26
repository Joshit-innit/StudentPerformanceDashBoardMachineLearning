import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 12);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 2, 20);
    pointLight.position.set(-5, 2, -2);
    scene.add(pointLight);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. 3D Bar Chart
    const barData = [
      { x: -3, height: 3.2, color: 0x3b82f6 },
      { x: -1.5, height: 4.8, color: 0x2563eb },
      { x: 0, height: 2.5, color: 0x60a5fa },
      { x: 1.5, height: 5.5, color: 0x1d4ed8 },
      { x: 3, height: 4.0, color: 0x3b82f6 },
    ];

    const bars: THREE.Mesh[] = [];

    barData.forEach((item) => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, item.height, 32);
      const material = new THREE.MeshPhysicalMaterial({
        color: item.color,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(item.x, item.height / 2 - 2, 0);
      group.add(mesh);
      bars.push(mesh);
    });

    // 2. Mortarboard Cap (3D Graduation Hat)
    const hatGroup = new THREE.Group();

    // Top square board
    const boardGeo = new THREE.BoxGeometry(2.8, 0.12, 2.8);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.2 });
    const boardMesh = new THREE.Mesh(boardGeo, boardMat);
    hatGroup.add(boardMesh);

    // Cap base dome
    const baseGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.7, 32);
    const baseMesh = new THREE.Mesh(baseGeo, boardMat);
    baseMesh.position.y = -0.35;
    hatGroup.add(baseMesh);

    // Tassel button
    const buttonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
    const buttonMesh = new THREE.Mesh(buttonGeo, goldMat);
    buttonMesh.position.y = 0.08;
    hatGroup.add(buttonMesh);

    // Arrow line rising up
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, -1, 0.5),
      new THREE.Vector3(-1.5, 1.2, 0.5),
      new THREE.Vector3(0.5, 0.5, 0.5),
      new THREE.Vector3(2.5, 3.2, 0.5),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.12, 16, false);
    const arrowMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5, roughness: 0.1 });
    const tubeMesh = new THREE.Mesh(tubeGeo, arrowMat);
    group.add(tubeMesh);

    hatGroup.position.set(-1.8, 2.2, 0.8);
    hatGroup.rotation.z = -0.15;
    hatGroup.rotation.y = 0.3;
    group.add(hatGroup);

    // 3. Floating Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 80;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.8,
    });
    const particlePoints = new THREE.Points(particlesGeo, particleMat);
    group.add(particlePoints);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle group swaying
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouseX * 0.4 + Math.sin(elapsedTime * 0.5) * 0.1, 0.05);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouseY * 0.2, 0.05);

      // Hat floating motion
      hatGroup.position.y = 2.2 + Math.sin(elapsedTime * 1.5) * 0.15;
      hatGroup.rotation.y += 0.008;

      // Animate bar heights slightly
      bars.forEach((bar, idx) => {
        bar.position.y = (barData[idx].height / 2 - 2) + Math.sin(elapsedTime * 2 + idx) * 0.08;
      });

      // Particle rotation
      particlePoints.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[280px] sm:min-h-[340px] relative" />;
};
