<template>
  <section id="projects" class="relative border-t border-white/[0.06] bg-black">
    <!-- =======================================================================
         DESKTOP VIEW (lg: >= 1024px):
         360vh Scroll-Surf Track with Explicit Pin State Machine:
           - 'top'    (before reaching section): absolute top-0
           - 'fixed'  (while surfing 01..06):    fixed top-0 left-0 right-0 (100% zero shake!)
           - 'bottom' (after finishing 06):      absolute bottom-0 (zero empty gap below!)
         The browser scrollbar NEVER disappears, dragging the scrollbar surfs
         01 -> 02 -> 03 -> 04 -> 05 -> 06 and 06 -> 01 in reverse, and clicking
         any navbar link scrolls naturally to its target section.
         ======================================================================= -->
    <div
      ref="desktopTrackRef"
      class="relative hidden lg:block lg:h-[360vh]"
    >
      <div
        class="flex h-screen w-full flex-col justify-center overflow-hidden bg-black pt-12"
        :class="
          pinState === 'fixed'
            ? 'fixed top-0 left-0 right-0 z-20'
            : pinState === 'bottom'
              ? 'absolute bottom-0 left-0 right-0 z-10'
              : 'absolute top-0 left-0 right-0 z-10'
        "
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
                  @click="scrollToStep(idx)"
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
                  @click="scrollToStep(Math.max(0, activeIndex - 1))"
                >
                  <ChevronUp class="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  :disabled="activeIndex === projects.length - 1"
                  class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-zinc-950 text-zinc-300 transition hover:border-white/25 hover:text-white disabled:opacity-30"
                  title="Next Project"
                  @click="scrollToStep(Math.min(projects.length - 1, activeIndex + 1))"
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
              <!-- Continuous Vertical Scroll Progress Hairline on the far left -->
              <div class="absolute -left-5 top-0 bottom-0 w-[1px] bg-zinc-900">
                <div
                  class="w-full bg-white transition-[height] duration-75 ease-out"
                  :style="{ height: `${Math.min(100, Math.max(8, scrollProgress * 100))}%` }"
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
                      @click="scrollToStep(0)"
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
                      @click="openLightbox(activeIndex)"
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
                    @click="openLightbox(activeIndex)"
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
    </div>

    <!-- =======================================================================
         MOBILE & TABLET VIEW (< 1024px):
         NO scroll animation at all! Users can scroll freely to read full descriptions
         and tap project pills or Prev/Next buttons when they want to switch.
         ======================================================================= -->
    <div class="py-16 lg:hidden">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <div class="border-b border-white/[0.08] pb-4">
          <span class="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Selected Work ({{ String(mobileIndex + 1).padStart(2, '0') }} of {{ String(projects.length).padStart(2, '0') }})
          </span>
          <h2 class="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Shipped Products &amp; Ecosystems
          </h2>

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

        <div class="mt-6 overflow-hidden rounded-2xl border border-white/12 bg-[#050507]">
          <div class="flex items-center justify-between border-b border-white/[0.08] bg-[#0B0B0E] px-3.5 py-2.5">
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
                @click="openLightbox(mobileIndex)"
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
              @click="openLightbox(mobileIndex)"
            >
              <Maximize2 class="h-3.5 w-3.5" />
            </button>
          </div>

          <div
            class="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-black"
            @click="openLightbox(mobileIndex)"
          >
            <img
              :src="mobileProject.screenshot"
              :alt="mobileProject.title"
              class="h-full w-full object-cover object-top"
            />
          </div>
        </div>

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

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="tech in mobileProject.techStack"
              :key="tech"
              class="rounded-md border border-white/[0.08] bg-zinc-950 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
            >
              {{ tech }}
            </span>
          </div>

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

    <!-- Fullscreen Screenshot Lightbox (Teleported to body so it always renders ABOVE the fixed navbar) -->
    <Teleport to="body">
      <Transition name="page">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          @click.self="closeLightbox"
        >
          <div class="relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#09090D] shadow-[0_32px_96px_rgba(0,0,0,0.9)]">
            <!-- Responsive Window Titlebar -->
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0D0D12] px-4 py-3 sm:px-5 sm:py-3.5">
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F56] text-[9px] font-bold text-[#4D0000] transition hover:brightness-110"
                    title="Close Preview"
                    @click="closeLightbox"
                  >
                    ×
                  </button>
                  <span class="h-3.5 w-3.5 rounded-full border border-[#DEA123] bg-[#FFBD2E]" />
                  <span class="h-3.5 w-3.5 rounded-full border border-[#1AAB29] bg-[#27C93F]" />
                </div>

                <div class="min-w-0">
                  <h4 class="truncate font-display text-xs font-semibold text-white sm:text-sm">
                    {{ lightboxProject.title }}
                  </h4>
                  <a
                    :href="lightboxProject.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 truncate font-mono text-[11px] text-zinc-400 hover:text-white"
                  >
                    <span>{{ lightboxProject.liveUrl.replace('https://', '') }}</span>
                    <ArrowUpRight class="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>

              <!-- Right Controls: View Switcher (if secondary screenshot exists) + Prev/Next + Close -->
              <div class="flex items-center gap-2">
                <div
                  v-if="lightboxProject.secondaryScreenshot"
                  class="inline-flex items-center rounded-lg border border-white/10 bg-black p-0.5 font-mono text-[11px]"
                >
                  <button
                    type="button"
                    class="rounded-md px-2.5 py-1 transition"
                    :class="!showSecondaryShot ? 'bg-white font-semibold text-black' : 'text-zinc-400 hover:text-white'"
                    @click="showSecondaryShot = false"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    class="rounded-md px-2.5 py-1 transition"
                    :class="showSecondaryShot ? 'bg-white font-semibold text-black' : 'text-zinc-400 hover:text-white'"
                    @click="showSecondaryShot = true"
                  >
                    {{ lightboxProject.id === 'xernee' ? 'Download' : 'View 2' }}
                  </button>
                </div>

                <div class="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    class="inline-flex h-8 items-center rounded-lg border border-white/10 bg-zinc-900 px-2.5 font-mono text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:opacity-35"
                    :disabled="lightboxIndex <= 0"
                    @click="stepLightbox(-1)"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    class="inline-flex h-8 items-center rounded-lg border border-white/10 bg-zinc-900 px-2.5 font-mono text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:opacity-35"
                    :disabled="lightboxIndex >= projects.length - 1"
                    @click="stepLightbox(1)"
                  >
                    →
                  </button>
                </div>

                <button
                  type="button"
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-white transition hover:bg-zinc-800"
                  aria-label="Close Fullscreen Preview"
                  @click="closeLightbox"
                >
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Centered & Responsive Image Stage -->
            <div class="relative flex flex-1 items-center justify-center overflow-auto bg-black p-2 sm:p-5">
              <img
                :src="
                  showSecondaryShot && lightboxProject.secondaryScreenshot
                    ? lightboxProject.secondaryScreenshot
                    : lightboxProject.screenshot
                "
                :alt="lightboxProject.title"
                class="mx-auto block max-h-[calc(92dvh-5.25rem)] w-auto max-w-full rounded-xl border border-white/[0.08] object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Lock, Maximize2, ArrowUpRight, X, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

const { projects } = usePortfolioData()

const desktopTrackRef = ref<HTMLElement | null>(null)
const pinState = ref<'top' | 'fixed' | 'bottom'>('top')
const scrollProgress = ref(0) // Continuous 0.0 to 1.0 driven by scrollbar or wheel
const mobileIndex = ref(0)
const showArchitecture = ref(false)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const showSecondaryShot = ref(false)

const projectScreenshots = computed(() => projects.map((p) => p.screenshot))

// Maps scrollProgress (0.0 -> 1.0) cleanly across 0..5 (01 -> 02 -> 03 -> 04 -> 05 -> 06)
const activeIndex = computed(() => {
  const maxIdx = projects.length - 1
  return Math.min(maxIdx, Math.max(0, Math.round(scrollProgress.value * maxIdx)))
})

const activeProject = computed(() => projects[activeIndex.value] || projects[0])
const mobileProject = computed(() => projects[mobileIndex.value] || projects[0])
const lightboxProject = computed(() => projects[lightboxIndex.value] || projects[0])

function openLightbox(idx: number) {
  lightboxIndex.value = Math.min(projects.length - 1, Math.max(0, idx))
  showSecondaryShot.value = false
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  showSecondaryShot.value = false
}

function stepLightbox(delta: number) {
  const next = Math.min(projects.length - 1, Math.max(0, lightboxIndex.value + delta))
  lightboxIndex.value = next
  showSecondaryShot.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') stepLightbox(-1)
  else if (e.key === 'ArrowRight') stepLightbox(1)
}

function syncScrollPosition() {
  if (!desktopTrackRef.value || window.innerWidth < 1024) return
  const rect = desktopTrackRef.value.getBoundingClientRect()
  const vh = window.innerHeight
  const scrollableDistance = rect.height - vh

  if (scrollableDistance <= 0) {
    pinState.value = 'top'
    scrollProgress.value = 0
    return
  }

  if (rect.top > 0) {
    // Above the section
    pinState.value = 'top'
    scrollProgress.value = 0
  } else if (rect.bottom < vh) {
    // Scrolled past the section (stage sits flush at bottom-0 so there is zero empty space below!)
    pinState.value = 'bottom'
    scrollProgress.value = 1
  } else {
    // Inside the section: stage is fixed to the viewport while scrollbar/wheel surfs 01..06
    pinState.value = 'fixed'
    scrollProgress.value = Math.min(1, Math.max(0, -rect.top / scrollableDistance))
  }
}

function scrollToStep(idx: number) {
  if (!desktopTrackRef.value) return
  const rect = desktopTrackRef.value.getBoundingClientRect()
  const trackTop = window.scrollY + rect.top
  const scrollableDistance = rect.height - window.innerHeight
  const ratio = idx / Math.max(projects.length - 1, 1)
  window.scrollTo({
    top: trackTop + scrollableDistance * ratio,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Ensure body overflow is never stuck hidden
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  syncScrollPosition()
  window.addEventListener('scroll', syncScrollPosition, { passive: true })
  window.addEventListener('resize', syncScrollPosition, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncScrollPosition)
  window.removeEventListener('resize', syncScrollPosition)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
