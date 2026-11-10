<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
      <!-- Clean Minimal Wordmark -->
      <a
        href="#top"
        class="flex items-center gap-3 focus:outline-none"
        @click.prevent="scrollToSection('#top')"
      >
        <span class="font-display text-sm font-semibold tracking-tight text-white sm:text-base">
          Chris Joshua
        </span>
        <span class="hidden text-xs text-zinc-500 sm:inline-block">
          / Senior Web &amp; Mobile Engineer
        </span>
      </a>

      <!-- Minimal Center Links -->
      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-xs font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Clean Normal Buttons (Monochrome White & Zinc) -->
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-white/25 hover:bg-zinc-800 sm:inline-flex"
          @click="$emit('open-cv')"
        >
          <FileText class="h-3.5 w-3.5 text-zinc-400" />
          <span>Resume</span>
        </button>

        <a
          href="#contact"
          class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200"
          @click.prevent="scrollToSection('#contact')"
        >
          <span>Get in touch</span>
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-300 md:hidden"
          aria-label="Toggle Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="h-4 w-4" />
          <Menu v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Clean Mobile Dropdown -->
    <Transition name="page">
      <div
        v-if="mobileOpen"
        class="border-b border-white/10 bg-black px-4 py-4 md:hidden"
      >
        <div class="flex flex-col space-y-2">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
            @click.prevent="mobileOpen = false; scrollToSection(item.href)"
          >
            {{ item.label }}
          </a>
          <button
            type="button"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 py-2.5 text-xs font-medium text-white"
            @click="mobileOpen = false; $emit('open-cv')"
          >
            <FileText class="h-3.5 w-3.5" />
            <span>View Full Resume (PDF)</span>
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileText, ArrowUpRight, Menu, X } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-cv'): void
}>()

const mobileOpen = ref(false)

const navItems = [
  { label: 'Selected Work', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]

function scrollToSection(hash: string) {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  if (hash === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  const rect = el.getBoundingClientRect()
  window.scrollTo({
    top: window.scrollY + rect.top,
    behavior: 'smooth'
  })
}
</script>
