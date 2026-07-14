'use client';
import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

const POINT_COUNT = 520;
const SPHERE_RADIUS = 2.5;
const LINK_DISTANCE = 0.62; // max neighbor distance for a connection line
const MAX_LINKS_PER_POINT = 3;
const DRIFT_SPEED = 0.045; // rad/s — "almost feels alive", never busy
const POINTER_TILT = { x: 0.16, y: 0.1 }; // max pointer-steer in radians
const FADE_IN_SECONDS = 1.6;

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function spherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

/**
 * The hero's instanced-particle network sphere — echoes the OneSpheree mark.
 * One lightweight scene: a Points cloud + one LineSegments draw call, violet→blue
 * vertex colors read from the DS tokens. Pointer subtly steers the sphere (damped);
 * rendering pauses off-screen and the whole scene is disposed on unmount.
 * Under reduced motion a single static frame is drawn.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const css = getComputedStyle(document.documentElement);
    const violet = new Color(css.getPropertyValue('--violet-500').trim() || '#5B3DF0');
    const blue = new Color(css.getPropertyValue('--blue-500').trim() || '#1E9BE0');

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new Scene();
    // far enough back that the sphere reads as a sphere (brand echo), not a starfield
    const camera = new PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.z = 9.6;

    // — geometry: points with a top-left→bottom-right brand-gradient color ramp
    const positions = spherePoints(POINT_COUNT, SPHERE_RADIUS);
    const colors = new Float32Array(POINT_COUNT * 3);
    const tmp = new Color();
    for (let i = 0; i < POINT_COUNT; i++) {
      // gradient axis ≈ the logo's 135° violet→blue sweep
      const t = ((positions[i * 3] - positions[i * 3 + 1]) / (2 * SPHERE_RADIUS) + 1) / 2;
      tmp.copy(violet).lerp(blue, t);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    const pointGeo = new BufferGeometry();
    pointGeo.setAttribute('position', new BufferAttribute(positions, 3));
    pointGeo.setAttribute('color', new BufferAttribute(colors, 3));
    const pointMat = new PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    // — geometry: near-neighbor connection lines, one draw call
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const linkCounts = new Uint8Array(POINT_COUNT);
    for (let i = 0; i < POINT_COUNT; i++) {
      for (let j = i + 1; j < POINT_COUNT; j++) {
        if (linkCounts[i] >= MAX_LINKS_PER_POINT) break;
        if (linkCounts[j] >= MAX_LINKS_PER_POINT) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE * LINK_DISTANCE) {
          linkCounts[i]++;
          linkCounts[j]++;
          for (const k of [i, j]) {
            linePositions.push(positions[k * 3], positions[k * 3 + 1], positions[k * 3 + 2]);
            lineColors.push(colors[k * 3], colors[k * 3 + 1], colors[k * 3 + 2]);
          }
        }
      }
    }
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute('position', new BufferAttribute(new Float32Array(linePositions), 3));
    lineGeo.setAttribute('color', new BufferAttribute(new Float32Array(lineColors), 3));
    const lineMat = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const sphere = new Group();
    sphere.add(new Points(pointGeo, pointMat));
    sphere.add(new LineSegments(lineGeo, lineMat));
    sphere.rotation.x = 0.18;
    scene.add(sphere);

    const TARGET_OPACITY = { points: 0.85, lines: 0.14 };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      // final state, no motion
      pointMat.opacity = TARGET_OPACITY.points;
      lineMat.opacity = TARGET_OPACITY.lines;
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('resize', resize);
        pointGeo.dispose();
        lineGeo.dispose();
        pointMat.dispose();
        lineMat.dispose();
        renderer.dispose();
      };
    }

    // — pointer steer (damped in the loop, never snaps)
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // — render loop, paused while the hero is off-screen
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      elapsed += dt;

      const fade = Math.min(elapsed / FADE_IN_SECONDS, 1);
      const eased = 1 - Math.pow(1 - fade, 3);
      pointMat.opacity = TARGET_OPACITY.points * eased;
      lineMat.opacity = TARGET_OPACITY.lines * eased;

      sphere.rotation.y += DRIFT_SPEED * dt;
      const damp = 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
      sphere.rotation.z += (pointer.x * POINTER_TILT.x - sphere.rotation.z) * damp;
      sphere.rotation.x += (0.18 + pointer.y * POINTER_TILT.y - sphere.rotation.x) * damp;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      pointGeo.dispose();
      lineGeo.dispose();
      pointMat.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
