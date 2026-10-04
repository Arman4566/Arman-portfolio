import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* A low-poly Himalayan ridge line that scrolls toward the viewer, with a
   sunrise behind the far peaks and a floating crystal for the hero. */

const BG = 0x0b1020;

const hash = (x, y) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const noise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

const ridged = (x, y) => {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < 4; i++) {
    let n = 1 - Math.abs(2 * noise(x * freq, y * freq) - 1);
    n *= n;
    sum += n * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
};

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const heightAt = (x, z) => {
  const valley = smooth(3, 30, Math.abs(x));
  const base = ridged(x * 0.045, z * 0.045) * 21 + noise(x * 0.14, z * 0.14) * 2.5;
  return base * (0.07 + 0.93 * valley) - 1;
};

export default function Terrain() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch (err) {
      mount.classList.add('terrain--fallback');
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 24, 88);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 220);

    /* Terrain */
    const geo = new THREE.PlaneGeometry(130, 90, 104, 64);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const count = pos.count;
    const xs = new Float32Array(count);
    const zs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      xs[i] = pos.getX(i);
      zs[i] = pos.getZ(i);
    }
    const colors = new Float32Array(count * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const cLow = new THREE.Color(0x141d38);
    const cMid = new THREE.Color(0x2a3b6b);
    const cSnow = new THREE.Color(0xe6eefb);
    const tmp = new THREE.Color();

    const updateTerrain = (t) => {
      for (let i = 0; i < count; i++) {
        const h = heightAt(xs[i], zs[i] - t);
        pos.setY(i, h);
        const mid = smooth(1, 9, h);
        const snow = smooth(12.5, 18, h);
        tmp.copy(cLow).lerp(cMid, mid).lerp(cSnow, snow);
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
      pos.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
    };
    updateTerrain(0);

    const solidMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.95,
      metalness: 0,
    });
    const solid = new THREE.Mesh(geo, solidMat);
    solid.position.z = -25;
    solid.frustumCulled = false;

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8ec5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wire = new THREE.Mesh(geo, wireMat);
    wire.position.z = -25;
    wire.position.y = 0.04;
    wire.frustumCulled = false;
    scene.add(solid, wire);

    /* Sunrise behind the far ridge */
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffb347, fog: false });
    const sun = new THREE.Mesh(new THREE.CircleGeometry(11, 64), sunMat);
    sun.position.set(10, 15, -80);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffb347,
      transparent: true,
      opacity: 0.16,
      fog: false,
    });
    const halo = new THREE.Mesh(new THREE.CircleGeometry(24, 64), haloMat);
    halo.position.set(10, 15, -81);
    scene.add(sun, halo);

    /* Stars */
    const starCount = 260;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 220;
      starPos[i * 3 + 1] = 22 + Math.random() * 60;
      starPos[i * 3 + 2] = -85 - Math.random() * 20;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xdbe8ff, size: 0.55, fog: false, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* Lights */
    const hemi = new THREE.HemisphereLight(0x8ec5ff, 0x0b1020, 0.7);
    const warm = new THREE.DirectionalLight(0xffb347, 2.6);
    warm.position.set(12, 16, -60);
    const cool = new THREE.DirectionalLight(0x8ec5ff, 0.55);
    cool.position.set(-10, 12, 20);
    scene.add(hemi, warm, cool);

    /* Floating crystal with an orbit ring */
    const crystal = new THREE.Group();
    const crystalGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x8ec5ff,
      flatShading: true,
      roughness: 0.28,
      metalness: 0.25,
      emissive: 0x16335e,
      emissiveIntensity: 0.6,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    const edgeGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.9 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.scale.setScalar(1.002);
    const ringGeo = new THREE.TorusGeometry(3.7, 0.03, 8, 96);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb347 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.6;
    crystal.add(crystalMesh, edges, ring);
    scene.add(crystal);

    /* Sizing */
    const view = { w: 1, h: 1, aspect: 1 };
    const place = () => {
      const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 16 * view.aspect;
      const narrow = view.aspect < 1;
      crystal.position.x = narrow ? halfW * 0.45 : halfW * 0.52;
      crystal.userData.baseY = narrow ? 11 : 8.2;
      crystal.scale.setScalar(narrow ? 0.62 : 1);
    };
    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      view.w = w;
      view.h = h;
      view.aspect = w / h;
      renderer.setSize(w, h, false);
      camera.aspect = view.aspect;
      camera.updateProjectionMatrix();
      place();
      if (reduceMotion) draw();
    };

    /* Input */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let scrollP = 0;
    const onScroll = () => {
      scrollP = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4);
      mount.style.opacity = String(Math.max(0.22, 1 - scrollP * 0.85));
      if (reduceMotion) draw();
    };

    const look = new THREE.Vector3();
    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      camera.position.set(pointer.x * 2.6, 6 + scrollP * 5.5 - pointer.y * 0.9, 16);
      look.set(pointer.x * 0.8, 4.2 - scrollP * 4, -30);
      camera.lookAt(look);
      renderer.render(scene, camera);
    };

    let raf = 0;
    let last = performance.now();
    let travel = 0;
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      travel += dt * 3.2;
      updateTerrain(travel);
      crystal.rotation.y += dt * 0.5;
      crystal.rotation.x = Math.sin(now / 2600) * 0.18;
      ring.rotation.z += dt * 0.35;
      crystal.position.y = (crystal.userData.baseY || 8) + Math.sin(now / 1700) * 0.45;
      stars.rotation.z = Math.sin(now / 24000) * 0.02;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();
    onScroll();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    crystal.position.y = crystal.userData.baseY || 8;
    if (reduceMotion) draw();
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      [geo, starGeo, crystalGeo, edgeGeo, ringGeo, sun.geometry, halo.geometry].forEach((g) => g.dispose());
      [solidMat, wireMat, sunMat, haloMat, starMat, crystalMat, edgeMat, ringMat].forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="terrain" aria-hidden="true" />;
}
