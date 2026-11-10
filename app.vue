<template>
  <div class="relative min-h-screen bg-black text-zinc-100">
    <!-- Interactive Three.js Monochrome Wireframe & Starfield Background on Pure Pitch Black -->
    <ClientOnly>
      <ThreeQuantumCanvas />
    </ClientOnly>

    <!-- Minimal Pitch-Black Navbar -->
    <NavBar @open-cv="cvModalOpen = true" />

    <!-- Main Content -->
    <main class="relative z-10">
      <HeroMintlySection @open-cv="cvModalOpen = true" />

      <ProjectDesktopShowcase />

      <FramerMcpArchitecture />

      <ExperienceTimeline />

      <SkillsMatrixSection />

      <!-- Daily Workflow, AI & Creative Tooling Infinite Marquee -->
      <WorkflowToolsMarquee />

      <ContactAndCvModal
        :cv-modal-open="cvModalOpen"
        @open-cv="cvModalOpen = true"
        @close-cv="cvModalOpen = false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cvModalOpen = ref(false)

function handleGlobalPointerMove(e: MouseEvent) {
  const cards = document.querySelectorAll<HTMLElement>('.spotlight-card')
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  })
}

onMounted(() => {
  window.addEventListener('mousemove', handleGlobalPointerMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleGlobalPointerMove)
})
</script>
