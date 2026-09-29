/**
 * Small helper around Three.js for the interactive models on this site.
 * Handles renderer creation, sizing, visibility-aware animation, theme colours, and cleanup.
 */
export type ThreeModule = typeof import('three');
type Renderer = import('three').WebGLRenderer;
type Scene = import('three').Scene;
type OrthographicCamera = import('three').OrthographicCamera;
type PerspectiveCamera = import('three').PerspectiveCamera;

export interface SceneHostOptions {
  camera: 'orthographic' | 'perspective';
  /** Vertical world units visible for an orthographic camera. */
  viewSize?: number;
  fov?: number;
  shadows?: boolean;
  /** Called once per frame with the elapsed seconds since the previous frame. */
  onFrame?: (dt: number, elapsed: number) => void;
  onTheme?: () => void;
}

export interface SceneHost {
  THREE: ThreeModule;
  renderer: Renderer;
  scene: Scene;
  camera: OrthographicCamera | PerspectiveCamera;
  width: number;
  height: number;
  reduceMotion: boolean;
  cssColor: (name: string, fallback: string) => import('three').Color;
  /** Project a world position to CSS pixels inside the host element. */
  toScreen: (position: import('three').Vector3) => { x: number; y: number; visible: boolean };
  render: () => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
}

export function readCssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export async function createSceneHost(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
  options: SceneHostOptions,
): Promise<SceneHost | null> {
  let THREE: ThreeModule;
  let renderer: Renderer;
  try {
    THREE = await import('three');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  if (options.shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
  }

  const scene = new THREE.Scene();
  const viewSize = options.viewSize ?? 12;
  const camera: OrthographicCamera | PerspectiveCamera = options.camera === 'orthographic'
    ? new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200)
    : new THREE.PerspectiveCamera(options.fov ?? 40, 1, 0.1, 200);

  let width = 1;
  let height = 1;

  const resize = () => {
    const rect = root.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    const aspect = width / height;
    if (camera instanceof THREE.OrthographicCamera) {
      camera.left = (-viewSize * aspect) / 2;
      camera.right = (viewSize * aspect) / 2;
      camera.top = viewSize / 2;
      camera.bottom = -viewSize / 2;
    } else {
      camera.aspect = aspect;
    }
    camera.updateProjectionMatrix();
  };
  resize();
  const resizeObserver = new ResizeObserver(() => {
    resize();
    host.render();
  });
  resizeObserver.observe(root);

  const cssColor = (name: string, fallback: string) => new THREE.Color(readCssColor(name, fallback));

  const projected = new THREE.Vector3();
  const toScreen = (position: import('three').Vector3) => {
    projected.copy(position).project(camera);
    return {
      x: (projected.x * 0.5 + 0.5) * width,
      y: (-projected.y * 0.5 + 0.5) * height,
      visible: projected.z < 1,
    };
  };

  let frame = 0;
  let running = false;
  let visible = false;
  let last = performance.now();
  let elapsed = 0;

  const tick = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += dt;
    options.onFrame?.(dt, elapsed);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const intersection = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    visible ? start() : stop();
  }, { threshold: 0.05 });
  intersection.observe(root);

  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  const onTheme = () => {
    options.onTheme?.();
    host.render();
  };
  const themeObserver = new MutationObserver(onTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  scheme.addEventListener('change', onTheme);

  const host: SceneHost = {
    THREE,
    renderer,
    scene,
    camera,
    get width() { return width; },
    get height() { return height; },
    reduceMotion,
    cssColor,
    toScreen,
    render: () => renderer.render(scene, camera),
    start,
    stop,
    dispose() {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener('change', onTheme);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((object) => {
        const mesh = object as import('three').Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material as import('three').Material | import('three').Material[] | undefined;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });
      renderer.dispose();
    },
  };

  return host;
}

/** Attach a horizontal drag-to-rotate handler to a group, with optional limits. */
export function attachDragRotate(
  canvas: HTMLCanvasElement,
  group: import('three').Object3D,
  options: { min?: number; max?: number; speed?: number; onChange?: () => void } = {},
) {
  let dragging = false;
  let lastX = 0;
  const speed = options.speed ?? 0.008;
  const onDown = (event: PointerEvent) => {
    dragging = true;
    lastX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('is-dragging');
  };
  const onMove = (event: PointerEvent) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    let next = group.rotation.y + dx * speed;
    if (options.min !== undefined) next = Math.max(options.min, next);
    if (options.max !== undefined) next = Math.min(options.max, next);
    group.rotation.y = next;
    options.onChange?.();
  };
  const onUp = (event: PointerEvent) => {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    canvas.classList.remove('is-dragging');
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  return () => {
    canvas.removeEventListener('pointerdown', onDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    canvas.removeEventListener('pointercancel', onUp);
  };
}
