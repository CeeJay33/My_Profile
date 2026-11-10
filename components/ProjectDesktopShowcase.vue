<template>
  <section id="projects" class="relative border-t border-white/[0.06] bg-black">
    <!-- =======================================================================
         DESKTOP VIEW (lg: >= 1024px):
         Single-screen stage (NO 520vh empty spacing!).
         When you scroll into this section on desktop, vertical wheel scroll
         locks in-place with ZERO window.scrollTo jitter, stepping cleanly:
           Down: 01 -> 02 -> 03 -> 04 -> 05 -> 06 (then releases downward)
           Up:   06 -> 05 -> 04 -> 03 -> 02 -> 01 (then releases upward)
         ======================================================================= -->
    <div
      ref="desktopStageRef"
      class="relative hidden min-h-screen w-full flex-col justify-center py-16 lg:flex"
    >
      <div class="mx-auto w-full max-w-7xl px-8">
        <!-- Top Minimal Section Bar -->
        <div class="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div class="flex items-center gap-3">
            <span class="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Selected Work
            </span>
            <span class="text-zinc-700">/</span>
            <span class="font-mono text-xs text-zinc-300">
              Scroll to morph projects ({{ String(activeIndex + 1).padStart(2, '0') }} of {{ String(projects.length).padStart(2, '0') }})
            </span>
          </div>

          <!-- Horizontal Step Scrubbers + Up/Down Step Buttons -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
              <button
                v-for="(proj, idx) in projects"
                :key="proj.id"
                type="button"
                class="group flex items-center py-1.5 focus:outline-none"
                :title="`0${idx + 1} · ${proj.title}`"
                @click="activeIndex = idx"
              >
                <span
                  class="h-1 rounded-full transition-all duration-300"
                  :class="
                    activeIndex === idx
                      ? 'w-9 bg-white'
                      : idx < activeIndex
                        ? 'w-3 bg-zinc-500 group-hover:bg-zinc-300'
                        : 'w-3 bg-zinc-800 group-hover:bg-zinc-600'
                  "
                />
              </button>
            </div>

            <div class="flex items-center gap-1 border-l border-white/10 pl-2.5">
              <button
                type="button"
                :disabled="activeIndex === 0"
                class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-zinc-950 text-zinc-300 transition hover:border-white/25 hover:text-white disabled:opacity-30"
                title="Previous Project"
                @click="activeIndex = Math.max(0, activeIndex - 1)"
              >
                <ChevronUp class="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                :disabled="activeIndex === projects.length - 1"
                class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-zinc-950 text-zinc-300 transition hover:border-white/25 hover:text-white disabled:opacity-30"
                title="Next Project"
                @click="activeIndex = Math.min(projects.length - 1, activeIndex + 1)"
              >
                <ChevronDown class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Stage: Fixed-Height Left Spec Column (zero layout shift) + Right macOS Browser Frame -->
        <div class="grid grid-cols-12 items-center gap-12">
          <!-- Left Column (5 cols): Fixed height container so text changes never shift layout -->
          <div class="relative col-span-5 flex h-[480px] flex-col justify-between">
            <!-- Vertical Step Progress Hairline on the far left -->
            <div class="absolute -left-5 top-0 bottom-0 w-[1px] bg-zinc-900">
              <div
                class="w-full bg-white transition-[height] duration-300 ease-out"
                :style="{ height: `${((activeIndex + 1) / projects.length) * 100}%` }"
              />
            </div>

            <div>
              <!-- Large Editorial Index Counter + Period -->
              <div class="flex items-baseline justify-between">
                <div class="flex items-baseline gap-2.5">
                  <span class="font-display text-6xl font-light tracking-tighter text-white tabular-nums">
                    {{ String(activeIndex + 1).padStart(2, '0') }}
                  </span>
                  <span class="font-mono text-xs text-zinc-600 tabular-nums">
                    / {{ String(projects.length).padStart(2, '0') }}
                  </span>
                </div>
                <span class="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {{ activeProject.period }}
                </span>
              </div>

              <!-- Project Details -->
              <div class="mt-4">
                <div class="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  {{ activeProject.role }} · {{ activeProject.category }}
                </div>

                <h2 class="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-white">
                  {{ activeProject.title.split('—')[0] }}
                </h2>
                <p class="mt-1 font-display text-sm font-medium text-zinc-400">
                  {{ activeProject.title.split('—')[1] || activeProject.subtitle }}
                </p>

                <p class="mt-3.5 line-clamp-4 text-sm leading-relaxed text-zinc-400">
                  {{ activeProject.summary }}
                </p>

                <!-- Clean Editorial Specification Rows -->
                <div class="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  <div
                    v-for="m in activeProject.metrics"
                    :key="m.label"
                    class="flex items-center justify-between py-2 text-xs"
                  >
                    <span class="font-mono text-[11px] uppercase text-zinc-500">{{ m.label }}</span>
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-zinc-200">{{ m.value }}</span>
                      <span class="font-mono text-[10px] text-zinc-500">({{ m.delta }})</span>
                    </div>
                  </div>
                </div>

                <!-- Plain Minimal Tech List -->
                <div class="mt-3.5 flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[11px] text-zinc-500">
                  <span v-for="(tech, tIdx) in activeProject.techStack.slice(0, 7)" :key="tech">
                    {{ tech }}<span v-if="tIdx < Math.min(activeProject.techStack.length, 7) - 1" class="ml-2.5 text-zinc-800">·</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Clean Monochrome Actions pinned to bottom of left column -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                :href="activeProject.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
              >
                <span>Visit Live Product</span>
                <ArrowUpRight class="h-3.5 w-3.5" />
              </a>

              <a
                v-if="activeProject.secondaryUrl"
                :href="activeProject.secondaryUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-zinc-950 px-3.5 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:text-white"
              >
                <span>{{ activeProject.secondaryLabel }}</span>
                <ArrowUpRight class="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-transparent px-3.5 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:text-white"
                @click="showArchitecture = !showArchitecture"
              >
                <span>{{ showArchitecture ? 'Show Screenshot' : 'Engineering Notes' }}</span>
              </button>
            </div>
          </div>

          <!-- Right Column (7 cols): True macOS Browser Frame with Three.js Shader -->
          <div class="col-span-7">
            <div class="overflow-hidden rounded-2xl border border-white/12 bg-[#050507] shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
              <!-- TRUE macOS Window Header -->
              <div class="flex items-center justify-between border-b border-white/[0.08] bg-[#0B0B0E] px-4 py-2.5">
                <div class="group/mac flex items-center gap-2">
                  <!-- Close (Red #FF5F56) -->
                  <button
                    type="button"
                    class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F56] text-[#4D0000] shadow-inner transition focus:outline-none"
                    title="Reset to Project 01"
                    @click="activeIndex = 0"
                  >
                    <svg class="h-2 w-2 opacity-80 transition-opacity group-hover/mac:opacity-100" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" />
                    </svg>
                  </button>

                  <!-- Minimize (Yellow #FFBD2E) -->
                  <button
                    type="button"
                    class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#DEA123] bg-[#FFBD2E] text-[#5A3000] shadow-inner transition focus:outline-none"
                    title="Toggle Engineering Notes"
                    @click="showArchitecture = !showArchitecture"
                  >
                    <svg class="h-2 w-2 opacity-80 transition-opacity group-hover/mac:opacity-100" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                      <path d="M2 5H8" />
                    </svg>
                  </button>

                  <!-- Zoom / Expand (Green #27C93F) -->
                  <button
                    type="button"
                    class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#1AAB29] bg-[#27C93F] text-[#003B00] shadow-inner transition focus:outline-none"
                    title="Expand Fullscreen Preview"
                    @click="lightboxOpen = true"
                  >
                    <svg class="h-2 w-2 opacity-80 transition-opacity group-hover/mac:opacity-100" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2.2 6.2L2.2 7.8L3.8 7.8M7.8 3.8L7.8 2.2L6.2 2.2M2.5 7.5L7.5 2.5" />
                    </svg>
                  </button>
                </div>

                <!-- Safari / Arc-style URL Bar -->
                <a
                  :href="activeProject.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex max-w-xs items-center gap-1.5 truncate rounded-md border border-white/[0.07] bg-black/90 px-3 py-1 font-mono text-[11px] text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  <Lock class="h-2.5 w-2.5 shrink-0 text-emerald-400" />
                  <span class="truncate">{{ activeProject.liveUrl.replace('https://', '') }}</span>
                </a>

                <!-- Right Fullscreen Icon -->
                <button
                  type="button"
                  class="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                  title="View Fullscreen Screenshot"
                  @click="lightboxOpen = true"
                >
                  <Maximize2 class="h-3.5 w-3.5" />
                </button>
              </div>

              <!-- 16:10 Desktop Viewport -->
              <div class="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <ThreeShaderViewport
                  v-show="!showArchitecture"
                  :images="projectScreenshots"
                  :active-index="activeIndex"
                  :alt="activeProject.title"
                />

                <Transition name="page">
                  <div
                    v-if="showArchitecture"
                    class="absolute inset-0 flex flex-col justify-between overflow-y-auto bg-black/95 p-8"
                  >
                    <div>
                      <div class="flex items-center justify-between border-b border-white/10 pb-3">
                        <span class="font-mono text-xs uppercase tracking-wider text-zinc-400">
                          Engineering &amp; Architecture Breakdown
                        </span>
                        <span class="font-mono text-xs text-zinc-500">{{ activeProject.period }}</span>
                      </div>
                      <ul class="mt-5 space-y-3">
                        <li
                          v-for="(item, idx) in activeProject.architectureHighlights"
                          :key="idx"
                          class="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"
                        >
                          <span class="mt-0.5 font-mono text-xs text-zinc-500">0{{ idx + 1 }}</span>
                          <span>{{ item }}</span>
                        </li>
                      </ul>
                    </div>

                    <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
                      <span class="font-mono text-[11px] text-zinc-500">
                        Project {{ String(activeIndex + 1).padStart(2, '0') }} of {{ String(projects.length).padStart(2, '0') }}
                      </span>
                      <button
                        type="button"
                        class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black"
                        @click="showArchitecture = false"
                      >
                        Back to Desktop View
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =======================================================================
         MOBILE & TABLET VIEW (< 1024px):
         NO scroll animation at all! Users can scroll freely to read full descriptions
         and tap project pills or Prev/Next buttons when they want to switch.
         ======================================================================= -->
    <div class="py-16 lg:hidden">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <!-- Mobile Header -->
        <div class="border-b border-white/[0.08] pb-4">
          <span class="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Selected Work ({{ String(mobileIndex + 1).padStart(2, '0') }} of {{ String(projects.length).padStart(2, '0') }})
          </span>
          <h2 class="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Shipped Products &amp; Ecosystems
          </h2>

          <!-- Tap-to-Select Project Pills (No scroll hijacking on mobile) -->
          <div class="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              v-for="(proj, idx) in projects"
              :key="proj.id"
              type="button"
              class="shrink-0 rounded-lg border px-3 py-1.5 font-mono text-xs transition"
              :class="
                mobileIndex === idx
                  ? 'border-white bg-white font-semibold text-black'
                  : 'border-white/10 bg-zinc-950 text-zinc-400'
              "
              @click="mobileIndex = idx"
            >
              0{{ idx + 1 }} · {{ proj.title.split('—')[0].trim() }}
            </button>
          </div>
        </div>

        <!-- Mobile macOS Screenshot Card -->
        <div class="mt-6 overflow-hidden rounded-2xl border border-white/12 bg-[#050507]">
          <div class="flex items-center justify-between border-b border-white/[0.08] bg-[#0B0B0E] px-3.5 py-2.5">
            <!-- Authentic macOS Traffic Lights -->
            <div class="flex items-center gap-1.5">
              <span class="flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F56] text-[8px] font-bold leading-none text-[#4D0000]">
                ×
              </span>
              <span class="flex h-3 w-3 items-center justify-center rounded-full border border-[#DEA123] bg-[#FFBD2E] text-[8px] font-bold leading-none text-[#5A3000]">
                −
              </span>
              <button
                type="button"
                class="flex h-3 w-3 items-center justify-center rounded-full border border-[#1AAB29] bg-[#27C93F] text-[8px] font-bold leading-none text-[#003B00]"
                @click="lightboxOpen = true"
              >
                +
              </button>
            </div>

            <a
              :href="mobileProject.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex max-w-[190px] items-center gap-1.5 truncate rounded-md border border-white/[0.07] bg-black px-2.5 py-1 font-mono text-[10px] text-zinc-400"
            >
              <Lock class="h-2.5 w-2.5 shrink-0 text-emerald-400" />
              <span class="truncate">{{ mobileProject.liveUrl.replace('https://', '') }}</span>
            </a>

            <button
              type="button"
              class="inline-flex h-6 w-6 items-center justify-center rounded text-zinc-400"
              @click="lightboxOpen = true"
            >
              <Maximize2 class="h-3.5 w-3.5" />
            </button>
          </div>

          <div class="relative aspect-[16/10] w-full overflow-hidden bg-black">
            <img
              :src="mobileProject.screenshot"
              :alt="mobileProject.title"
              class="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <!-- Full Unclipped Mobile Description & Architecture Details -->
        <div class="mt-6">
          <div class="flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>0{{ mobileIndex + 1 }} / 0{{ projects.length }} · {{ mobileProject.category }}</span>
            <span>{{ mobileProject.period }}</span>
          </div>

          <h3 class="mt-2 font-display text-2xl font-semibold text-white">
            {{ mobileProject.title }}
          </h3>
          <p class="mt-1 text-xs font-medium text-zinc-400">
            {{ mobileProject.subtitle }}
          </p>

          <p class="mt-4 text-sm leading-relaxed text-zinc-300">
            {{ mobileProject.summary }}
          </p>

          <!-- Full Engineering Highlights List on Mobile -->
          <div class="mt-5 rounded-xl border border-white/[0.08] bg-[#070709] p-4">
            <div class="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Key Engineering Highlights
            </div>
            <ul class="mt-3 space-y-2.5">
              <li
                v-for="(hl, hIdx) in mobileProject.architectureHighlights"
                :key="hIdx"
                class="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
              >
                <span class="mt-0.5 font-mono text-[10px] text-zinc-500">0{{ hIdx + 1 }}</span>
                <span>{{ hl }}</span>
              </li>
            </ul>
          </div>

          <!-- Specification Rows -->
          <div class="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            <div
              v-for="m in mobileProject.metrics"
              :key="m.label"
              class="flex items-center justify-between py-2.5 text-xs"
            >
              <span class="font-mono text-[11px] uppercase text-zinc-500">{{ m.label }}</span>
              <div class="flex items-center gap-2">
                <span class="font-medium text-zinc-200">{{ m.value }}</span>
                <span class="font-mono text-[10px] text-zinc-500">({{ m.delta }})</span>
              </div>
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="tech in mobileProject.techStack"
              :key="tech"
              class="rounded-md border border-white/[0.08] bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Mobile CTA & Prev/Next Switcher -->
          <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
            <div class="flex flex-wrap items-center gap-2.5">
              <a
                :href="mobileProject.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-black"
              >
                <span>Visit Live Product</span>
                <ArrowUpRight class="h-3.5 w-3.5" />
              </a>

              <a
                v-if="mobileProject.secondaryUrl"
                :href="mobileProject.secondaryUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-zinc-950 px-3.5 py-2.5 text-xs font-medium text-zinc-300"
              >
                <span>{{ mobileProject.secondaryLabel }}</span>
                <ArrowUpRight class="h-3.5 w-3.5" />
              </a>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                :disabled="mobileIndex === 0"
                class="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-200 disabled:opacity-30"
                @click="mobileIndex = Math.max(0, mobileIndex - 1)"
              >
                <span>← Prev</span>
              </button>
              <button
                type="button"
                :disabled="mobileIndex === projects.length - 1"
                class="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-200 disabled:opacity-30"
                @click="mobileIndex = Math.min(projects.length - 1, mobileIndex + 1)"
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Screenshot Lightbox -->
    <Transition name="page">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
        @click.self="lightboxOpen = false"
      >
        <div class="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-black">
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="h-3 w-3 rounded-full bg-[#FF5F56]"
                  @click="lightboxOpen = false"
                />
                <span class="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span class="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div>
                <h4 class="font-display text-sm font-semibold text-white">{{ activeProject.title }}</h4>
                <p class="font-mono text-xs text-zinc-500">{{ activeProject.liveUrl }}</p>
              </div>
            </div>
            <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
              @click="lightboxOpen = false"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
          <div class="max-h-[80vh] overflow-auto p-2">
            <img
              :src="activeProject.screenshot"
              :alt="activeProject.title"
              class="w-full rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Lock, Maximize2, ArrowUpRight, X, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

const { projects } = usePortfolioData()

const desktopStageRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0) // Desktop: 0 -> 1 -> 2 -> 3 -> 4 -> 5 (and reverse 5 -> 4 -> 3 -> 2 -> 1 -> 0)
const mobileIndex = ref(0)
const showArchitecture = ref(false)
const lightboxOpen = ref(false)

const projectScreenshots = computed(() => projects.map((p) => p.screenshot))
const activeProject = computed(() => projects[activeIndex.value] || projects[0])
const mobileProject = computed(() => projects[mobileIndex.value] || projects[0])

let stepCooldownUntil = 0
let wheelAccum = 0
let lastWheelTs = 0

/**
 * Desktop-only wheel interceptor:
 * Never calls window.scrollTo() inside wheel (which caused the shake).
 * Instead, when the desktop stage is in the viewport, e.preventDefault() holds
 * the page motionless while stepping 01 -> 02 -> 03 -> 04 -> 05 -> 06 (down)
 * and 06 -> 05 -> 04 -> 03 -> 02 -> 01 (up).
 */
function handleDesktopWheel(e: WheelEvent) {
  // Strictly desktop (>= 1024px) and not when lightbox is open
  if (window.innerWidth < 1024 || !desktopStageRef.value || lightboxOpen.value) return
  if (Math.abs(e.deltaY) < 2) return

  const rect = desktopStageRef.value.getBoundingClientRect()
  const vh = window.innerHeight
  const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1

  // Is the desktop stage currently occupying the primary screen area?
  const inLockZone =
    direction > 0
      ? rect.top <= 90 && rect.bottom >= vh * 0.72
      : rect.top >= -120 && rect.top <= 130

  if (!inLockZone) {
    wheelAccum = 0
    return
  }

  const now = Date.now()
  const canStepForward = direction > 0 && activeIndex.value < projects.length - 1
  const canStepBackward = direction < 0 && activeIndex.value > 0
  const inCooldown = now < stepCooldownUntil

  if (!canStepForward && !canStepBackward && !inCooldown) {
    // Reached 06 (scrolling down) or 01 (scrolling up) and cooldown finished -> release scroll!
    wheelAccum = 0
    return
  }

  // Stop vertical page movement completely without touching window.scrollTo (0px shake!)
  e.preventDefault()

  if (now - lastWheelTs > 200) {
    wheelAccum = 0
  }
  lastWheelTs = now

  if (inCooldown) return

  wheelAccum += e.deltaY
  if (Math.abs(wheelAccum) >= 26) {
    const next = activeIndex.value + direction
    if (next >= 0 && next <= projects.length - 1) {
      activeIndex.value = next
      stepCooldownUntil = now + 480
    }
    wheelAccum = 0
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleDesktopWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleDesktopWheel)
})
</script>
