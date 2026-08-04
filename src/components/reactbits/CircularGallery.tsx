'use client';

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

type GL = Renderer['gl'];

export interface GalleryItem {
  image: string;
  title: string;
  subtitle?: string;
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(
  gl: GL,
  item: GalleryItem,
  textColor = '#ffffff'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');

  // Hardcoded dimensions for a rich card layout
  canvas.width = 1024;
  canvas.height = 1024;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // We align text to the bottom of the canvas, pushing it upwards
  context.textAlign = 'center';
  context.textBaseline = 'bottom';
  
  const centerX = canvas.width / 2;
  let currentY = canvas.height - 40; // Start near the bottom

  // 1. Subtitle
  if (item.subtitle) {
    context.font = '300 30px Inter, sans-serif';
    context.fillStyle = '#a1a1aa'; // zinc-400
    if ('letterSpacing' in context) {
      (context as any).letterSpacing = '1px';
    }
    context.fillText(item.subtitle, centerX, currentY);
    currentY -= 50;
  }

  // 2. Title
  context.font = 'bold 120px "Bebas Neue", sans-serif';
  context.fillStyle = textColor;
  if ('letterSpacing' in context) {
    (context as any).letterSpacing = '4px';
  }
  context.fillText(item.title.toUpperCase(), centerX, currentY);

  const texture = new Texture(gl, { generateMipmaps: true });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  item: GalleryItem;
  textColor?: string;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  item: GalleryItem;
  textColor: string;
  mesh!: Mesh;

  constructor({ gl, plane, renderer, item, textColor = '#ffffff' }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.item = item;
    this.textColor = textColor;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.item, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uHover;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          
          // The title is always visible. We just brighten it slightly on hover.
          gl_FragColor = vec4(color.rgb + (uHover * 0.1), color.a);
        }
      `,
      uniforms: { 
        tMap: { value: texture },
        uHover: { value: 0 }
      },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    
    // Size relative to the plane
    const textHeightScaled = this.plane.scale.y * 1.0; 
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    
    // Position overlapping the bottom of the image
    this.mesh.position.y = 0; 
    this.mesh.position.z = 0.1; // slightly in front
    this.mesh.setParent(this.plane);
  }
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  item: GalleryItem;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
}

class Media {
  extra = 0;
  geometry: Plane;
  gl: GL;
  item: GalleryItem;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale = 1;
  padding = 0;
  width = 0;
  widthTotal = 0;
  x = 0;
  speed = 0;
  isBefore = false;
  isAfter = false;
  
  // Hover tracking
  hoverState = 0; 
  targetHover = 0;

  constructor({
    geometry,
    gl,
    item,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.item = item;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uHover;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          
          // Cinematic curve
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          
          // Lift on hover
          p.y += uHover * 0.2; 
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uHover;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Brighten on hover
          color.rgb += uHover * 0.15;
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
        uHover: { value: 0 },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.item.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      item: this.item,
      textColor: this.textColor,
    });
  }

  update(
    scroll: { current: number; last: number },
    direction: 'right' | 'left',
    pointerX: number,
    pointerY: number,
    isMobile: boolean
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Hover logic: Calculate screen space position (roughly)
    // Pointer is -1 to 1. World X is -viewport.width/2 to viewport.width/2
    // We'll normalize plane X to -1 to 1
    const normalizedPlaneX = this.plane.position.x / (this.viewport.width / 2);
    // Width of plane in normalized coordinates
    const normalizedHalfWidth = (this.plane.scale.x / 2) / (this.viewport.width / 2);
    
    let isHovered = false;
    if (isMobile) {
      // On mobile, the center item is "hovered"
      isHovered = Math.abs(normalizedPlaneX) < normalizedHalfWidth * 0.8;
    } else {
      // On desktop, check mouse intersection
      // We check X and Y bounds of the plane
      // The Y check is approximate as we are dealing with a bent gallery
      const normalizedHalfHeight = (this.plane.scale.y / 2) / (this.viewport.height / 2);
      isHovered = Math.abs(pointerX - normalizedPlaneX) < normalizedHalfWidth && Math.abs(pointerY) < normalizedHalfHeight;
    }

    this.targetHover = isHovered ? 1 : 0;
    this.hoverState = lerp(this.hoverState, this.targetHover, 0.1);
    
    // Apply hover uniforms
    this.program.uniforms.uHover.value = this.hoverState;
    if (this.title && this.title.mesh) {
      this.title.mesh.program.uniforms.uHover.value = this.hoverState;
    }
    
    // Scale up on hover natively
    const baseScaleY = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    const baseScaleX = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    const currentScale = 1.0 + (0.02 * this.hoverState); // max scale(1.02)
    this.plane.scale.set(baseScaleX * currentScale, baseScaleY * currentScale, 1);

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport, isMobile }: { screen?: ScreenSize; viewport?: Viewport, isMobile?: boolean } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    
    // Adjust base scale for mobile
    this.scale = isMobile ? (this.screen.height / 1000) : (this.screen.height / 1500);
    
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2; // Keep tight spacing
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
  paused?: boolean;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  
  isVisible = false;
  paused = false;
  onItemClick?: (index: number) => void;
  observer!: IntersectionObserver;
  pointer = { x: -2, y: -2 }; // -2 is offscreen
  isMobile = false;

  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  isDown = false;
  start = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 3,
      textColor = '#ffffff',
      borderRadius = 0.05,
      scrollSpeed = 2,
      scrollEase = 0.05,
      paused = false,
      onItemClick
    }: AppConfig
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.paused = paused;
    this.onItemClick = onItemClick;
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius);
    this.setupObserver();
    this.addEventListeners();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.raf) {
          this.update(); // Resume loop
        }
      });
    }, { rootMargin: '100px' });
    this.observer.observe(this.container);
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: GalleryItem[],
    bend: number,
    textColor: string,
    borderRadius: number
  ) {
    if (!items || items.length === 0) return;
    
    // Duplicate to ensure smooth infinite scroll
    this.mediasImages = [...items, ...items];
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        item: data,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.container.style.cursor = 'grabbing';
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    // Update pointer for hover detection
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Normalize to -1 -> 1 based on container
    const rect = this.container.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    if (!this.isDown) return;
    
    const distance = (this.start - clientX) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    this.isDown = false;
    this.container.style.cursor = 'grab';
    
    // Check if this was a click rather than a drag
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    if (Math.abs(clientX - this.start) < 5) {
      if (this.onItemClick && this.medias) {
        // Find the hovered item
        const hoveredMedia = this.medias.find(m => m.targetHover === 1);
        if (hoveredMedia) {
          // Calculate the original index in the un-duplicated array
          const originalLength = this.medias.length / 2;
          const originalIndex = hoveredMedia.index % originalLength;
          this.onItemClick(originalIndex);
        }
      }
    }
    
    this.onCheck();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.isMobile = this.screen.width < 768;
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      // Reduce bend on mobile for tighter view
      const activeBend = this.isMobile ? 1 : 3;
      this.medias.forEach((media) => {
        media.bend = activeBend;
        media.onResize({ screen: this.screen, viewport: this.viewport, isMobile: this.isMobile });
      });
    }
  }

  update() {
    if (!this.isVisible || this.paused) {
      this.raf = 0; // Stop loop
      return;
    }
    
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    
    if (this.medias) {
      this.medias.forEach((media) => 
        media.update(this.scroll, direction, this.pointer.x, this.pointer.y, this.isMobile)
      );
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    window.addEventListener('resize', this.boundOnResize);
    
    // Bind interaction exclusively to the container, protecting global scroll
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    this.container.addEventListener('mousemove', this.boundOnTouchMove);
    this.container.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('mouseleave', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    this.container.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    this.container.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    this.isVisible = false;
    window.cancelAnimationFrame(this.raf);
    this.observer?.disconnect();
    
    window.removeEventListener('resize', this.boundOnResize);
    if (this.container) {
      this.container.removeEventListener('mousedown', this.boundOnTouchDown);
      this.container.removeEventListener('mousemove', this.boundOnTouchMove);
      this.container.removeEventListener('mouseup', this.boundOnTouchUp);
      this.container.removeEventListener('mouseleave', this.boundOnTouchUp);
      this.container.removeEventListener('touchstart', this.boundOnTouchDown);
      this.container.removeEventListener('touchmove', this.boundOnTouchMove);
      this.container.removeEventListener('touchend', this.boundOnTouchUp);
    }
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
  paused?: boolean;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  onItemClick,
  paused = false,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | undefined>(undefined);
  const onItemClickRef = useRef(onItemClick);

  // Keep callback fresh
  useEffect(() => {
    onItemClickRef.current = onItemClick;
  }, [onItemClick]);

  // Handle paused state dynamically
  useEffect(() => {
    if (appRef.current) {
      appRef.current.paused = paused;
      if (!paused && appRef.current.isVisible && !appRef.current.raf) {
        appRef.current.update();
      }
    }
  }, [paused]);
  
  useEffect(() => {
    if (!containerRef.current || !items || items.length === 0) return;
    
    // Only animate if user prefers motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollSpeed: prefersReducedMotion ? 0 : scrollSpeed,
      scrollEase,
      paused,
      onItemClick: (idx) => onItemClickRef.current?.(idx)
    });
    
    appRef.current = app;
    
    return () => {
      app.destroy();
      appRef.current = undefined;
    };
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      role="presentation"
      aria-hidden="true"
    />
  );
}
