<template>
  <section id="experience" class="relative border-t border-white/[0.06] bg-black py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <!-- Clean Header -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span class="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Career History
          </span>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Professional Experience
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            5+ years taking full ownership of features across greenfield and existing codebases on both server and client.
          </p>
        </div>

        <a
          href="/Chris_Joshua_CV.pdf"
          download="Chris_Joshua_CV.pdf"
          class="inline-flex items-center gap-2 self-start rounded-xl border border-white/12 bg-zinc-950 px-4 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-white/25 hover:bg-zinc-900 lg:self-auto"
        >
          <Download class="h-3.5 w-3.5 text-zinc-400" />
          <span>Download Full Resume (PDF)</span>
        </a>
      </div>

      <!-- Clean Editorial Experience List -->
      <div class="mt-14 divide-y divide-white/[0.08] border-t border-white/[0.08]">
        <Motion
          v-for="(exp, idx) in experiences"
          :key="exp.id"
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: idx * 0.06 }"
          class="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-10"
        >
          <!-- Left Meta Column (4 cols) -->
          <div class="lg:col-span-4">
            <div class="font-mono text-xs text-zinc-400">{{ exp.period }}</div>
            <h3 class="mt-1.5 font-display text-xl font-semibold text-white">
              {{ exp.role }}
            </h3>
            <div class="mt-0.5 flex items-center gap-2 text-sm text-zinc-400">
              <span>{{ exp.company }}</span>
              <a
                v-if="exp.url"
                :href="exp.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-mono text-xs text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-white"
              >
                <span>{{ exp.urlLabel }}</span>
                <ArrowUpRight class="h-3 w-3" />
              </a>
            </div>

            <!-- Plain Minimal Stack List -->
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="tech in exp.stack"
                :key="tech"
                class="rounded-md border border-white/[0.07] bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Right Engineering Bullets (8 cols) -->
          <div class="space-y-3.5 lg:col-span-8">
            <div
              v-for="(b, bIdx) in exp.bullets"
              :key="bIdx"
              class="flex items-start gap-3 text-sm leading-relaxed text-zinc-400"
            >
              <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
              <div>
                <strong v-if="b.title" class="font-medium text-zinc-100">
                  {{ b.title }}:
                </strong>
                <span> {{ b.text }}</span>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { Download, ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

const { experiences } = usePortfolioData()
</script>
