<template>
  <section id="top" class="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <!-- Left Editorial Pitch (7 cols) -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }"
          class="lg:col-span-7"
        >
          <!-- Subtle Availability Line -->
          <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950 px-3.5 py-1.5 text-xs text-zinc-300">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Available for EST Overlap (9:00 AM EST onwards)</span>
          </div>

          <!-- Clean High-Contrast Editorial Headline -->
          <h1 class="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">
            Senior Web &amp; Mobile Engineer building production systems.
          </h1>

          <!-- Personal Statement from CV -->
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            5+ years of experience designing, building, and shipping production web and mobile applications across local delivery, online commerce, live GPS tracking, and digital payments using
            <span class="text-zinc-100">React Native, React, Vue &amp; Nuxt 3, Node.js, Express, MySQL, Redis, Socket.io, and Google Cloud Platform</span>.
          </p>

          <!-- Clean Monochrome CTA Row -->
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              <span>Explore Selected Work</span>
              <ArrowDownRight class="h-4 w-4" />
            </a>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-zinc-950 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-zinc-900"
              @click="$emit('open-cv')"
            >
              <FileText class="h-4 w-4 text-zinc-400" />
              <span>Preview CV</span>
            </button>

            <a
              :href="profile.cvUrl"
              download="Chris_Joshua_CV.pdf"
              class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              <Download class="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>

          <!-- Clean Contact Metadata Row -->
          <div class="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-6 text-xs text-zinc-400">
            <button
              type="button"
              class="inline-flex items-center gap-2 transition hover:text-white"
              @click="copyEmail"
            >
              <Mail class="h-3.5 w-3.5 text-zinc-500" />
              <span>{{ copied ? 'Copied chrisjosh087@gmail.com' : profile.email }}</span>
            </button>

            <a
              :href="`tel:${profile.phone.replace(/\s+/g, '')}`"
              class="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Phone class="h-3.5 w-3.5 text-zinc-500" />
              <span>{{ profile.phone }}</span>
            </a>

            <a
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <span>LinkedIn</span>
              <ArrowUpRight class="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <a
              :href="profile.website"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              <span>xernee.com</span>
              <ArrowUpRight class="h-3.5 w-3.5 text-zinc-500" />
            </a>
          </div>
        </Motion>

        <!-- Right Column (5 cols): Sleek Pitch-Dark Portfolio Telemetry Card -->
        <Motion
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }"
          class="lg:col-span-5"
        >
          <div class="pitch-card spotlight-card rounded-2xl p-6">
            <!-- Profile Header -->
            <div class="flex items-center justify-between border-b border-white/[0.07] pb-5">
              <div class="flex items-center gap-3.5">
                <div class="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                  <img
                    src="/avatar.png"
                    alt="Chris Joshua"
                    class="h-full w-full object-cover object-top"
                  />
                </div>
                <div>
                  <div class="font-display text-sm font-semibold text-white">Chris Joshua</div>
                  <div class="font-mono text-xs text-zinc-500">
                    React Native · Node.js · Nuxt 3 · GCP
                  </div>
                </div>
              </div>
              <span class="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                5+ YRS EXP
              </span>
            </div>

            <!-- Monochrome Portfolio Performance Curve -->
            <div class="mt-5">
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    SHIPPED PRODUCTION SYSTEMS
                  </div>
                  <div class="mt-1 font-display text-2xl font-semibold text-white">
                    iOS, Android &amp; SSR Web
                  </div>
                </div>
                <span class="font-mono text-xs text-zinc-400">99.98% Uptime</span>
              </div>

              <div class="mt-4 h-16 w-full">
                <svg viewBox="0 0 360 64" class="h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id="monoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.16" />
                      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,56 C45,52 80,40 120,42 C160,44 195,24 240,26 C285,28 315,10 360,6 L360,64 L0,64 Z"
                    fill="url(#monoGrad)"
                  />
                  <path
                    d="M0,56 C45,52 80,40 120,42 C160,44 195,24 240,26 C285,28 315,10 360,6"
                    fill="none"
                    stroke="#E4E4E7"
                    stroke-width="1.75"
                    stroke-linecap="round"
                  />
                  <circle cx="360" cy="6" r="3.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>

            <!-- Core Pillars Breakdown -->
            <div class="mt-5 grid grid-cols-2 gap-2.5 border-t border-white/[0.07] pt-5">
              <div class="rounded-xl border border-white/[0.06] bg-black/60 p-3">
                <div class="font-mono text-[10px] text-zinc-500">CLIENT &amp; MOBILE</div>
                <div class="mt-1 text-xs font-medium text-zinc-200">React Native, Expo, Nuxt 3</div>
              </div>
              <div class="rounded-xl border border-white/[0.06] bg-black/60 p-3">
                <div class="font-mono text-[10px] text-zinc-500">SERVER &amp; REAL-TIME</div>
                <div class="mt-1 text-xs font-medium text-zinc-200">Node.js, Express, Socket.io</div>
              </div>
              <div class="rounded-xl border border-white/[0.06] bg-black/60 p-3">
                <div class="font-mono text-[10px] text-zinc-500">DATA &amp; QUEUES</div>
                <div class="mt-1 text-xs font-medium text-zinc-200">MySQL, Redis, BullMQ</div>
              </div>
              <div class="rounded-xl border border-white/[0.06] bg-black/60 p-3">
                <div class="font-mono text-[10px] text-zinc-500">CLOUD &amp; SECURITY</div>
                <div class="mt-1 text-xs font-medium text-zinc-200">GCP, Signed URLs, 2FA</div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'
import {
  ArrowDownRight,
  FileText,
  Download,
  Mail,
  Phone,
  ArrowUpRight
} from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

defineEmits<{
  (e: 'open-cv'): void
}>()

const { profile } = usePortfolioData()
const copied = ref(false)

function copyEmail() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2400)
  }
}
</script>
