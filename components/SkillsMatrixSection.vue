<template>
  <section id="skills" class="relative border-t border-white/[0.06] bg-black py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <!-- Clean Header -->
      <div class="max-w-2xl">
        <span class="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Technical Capabilities
        </span>
        <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Core Technical Stack
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Production experience across cross-platform mobile, SSR web, real-time server infrastructure, relational MySQL databases, and Google Cloud Platform.
        </p>
      </div>

      <!-- Brand Icon Strip -->
      <div class="mt-8 flex flex-wrap items-center gap-3 border-y border-white/[0.07] py-4 sm:gap-5">
        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <svg viewBox="0 0 32 32" class="h-4 w-4">
            <circle cx="16" cy="16" r="2.8" fill="#61DAFB" />
            <g stroke="#61DAFB" stroke-width="1.5" fill="none">
              <ellipse cx="16" cy="16" rx="13" ry="5" />
              <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
              <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
            </g>
          </svg>
          <span>React Native &amp; Expo</span>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <svg viewBox="0 0 32 32" class="h-4 w-4">
            <path d="M4 6l12 21L28 6h-5l-7 12L9 6H4z" fill="#42B883" />
            <path d="M9 6l7 12l7-12h-3.5L16 12l-3.5-6H9z" fill="#35495E" />
          </svg>
          <span>Vue 3 &amp; Nuxt 3</span>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <svg viewBox="0 0 32 32" class="h-4 w-4">
            <path d="M16 3L4 10v12l12 7l12-7V10L16 3z" fill="#539E43" />
            <path d="M16 9v14l8-4.5v-9L16 9z" fill="#83CD29" />
          </svg>
          <span>Node.js &amp; Express</span>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span>Socket.io &amp; BullMQ</span>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <svg viewBox="0 0 32 32" class="h-4 w-4">
            <ellipse cx="13" cy="9" rx="8" ry="3" fill="#00758F" />
            <path d="M5 9v12c0 1.7 3.6 3 8 3s8-1.3 8-3V9" fill="none" stroke="#00A3C4" stroke-width="2" />
            <path d="M18 23c4-1.5 7.5-5.5 8-10.5c.5-3-1-6-3.5-7.5c1 2.5.5 5.5-1.5 8c-1.5 2-4 3.5-6 4l3 6z" fill="#F29111" />
          </svg>
          <span>MySQL</span>
        </div>

        <div class="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
          <svg viewBox="0 0 64 64" class="h-4 w-4">
            <path d="M40.8 22.4l5.8-5.8l0.4-2.5C41.5 9.2 33.4 7.4 26.2 10.2c-5.3 2.1-9.4 6.5-11 12l2.1-0.3l8.2-1.4c0 0 0.7-1.1 1-1.5c3.8-4.2 10.3-4.6 14.3-0.6z" fill="#EA4335" />
            <path d="M52.4 26.2c-1.3-4.8-4.5-8.9-8.8-11.4l-6.2 6.2c2.6 2.1 4.2 5.3 4.2 8.9v1.1c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6H30.4l-1.1 1.2v6.9l1.1 1.1h11.2c7.8 0 14.1-6.3 14.1-14.1c0-4.8-2.4-9.1-6.3-11.1z" fill="#4285F4" />
            <path d="M19.2 49.4h11.2v-9.2H19.2c-0.8 0-1.6-0.2-2.3-0.5l-1.9 0.6l-5.9 5.8l-0.5 1.9c2.5 1.9 5.8 3.4 9.6 3.4z" fill="#34A853" />
            <path d="M19.2 21.2c-7.8 0-14.1 6.3-14.1 14.1c0 4.6 2.2 8.7 5.7 11.3l6.5-6.5c-2.5-1.1-4-3.9-3.1-6.6c0.8-2.7 3.7-4.3 6.5-3.4l2.8-6.4c-1.4-1.6-2.8-2.5-4.3-2.5z" fill="#FBBC05" />
          </svg>
          <span>Google Cloud (GCP)</span>
        </div>
      </div>

      <!-- Clean Pitch-Dark Capability Columns -->
      <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <div
          v-for="grp in skillGroups"
          :key="grp.id"
          class="pitch-card spotlight-card flex flex-col justify-between rounded-2xl p-5 sm:p-6"
        >
          <div>
            <div class="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <h3 class="font-display text-lg font-semibold text-white">
                {{ grp.category }}
              </h3>
              <span class="font-mono text-[10px] uppercase text-zinc-500">
                {{ grp.skills.length }} skills
              </span>
            </div>

            <p class="mt-3 text-xs leading-relaxed text-zinc-400">
              {{ grp.description }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="skill in grp.skills"
                :key="skill.name"
                class="rounded-lg border px-2.5 py-1 font-mono text-xs transition"
                :class="
                  skill.highlight
                    ? 'border-white/20 bg-zinc-900 text-white'
                    : 'border-white/[0.07] bg-black text-zinc-400'
                "
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education & Details Strip -->
      <div class="mt-10 grid grid-cols-1 gap-5 border-t border-white/[0.07] pt-10 sm:mt-12 sm:pt-12 md:grid-cols-3 lg:gap-6">
        <div
          v-for="(edu, idx) in education"
          :key="idx"
          class="pitch-card rounded-2xl p-5 sm:p-6"
        >
          <div class="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            {{ edu.badge }}
          </div>
          <h4 class="mt-2 font-display text-base font-semibold text-white">
            {{ edu.title }}
          </h4>
          <p class="mt-1 text-xs leading-relaxed text-zinc-400">
            {{ edu.institution }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioData } from '~/composables/usePortfolioData'

const { skillGroups, education } = usePortfolioData()
</script>
