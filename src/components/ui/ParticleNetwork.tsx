"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  // Generate particles
  const particles = useMemo(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 150 : 300;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities, count };
  }, []);

  // Generate line connections
  const lineGeometry = useMemo(() => {
    const linePositions: number[] = [];
    const threshold = 3.5;

    for (let i = 0; i < particles.count; i++) {
      for (let j = i + 1; j < particles.count; j++) {
        const dx = particles.positions[i * 3] - particles.positions[j * 3];
        const dy = particles.positions[i * 3 + 1] - particles.positions[j * 3 + 1];
        const dz = particles.positions[i * 3 + 2] - particles.positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < threshold) {
          linePositions.push(
            particles.positions[i * 3],
            particles.positions[i * 3 + 1],
            particles.positions[i * 3 + 2],
            particles.positions[j * 3],
            particles.positions[j * 3 + 1],
            particles.positions[j * 3 + 2]
          );
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    return geometry;
  }, [particles]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Apply mouse parallax with damping
      groupRef.current.rotation.x = mouseRef.current.y * 0.15;
      groupRef.current.rotation.y = mouseRef.current.x * 0.15;

      // Slow ambient rotation
      groupRef.current.rotation.z += 0.0003;

      // Animate particles
      const pointsRef = groupRef.current.children[0] as THREE.Points;
      const positions = pointsRef.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particles.count; i++) {
        positions[i * 3] += particles.velocities[i * 3];
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2];

        // Boundary check with soft return
        if (Math.abs(positions[i * 3]) > 12) particles.velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 12) particles.velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 12) particles.velocities[i * 3 + 2] *= -1;
      }

      pointsRef.geometry.attributes.position.needsUpdate = true;
    }
  });

  const { theme } = useTheme();
  const activeColor = theme === "light" ? "#475569" : "#E2E8F0";

  return (
    <group ref={groupRef}>
      <Points positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={activeColor}
          size={theme === "light" ? 0.09 : 0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === "light" ? 0.85 : 0.5}
        />
      </Points>

      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={activeColor}
          transparent
          opacity={theme === "light" ? 0.35 : 0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function ParticleNetwork() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
