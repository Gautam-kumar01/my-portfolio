import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DigitalWorkspace3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 640;
    let height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Master Group for entire 3D workspace
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 1. PERSPECTIVE CYBER GRID (Holographic Floor Plane) ---
    const gridGeo = new THREE.PlaneGeometry(36, 36, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const cyberGrid = new THREE.Mesh(gridGeo, gridMat);
    cyberGrid.rotation.x = -Math.PI / 2.2;
    cyberGrid.position.set(0, -6.5, -2);
    masterGroup.add(cyberGrid);

    // --- 2. HOLOGRAPHIC 3D MAIN WORKSPACE CONSOLE ---
    const monitorGroup = new THREE.Group();
    masterGroup.add(monitorGroup);

    // Bezel Frame with Obsidian Glass Material
    const bezelGeo = new THREE.BoxGeometry(7.4, 4.8, 0.25);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d12,
      roughness: 0.2,
      metalness: 0.9,
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    monitorGroup.add(bezel);

    // Glowing Holographic Screen Texture
    const screenGeo = new THREE.PlaneGeometry(6.9, 4.3);
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Obsidian Slate Screen Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
      bgGrad.addColorStop(0, '#070a0e');
      bgGrad.addColorStop(1, '#0a0e14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 640);

      // Cyber Grid Background on Screen
      ctx.strokeStyle = 'rgba(0, 255, 157, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= 1024; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 640);
        ctx.stroke();
      }
      for (let y = 0; y <= 640; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // Top IDE Window Bar
      ctx.fillStyle = '#0f141c';
      ctx.fillRect(0, 0, 1024, 56);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(0, 56);
      ctx.lineTo(1024, 56);
      ctx.stroke();

      // Window Control Dots with Cyber Glow
      const dots = [
        { color: '#ef4444', x: 32 },
        { color: '#f59e0b', x: 58 },
        { color: '#10b981', x: 84 },
      ];
      dots.forEach((d) => {
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, 28, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tab Title
      ctx.fillStyle = '#00ff9d';
      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.fillText('⚡ gautam@digital-workshop:~/portfolio/core.ts', 124, 35);

      // Active Branch Pill
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.roundRect(820, 14, 170, 28, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText('⑂ main [live]', 845, 33);

      // Syntax Highlighted Code Lines
      const codeLines = [
        { num: '01', text: '// Gautam Kumar — Full-Stack Developer & Product Builder', color: '#64748b' },
        { num: '02', text: 'import { AIATS, CloudKernel, Geospatial3D } from "@gautam/products";', color: '#a855f7' },
        { num: '03', text: '', color: '' },
        { num: '04', text: 'export async function initializeProduction() {', color: '#00ff9d' },
        { num: '05', text: '  const systems = await deployEcosystem({', color: '#f8fafc' },
        { num: '06', text: '    liveApp: "ResumeCraft (AI ATS Engine) • 100% Live",', color: '#38bdf8' },
        { num: '07', text: '    cloudLab: "Docker Web Sandbox + Isolated Execution",', color: '#00ff9d' },
        { num: '08', text: '    hackathons: "SIH Internal (3rd Rank) • Google Gen AI",', color: '#fbbf24' },
        { num: '09', text: '    craft: ["React", "TypeScript", "Node.js", "Three.js", "Python"]', color: '#f8fafc' },
        { num: '10', text: '  });', color: '#f8fafc' },
        { num: '11', text: '  return systems.launchToUniverse(); // Ready for real-world impact', color: '#10b981' },
        { num: '12', text: '}', color: '#00ff9d' },
      ];

      let yOffset = 104;
      codeLines.forEach((line) => {
        if (line.num) {
          ctx.fillStyle = '#475569';
          ctx.font = '500 20px "JetBrains Mono", monospace';
          ctx.fillText(line.num, 28, yOffset);

          ctx.fillStyle = line.color || '#f8fafc';
          ctx.font = '500 20px "JetBrains Mono", monospace';
          ctx.fillText(line.text, 78, yOffset);
        }
        yOffset += 40;
      });

      // Realtime Status Bar at Bottom
      ctx.fillStyle = 'rgba(0, 255, 157, 0.08)';
      ctx.beginPath();
      ctx.roundRect(30, 574, 964, 44, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 255, 157, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#00ff9d';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText('● SYSTEM STATUS: OPTIMAL (60 FPS) • READY TO BUILD & COLLABORATE', 54, 602);
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: 0.98,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.13;
    monitorGroup.add(screenMesh);

    // Glowing Cyan/Green Neon Bezel Edges
    const wireframeGeo = new THREE.EdgesGeometry(bezelGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.5,
    });
    const monitorEdges = new THREE.LineSegments(wireframeGeo, wireframeMat);
    monitorGroup.add(monitorEdges);

    // --- 3. FLOATING HOLOGRAPHIC SATELLITES (3D Tech Elements) ---

    // A. [AI Engine Node] Glowing Icosahedron + Dual Holographic Rings
    const aiGroup = new THREE.Group();
    const icosaGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x00ff9d,
      wireframe: true,
      emissive: 0x00ff9d,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
    });
    const aiMesh = new THREE.Mesh(icosaGeo, icosaMat);
    aiGroup.add(aiMesh);

    // Inner glowing sphere
    const aiCoreGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const aiCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
    });
    const aiCore = new THREE.Mesh(aiCoreGeo, aiCoreMat);
    aiGroup.add(aiCore);

    // Dual Rings
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.04, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    aiGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.2, 0.03, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    aiGroup.add(ring2);

    aiGroup.position.set(-5.6, 3.2, 2.5);
    masterGroup.add(aiGroup);

    // B. [Cloud & Sandbox Engine] Holographic Torus Knot
    const cloudGroup = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.28, 64, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.2,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    cloudGroup.add(knotMesh);

    cloudGroup.position.set(5.8, 2.8, 2.2);
    masterGroup.add(cloudGroup);

    // C. [3D GIS & Geospatial Diamond] Octahedron Crystal with Amber Accents
    const gisGroup = new THREE.Group();
    const octaGeo = new THREE.OctahedronGeometry(1.25, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x10b981,
      emissiveIntensity: 0.4,
      metalness: 0.9,
    });
    const gisMesh = new THREE.Mesh(octaGeo, octaMat);
    gisGroup.add(gisMesh);

    const gisRingGeo = new THREE.TorusGeometry(1.7, 0.03, 16, 48);
    const gisRingMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.6,
    });
    const gisRing = new THREE.Mesh(gisRingGeo, gisRingMat);
    gisRing.rotation.x = Math.PI / 2.5;
    gisGroup.add(gisRing);

    gisGroup.position.set(5.2, -3.4, 3.0);
    masterGroup.add(gisGroup);

    // D. [Full-Stack API & Terminal Glass Shard]
    const shardGeo = new THREE.PlaneGeometry(3.8, 2.3);
    const shardCanvas = document.createElement('canvas');
    shardCanvas.width = 380;
    shardCanvas.height = 230;
    const shardCtx = shardCanvas.getContext('2d');
    if (shardCtx) {
      shardCtx.fillStyle = 'rgba(10, 13, 18, 0.94)';
      shardCtx.fillRect(0, 0, 380, 230);
      shardCtx.strokeStyle = 'rgba(0, 255, 157, 0.4)';
      shardCtx.lineWidth = 2;
      shardCtx.strokeRect(1, 1, 378, 228);

      shardCtx.fillStyle = '#00ff9d';
      shardCtx.font = '700 13px "JetBrains Mono", monospace';
      shardCtx.fillText('// HIGH-SPEED API & DB CLUSTER', 20, 34);

      shardCtx.fillStyle = '#94a3b8';
      shardCtx.font = '12px "JetBrains Mono", monospace';
      shardCtx.fillText('POST /api/v1/sandbox/execute', 20, 68);
      shardCtx.fillText('Database: PostgreSQL [Active Connection]', 20, 98);
      shardCtx.fillStyle = '#38bdf8';
      shardCtx.fillText('Status: 200 OK • Latency: 12ms', 20, 128);
      shardCtx.fillStyle = '#00ff9d';
      shardCtx.fillText('✓ ATS Algorithm: 98% Match Rate', 20, 158);
      shardCtx.fillStyle = '#fbbf24';
      shardCtx.fillText('⚡ Production Verified Build', 20, 188);
    }
    const shardTexture = new THREE.CanvasTexture(shardCanvas);
    const shardMat = new THREE.MeshBasicMaterial({
      map: shardTexture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
    });
    const shardMesh = new THREE.Mesh(shardGeo, shardMat);
    shardMesh.position.set(-5.0, -3.0, 2.6);
    shardMesh.rotation.y = 0.32;
    masterGroup.add(shardMesh);

    // --- 4. DATA NETWORK CONSTELLATION LINES ---
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.22,
    });

    const createVectorLine = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      return new THREE.Line(geom, lineMat);
    };

    const origin = new THREE.Vector3(0, 0, 0);
    const l1 = createVectorLine(origin, aiGroup.position);
    const l2 = createVectorLine(origin, cloudGroup.position);
    const l3 = createVectorLine(origin, gisGroup.position);
    const l4 = createVectorLine(origin, shardMesh.position);
    masterGroup.add(l1, l2, l3, l4);

    // --- 5. 3D GLOWING PARTICLE MATRIX ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 120 : 360;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cMint = new THREE.Color(0x00ff9d);
    const cCyan = new THREE.Color(0x38bdf8);
    const cViolet = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 32;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;

      const pickColor = Math.random() < 0.6 ? cMint : Math.random() < 0.85 ? cCyan : cViolet;
      particleColors[i3] = pickColor.r;
      particleColors[i3 + 1] = pickColor.g;
      particleColors[i3 + 2] = pickColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 6. LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mintKeyLight = new THREE.PointLight(0x00ff9d, 2.2, 40);
    mintKeyLight.position.set(-9, 8, 12);
    scene.add(mintKeyLight);

    const cyanFillLight = new THREE.PointLight(0x38bdf8, 1.8, 40);
    cyanFillLight.position.set(9, -6, 12);
    scene.add(cyanFillLight);

    // --- 7. MOUSE PARALLAX & SCROLL INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX = (x / width - 0.5) * 2;
      mouseY = (y / height - 0.5) * 2;

      targetRotY = mouseX * 0.32;
      targetRotX = -mouseY * 0.24;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 640;
      height = container.clientHeight || 580;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Smooth master rotation with spring lerp
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.055;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.055;

      // Subtle scroll parallax reaction
      masterGroup.position.y = -scrollY * 0.0032;
      masterGroup.rotation.z = Math.sin(t * 0.4) * 0.018;

      // AI Node floating & dual ring orbit
      aiMesh.rotation.x = t * 0.45;
      aiMesh.rotation.y = t * 0.65;
      ring1.rotation.z = t * 0.9;
      ring2.rotation.x = -t * 0.7;
      aiGroup.position.y = 3.2 + Math.sin(t * 1.5) * 0.3;

      // Cloud Node floating & rotating
      knotMesh.rotation.x = t * 0.38;
      knotMesh.rotation.y = t * 0.52;
      cloudGroup.position.y = 2.8 + Math.cos(t * 1.3) * 0.26;

      // GIS Node rotation
      gisMesh.rotation.y = t * 0.48;
      gisMesh.rotation.z = t * 0.32;
      gisRing.rotation.z = t * 0.6;
      gisGroup.position.y = -3.4 + Math.sin(t * 1.7) * 0.24;

      // Code Shard floating
      shardMesh.position.y = -3.0 + Math.cos(t * 1.4) * 0.22;

      // Particle Field slow galactic drift
      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.02;

      // Cyber Grid undulating opacity
      gridMat.opacity = 0.07 + Math.sin(t * 1.2) * 0.025;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div className="workspace-3d-canvas" ref={mountRef} />;
};

