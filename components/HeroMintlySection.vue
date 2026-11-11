<template>
  <section id="top" class="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Left Editorial Pitch (7 cols) — Concise, Zero Redundancy -->
        <Motion
          :initial="{ opacity: 0, y: 18 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
          class="lg:col-span-7"
        >
          <!-- Availability Pill -->
          <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950 px-3.5 py-1.5 text-xs text-zinc-300">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Available for EST Overlap (9:00 AM EST+)</span>
          </div>

          <!-- Crisp Headline -->
          <h1 class="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">
            Engineering production web &amp; mobile systems end to end.
          </h1>

          <!-- Concise 2-Line Summary -->
          <p class="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            5+ years building and shipping iOS and Android mobile apps, SSR web platforms, travel booking systems, enterprise portals, and real-time backend APIs.
          </p>

          <!-- Clean 2-Button CTA Row -->
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
              <span>Preview Resume</span>
            </button>
          </div>
        </Motion>

        <!-- Right Column (5 cols): Clean, Minimal Identity & Impact Card -->
        <Motion
          :initial="{ opacity: 0, y: 22 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }"
          class="lg:col-span-5"
        >
          <div class="pitch-card spotlight-card rounded-2xl p-6 sm:p-7">
            <!-- Profile Identity -->
            <div class="flex items-center gap-4 border-b border-white/[0.07] pb-5">
              <div class="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/12 bg-zinc-900">
                <img
                  src="/avatar.png"
                  alt="Chris Joshua"
                  class="h-full w-full object-cover object-top"
                />
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-display text-base font-semibold text-white">
                  Chris Joshua
                </div>
                <div class="mt-0.5 text-xs text-zinc-400">
                  Senior Web &amp; Mobile Engineer
                </div>
              </div>
            </div>

            <!-- 3 High-Signal Career Metrics (No duplicated stack boxes) -->
            <div class="mt-5 divide-y divide-white/[0.07]">
              <div class="flex items-center justify-between py-3">
                <span class="font-mono text-xs text-zinc-500">EXPERIENCE</span>
                <span class="font-display text-sm font-medium text-white">5+ Years Production</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="font-mono text-xs text-zinc-500">PLATFORMS</span>
                <span class="font-display text-sm font-medium text-white">App Store · Google Play · SSR Web</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="font-mono text-xs text-zinc-500">PRIMARY STACK</span>
                <span class="font-mono text-xs text-zinc-200">React Native · Node · Nuxt 3 · GCP</span>
              </div>
            </div>

            <!-- Subtle Direct Links Footer -->
            <div class="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-xs text-zinc-400">
              <a
                :href="`mailto:${profile.email}`"
                class="transition hover:text-white"
              >
                {{ profile.email }}
              </a>
              <a
                :href="profile.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 transition hover:text-white"
              >
                <span>LinkedIn</span>
                <ArrowUpRight class="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ArrowDownRight, FileText, ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

defineEmits<{
  (e: 'open-cv'): void
}>()

const { profile } = usePortfolioData()
</script>
