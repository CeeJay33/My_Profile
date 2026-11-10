<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
    <canvas ref="canvasRef" class="h-full w-full opacity-75" />
    <!-- Pure pitch-black vignette so edges stay #000000 -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_10%,#000000_82%)]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let animationFrameId = 0

let wireframeMesh: THREE.Mesh | null = null
let ringGroup: THREE.Group | null = null
let particleSystem: THREE.Points | null = null
let coreMaterial: THREE.ShaderMaterial | null = null

const PARTICLE_COUNT = 1400
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
let scrollY = 0
let scrollVelocity = 0
let lastScrollY = 0

onMounted(() => {
  if (!canvasRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 14)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: false,
    antialias: true,
    powerPreference: 'high-performance'
  })
  renderer.setClearColor(0x000000, 1)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Subtle monochrome architectural wireframe torus-knot / geodesic structure
  coreMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScrollWarp: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScrollWarp;
      varying vec3 vNormal;
      varying float vWave;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        float w = sin(position.x * 2.0 + uTime * 1.1) * cos(position.y * 2.0 + uTime * 0.9) * 0.16;
        vWave = w;
        vec3 pos = position + normal * (w + clamp(uScrollWarp * 0.08, 0.0, 0.25));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying float vWave;

      void main() {
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.4);
        vec3 base = mix(vec3(0.35), vec3(0.92), fresnel + vWave);
        float alpha = clamp(0.06 + fresnel * 0.22, 0.04, 0.28);
        gl_FragColor = vec4(base, alpha);
      }
    `,
    transparent: true,
    wireframe: true,
    depthWrite: false
  })

  const geo = new THREE.IcosahedronGeometry(2.6, 3)
  wireframeMesh = new THREE.Mesh(geo, coreMaterial)
  wireframeMesh.position.set(3.8, 0.3, -3.0)
  scene.add(wireframeMesh)

  // Ultra-fine monochrome orbital rings
  ringGroup = new THREE.Group()
  ringGroup.position.copy(wireframeMesh.position)
  const radii = [3.6, 4.6]
  radii.forEach((r, idx) => {
    const rGeo = new THREE.TorusGeometry(r, 0.006, 12, 160)
    const rMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: idx === 0 ? 0.12 : 0.06
    })
    const m = new THREE.Mesh(rGeo, rMat)
    m.rotation.set(idx === 0 ? 1.1 : -0.8, idx === 0 ? 0.3 : 0.7, 0)
    ringGroup!.add(m)
  })
  scene.add(ringGroup)

  // Monochrome Starfield / Dust Particles on Pure Black
  const particleGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const alphas = new Float32Array(PARTICLE_COUNT)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 32
    positions[i3 + 1] = (Math.random() - 0.5) * 22
    positions[i3 + 2] = (Math.random() - 0.5) * 18 - 4
    alphas[i] = 0.15 + Math.random() * 0.55
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))

  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float aAlpha;
      varying float vAlpha;
      uniform float uTime;
      uniform float uPixelRatio;

      void main() {
        vAlpha = aAlpha;
        vec3 pos = position;
        pos.y += sin(uTime * 0.4 + position.x * 0.4) * 0.08;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 2.2 * uPixelRatio * (14.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float strength = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vec3(0.88), strength * vAlpha * 0.55);
      }
    `,
    transparent: true,
    depthWrite: false
  })

  particleSystem = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particleSystem)

  const onMouseMove = (e: MouseEvent) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
  }

  const onScroll = () => {
    scrollY = window.scrollY
    scrollVelocity = Math.abs(scrollY - lastScrollY) * 0.04
    lastScrollY = scrollY
  }

  const onResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  const clock = new THREE.Clock()

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()

    mouse.x += (mouse.targetX - mouse.x) * 0.04
    mouse.y += (mouse.targetY - mouse.y) * 0.04
    scrollVelocity *= 0.9

    if (coreMaterial) {
      coreMaterial.uniforms.uTime.value = elapsed
      coreMaterial.uniforms.uScrollWarp.value = scrollVelocity
    }
    particleMaterial.uniforms.uTime.value = elapsed

    const scrollAngle = scrollY * 0.0008

    if (wireframeMesh && ringGroup) {
      wireframeMesh.rotation.y = elapsed * 0.12 + scrollAngle
      wireframeMesh.rotation.x = elapsed * 0.08 + mouse.y * 0.2
      ringGroup.rotation.y = -elapsed * 0.08 + mouse.x * 0.25
      ringGroup.rotation.x = mouse.y * 0.2 + scrollAngle * 0.5
    }

    if (particleSystem) {
      particleSystem.rotation.y = elapsed * 0.015 + mouse.x * 0.08
      particleSystem.position.y = Math.min(scrollY * 0.002, 4.0)
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    renderer?.dispose()
  })
})
</script>
