<template>
  <div
    ref="containerRef"
    class="relative h-full w-full overflow-hidden bg-black select-none"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Fallback image before WebGL textures finish loading -->
    <img
      :src="fallbackSrc"
      :alt="alt"
      class="h-full w-full object-cover object-top transition-opacity duration-300"
      :class="{ 'opacity-0': webglReady }"
    />

    <!-- Three.js Scroll-Hooked GLSL Shader Canvas -->
    <canvas
      ref="canvasRef"
      class="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300"
      :class="webglReady ? 'opacity-100' : 'opacity-0'"
    />

    <!-- Subtle bottom vignette to blend with pitch-black frame -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  images: string[]
  activeIndex: number // 0 to 5
  alt: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const webglReady = ref(false)

const fallbackSrc = computed(() => {
  const idx = Math.min(Math.max(props.activeIndex, 0), Math.max(props.images.length - 1, 0))
  return props.images[idx] || ''
})

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.OrthographicCamera | null = null
let material: THREE.ShaderMaterial | null = null
let animId = 0

const loadedTextures: THREE.Texture[] = []
let currentIdx = 0
let targetIdx = 0
let transitionProgress = 0
let isTransitioning = false
let direction = 1 // +1 down (1->2->3), -1 up (6->5->4)

const hoverMouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, intensity: 0, targetIntensity: 0 }

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  hoverMouse.targetX = (e.clientX - rect.left) / rect.width
  hoverMouse.targetY = 1.0 - (e.clientY - rect.top) / rect.height
  hoverMouse.targetIntensity = 1.0
}

function handleMouseLeave() {
  hoverMouse.targetIntensity = 0.0
}

watch(
  () => props.activeIndex,
  (newIdx, oldIdx) => {
    if (!material || loadedTextures.length === 0 || newIdx === oldIdx) return
    const clampedNew = Math.max(0, Math.min(loadedTextures.length - 1, newIdx))
    direction = clampedNew > currentIdx ? 1 : -1

    // Set current visible texture as uTexture1 and new target texture as uTexture2
    if (isTransitioning && transitionProgress > 0.5) {
      currentIdx = targetIdx
    }
    targetIdx = clampedNew
    material.uniforms.uTexture1.value = loadedTextures[currentIdx]
    material.uniforms.uTexture2.value = loadedTextures[targetIdx]
    material.uniforms.uDirection.value = direction
    transitionProgress = 0
    isTransitioning = true
  }
)

onMounted(async () => {
  if (!canvasRef.value || !containerRef.value) return

  try {
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10)
    camera.position.z = 1

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      alpha: false,
      antialias: true
    })
    renderer.setClearColor(0x000000, 1)

    const rect = containerRef.value.getBoundingClientRect()
    renderer.setSize(rect.width || 900, rect.height || 560)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const loader = new THREE.TextureLoader()
    const loadOne = (url: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(
          url,
          (tex) => {
            tex.minFilter = THREE.LinearFilter
            tex.magFilter = THREE.LinearFilter
            tex.colorSpace = THREE.SRGBColorSpace
            resolve(tex)
          },
          undefined,
          reject
        )
      })

    for (const url of props.images) {
      const tex = await loadOne(url)
      loadedTextures.push(tex)
    }

    if (loadedTextures.length === 0) return

    currentIdx = Math.max(0, Math.min(loadedTextures.length - 1, props.activeIndex))
    targetIdx = currentIdx

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: loadedTextures[currentIdx] },
        uTexture2: { value: loadedTextures[targetIdx] },
        uMix: { value: 0.0 },
        uDirection: { value: 1.0 },
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform float uMix;
        uniform float uDirection;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Subtle cursor lens distortion
          float d = distance(uv, uMouse);
          float ripple = sin(d * 20.0 - uTime * 3.5) * exp(-d * 6.5) * 0.005 * uHover;
          uv += ripple;

          // Cubic smoothstep for buttery morph between project i and project i+1 / i-1
          float p = smoothstep(0.0, 1.0, uMix);
          float strength = sin(p * 3.14159265);
          float wave = sin(uv.x * 7.0 + p * 6.2831) * 0.04 * strength * uDirection;

          vec2 uv1 = (uv - 0.5) * (1.0 - p * 0.07) + 0.5 + vec2(0.0, p * 0.12 * uDirection + wave);
          vec2 uv2 = (uv - 0.5) * (1.0 + (1.0 - p) * 0.07) + 0.5 - vec2(0.0, (1.0 - p) * 0.12 * uDirection - wave);

          float shift = strength * 0.011;

          vec4 tex1 = vec4(
            texture2D(uTexture1, uv1 + vec2(shift, 0.0)).r,
            texture2D(uTexture1, uv1).g,
            texture2D(uTexture1, uv1 - vec2(shift, 0.0)).b,
            1.0
          );

          vec4 tex2 = vec4(
            texture2D(uTexture2, uv2 + vec2(shift, 0.0)).r,
            texture2D(uTexture2, uv2).g,
            texture2D(uTexture2, uv2 - vec2(shift, 0.0)).b,
            1.0
          );

          gl_FragColor = mix(tex1, tex2, p);
        }
      `
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
    scene.add(mesh)
    webglReady.value = true

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (renderer && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          renderer.setSize(entry.contentRect.width, entry.contentRect.height)
        }
      }
    })
    ro.observe(containerRef.value)

    const clock = new THREE.Clock()
    let lastTime = clock.getElapsedTime()

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop)
      if (!material || !renderer || !scene || !camera || loadedTextures.length === 0) return

      const now = clock.getElapsedTime()
      const dt = Math.min(0.05, now - lastTime)
      lastTime = now
      material.uniforms.uTime.value = now

      if (isTransitioning) {
        transitionProgress += dt * 2.1 // ~480ms full shader morph
        if (transitionProgress >= 1.0) {
          transitionProgress = 0.0
          isTransitioning = false
          currentIdx = targetIdx
          material.uniforms.uTexture1.value = loadedTextures[currentIdx]
          material.uniforms.uMix.value = 0.0
        } else {
          material.uniforms.uMix.value = transitionProgress
        }
      }

      hoverMouse.x += (hoverMouse.targetX - hoverMouse.x) * 0.08
      hoverMouse.y += (hoverMouse.targetY - hoverMouse.y) * 0.08
      hoverMouse.intensity += (hoverMouse.targetIntensity - hoverMouse.intensity) * 0.08

      material.uniforms.uMouse.value.set(hoverMouse.x, hoverMouse.y)
      material.uniforms.uHover.value = hoverMouse.intensity

      renderer.render(scene, camera)
    }

    renderLoop()

    onBeforeUnmount(() => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      renderer?.dispose()
    })
  } catch {
    webglReady.value = false
  }
})
</script>
