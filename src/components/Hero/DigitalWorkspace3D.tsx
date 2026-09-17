import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CosmicCore3D — A spectacular immersive 3D hero scene.
 *
 * Features:
 *  - Central morphing crystal (icosahedron with animated vertex displacement)
 *  - Dual wireframe shells rotating on independent axes
 *  - 5 orbiting "tech satellite" nodes representing the portfolio projects
 *  - Energy beam lines connecting satellites to the core (pulsing)
 *  - Massive particle galaxy (1200+ stars) with tri-color drift
 *  - Holographic grid floor with scroll-reactive undulation
 *  - Mouse parallax with spring-physics smoothing
 *  - Raycast hover glow + floating label on satellite nodes
 *  - CLICK on any satellite to open that project's case study
 */
interface DigitalWorkspace3DProps {
  onSatelliteClick?: (projectId: string) => void;
}

export const DigitalWorkspace3D: React.FC<DigitalWorkspace3DProps> = ({ onSatelliteClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 640;
    let height = container.clientHeight || 580;

    // --- Core setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.028);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 19);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ============================================================
    // 1. CENTRAL MORPHING CRYSTAL CORE
    // ============================================================
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Inner solid glowing icosahedron with vertex displacement
    const coreGeo = new THREE.IcosahedronGeometry(2.35, 4);
    const originalPositions = Float32Array.from(coreGeo.attributes.position.array);

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00ff9d,
      emissive: 0x00ff9d,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.15,
      flatShading: true,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Bright inner nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // Glow halo sprite around core
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const haloCtx = haloCanvas.getContext('2d')!;
    const haloGrad = haloCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    haloGrad.addColorStop(0, 'rgba(0, 255, 157, 0.55)');
    haloGrad.addColorStop(0.4, 'rgba(0, 255, 157, 0.18)');
    haloGrad.addColorStop(1, 'rgba(0, 255, 157, 0)');
    haloCtx.fillStyle = haloGrad;
    haloCtx.fillRect(0, 0, 256, 256);
    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.set(9, 9, 1);
    coreGroup.add(halo);

    // ============================================================
    // 2. DUAL WIREFRAME SHELLS
    // ============================================================
    const shell1Geo = new THREE.IcosahedronGeometry(3.4, 1);
    const shell1Mat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const shell1 = new THREE.Mesh(shell1Geo, shell1Mat);
    coreGroup.add(shell1);

    const shell2Geo = new THREE.OctahedronGeometry(4.2, 0);
    const shell2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const shell2 = new THREE.Mesh(shell2Geo, shell2Mat);
    coreGroup.add(shell2);

    // Equatorial orbit ring
    const orbitRingGeo = new THREE.TorusGeometry(3.0, 0.025, 16, 96);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.55,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    coreGroup.add(orbitRing);

    const orbitRing2Geo = new THREE.TorusGeometry(3.6, 0.018, 16, 96);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.x = Math.PI / 1.6;
    orbitRing2.rotation.y = Math.PI / 5;
    coreGroup.add(orbitRing2);

    // ============================================================
    // 3. ORBITING TECH SATELLITES (5 portfolio projects)
    // ============================================================
    interface Satellite {
      group: THREE.Group;
      mesh: THREE.Mesh;
      glow: THREE.Sprite;
      label: THREE.Sprite;
      projectId: string;
      labelBaseY: number;
      radius: number;
      speed: number;
      phase: number;
      tilt: number;
      yAmp: number;
      color: THREE.Color;
      hovered: boolean;
    }

    // Each satellite maps to a real portfolio project ID so clicking it
    // can open the corresponding case study modal.
    const satelliteConfigs = [
      { projectId: 'resumecraft', label: 'ResumeCraft', color: 0x00ff66, radius: 6.8, speed: 0.28, phase: 0, tilt: 0.3, yAmp: 0.6, shape: 'icosahedron' },
      { projectId: 'cloudlab', label: 'CloudLab', color: 0x38bdf8, radius: 7.4, speed: -0.22, phase: 1.2, tilt: -0.4, yAmp: 0.8, shape: 'octahedron' },
      { projectId: 'sih-3d-ulpin', label: 'SIH 3D ULPIN', color: 0x10b981, radius: 6.2, speed: 0.34, phase: 2.4, tilt: 0.6, yAmp: 0.5, shape: 'tetrahedron' },
      { projectId: 'skillsync', label: 'SkillSync', color: 0xa855f7, radius: 7.8, speed: -0.19, phase: 3.6, tilt: -0.2, yAmp: 0.9, shape: 'dodecahedron' },
      { projectId: 'hunarhub', label: 'HunarHub', color: 0xfbbf24, radius: 6.5, speed: 0.26, phase: 4.8, tilt: 0.5, yAmp: 0.7, shape: 'icosahedron' },
    ];

    const satellites: Satellite[] = [];

    // Build a radial-gradient glow sprite texture per satellite color
    const buildGlowSprite = (color: number) => {
      const r = (color >> 16) & 0xff;
      const g = (color >> 8) & 0xff;
      const b = color & 0xff;
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const cx = c.getContext('2d')!;
      const grad = cx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.25)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      cx.fillStyle = grad;
      cx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return new THREE.Sprite(mat);
    };

    satelliteConfigs.forEach((cfg) => {
      const satGroup = new THREE.Group();

      let geo: THREE.BufferGeometry;
      if (cfg.shape === 'octahedron') geo = new THREE.OctahedronGeometry(0.42, 0);
      else if (cfg.shape === 'tetrahedron') geo = new THREE.TetrahedronGeometry(0.5, 0);
      else if (cfg.shape === 'dodecahedron') geo = new THREE.DodecahedronGeometry(0.38, 0);
      else geo = new THREE.IcosahedronGeometry(0.42, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satGroup.add(mesh);

      // Wireframe overlay
      const wireGeo = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.8,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      satGroup.add(wire);

      const glowSprite = buildGlowSprite(cfg.color);
      glowSprite.scale.set(2.4, 2.4, 1);
      satGroup.add(glowSprite);

      // Floating text label (hidden until hovered)
      const buildLabelSprite = (text: string, color: number) => {
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 64;
        const cx = c.getContext('2d')!;
        cx.clearRect(0, 0, 256, 64);

        // Pill background
        const hex = '#' + color.toString(16).padStart(6, '0');
        cx.fillStyle = 'rgba(8, 12, 18, 0.88)';
        cx.beginPath();
        cx.roundRect(8, 14, 240, 36, 18);
        cx.fill();
        cx.strokeStyle = hex;
        cx.lineWidth = 1.5;
        cx.stroke();

        // Text
        cx.fillStyle = hex;
        cx.font = '700 22px "JetBrains Mono", monospace';
        cx.textAlign = 'center';
        cx.textBaseline = 'middle';
        cx.fillText(text.toUpperCase(), 128, 34);

        const tex = new THREE.CanvasTexture(c);
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          depthTest: false,
        });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(2.2, 0.55, 1);
        return sprite;
      };

      const labelSprite = buildLabelSprite(cfg.label, cfg.color);
      labelSprite.position.set(0, 1.1, 0);
      satGroup.add(labelSprite);

      masterGroup.add(satGroup);

      satellites.push({
        group: satGroup,
        mesh,
        glow: glowSprite,
        label: labelSprite,
        projectId: cfg.projectId,
        labelBaseY: 1.1,
        radius: cfg.radius,
        speed: cfg.speed,
        phase: cfg.phase,
        tilt: cfg.tilt,
        yAmp: cfg.yAmp,
        color: new THREE.Color(cfg.color),
        hovered: false,
      });
    });

    // ============================================================
    // 4. ENERGY BEAM LINES (satellites -> core)
    // ============================================================
    const beamMaterials: THREE.LineBasicMaterial[] = [];
    const beamLines: THREE.Line[] = [];

    satellites.forEach((sat) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      masterGroup.add(line);
      beamMaterials.push(mat);
      beamLines.push(line);
    });

    // ============================================================
    // 5. PARTICLE GALAXY
    // ============================================================
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 500 : 1200;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);

    const cMint = new THREE.Color(0x00ff9d);
    const cCyan = new THREE.Color(0x38bdf8);
    const cViolet = new THREE.Color(0xa855f7);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Distribute in a spherical galaxy shell
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      pPositions[i3 + 2] = r * Math.cos(phi);

      const roll = Math.random();
      const pick = roll < 0.5 ? cMint : roll < 0.75 ? cCyan : roll < 0.9 ? cViolet : cWhite;
      pColors[i3] = pick.r;
      pColors[i3 + 1] = pick.g;
      pColors[i3 + 2] = pick.b;

      pSizes[i] = Math.random() * 0.14 + 0.04;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ============================================================
    // 6. HOLOGRAPHIC GRID FLOOR
    // ============================================================
    const gridGeo = new THREE.PlaneGeometry(48, 48, 32, 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.1;
    grid.position.set(0, -7.5, -3);
    masterGroup.add(grid);

    // Secondary purple grid for depth layering
    const grid2Geo = new THREE.PlaneGeometry(60, 60, 20, 20);
    const grid2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.035,
    });
    const grid2 = new THREE.Mesh(grid2Geo, grid2Mat);
    grid2.rotation.x = -Math.PI / 2.1;
    grid2.position.set(0, -8.5, -6);
    masterGroup.add(grid2);

    // ============================================================
    // 7. LIGHTING
    // ============================================================
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const keyLight = new THREE.PointLight(0x00ff9d, 3.2, 50);
    keyLight.position.set(-10, 9, 12);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 2.4, 50);
    fillLight.position.set(10, -6, 12);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa855f7, 1.8, 40);
    rimLight.position.set(0, 4, -12);
    scene.add(rimLight);

    // ============================================================
    // 8. INTERACTION: Mouse parallax + raycast hover
    // ============================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let scrollY = 0;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-10, -10);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX = (x / width - 0.5) * 2;
      mouseY = (y / height - 0.5) * 2;

      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.22;

      pointer.x = mouseX;
      pointer.y = -mouseY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Click handler: raycast to detect which satellite was clicked
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      const clickPointer = new THREE.Vector2(x, y);

      raycaster.setFromCamera(clickPointer, camera);
      const satMeshes = satellites.map((s) => s.mesh);
      const intersects = raycaster.intersectObjects(satMeshes);
      if (intersects.length > 0 && onSatelliteClick) {
        const hitMesh = intersects[0].object;
        const sat = satellites.find((s) => s.mesh === hitMesh);
        if (sat) onSatelliteClick(sat.projectId);
      }
    };

    container.addEventListener('click', handleClick);

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

    // ============================================================
    // 9. ANIMATION LOOP
    // ============================================================
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Smooth spring-lerp master rotation
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.06;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.06;
      masterGroup.position.y = -scrollY * 0.0028;
      masterGroup.rotation.z = Math.sin(t * 0.3) * 0.015;

      // Morph the crystal vertices (breathing / pulsing)
      const positions = coreGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const noise = Math.sin(t * 1.4 + dist * 3) * 0.12 + Math.cos(t * 0.9 + oy * 2.5) * 0.08;
        const scale = 1 + noise;
        positions[i] = ox * scale;
        positions[i + 1] = oy * scale;
        positions[i + 2] = oz * scale;
      }
      coreGeo.attributes.position.needsUpdate = true;
      coreGeo.computeVertexNormals();

      // Core self-rotation
      coreMesh.rotation.y = t * 0.22;
      coreMesh.rotation.x = t * 0.15;

      // Nucleus pulse
      const pulse = 1 + Math.sin(t * 2.2) * 0.18;
      nucleus.scale.setScalar(pulse);

      // Halo breathing
      halo.scale.setScalar(9 + Math.sin(t * 1.1) * 0.6);
      haloMat.opacity = 0.7 + Math.sin(t * 1.3) * 0.15;

      // Shell rotations (independent)
      shell1.rotation.y = -t * 0.18;
      shell1.rotation.x = t * 0.12;
      shell2.rotation.y = t * 0.14;
      shell2.rotation.z = -t * 0.09;

      // Orbit rings
      orbitRing.rotation.z = t * 0.5;
      orbitRing2.rotation.z = -t * 0.4;
      orbitRing2.rotation.x = Math.PI / 1.6 + Math.sin(t * 0.4) * 0.2;

      // Satellites orbit
      let anyHovered = false;
      satellites.forEach((sat, idx) => {
        const angle = t * sat.speed + sat.phase;
        sat.group.position.x = Math.cos(angle) * sat.radius;
        sat.group.position.z = Math.sin(angle) * sat.radius;
        sat.group.position.y = Math.sin(t * 0.8 + sat.phase) * sat.yAmp + sat.tilt;

        sat.mesh.rotation.x = t * 0.6 + idx;
        sat.mesh.rotation.y = t * 0.8 + idx;

        // Hover scale + glow boost
        const targetScale = sat.hovered ? 1.5 : 1;
        sat.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        const glowScale = sat.hovered ? 3.6 : 2.4;
        sat.glow.scale.lerp(new THREE.Vector3(glowScale, glowScale, 1), 0.12);

        // Label fade + gentle bob when hovered
        const labelMat = sat.label.material as THREE.SpriteMaterial;
        const targetOpacity = sat.hovered ? 1 : 0;
        labelMat.opacity += (targetOpacity - labelMat.opacity) * 0.18;
        sat.label.position.y = sat.labelBaseY + Math.sin(t * 2.5 + idx) * 0.08;

        if (sat.hovered) anyHovered = true;
      });

      // Toggle pointer cursor when hovering a satellite
      container.style.cursor = anyHovered ? 'pointer' : 'default';

      // Raycast hover detection
      raycaster.setFromCamera(pointer, camera);
      const satMeshes = satellites.map((s) => s.mesh);
      const intersects = raycaster.intersectObjects(satMeshes);
      satellites.forEach((s) => {
        s.hovered = intersects.length > 0 && intersects[0].object === s.mesh;
      });

      // Update energy beam endpoints
      const corePos = new THREE.Vector3(0, 0, 0);
      satellites.forEach((sat, idx) => {
        const line = beamLines[idx];
        const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(0, corePos.x, corePos.y, corePos.z);
        posAttr.setXYZ(1, sat.group.position.x, sat.group.position.y, sat.group.position.z);
        posAttr.needsUpdate = true;

        // Pulsing opacity, brighter when satellite hovered
        const pulseVal = 0.12 + Math.sin(t * 2 + idx) * 0.08;
        beamMaterials[idx].opacity = sat.hovered ? 0.6 : pulseVal;
      });

      // Particle galaxy drift
      particles.rotation.y = t * 0.025;
      particles.rotation.x = t * 0.012;
      particleMat.opacity = 0.55 + Math.sin(t * 0.6) * 0.12;

      // Grid undulation
      gridMat.opacity = 0.06 + Math.sin(t * 1.0) * 0.02;
      grid2.rotation.z = t * 0.02;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // ============================================================
    // 10. CLEANUP
    // ============================================================
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      haloTexture.dispose();
      haloMat.dispose();
      shell1Geo.dispose();
      shell1Mat.dispose();
      shell2Geo.dispose();
      shell2Mat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      orbitRing2Geo.dispose();
      orbitRing2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      grid2Geo.dispose();
      grid2Mat.dispose();
      satellites.forEach((s) => {
        s.mesh.geometry.dispose();
        (s.mesh.material as THREE.Material).dispose();
      });
      beamLines.forEach((l) => {
        l.geometry.dispose();
      });
      beamMaterials.forEach((m) => m.dispose());
    };
  }, []);

  return <div className="workspace-3d-canvas" ref={mountRef} />;
};
