'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { asset } from '@/lib/site';

const texturePaths = [
  '/images/projects/griffin-it-thumb.webp',
  '/images/projects/desert-safari-dubai-thumb.webp',
  '/images/projects/artisan-technologies-thumb.webp'
];

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.4, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 2.15);
    scene.add(ambient);

    const loader = new THREE.TextureLoader();
    texturePaths.forEach((path, index) => {
      const texture = loader.load(asset(path));
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.96 });
      const geometry = new THREE.PlaneGeometry(2.7, 1.8, 18, 18);
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set((index - 1) * 1.48, index === 1 ? 0.3 : -0.12, -index * 0.25);
      plane.rotation.set(index === 1 ? 0.02 : -0.06, (index - 1) * 0.18, (index - 1) * -0.055);
      plane.userData = { baseY: plane.position.y, index };
      group.add(plane);
    });

    const ringGeometry = new THREE.TorusGeometry(2.5, 0.007, 12, 140);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.45 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.4;
    ring.position.y = -0.2;
    scene.add(ring);

    const dotGeometry = new THREE.BufferGeometry();
    const dotCount = 80;
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dots = new THREE.Points(
      dotGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.55 })
    );
    scene.add(dots);

    let frame;
    const pointer = { x: 0, y: 0 };

    const onPointerMove = (event) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);

    const animate = () => {
      const time = performance.now() * 0.001;
      group.rotation.y += ((pointer.x * 0.08) - group.rotation.y) * 0.05;
      group.rotation.x += ((-pointer.y * 0.035) - group.rotation.x) * 0.05;
      group.children.forEach((child) => {
        child.position.y = child.userData.baseY + Math.sin(time + child.userData.index) * 0.055;
      });
      ring.rotation.z = time * 0.12;
      dots.rotation.y = time * 0.025;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      ringGeometry.dispose();
      ringMaterial.dispose();
      dotGeometry.dispose();
      dots.material.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}
