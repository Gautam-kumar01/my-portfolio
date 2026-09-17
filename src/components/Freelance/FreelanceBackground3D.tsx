import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * FreelanceBackground3D — A dynamic, interactive 3D WebGL holographic visualization
 * that powers the background of the Freelance section.
 *
 * Features:
 * - Floating central holographic Torus Knot / Cyber Hexagon core
 * - Dual rotating orbital particle rings in emerald & electric cyan
 * - Floating data node particles with luminous trails
 * - Smooth pointer interaction: shifts rotation and light intensity when hovering the card
 */
interface FreelanceBackground3DProps {
  isHovered?: boolean;
}

export const FreelanceBackground3D: React.FC<FreelanceBackground3DProps> = ({ isHovered = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverStateRef = useRef(isHovered);

  useEffect(() => {
    hoverStateRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ==========================================
    // 2. CENTRAL HOLOGRAPHIC GEOMETRY
    // ==========================================
    // Outer wireframe Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(3.2, 0.85, 100, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      emissive: 0x005522,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    group.add(knotMesh);

    // Inner Glowing Octahedron Core
    const innerGeo = new THREE.OctahedronGeometry(1.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // ==========================================
    // 3. CONCENTRIC ORBITAL PARTICLE RINGS
    // ==========================================
    const createRing = (radius: number, count: number, colorHex: number) => {
      const ringGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * 0.4;
        pos[i * 3] = Math.cos(angle) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        pos[i * 3 + 2] = Math.sin(angle) * r;
      }
      ringGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const ringMat = new THREE.PointsMaterial({
        size: 0.12,
        color: colorHex,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(ringGeo, ringMat);
    };

    const ring1 = createRing(5.2, 280, 0x00ff66);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const ring2 = createRing(6.8, 350, 0x00e5ff);
    ring2.rotation.x = -Math.PI / 5;
    ring2.rotation.z = Math.PI / 6;
    group.add(ring2);

    // ==========================================
    // 4. FLOATING TECH CLOUD PARTICLES
    // ==========================================
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cGreen = new THREE.Color(0x00ff66);
    const cCyan = new THREE.Color(0x00e5ff);
    const cPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 3 + Math.random() * 8;

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);

      const roll = Math.random();
      const col = roll < 0.5 ? cGreen : roll < 0.85 ? cCyan : cPurple;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    group.add(particleSystem);

    // ==========================================
    // 5. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff66, 3, 25);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00e5ff, 2.5, 25);
    pointLight2.position.set(-5, -4, 4);
    scene.add(pointLight2);

    // Position the whole 3D group slightly to the right for balance with text on left
    group.position.set(3.5, 0, 0);

    // Responsive layout position
    const updateGroupPosition = () => {
      if (window.innerWidth < 900) {
        group.position.set(0, 0, -2);
        group.scale.set(0.7, 0.7, 0.7);
      } else {
        group.position.set(4, 0, 0);
        group.scale.set(1, 1, 1);
      }
    };
    updateGroupPosition();

    // ==========================================
    // 6. INTERACTION & ANIMATION LOOP
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let animId: number;

    const onCardMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateGroupPosition();
    };

    container.addEventListener('mousemove', onCardMouseMove);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const isHov = hoverStateRef.current;
      const speedMultiplier = isHov ? 1.6 : 1.0;

      // Mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Knot rotation
      knotMesh.rotation.x = elapsed * 0.25 * speedMultiplier;
      knotMesh.rotation.y = elapsed * 0.35 * speedMultiplier;

      // Inner core counter rotation
      innerMesh.rotation.x = -elapsed * 0.4 * speedMultiplier;
      innerMesh.rotation.z = elapsed * 0.5 * speedMultiplier;

      // Ring rotations
      ring1.rotation.y = elapsed * 0.2 * speedMultiplier;
      ring2.rotation.y = -elapsed * 0.15 * speedMultiplier;

      // Particle drift
      particleSystem.rotation.y = elapsed * 0.08;

      // Interactive tilt
      group.rotation.x = mouseY * 0.35;
      group.rotation.y = mouseX * 0.45;

      // Hover glow pulse
      const targetEmissive = isHov ? 1.2 : 0.6;
      knotMat.emissiveIntensity = THREE.MathUtils.lerp(knotMat.emissiveIntensity, targetEmissive, 0.1);
      knotMat.opacity = THREE.MathUtils.lerp(knotMat.opacity, isHov ? 0.5 : 0.32, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onCardMouseMove);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      knotGeo.dispose();
      knotMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="freelance-3d-bg-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
};
