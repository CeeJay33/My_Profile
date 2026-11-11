<template>
  <div>
    <!-- CONTACT SECTION -->
    <section id="contact" class="relative border-t border-white/[0.06] bg-black py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-8">
        <div class="pitch-card rounded-3xl p-6 sm:p-12">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <!-- Left Column (6 cols) -->
            <div class="lg:col-span-6">
              <span class="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Contact &amp; Availability
              </span>
              <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Let’s build together.
              </h2>
              <p class="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Available for full-time roles and high-impact engineering contracts with full EST overlap starting 9:00 AM EST onwards.
              </p>

              <div class="mt-8 space-y-3">
                <div class="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black p-4">
                  <div>
                    <div class="font-mono text-[10px] uppercase text-zinc-500">EMAIL</div>
                    <a
                      :href="`mailto:${profile.email}`"
                      class="mt-0.5 block font-mono text-sm text-white hover:underline"
                    >
                      {{ profile.email }}
                    </a>
                  </div>
                  <button
                    type="button"
                    class="rounded-lg border border-white/12 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-200 transition hover:bg-zinc-800"
                    @click="copyEmail"
                  >
                    {{ copied ? 'Copied' : 'Copy' }}
                  </button>
                </div>

                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    :href="`tel:${profile.phone.replace(/\s+/g, '')}`"
                    class="rounded-xl border border-white/[0.08] bg-black p-4 transition hover:border-white/20"
                  >
                    <div class="font-mono text-[10px] uppercase text-zinc-500">PHONE</div>
                    <div class="mt-1 font-mono text-xs text-zinc-200">{{ profile.phone }}</div>
                  </a>

                  <a
                    :href="profile.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-xl border border-white/[0.08] bg-black p-4 transition hover:border-white/20"
                  >
                    <div class="font-mono text-[10px] uppercase text-zinc-500">LINKEDIN</div>
                    <div class="mt-1 font-mono text-xs text-zinc-200">in/chris-josh-5a1850284 ↗</div>
                  </a>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800"
                  @click="$emit('open-cv')"
                >
                  <FileText class="h-3.5 w-3.5 text-zinc-400" />
                  <span>Preview CV</span>
                </button>

                <a
                  :href="profile.cvUrl"
                  download="Chris_Joshua_CV.pdf"
                  class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:text-white"
                >
                  <Download class="h-3.5 w-3.5 text-zinc-400" />
                  <span>Download Chris_Joshua_CV.pdf</span>
                </a>
              </div>
            </div>

            <!-- Right Column: Clean Message Form (6 cols) -->
            <div class="lg:col-span-6">
              <form
                class="rounded-2xl border border-white/[0.08] bg-black p-6"
                @submit.prevent="sendQuickEmail"
              >
                <div class="border-b border-white/[0.07] pb-3 font-mono text-xs text-zinc-400">
                  Direct Message
                </div>

                <div class="mt-4 space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block font-mono text-[11px] text-zinc-500">NAME</label>
                      <input
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        class="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label class="block font-mono text-[11px] text-zinc-500">EMAIL</label>
                      <input
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        class="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block font-mono text-[11px] text-zinc-500">SUBJECT</label>
                    <input
                      v-model="form.subject"
                      type="text"
                      required
                      placeholder="Engineering Role / Project Inquiry"
                      class="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block font-mono text-[11px] text-zinc-500">MESSAGE</label>
                    <textarea
                      v-model="form.message"
                      rows="4"
                      required
                      placeholder="Hi Chris, we would love to connect..."
                      class="mt-1.5 w-full rounded-lg border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-white/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-xs font-semibold text-black transition hover:bg-zinc-200"
                  >
                    <Send class="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Minimal Pitch-Dark Footer -->
        <footer class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-zinc-500 sm:flex-row">
          <div>
            © {{ new Date().getFullYear() }} Chris Joshua. Senior Web &amp; Mobile Engineer.
          </div>
          <div class="flex flex-wrap items-center gap-6 font-mono text-xs">
            <a href="https://xernee.com" target="_blank" rel="noopener noreferrer" class="hover:text-white">
              xernee.com
            </a>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="hover:text-white">
              LinkedIn
            </a>
            <a :href="profile.cvUrl" download="Chris_Joshua_CV.pdf" class="hover:text-white">
              Resume (PDF)
            </a>
          </div>
        </footer>
      </div>
    </section>

    <!-- RESUME / CV MODAL (Teleported to body so it always renders ABOVE the fixed navbar) -->
    <Teleport to="body">
      <Transition name="page">
        <div
          v-if="cvModalOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-6"
          @click.self="$emit('close-cv')"
        >
          <div class="flex h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <div class="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-5 py-3.5">
              <div>
                <h3 class="font-display text-sm font-semibold text-white">
                  Chris Joshua · Curriculum Vitae
                </h3>
                <p class="font-mono text-[11px] text-zinc-500">
                  Senior Web &amp; Mobile Engineer (React Native · Node.js · Express · GCP)
                </p>
              </div>

              <div class="flex items-center gap-2">
                <a
                  :href="profile.cvUrl"
                  download="Chris_Joshua_CV.pdf"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200"
                >
                  <Download class="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
                  @click="$emit('close-cv')"
                >
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="flex-1 bg-black">
              <iframe
                :src="profile.cvUrl"
                title="Chris Joshua CV PDF"
                class="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FileText, Download, Send, X } from 'lucide-vue-next'
import { usePortfolioData } from '~/composables/usePortfolioData'

defineProps<{
  cvModalOpen: boolean
}>()

defineEmits<{
  (e: 'open-cv'): void
  (e: 'close-cv'): void
}>()

const { profile } = usePortfolioData()
const copied = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: 'Senior Web & Mobile Engineer Inquiry · Chris Joshua',
  message: ''
})

function copyEmail() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2400)
  }
}

function sendQuickEmail() {
  const body = `Hi Chris,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
}
</script>
