<template>
  <section class="relative overflow-hidden border-t border-white/[0.06] bg-black py-20 sm:py-28">
    <div class="mx-auto max-w-7xl px-4 text-center sm:px-8">
      <span class="inline-flex items-center rounded-full border border-white/10 bg-zinc-950 px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
        Daily Workflow &amp; Ecosystem
      </span>
      <h2 class="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Engineering, AI &amp; Creative Suite
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
        The tools I use daily across UI/UX design, AI-assisted engineering, database management, containerization, and motion grading.
      </p>
    </div>

    <!-- Two-Row Counter-Moving macOS Squircle App Icon Marquee (Matches Reference Screenshot) -->
    <div class="relative mx-auto mt-12 max-w-[1400px] overflow-hidden py-4">
      <!-- Deep Pitch-Black Fade Masks on Left & Right -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black via-black/90 to-transparent sm:w-44"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black via-black/90 to-transparent sm:w-44"
      />

      <!-- TOP ROW: Moves Left -->
      <div class="animate-marquee-left gap-4 sm:gap-5">
        <div
          v-for="loopIdx in 3"
          :key="`top-${loopIdx}`"
          class="flex shrink-0 items-center gap-4 sm:gap-5"
        >
          <div
            v-for="tool in topRowTools"
            :key="`top-${loopIdx}-${tool.id}`"
            class="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-white/[0.09] transition-transform duration-300 hover:-translate-y-1 hover:border-white/25 sm:h-24 sm:w-24 sm:rounded-[26px]"
            :class="tool.tileClass"
            :title="`${tool.name} · ${tool.role}`"
          >
            <!-- Inner top specular sheen for authentic macOS dock icon look -->
            <div
              class="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_14px_30px_rgba(0,0,0,0.85)]"
            />

            <img
              :src="tool.icon"
              :alt="tool.name"
              class="relative z-10 select-none object-contain transition-transform duration-300 group-hover:scale-105"
              :class="tool.imgClass || 'h-11 w-11 sm:h-14 sm:w-14'"
              loading="lazy"
            />

            <!-- Subtle Hover Pill Tooltip -->
            <span
              class="pointer-events-none absolute -bottom-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-zinc-950/95 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
            >
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- BOTTOM ROW: Moves Right (Opposite Direction) -->
      <div class="animate-marquee-right mt-4 gap-4 sm:mt-5 sm:gap-5">
        <div
          v-for="loopIdx in 3"
          :key="`bottom-${loopIdx}`"
          class="flex shrink-0 items-center gap-4 sm:gap-5"
        >
          <div
            v-for="tool in bottomRowTools"
            :key="`bottom-${loopIdx}-${tool.id}`"
            class="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[22px] border border-white/[0.09] transition-transform duration-300 hover:-translate-y-1 hover:border-white/25 sm:h-24 sm:w-24 sm:rounded-[26px]"
            :class="tool.tileClass"
            :title="`${tool.name} · ${tool.role}`"
          >
            <div
              class="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_14px_30px_rgba(0,0,0,0.85)]"
            />

            <img
              :src="tool.icon"
              :alt="tool.name"
              class="relative z-10 select-none object-contain transition-transform duration-300 group-hover:scale-105"
              :class="tool.imgClass || 'h-11 w-11 sm:h-14 sm:w-14'"
              loading="lazy"
            />

            <span
              class="pointer-events-none absolute -bottom-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-zinc-950/95 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
            >
              {{ tool.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MarqueeTool {
  id: string
  name: string
  role: string
  icon: string
  tileClass: string
  imgClass?: string
}

// Top Row (Glides Left): Affinity, Claude, DaVinci Resolve, Figma, DBeaver, Git Bash, Gemini
const topRowTools: MarqueeTool[] = [
  {
    id: 'affinity',
    name: 'Affinity Designer',
    role: 'Vector & Brand Design',
    icon: '/icons/affinity-v2.svg',
    tileClass: 'bg-gradient-to-b from-[#17253B] to-[#0B1320]',
    imgClass: 'h-14 w-14 sm:h-16 sm:w-16 rounded-2xl'
  },
  {
    id: 'claude',
    name: 'Claude AI',
    role: 'AI Architecture & Code',
    icon: '/icons/claude.svg',
    tileClass: 'bg-gradient-to-b from-[#2A1812] to-[#120A07]',
    imgClass: 'h-11 w-11 sm:h-13 sm:w-13'
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    role: 'Video & Color Grading',
    icon: '/icons/davinci.png',
    tileClass: 'bg-gradient-to-b from-[#1A1C23] to-[#0B0C10]',
    imgClass: 'h-16 w-16 sm:h-20 sm:w-20'
  },
  {
    id: 'figma',
    name: 'Figma',
    role: 'UI/UX & Design Systems',
    icon: '/icons/figma.svg',
    tileClass: 'bg-gradient-to-b from-[#1E1E24] to-[#0D0D11]',
    imgClass: 'h-11 w-11 sm:h-13 sm:w-13'
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    role: 'MySQL Database Administration',
    icon: '/icons/dbeaver.svg',
    tileClass: 'bg-gradient-to-b from-[#261D17] to-[#110C09]',
    imgClass: 'h-12 w-12 sm:h-14 sm:w-14'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    role: 'Multimodal AI Engine',
    icon: '/icons/gemini.svg',
    tileClass: 'bg-gradient-to-b from-[#171B2E] to-[#0A0C16]',
    imgClass: 'h-11 w-11 sm:h-14 sm:w-14'
  },
  {
    id: 'git-bash',
    name: 'Git Bash',
    role: 'CLI & Version Control',
    icon: '/icons/git.svg',
    tileClass: 'bg-gradient-to-b from-[#261613] to-[#110908]',
    imgClass: 'h-11 w-11 sm:h-14 sm:w-14'
  }
]

// Bottom Row (Glides Right): Docker, Slack, Dribbble, VS Code, Postman, DBeaver, DaVinci Resolve, Affinity
const bottomRowTools: MarqueeTool[] = [
  {
    id: 'docker',
    name: 'Docker',
    role: 'Container Orchestration',
    icon: '/icons/docker.svg',
    tileClass: 'bg-gradient-to-b from-[#122238] to-[#08101C]',
    imgClass: 'h-12 w-12 sm:h-14 sm:w-14'
  },
  {
    id: 'slack',
    name: 'Slack',
    role: 'Team Collaboration & EST Standups',
    icon: '/icons/slack.svg',
    tileClass: 'bg-gradient-to-b from-[#231726] to-[#0E0910]',
    imgClass: 'h-11 w-11 sm:h-13 sm:w-13'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    role: 'Visual Craft & UI Showcase',
    icon: '/icons/dribbble.svg',
    tileClass: 'bg-gradient-to-b from-[#2B1420] to-[#13080E]',
    imgClass: 'h-11 w-11 sm:h-14 sm:w-14'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    role: 'TypeScript & Full-Stack IDE',
    icon: '/icons/vscode.svg',
    tileClass: 'bg-gradient-to-b from-[#132035] to-[#09101B]',
    imgClass: 'h-11 w-11 sm:h-13 sm:w-13'
  },
  {
    id: 'postman',
    name: 'Postman',
    role: 'REST API & Webhook Testing',
    icon: '/icons/postman.svg',
    tileClass: 'bg-gradient-to-b from-[#291913] to-[#120B08]',
    imgClass: 'h-11 w-11 sm:h-14 sm:w-14'
  },
  {
    id: 'claude-2',
    name: 'Claude Code',
    role: 'Agentic Engineering',
    icon: '/icons/claude.svg',
    tileClass: 'bg-gradient-to-b from-[#D97757] to-[#B85C3E]',
    imgClass: 'h-11 w-11 sm:h-13 sm:w-13 brightness-[2.5]'
  },
  {
    id: 'dbeaver-2',
    name: 'DBeaver SQL',
    role: 'Relational Schema Explorer',
    icon: '/icons/dbeaver.svg',
    tileClass: 'bg-gradient-to-b from-[#1E1E22] to-[#0B0B0E]',
    imgClass: 'h-12 w-12 sm:h-14 sm:w-14'
  }
]
</script>
