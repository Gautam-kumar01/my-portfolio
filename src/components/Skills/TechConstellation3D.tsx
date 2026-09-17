import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface TechConstellation3DProps {
  hoveredSkillName: string | null;
  onSkillHover: (skill: { name: string; category: string; linkedProjects: string[] } | null) => void;
  onSelectProject: (projectId: string) => void;
}

interface NodeData {
  name: string;
  category: string;
  linkedProjects: string[];
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
  color: number;
}

export const TechConstellation3D: React.FC<TechConstellation3DProps> = ({
  hoveredSkillName,
  onSkillHover,
  onSelectProject,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<NodeData[]>([]);
  const linesGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master Group
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Lines Group
    const linesGroup = new THREE.Group();
    constellationGroup.add(linesGroup);
    linesGroupRef.current = linesGroup;

    // Colors per category
    const categoryColors: Record<string, number> = {
      Frontend: 0x00ff66,
      Backend: 0x3b82f6,
      Database: 0x10b981,
      AI: 0xa855f7,
      'Cloud / DevOps': 0x60a5fa,
      'Data / Analytics': 0xf59e0b,
      Tools: 0x94a3b8,
    };

    // Extract unique skills
    const rawSkillsMap = new Map<string, { category: string; linkedProjects: string[] }>();
    PORTFOLIO_DATA.skillGroups.forEach((group) => {
      group.skills.forEach((s) => {
        if (!rawSkillsMap.has(s.name)) {
          rawSkillsMap.set(s.name, {
            category: group.category,
            linkedProjects: s.linkedProjects,
          });
        }
      });
    });

    const uniqueSkills = Array.from(rawSkillsMap.entries()).map(([name, data]) => ({
      name,
      category: data.category,
      linkedProjects: data.linkedProjects,
    }));

    // Sphere distribution geometry
    const nodes: NodeData[] = [];
    const total = uniqueSkills.length;
    const radius = 9.5;

    // Project hub positions in 3D
    const projectPositions: Record<string, THREE.Vector3> = {
      resumecraft: new THREE.Vector3(-6, 4, 1),
      cloudlab: new THREE.Vector3(6, 3.5, 0),
      'sih-3d-ulpin': new THREE.Vector3(0, -5.5, 2),
      skillsync: new THREE.Vector3(-5, -3, -2),
      hunarhub: new THREE.Vector3(5, -3, -1),
    };

    // Project nodes
    const projectMeshes: { id: string; mesh: THREE.Mesh }[] = [];
    Object.entries(projectPositions).forEach(([pid, pos]) => {
      const pGeo = new THREE.OctahedronGeometry(0.55, 0);
      const pMat = new THREE.MeshBasicMaterial({
        color: pid === 'resumecraft' ? 0x00ff66 : pid === 'cloudlab' ? 0x3b82f6 : 0x10b981,
        wireframe: true,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.copy(pos);
      constellationGroup.add(pMesh);
      projectMeshes.push({ id: pid, mesh: pMesh });
    });

    // Create 3D Nodes for each skill
    uniqueSkills.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi) * 0.7;
      const pos = new THREE.Vector3(x, y, z);

      const color = categoryColors[skill.category] || 0x00ff66;

      // Inner Core Node
      const nodeGeo = new THREE.SphereGeometry(0.38, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(pos);

      // Glow Halo
      const glowGeo = new THREE.SphereGeometry(0.58, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      mesh.add(glowMesh);

      constellationGroup.add(mesh);

      nodes.push({
        name: skill.name,
        category: skill.category,
        linkedProjects: skill.linkedProjects,
        position: pos,
        mesh,
        glowMesh,
        color,
      });
    });

    nodesRef.current = nodes;

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff66, 2, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // Background Particle Starfield
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 280;
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 45;
      particlePos[p + 1] = (Math.random() - 0.5) * 45;
      particlePos[p + 2] = (Math.random() - 0.5) * 30;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x88ffaa,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
    });
    const starfield = new THREE.Points(particlesGeo, particlesMat);
    scene.add(starfield);

    // Raycasting & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleContainerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      onSkillHover(null);
      isHovered = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hit = nodes.find((n) => n.mesh === intersects[0].object);
        if (hit && hit.linkedProjects.length > 0) {
          onSelectProject(hit.linkedProjects[0]);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleContainerLeave);
    container.addEventListener('click', handleClick);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle orbital rotation
      if (!isHovered) {
        constellationGroup.rotation.y = elapsed * 0.08;
        constellationGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.08;
      }

      // Rotate project hub polyhedrons
      projectMeshes.forEach((pm, idx) => {
        pm.mesh.rotation.x += 0.015;
        pm.mesh.rotation.y += 0.02;
        pm.mesh.position.y += Math.sin(elapsed * 1.5 + idx) * 0.003;
      });

      // Raycasting check
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hit = nodes.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          isHovered = true;
          onSkillHover({
            name: hit.name,
            category: hit.category,
            linkedProjects: hit.linkedProjects,
          });

          // Scale hovered node
          hit.mesh.scale.set(1.4, 1.4, 1.4);
          (hit.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2;
        }
      } else if (isHovered && !hoveredSkillName) {
        isHovered = false;
        onSkillHover(null);
        nodes.forEach((n) => {
          n.mesh.scale.set(1, 1, 1);
          (n.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Window resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleContainerLeave);
      container.removeEventListener('click', handleClick);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSkillHover, onSelectProject]);

  // Synchronize external hover (from skill card list) with 3D nodes
  useEffect(() => {
    if (!linesGroupRef.current) return;
    const linesGroup = linesGroupRef.current;

    // Clear previous connecting laser lines
    while (linesGroup.children.length > 0) {
      linesGroup.remove(linesGroup.children[0]);
    }

    if (!hoveredSkillName) {
      nodesRef.current.forEach((n) => {
        n.mesh.scale.set(1, 1, 1);
        (n.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        n.glowMesh.scale.set(1, 1, 1);
      });
      return;
    }

    const activeNode = nodesRef.current.find((n) => n.name === hoveredSkillName);
    if (!activeNode) return;

    // Scale up active node
    activeNode.mesh.scale.set(1.45, 1.45, 1.45);
    (activeNode.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5;
    activeNode.glowMesh.scale.set(1.5, 1.5, 1.5);

    // Draw laser connection lines to connected project hubs
    const projectPositions: Record<string, THREE.Vector3> = {
      resumecraft: new THREE.Vector3(-6, 4, 1),
      cloudlab: new THREE.Vector3(6, 3.5, 0),
      'sih-3d-ulpin': new THREE.Vector3(0, -5.5, 2),
      skillsync: new THREE.Vector3(-5, -3, -2),
      hunarhub: new THREE.Vector3(5, -3, -1),
    };

    activeNode.linkedProjects.forEach((pid) => {
      const targetPos = projectPositions[pid];
      if (!targetPos) return;

      const points = [activeNode.position, targetPos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00ff66,
        transparent: true,
        opacity: 0.85,
        linewidth: 2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);
    });
  }, [hoveredSkillName]);

  return (
    <div className="constellation-3d-canvas-wrapper" ref={mountRef}>
      <div className="constellation-hud-overlay">
        <div className="hud-badge font-mono">
          <span className="status-dot" />
          <span>INTERACTIVE 3D CONSTELLATION • HOVER OR CLICK NODES</span>
        </div>
      </div>
    </div>
  );
};
