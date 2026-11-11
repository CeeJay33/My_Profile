<template>
  <section id="architecture" class="relative border-t border-white/[0.06] bg-black py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <!-- Clean Editorial Header -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span class="font-mono text-xs uppercase tracking-widest text-zinc-500">
            System Architecture
          </span>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            How the pieces connect in production.
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Select any layer below to inspect how I structure cross-platform mobile apps, SSR web frontends, REST APIs, real-time queues, relational databases, and cloud infrastructure.
          </p>
        </div>
      </div>

      <!-- Pitch-Dark Architecture Diagram + VS Code Syntax Editor Panel -->
      <div class="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-12">
        <!-- Left Interactive Topology Grid (7 cols) -->
        <div class="pitch-card bg-pitch-grid flex flex-col justify-between rounded-2xl p-4 sm:p-8 lg:col-span-7">
          <div class="flex items-center justify-between border-b border-white/[0.07] pb-4 font-mono text-[11px] text-zinc-500 sm:text-xs">
            <span>CLIENT → API GATEWAY → MYSQL &amp; GCP</span>
            <span>ACID + IDEMPOTENT</span>
          </div>

          <div class="my-5 space-y-5 sm:my-6">
            <div v-for="(tier, tIdx) in tiers" :key="tIdx" class="space-y-2.5">
              <div class="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {{ tier.label }}
              </div>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  v-for="node in tier.items"
                  :key="node.id"
                  type="button"
                  class="group flex items-start gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 sm:p-4"
                  :class="
                    activeNode.id === node.id
                      ? 'border-white/35 bg-zinc-900/90 shadow-[0_0_30px_rgba(255,255,255,0.03)]'
                      : 'border-white/[0.07] bg-black hover:border-white/20 hover:bg-zinc-950'
                  "
                  @click="activeNode = node"
                >
                  <!-- Real Brand SVG Icons -->
                  <div class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B0B0F] p-2">
                    <!-- 1. React Native & Expo Official SVG -->
                    <img
                      v-if="node.id === 'rn-mobile'"
                      src="/icons/react.svg"
                      alt="React Native"
                      class="h-7 w-7 object-contain"
                    />

                    <!-- 2. Vue 3 & Nuxt 3 Official Multi-Color SVG -->
                    <img
                      v-else-if="node.id === 'nuxt-web'"
                      src="/icons/vue.svg"
                      alt="Vue 3 & Nuxt 3"
                      class="h-7 w-7 object-contain"
                    />

                    <!-- 3. QR Code Proof & Escrow Scanner SVG -->
                    <div v-else-if="node.id === 'qr-escrow'" class="relative flex h-full w-full items-center justify-center">
                      <svg viewBox="0 0 64 64" class="h-7 w-7">
                        <rect x="8" y="8" width="18" height="18" rx="3" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
                        <rect x="14" y="14" width="6" height="6" rx="1" fill="#00FFA3" />
                        <rect x="38" y="8" width="18" height="18" rx="3" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
                        <rect x="44" y="14" width="6" height="6" rx="1" fill="#00FFA3" />
                        <rect x="8" y="38" width="18" height="18" rx="3" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
                        <rect x="14" y="44" width="6" height="6" rx="1" fill="#00FFA3" />
                        <rect x="38" y="38" width="6" height="6" fill="#FFFFFF" />
                        <rect x="48" y="38" width="8" height="6" fill="#00E5FF" />
                        <rect x="38" y="48" width="8" height="8" fill="#00FFA3" />
                        <rect x="50" y="48" width="6" height="8" fill="#FFFFFF" />
                        <line x1="6" y1="32" x2="58" y2="32" stroke="#00FFA3" stroke-width="2.5" stroke-linecap="round" />
                      </svg>
                    </div>

                    <!-- 4. Live Socket.io WebSocket & BullMQ SVG with Live Pulse -->
                    <div v-else-if="node.id === 'gps-bullmq'" class="relative flex h-full w-full items-center justify-center">
                      <span class="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      <svg viewBox="0 0 64 64" class="h-7 w-7">
                        <circle cx="32" cy="32" r="24" fill="none" stroke="#FFFFFF" stroke-width="3.2" />
                        <circle cx="32" cy="32" r="18" fill="none" stroke="#10B981" stroke-width="1.4" stroke-dasharray="4 4" />
                        <path d="M26 30L39 17L34 29H26Z" fill="#FFFFFF" />
                        <path d="M38 34L25 47L30 35H38Z" fill="#10B981" />
                      </svg>
                    </div>

                    <!-- 5. Official MySQL SVG -->
                    <img
                      v-else-if="node.id === 'sql-concurrency'"
                      src="/icons/mysql.svg"
                      alt="MySQL"
                      class="h-7 w-7 object-contain"
                    />

                    <!-- 6. Official Google Cloud (GCP) SVG -->
                    <img
                      v-else-if="node.id === 'gcp-security'"
                      src="/icons/gcp.svg"
                      alt="Google Cloud"
                      class="h-7 w-7 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="truncate font-mono text-[10px] uppercase text-zinc-400">
                        {{ node.badge }}
                      </span>
                      <span
                        v-if="activeNode.id === node.id"
                        class="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                      />
                    </div>
                    <h4 class="mt-1 font-display text-sm font-semibold text-white">
                      {{ node.title }}
                    </h4>
                    <p class="mt-0.5 truncate font-mono text-[11px] text-zinc-500">
                      {{ node.subtitle }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-xs text-zinc-500">
            <span>Inspecting: <strong class="font-normal text-zinc-200">{{ activeNode.title }}</strong></span>
            <span>6 Subsystems</span>
          </div>
        </div>

        <!-- Right Specification & Color Code Editor Panel (5 cols) -->
        <div class="pitch-card flex flex-col justify-between rounded-2xl p-4 sm:p-8 lg:col-span-5">
          <div>
            <div class="flex items-center justify-between">
              <span class="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                {{ activeNode.badge }}
              </span>
              <span class="font-mono text-[11px] text-zinc-600">PRODUCTION SPEC</span>
            </div>

            <h3 class="mt-2.5 font-display text-xl font-semibold text-white sm:text-2xl">
              {{ activeNode.title }}
            </h3>
            <p class="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              {{ activeNode.description }}
            </p>

            <ul class="mt-4 space-y-2 border-t border-white/[0.07] pt-4 sm:mt-5 sm:space-y-2.5">
              <li
                v-for="(guarantee, gIdx) in activeNode.guarantees"
                :key="gIdx"
                class="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
              >
                <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                <span>{{ guarantee }}</span>
              </li>
            </ul>

            <!-- TRUE VS CODE / CURSOR DARK+ SYNTAX-HIGHLIGHTED CODE EDITOR -->
            <div class="mt-5 overflow-hidden rounded-xl border border-white/12 bg-[#0D1117] shadow-2xl sm:mt-6">
              <!-- macOS Traffic Lights + Editor File Tab -->
              <div class="flex items-center justify-between border-b border-white/[0.08] bg-[#161B22] px-3.5 py-2">
                <div class="flex items-center gap-3">
                  <!-- Authentic macOS Dots -->
                  <div class="flex items-center gap-1.5">
                    <span class="flex h-3 w-3 items-center justify-center rounded-full border border-[#E0443E] bg-[#FF5F56] text-[8px] font-bold leading-none text-[#4D0000]">
                      ×
                    </span>
                    <span class="flex h-3 w-3 items-center justify-center rounded-full border border-[#DEA123] bg-[#FFBD2E] text-[8px] font-bold leading-none text-[#5A3000]">
                      −
                    </span>
                    <span class="flex h-3 w-3 items-center justify-center rounded-full border border-[#1AAB29] bg-[#27C93F] text-[8px] font-bold leading-none text-[#003B00]">
                      +
                    </span>
                  </div>

                  <!-- Active Editor Tab -->
                  <div class="flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#0D1117] px-2.5 py-1">
                    <span class="rounded bg-[#3178C6]/20 px-1 py-0.5 font-mono text-[9px] font-bold text-[#58A6FF]">
                      TS
                    </span>
                    <span class="font-mono text-[11px] text-zinc-200">{{ activeNode.codeFile }}</span>
                  </div>
                </div>

                <button
                  type="button"
                  class="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-400 transition hover:border-white/20 hover:text-white"
                  @click="copySnippet"
                >
                  {{ snippetCopied ? 'Copied' : 'Copy' }}
                </button>
              </div>

              <!-- Syntax Highlighted Code Body with Line Numbers -->
              <div class="overflow-x-auto p-3.5 sm:p-4">
                <div class="min-w-[340px] font-mono text-[11px] leading-[1.65]">
                  <div
                    v-for="(lineHtml, lIdx) in activeNode.highlightedLines"
                    :key="lIdx"
                    class="flex items-baseline"
                  >
                    <span class="mr-4 w-4 shrink-0 select-none text-right text-[10px] text-[#484F58]">
                      {{ lIdx + 1 }}
                    </span>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="whitespace-pre" v-html="lineHtml" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-xs text-zinc-500 sm:mt-6">
            <span>Production Pattern</span>
            <a href="#experience" class="text-zinc-200 hover:underline">
              Experience Timeline →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ArchNode {
  id: string
  badge: string
  title: string
  subtitle: string
  description: string
  guarantees: string[]
  codeFile: string
  codeSnippet: string
  highlightedLines: string[]
}

const nodes: ArchNode[] = [
  {
    id: 'rn-mobile',
    badge: 'React Native & Expo',
    title: 'Cross Platform Mobile Apps',
    subtitle: 'iOS App Store & Google Play · EAS OTA',
    description:
      'Production React Native and Expo mobile applications across AI wellness companions, on-demand delivery, and mobile commerce with resilient HTTP clients and offline state persistence.',
    guarantees: [
      'Shipped on Apple App Store and Google Play Store with EAS and Codemagic CI/CD.',
      'Smooth 60fps navigation, local state persistence, and background location services.',
      'In-app AI assistant check-ins, camera integrations, and QR code scanners.'
    ],
    codeFile: 'mobile/services/httpClient.ts',
    codeSnippet: `export async function requestWithRetry<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const token = await secureStore.getItemAsync('session_token');
  const res = await fetch(\`\${API_BASE}\${endpoint}\`, {
    ...init,
    headers: { Authorization: \`Bearer \${token}\`, ...init?.headers }
  });
  return res.json();
}`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">export async function</span> <span class="text-[#D2A8FF]">requestWithRetry</span>&lt;<span class="text-[#79C0FF]">T</span>&gt;(<span class="text-[#FFA657]">endpoint</span>: <span class="text-[#79C0FF]">string</span>): <span class="text-[#79C0FF]">Promise</span>&lt;<span class="text-[#79C0FF]">T</span>&gt; {`,
      `  <span class="text-[#FF7B72]">const</span> <span class="text-[#79C0FF]">token</span> = <span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">secureStore</span>.<span class="text-[#D2A8FF]">getItemAsync</span>(<span class="text-[#A5D6FF]">'session_token'</span>);`,
      `  <span class="text-[#FF7B72]">const</span> <span class="text-[#79C0FF]">res</span> = <span class="text-[#FF7B72]">await</span> <span class="text-[#D2A8FF]">fetch</span>(<span class="text-[#A5D6FF]">\`\${</span><span class="text-[#79C0FF]">API_BASE</span><span class="text-[#A5D6FF]">}\${</span><span class="text-[#FFA657]">endpoint</span><span class="text-[#A5D6FF]">}\`</span>, {`,
      `    <span class="text-[#79C0FF]">headers</span>: { <span class="text-[#79C0FF]">Authorization</span>: <span class="text-[#A5D6FF]">\`Bearer \${</span><span class="text-[#79C0FF]">token</span><span class="text-[#A5D6FF]">}\`</span> }`,
      `  });`,
      `  <span class="text-[#FF7B72]">return</span> <span class="text-[#79C0FF]">res</span>.<span class="text-[#D2A8FF]">json</span>();`,
      `}`
    ]
  },
  {
    id: 'nuxt-web',
    badge: 'Nuxt 3 & Vue 3 SSR',
    title: 'SSR Web & GDS Booking Frontends',
    subtitle: 'Nuxt 3 · Amadeus GDS · Enterprise Portals',
    description:
      'Server-Side Rendered Nuxt 3 applications powering Amadeus GDS flight and hotel search, enterprise client order portals, clinical dashboards, and web storefronts.',
    guarantees: [
      'Fast initial page load and SEO indexing via Nuxt 3 SSR deployed on Vercel and GCP.',
      'Amadeus GDS API integration for live flight routes, cabin classes, and fare pricing.',
      'Responsive dashboards for clinical vital-sign telemetry and enterprise print workflows.'
    ],
    codeFile: 'web/composables/useFlightSearch.ts',
    codeSnippet: `export const searchLiveFlights = async (query: FlightSearchQuery) => {
  const { data } = await useFetch('/api/amadeus/flights/offers', {
    method: 'POST',
    body: { origin: query.from, destination: query.to, date: query.departure }
  });
  return data.value?.offers ?? [];
};`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">export const</span> <span class="text-[#D2A8FF]">searchLiveFlights</span> = <span class="text-[#FF7B72]">async</span> (<span class="text-[#FFA657]">query</span>: <span class="text-[#79C0FF]">FlightSearchQuery</span>) <span class="text-[#FF7B72]">=&gt;</span> {`,
      `  <span class="text-[#FF7B72]">const</span> { <span class="text-[#79C0FF]">data</span> } = <span class="text-[#FF7B72]">await</span> <span class="text-[#D2A8FF]">useFetch</span>(<span class="text-[#A5D6FF]">'/api/amadeus/flights/offers'</span>, {`,
      `    <span class="text-[#79C0FF]">method</span>: <span class="text-[#A5D6FF]">'POST'</span>,`,
      `    <span class="text-[#79C0FF]">body</span>: { <span class="text-[#79C0FF]">origin</span>: <span class="text-[#FFA657]">query</span>.<span class="text-[#79C0FF]">from</span>, <span class="text-[#79C0FF]">destination</span>: <span class="text-[#FFA657]">query</span>.<span class="text-[#79C0FF]">to</span> }`,
      `  });`,
      `  <span class="text-[#FF7B72]">return</span> <span class="text-[#79C0FF]">data</span>.<span class="text-[#79C0FF]">value</span>?.<span class="text-[#79C0FF]">offers</span> ?? [];`,
      `};`
    ]
  },
  {
    id: 'qr-escrow',
    badge: 'Node.js & Express APIs',
    title: 'REST APIs, Payments & Security',
    subtitle: 'Node.js · Express · Idempotency · RBAC',
    description:
      'Backend API architecture handling role-based authentication, digital ePIN generation, escrow payment verification, and strict request validation.',
    guarantees: [
      'Server-side input validation, idempotency keys, and HMAC webhook signature verification.',
      'Cryptographic token verification for digital ePIN issuance and QR order handoffs.',
      'Role-based access control (RBAC) and 2FA session security for sensitive operations.'
    ],
    codeFile: 'backend/controllers/paymentController.js',
    codeSnippet: `await conn.beginTransaction();
const [order] = await conn.query(
  'SELECT * FROM orders WHERE id = ? FOR UPDATE', [orderId]
);
if (order.qr_hash !== signedToken) throw new ForbiddenError();
await settleVerifiedOrder(conn, order);
await conn.commit();`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">conn</span>.<span class="text-[#D2A8FF]">beginTransaction</span>();`,
      `<span class="text-[#FF7B72]">const</span> [<span class="text-[#79C0FF]">order</span>] = <span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">conn</span>.<span class="text-[#D2A8FF]">query</span>(`,
      `  <span class="text-[#A5D6FF]">'SELECT * FROM orders WHERE id = ? FOR UPDATE'</span>, [<span class="text-[#FFA657]">orderId</span>]`,
      `);`,
      `<span class="text-[#FF7B72]">if</span> (<span class="text-[#79C0FF]">order</span>.<span class="text-[#79C0FF]">qr_hash</span> <span class="text-[#FF7B72]">!==</span> <span class="text-[#FFA657]">signedToken</span>) <span class="text-[#FF7B72]">throw new</span> <span class="text-[#D2A8FF]">ForbiddenError</span>();`,
      `<span class="text-[#FF7B72]">await</span> <span class="text-[#D2A8FF]">settleVerifiedOrder</span>(<span class="text-[#79C0FF]">conn</span>, <span class="text-[#79C0FF]">order</span>);`,
      `<span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">conn</span>.<span class="text-[#D2A8FF]">commit</span>();`
    ]
  },
  {
    id: 'gps-bullmq',
    badge: 'Socket.io & BullMQ',
    title: 'Real Time Events & Job Queues',
    subtitle: 'Redis Pub/Sub · BullMQ Workers · WebSockets',
    description:
      'Event-driven background workers and WebSocket channels for live GPS telemetry, instant dashboard notifications, and asynchronous task processing.',
    guarantees: [
      'BullMQ and Redis queues process background jobs with automatic retry policies.',
      'Low-latency Socket.io channels sync live status updates across mobile and web clients.',
      'Decoupled worker processes keep HTTP API response times fast under load.'
    ],
    codeFile: 'backend/queues/dispatchWorker.js',
    codeSnippet: `export const dispatchWorker = new Worker('background-jobs', async (job) => {
  const candidates = await matchEligibleWorkers(job.data.coordinates);
  await broadcastRealtimeEvent(candidates, job.data.referenceId);
}, { connection: redisConnection });`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">export const</span> <span class="text-[#79C0FF]">dispatchWorker</span> = <span class="text-[#FF7B72]">new</span> <span class="text-[#D2A8FF]">Worker</span>(<span class="text-[#A5D6FF]">'background-jobs'</span>, <span class="text-[#FF7B72]">async</span> (<span class="text-[#FFA657]">job</span>) <span class="text-[#FF7B72]">=&gt;</span> {`,
      `  <span class="text-[#FF7B72]">const</span> <span class="text-[#79C0FF]">candidates</span> = <span class="text-[#FF7B72]">await</span> <span class="text-[#D2A8FF]">matchEligibleWorkers</span>(<span class="text-[#FFA657]">job</span>.<span class="text-[#79C0FF]">data</span>.<span class="text-[#79C0FF]">coordinates</span>);`,
      `  <span class="text-[#FF7B72]">await</span> <span class="text-[#D2A8FF]">broadcastRealtimeEvent</span>(<span class="text-[#79C0FF]">candidates</span>, <span class="text-[#FFA657]">job</span>.<span class="text-[#79C0FF]">data</span>.<span class="text-[#79C0FF]">referenceId</span>);`,
      `}, { <span class="text-[#79C0FF]">connection</span>: <span class="text-[#FFA657]">redisConnection</span> });`
    ]
  },
  {
    id: 'sql-concurrency',
    badge: 'MySQL Relational DB',
    title: 'Relational Schemas & Query Tuning',
    subtitle: 'ACID Transactions · Indexing · Migrations',
    description:
      'Relational MySQL database design, schema migrations, SQL query optimization, and transactional row locking across enterprise and commerce workloads.',
    guarantees: [
      'ACID database transactions and row locking prevent concurrent race conditions.',
      'Composite indexing and query refactoring to reduce API latency on production tables.',
      'Structured audit logs for financial transactions, client orders, and clinical records.'
    ],
    codeFile: 'backend/services/inventoryService.js',
    codeSnippet: `const [record] = await tx.query(
  'SELECT stock, unit_price FROM catalog_items WHERE id = ? FOR UPDATE',
  [itemId]
);
if (record.stock < qty) throw new ConflictError('INSUFFICIENT_INVENTORY');`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">const</span> [<span class="text-[#79C0FF]">record</span>] = <span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">tx</span>.<span class="text-[#D2A8FF]">query</span>(`,
      `  <span class="text-[#A5D6FF]">'SELECT stock, unit_price FROM catalog_items WHERE id = ? FOR UPDATE'</span>,`,
      `  [<span class="text-[#FFA657]">itemId</span>]`,
      `);`,
      `<span class="text-[#FF7B72]">if</span> (<span class="text-[#79C0FF]">record</span>.<span class="text-[#79C0FF]">stock</span> &lt; <span class="text-[#FFA657]">qty</span>) <span class="text-[#FF7B72]">throw new</span> <span class="text-[#D2A8FF]">ConflictError</span>(<span class="text-[#A5D6FF]">'INSUFFICIENT_INVENTORY'</span>);`
    ]
  },
  {
    id: 'gcp-security',
    badge: 'Google Cloud & CI/CD',
    title: 'Cloud Storage, Signed URLs & Deployments',
    subtitle: 'Google Cloud Storage · Docker · EAS & Vercel',
    description:
      'Cloud infrastructure on Google Cloud Platform (GCP), expiring V4 signed URLs for private files, containerized Linux services, and automated CI/CD pipelines.',
    guarantees: [
      'Expiring V4 Signed URLs on Google Cloud Storage (GCS) for private documents and media.',
      'Automated mobile builds via Expo EAS and Codemagic alongside Vercel SSR deployments.',
      'Containerized Linux and Docker environments with zero-downtime release workflows.'
    ],
    codeFile: 'backend/utils/gcsSignedUrl.js',
    codeSnippet: `const [signedUrl] = await storage
  .bucket(process.env.GCS_PRIVATE_BUCKET)
  .file(documentPath)
  .getSignedUrl({ version: 'v4', action: 'read', expires: Date.now() + 900_000 });`,
    highlightedLines: [
      `<span class="text-[#FF7B72]">const</span> [<span class="text-[#79C0FF]">signedUrl</span>] = <span class="text-[#FF7B72]">await</span> <span class="text-[#79C0FF]">storage</span>`,
      `  .<span class="text-[#D2A8FF]">bucket</span>(<span class="text-[#79C0FF]">process</span>.<span class="text-[#79C0FF]">env</span>.<span class="text-[#FFA657]">GCS_PRIVATE_BUCKET</span>)`,
      `  .<span class="text-[#D2A8FF]">file</span>(<span class="text-[#FFA657]">documentPath</span>)`,
      `  .<span class="text-[#D2A8FF]">getSignedUrl</span>({ <span class="text-[#79C0FF]">version</span>: <span class="text-[#A5D6FF]">'v4'</span>, <span class="text-[#79C0FF]">action</span>: <span class="text-[#A5D6FF]">'read'</span>, <span class="text-[#79C0FF]">expires</span>: <span class="text-[#79C0FF]">Date</span>.<span class="text-[#D2A8FF]">now</span>() + <span class="text-[#79C0FF]">900_000</span> });`
    ]
  }
]

const tiers = computed(() => [
  { label: '01 / Client & Mobile Presentation', items: nodes.slice(0, 2) },
  { label: '02 / API Layer & Real Time Workers', items: nodes.slice(2, 4) },
  { label: '03 / Relational MySQL & Cloud Infrastructure', items: nodes.slice(4, 6) }
])

const activeNode = ref<ArchNode>(nodes[3]) // Default to dispatchWorker.js so the user immediately sees the highlighted code!
const snippetCopied = ref(false)

function copySnippet() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(activeNode.value.codeSnippet)
    snippetCopied.value = true
    setTimeout(() => {
      snippetCopied.value = false
    }, 2000)
  }
}
</script>
