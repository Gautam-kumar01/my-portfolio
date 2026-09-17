import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobalCosmicCanvas3D — Clean, Elegant, Ultra-Smooth 3D Fluid Astra Background
 *
 * Design:
 * - Minimal, high-end Apple / OpenAI aesthetic
 * - Single mesmerizing, organic morphing iridescent Astra orb
 * - Gentle ambient stardust with smooth depth
 * - Subtle undulating aurora wave beneath the content
 * - Damped, silky mouse parallax & smooth scroll responsiveness
 */
export const GlobalCosmicCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ==========================================
    // 2. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLightMint = new THREE.PointLight(0x00ff9d, 3.2, 40);
    keyLightMint.position.set(10, 12, 12);
    masterGroup.add(keyLightMint);

    const keyLightCyan = new THREE.PointLight(0x00e5ff, 2.8, 40);
    keyLightCyan.position.set(-12, -8, 10);
    masterGroup.add(keyLightCyan);

    const keyLightViolet = new THREE.PointLight(0xa855f7, 2.2, 35);
    keyLightViolet.position.set(0, -18, 8);
    masterGroup.add(keyLightViolet);

    // ==========================================
    // 3. ASTRA MORPHING FLUID ORB (SMOOTH & CLEAN)
    // ==========================================
    // High subdivision smooth sphere for fluid organic curvature
    const orbRadius = 4.2;
    const orbGeo = new THREE.IcosahedronGeometry(orbRadius, 5);
    const posAttr = orbGeo.attributes.position as THREE.BufferAttribute;
    const normAttr = orbGeo.attributes.normal as THREE.BufferAttribute;

    const origPositions = new Float32Array(posAttr.array);
    const origNormals = new Float32Array(normAttr.array);
    const vertexCount = origPositions.length / 3;

    // Translucent Iridescent Fluid Material
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x00ff9d,
      emissive: 0x003322,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    // Position comfortably behind hero/content on the right
    orbMesh.position.set(8, 2, -6);
    masterGroup.add(orbMesh);

    // Outer Ethereal Wireframe Veil
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(orbGeo.clone(), wireMat);
    orbMesh.add(wireMesh);

    // Orbital Glow Ring around Astra Orb
    const ringGeo = new THREE.BufferGeometry();
    const ringCount = 380;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const r = orbRadius * 1.5 + (Math.random() - 0.5) * 0.4;
      ringPositions[i * 3] = Math.cos(angle) * r;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      ringPositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing = new THREE.Points(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 4;
    orbitalRing.rotation.z = Math.PI / 6;
    orbMesh.add(orbitalRing);

    // ==========================================
    // 4. CALM, SUBTLE AMBIENT STARDUST (900 PARTICLES)
    // ==========================================
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cMint = new THREE.Color(0x00ff9d);
    const cCyan = new THREE.Color(0x00e5ff);
    const cViolet = new THREE.Color(0xa855f7);
    const cWhite = new THREE.Color(0xffffff);
    const palette = [cMint, cCyan, cViolet, cWhite];

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = 30 - Math.random() * 140;
      const z = -20 + Math.random() * 25;

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const pick = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = pick.r;
      starColors[i * 3 + 1] = pick.g;
      starColors[i * 3 + 2] = pick.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    masterGroup.add(starField);

    // ==========================================
    // 5. UNDULATING 3D AURORA WAVE MATRIX
    // ==========================================
    const waveCountX = 45;
    const waveCountZ = 45;
    const totalWave = waveCountX * waveCountZ;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(totalWave * 3);
    const waveColors = new Float32Array(totalWave * 3);
    const originalY = new Float32Array(totalWave);

    const spacing = 1.8;
    const offsetX = (waveCountX * spacing) / 2;
    const offsetZ = (waveCountZ * spacing) / 2;
    let wIdx = 0;

    for (let ix = 0; ix < waveCountX; ix++) {
      for (let iz = 0; iz < waveCountZ; iz++) {
        const x = ix * spacing - offsetX;
        const z = iz * spacing - offsetZ;
        const dist = Math.sqrt(x * x + z * z);
        const y = -14 + Math.sin(dist * 0.12) * 1.5;

        wavePos[wIdx * 3] = x;
        wavePos[wIdx * 3 + 1] = y;
        wavePos[wIdx * 3 + 2] = z;
        originalY[wIdx] = y;

        const ratio = Math.min(dist / (offsetX * 1.1), 1);
        const pCol = cMint.clone().lerp(cCyan, ratio * 0.7).lerp(cViolet, ratio);
        waveColors[wIdx * 3] = pCol.r;
        waveColors[wIdx * 3 + 1] = pCol.g;
        waveColors[wIdx * 3 + 2] = pCol.b;
        wIdx++;
      }
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    wavePoints.rotation.x = 0.35;
    masterGroup.add(wavePoints);

    // ==========================================
    // 6. INTERACTION & SMOOTH LERP
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let isVisible = true;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onResize = () => {
      if (!container) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ==========================================
    // 7. 60 FPS ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth damped lerp
      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;
      scrollY += (targetScrollY - scrollY) * 0.06;

      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollProgress = scrollY / docHeight;

      // Smooth camera position
      const targetCamY = 0 - scrollProgress * 75;
      camera.position.y = targetCamY + mouseY * 1.2;
      camera.position.x = mouseX * 1.8;
      camera.lookAt(0, targetCamY, 0);

      wavePoints.position.y = targetCamY - 6;

      // 1. ASTRA MORPHING DEFORMATION (Smooth Harmonic Noise, Zero Cracking)
      const curPositions = orbGeo.attributes.position as THREE.BufferAttribute;
      const array = curPositions.array as Float32Array;

      for (let i = 0; i < vertexCount; i++) {
        const ox = origPositions[i * 3];
        const oy = origPositions[i * 3 + 1];
        const oz = origPositions[i * 3 + 2];

        const nx = origNormals[i * 3];
        const ny = origNormals[i * 3 + 1];
        const nz = origNormals[i * 3 + 2];

        const h1 =
          Math.sin(ox * 0.45 + elapsed * 1.2) *
          Math.cos(oy * 0.45 + elapsed * 1.0) *
          Math.sin(oz * 0.45 + elapsed * 0.8);

        const h2 = Math.sin((ox + oz) * 0.3 + elapsed * 0.7) * 0.4;
        const displacement = (h1 + h2) * 0.55;

        array[i * 3] = ox + nx * displacement;
        array[i * 3 + 1] = oy + ny * displacement;
        array[i * 3 + 2] = oz + nz * displacement;
      }

      curPositions.needsUpdate = true;
      orbGeo.computeVertexNormals();

      // Gentle continuous rotation
      orbMesh.rotation.y = elapsed * 0.15;
      orbMesh.rotation.x = Math.sin(elapsed * 0.1) * 0.15;
      wireMesh.rotation.y = -elapsed * 0.1;
      orbitalRing.rotation.y = elapsed * 0.25;

      // Parallax rotation
      masterGroup.rotation.y = mouseX * 0.05;
      masterGroup.rotation.x = -mouseY * 0.035;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      orbGeo.dispose();
      orbMat.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="global-cosmic-canvas-3d"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};
