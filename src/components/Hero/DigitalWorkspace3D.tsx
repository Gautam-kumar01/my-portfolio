import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DigitalWorkspace3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master Group for the entire digital command center
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 1. CORE WORKSPACE MONITOR (The Developer Console) ---
    const monitorGroup = new THREE.Group();
    masterGroup.add(monitorGroup);

    // Bezel Frame
    const bezelGeo = new THREE.BoxGeometry(7.2, 4.6, 0.28);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x121412,
      roughness: 0.35,
      metalness: 0.85,
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    monitorGroup.add(bezel);

    // Screen Texture via Dynamic Canvas
    const screenGeo = new THREE.PlaneGeometry(6.7, 4.1);
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 620;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Dark IDE Canvas Background
      ctx.fillStyle = '#080a08';
      ctx.fillRect(0, 0, 1024, 620);

      // Top IDE Window Bar
      ctx.fillStyle = '#141814';
      ctx.fillRect(0, 0, 1024, 52);

      // Window Control Dots
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath();
      ctx.arc(32, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(58, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#27c93f';
      ctx.beginPath();
      ctx.arc(84, 26, 8, 0, Math.PI * 2);
      ctx.fill();

      // Title Bar
      ctx.fillStyle = '#8a8a8a';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('gautam-kumar@digital-workshop:~/workspace/main.ts', 120, 33);

      // Line Numbers & Code Lines
      const codeLines = [
        { num: '01', text: '// Gautam Kumar — Full-Stack Developer & Builder', color: '#525252' },
        { num: '02', text: 'import { AI, Cloud, Geospatial3D } from "@digital/workshop";', color: '#a855f7' },
        { num: '03', text: '', color: '' },
        { num: '04', text: 'export async function buildDigitalProduct() {', color: '#00ff66' },
        { num: '05', text: '  const stack = await createSystem({', color: '#f5f5f5' },
        { num: '06', text: '    products: ["ResumeCraft", "CloudLab", "3D ULPIN GIS"],', color: '#3b82f6' },
        { num: '07', text: '    principles: ["Performance", "Real Utility", "Clean Code"],', color: '#10b981' },
        { num: '08', text: '    status: "Active & Shipping To Production"', color: '#f59e0b' },
        { num: '09', text: '  });', color: '#f5f5f5' },
        { num: '10', text: '  return stack.deployToInternet();', color: '#00ff66' },
        { num: '11', text: '}', color: '#f5f5f5' },
      ];

      let yOffset = 100;
      codeLines.forEach((line) => {
        if (line.num) {
          ctx.fillStyle = '#3a423a';
          ctx.font = '500 22px "JetBrains Mono", monospace';
          ctx.fillText(line.num, 28, yOffset);

          ctx.fillStyle = line.color || '#f5f5f5';
          ctx.fillText(line.text, 80, yOffset);
        }
        yOffset += 44;
      });

      // Status Pill at Bottom of Screen
      ctx.fillStyle = 'rgba(0, 255, 102, 0.12)';
      ctx.fillRect(40, 560, 944, 40);
      ctx.fillStyle = '#00ff66';
      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.fillText('● ENGINE: 60FPS WebGL • Full-Stack Cloud Environment Active', 60, 586);
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: 0.96,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.15;
    monitorGroup.add(screenMesh);

    // Glowing Bezel Edges
    const wireframeGeo = new THREE.EdgesGeometry(bezelGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.4,
    });
    const monitorEdges = new THREE.LineSegments(wireframeGeo, wireframeMat);
    monitorGroup.add(monitorEdges);

    // --- 2. FLOATING ELEMENTS REPRESENTING CORE PILLARS ---

    // A. [AI] Glowing Neural Node (Icosahedron with Orbiting Ring)
    const aiGroup = new THREE.Group();
    const icosaGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      wireframe: true,
      emissive: 0x00ff66,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
    });
    const aiMesh = new THREE.Mesh(icosaGeo, icosaMat);
    aiGroup.add(aiMesh);

    // AI Orbital Energy Ring
    const aiRingGeo = new THREE.TorusGeometry(1.7, 0.04, 16, 64);
    const aiRingMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.6,
    });
    const aiRing = new THREE.Mesh(aiRingGeo, aiRingMat);
    aiRing.rotation.x = Math.PI / 3;
    aiGroup.add(aiRing);

    aiGroup.position.set(-5.2, 3.0, 2.5);
    masterGroup.add(aiGroup);

    // B. [CLOUD] Container & Sandbox Platform (Torus Node)
    const cloudGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(1.3, 0.28, 16, 40);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4,
      metalness: 0.8,
    });
    const cloudMesh = new THREE.Mesh(torusGeo, torusMat);
    cloudGroup.add(cloudMesh);

    // Cloud Inner Core
    const cloudCoreGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const cloudCoreMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
    });
    const cloudCore = new THREE.Mesh(cloudCoreGeo, cloudCoreMat);
    cloudGroup.add(cloudCore);

    cloudGroup.position.set(5.4, 2.6, 2.0);
    masterGroup.add(cloudGroup);

    // C. [PROJECTS & 3D GIS] Spatial Cadastral Octahedron Crystal
    const gisGroup = new THREE.Group();
    const octaGeo = new THREE.OctahedronGeometry(1.2);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x10b981,
      emissiveIntensity: 0.35,
      metalness: 0.85,
    });
    const gisMesh = new THREE.Mesh(octaGeo, octaMat);
    gisGroup.add(gisMesh);

    gisGroup.position.set(4.8, -3.2, 3.2);
    masterGroup.add(gisGroup);

    // D. [CODE & WEB DEVELOPMENT] Floating Terminal Shard
    const shardGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const shardCanvas = document.createElement('canvas');
    shardCanvas.width = 360;
    shardCanvas.height = 220;
    const shardCtx = shardCanvas.getContext('2d');
    if (shardCtx) {
      shardCtx.fillStyle = 'rgba(10, 14, 10, 0.92)';
      shardCtx.fillRect(0, 0, 360, 220);
      shardCtx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
      shardCtx.lineWidth = 2;
      shardCtx.strokeRect(1, 1, 358, 218);

      shardCtx.fillStyle = '#00ff66';
      shardCtx.font = '12px "JetBrains Mono", monospace';
      shardCtx.fillText('// Web Development & APIs', 20, 32);

      shardCtx.fillStyle = '#8a8a8a';
      shardCtx.fillText('router.get("/api/v1/projects")', 20, 62);
      shardCtx.fillText('const res = await dispatch();', 20, 92);
      shardCtx.fillStyle = '#3b82f6';
      shardCtx.fillText('render(DOMTree.mount());', 20, 122);
      shardCtx.fillStyle = '#10b981';
      shardCtx.fillText('status: 200 OK (14ms)', 20, 152);
    }
    const shardTexture = new THREE.CanvasTexture(shardCanvas);
    const shardMat = new THREE.MeshBasicMaterial({
      map: shardTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const shardMesh = new THREE.Mesh(shardGeo, shardMat);
    shardMesh.position.set(-4.6, -2.8, 2.4);
    shardMesh.rotation.y = 0.28;
    masterGroup.add(shardMesh);

    // --- 3. GLOWING DATA NETWORK CONSTELLATION LINES ---
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.18,
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

    // --- 4. AMBIENT PARTICLE DUST FIELD ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 90 : 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i + 2] = (Math.random() - 0.5) * 18;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const greenKeyLight = new THREE.PointLight(0x00ff66, 1.8, 35);
    greenKeyLight.position.set(-8, 7, 10);
    scene.add(greenKeyLight);

    const blueFillLight = new THREE.PointLight(0x3b82f6, 1.4, 35);
    blueFillLight.position.set(8, -5, 10);
    scene.add(blueFillLight);

    // --- 6. MOUSE PARALLAX & SCROLL INTERACTION ---
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

      targetRotY = mouseX * 0.28;
      targetRotX = -mouseY * 0.22;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 550;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Smooth master rotation
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;

      // Scroll reaction
      masterGroup.position.y = -scrollY * 0.0035;
      masterGroup.rotation.z = Math.sin(t * 0.5) * 0.015;

      // AI Node floating & orbiting
      aiMesh.rotation.x = t * 0.45;
      aiMesh.rotation.y = t * 0.65;
      aiRing.rotation.z = t * 0.8;
      aiGroup.position.y = 3.0 + Math.sin(t * 1.6) * 0.28;

      // Cloud Node floating & rotating
      cloudMesh.rotation.x = t * 0.35;
      cloudMesh.rotation.y = t * 0.55;
      cloudGroup.position.y = 2.6 + Math.cos(t * 1.4) * 0.25;

      // GIS Node rotation
      gisMesh.rotation.y = t * 0.5;
      gisMesh.rotation.z = t * 0.35;
      gisGroup.position.y = -3.2 + Math.sin(t * 1.8) * 0.22;

      // Code Shard floating
      shardMesh.position.y = -2.8 + Math.cos(t * 1.5) * 0.2;

      // Particle Field slow drift
      particles.rotation.y = t * 0.025;
      particles.rotation.x = t * 0.018;

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
