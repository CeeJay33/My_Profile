export interface ProjectItem {
  id: string
  slug: string
  title: string
  subtitle: string
  role: string
  period: string
  category: 'Commerce & Delivery' | 'Mobile & AI' | 'Enterprise & SaaS' | 'Travel & FinTech'
  liveUrl: string
  secondaryUrl?: string
  secondaryLabel?: string
  screenshot: string
  secondaryScreenshot?: string
  accentColor: string
  accentHex: string
  statusBadge: string
  metrics: { label: string; value: string; delta: string }[]
  summary: string
  architectureHighlights: string[]
  techStack: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  type: string
  url?: string
  urlLabel?: string
  accent: string
  stack: string[]
  bullets: { title?: string; text: string }[]
}

export interface SkillGroup {
  id: string
  category: string
  tag: string
  accent: string
  allocation: number
  description: string
  skills: { name: string; level: number; highlight?: boolean }[]
}

export const usePortfolioData = () => {
  const profile = {
    name: 'CHRIS JOSHUA',
    displayName: 'Chris Joshua',
    title: 'Senior Web & Mobile Engineer',
    tagline: 'React Native · Node.js · Express · Nuxt 3 · GCP',
    email: 'chrisjosh087@gmail.com',
    secondaryEmail: 'info@xernee.com',
    phone: '+234 802 261 9320',
    linkedin: 'https://www.linkedin.com/in/chris-josh-5a1850284',
    linkedinHandle: 'linkedin.com/in/chris-josh-5a1850284',
    github: 'https://github.com/chrisjosh087',
    website: 'https://xernee.com',
    appDownloadUrl: 'https://xernee.com/download',
    availability: 'EST Overlap Ready (9:00 AM EST onwards)',
    location: 'Lagos, Nigeria · Global Remote (EST / GMT Overlap)',
    cvUrl: '/Chris_Joshua_CV.pdf',
    personalStatement:
      'Senior Web and Mobile Engineer with over 5 years of experience designing, building, and shipping production web and mobile applications across local delivery, online commerce, live GPS tracking, and digital payments. Experienced in taking full ownership of features on both the server and client using React Native, React, Vue and Nuxt, Node.js, Express, MySQL, Redis, Socket.io, and Google Cloud Platform (GCP). Skilled at working with greenfield and existing codebases, managing relational database schemas, building reliable REST APIs and HTTP clients, and collaborating in daily team discussions.'
  }

  const portfolioTelemetry = [
    {
      id: 'exp',
      label: 'PRODUCTION ENGINEERING',
      value: '5+ Years',
      subValue: 'Full-Stack & Cross-Platform Mobile',
      delta: '+100% Ownership',
      sparkline: [28, 35, 42, 50, 64, 78, 92, 100],
      color: '#00FFA3'
    },
    {
      id: 'apps',
      label: 'SHIPPED ECOSYSTEMS',
      value: 'iOS · Android · Web',
      subValue: 'Live on App Store & Google Play',
      delta: 'OTA & CI/CD Ready',
      sparkline: [20, 38, 45, 62, 70, 85, 94, 99],
      color: '#00E5FF'
    },
    {
      id: 'escrow',
      label: 'PAYMENT & ESCROW INTEGRITY',
      value: '99.98%',
      subValue: 'Row-Locked MySQL + QR Handoff',
      delta: 'Zero Overselling',
      sparkline: [60, 68, 75, 82, 88, 94, 98, 100],
      color: '#8B5CF6'
    },
    {
      id: 'overlap',
      label: 'TEAM COLLABORATION WINDOW',
      value: '9:00 AM EST+',
      subValue: 'Full North American & EU Overlap',
      delta: 'Daily Standup Ready',
      sparkline: [50, 65, 70, 80, 85, 90, 95, 100],
      color: '#ADFF2F'
    }
  ]

  const projects: ProjectItem[] = [
    {
      id: 'xernee',
      slug: 'xernee-platform',
      title: 'Xernee — Commerce, Courier Dispatch & QR Escrow',
      subtitle: 'Technical Founder & Lead Engineer · Mobile App (iOS & Android) + Nuxt 3 Storefront + Node.js/Express Core',
      role: 'Technical Founder & Lead Engineer',
      period: '2024 – Present',
      category: 'Commerce & Delivery',
      liveUrl: 'https://xernee.com',
      secondaryUrl: 'https://xernee.com/download',
      secondaryLabel: 'App Store & Play Store',
      screenshot: '/screenshots/xernee-desktop.png',
      secondaryScreenshot: '/screenshots/xernee-download-desktop.png',
      accentColor: 'from-[#00FFA3] to-[#00E5FF]',
      accentHex: '#00FFA3',
      statusBadge: 'LIVE · APP STORE & PLAY STORE',
      metrics: [
        { label: 'Architecture', value: 'Mobile + Web + API', delta: '3 Codebases' },
        { label: 'Escrow Release', value: 'QR Scan Gated', delta: 'Socket.io Live' },
        { label: 'Dispatch Queue', value: 'BullMQ + Redis', delta: 'Real-Time GPS' }
      ],
      summary:
        'End-to-end social commerce, merchant storefront, and on-demand local courier dispatch ecosystem. Features AI computer-vision product detection, ephemeral Seller Stories, distance-based courier dispatch with live WebSocket GPS telemetry, and cryptographic QR code proof-of-pickup/delivery escrow handoffs.',
      architectureHighlights: [
        'Full Stack & Mobile Architecture: Cross-platform React Native (Expo) mobile app live on Apple App Store & Google Play Store, Node.js/Express backend, and Nuxt 3 merchant portal.',
        'Local Courier Dispatch & Live GPS Tracking: Distance-based pricing, courier collateral management, live WebSocket GPS tracking, and BullMQ/Redis background job queues matching orders to nearby couriers.',
        'QR Proof of Delivery & Escrow Handoff: Holds payment in escrow at checkout and releases funds to merchants and couriers only when pickup/delivery QR code is scanned, syncing live via Socket.io.',
        'Database Schema & Payment Integrity: Relational MySQL transactions with row locking (SELECT ... FOR UPDATE) to prevent stock overselling, server-side price validation, idempotency keys, and webhook signature verification.',
        'Google Cloud & Security Infrastructure: Media streaming on Google Cloud Storage (GCS), expiring signed URLs for private KYC documents, and 2FA authenticator protection for merchant sessions.'
      ],
      techStack: [
        'React Native',
        'Expo',
        'Node.js',
        'Express.js',
        'Nuxt 3',
        'MySQL',
        'Redis',
        'BullMQ',
        'Socket.io',
        'Google Cloud Storage',
        'Paystack Escrow',
        '2FA / JWT'
      ]
    },
    {
      id: 'bbl',
      slug: 'bold-better-living',
      title: 'Bold Better Living (BBL) — AI Wellness Companion',
      subtitle: 'Mobile Developer (Contract) · React Native, Expo & AI Health Rhythm Engine',
      role: 'Mobile Developer (Contract)',
      period: '2025 (Contract)',
      category: 'Mobile & AI',
      liveUrl: 'https://boldbetterliving.com',
      screenshot: '/screenshots/bbl-desktop.png',
      accentColor: 'from-[#00E5FF] to-[#00FFA3]',
      accentHex: '#00E5FF',
      statusBadge: 'PRODUCTION · iOS & ANDROID',
      metrics: [
        { label: 'Platform', value: 'iOS & Android', delta: 'React Native + Expo' },
        { label: 'Intelligence', value: 'In-App AI Guide', delta: 'Daily Check-Ins' },
        { label: 'Offline Sync', value: 'Local Persistence', delta: 'Resilient HTTP' }
      ],
      summary:
        'AI-guided wellness mobile application and digital platform tailored for personalized nutrition, fitness, weight loss tracking, and daily rhythm check-ins powered by an adaptive in-app AI assistant.',
      architectureHighlights: [
        'Built the BBL wellness mobile application using React Native and Expo, implementing nutrition, fitness, weight loss tracking, and daily check-in features guided by an in-app AI assistant.',
        'Engineered resilient HTTP client services with automatic retry/token refresh, local state persistence, and 60fps native navigation transitions across iOS and Android devices.',
        'Structured modular biometric & habit telemetry tracking screens with real-time progress visualization.'
      ],
      techStack: [
        'React Native',
        'Expo',
        'TypeScript',
        'REST APIs',
        'AI Assistant Integration',
        'Local State Persistence',
        'iOS & Android'
      ]
    },
    {
      id: 'exquisite-escape',
      slug: 'exquisite-escape',
      title: 'Exquisite Escape — Amadeus SSR Flight & Travel Engine',
      subtitle: 'Frontend & API Integration Developer · Nuxt.js SSR + Amadeus GDS Real-Time Pricing',
      role: 'Frontend & API Integration Developer',
      period: '2024 – 2025 (Contract)',
      category: 'Travel & FinTech',
      liveUrl: 'https://exquisite-escape-nuxt.vercel.app',
      screenshot: '/screenshots/exquisite-escape-desktop.png',
      secondaryScreenshot: '/screenshots/exquisite-escape-saved.png',
      accentColor: 'from-[#8B5CF6] to-[#00E5FF]',
      accentHex: '#8B5CF6',
      statusBadge: 'LIVE · NUXT SSR + AMADEUS API',
      metrics: [
        { label: 'GDS Engine', value: 'Amadeus API', delta: 'Live Flight Fares' },
        { label: 'Rendering', value: 'Nuxt.js SSR', delta: 'Sub-Second Hydration' },
        { label: 'Workflows', value: 'Flights · Hotels · Tours', delta: 'End-to-End Booking' }
      ],
      summary:
        'Full-featured travel booking platform powered by Nuxt.js Server-Side Rendering (SSR) and the Amadeus Global Distribution System (GDS) REST API for live flight search, multi-leg route queries, real-time fare pricing, hotels, and custom tour packages.',
      architectureHighlights: [
        'Integrated the Amadeus REST API to power live flight search, airport/route autocomplete queries, cabin class filtering, real-time dynamic pricing, and end-to-end travel booking workflows.',
        'Engineered the responsive web frontend using Nuxt.js with Server-Side Rendering (SSR) for fast first-contentful paint, SEO indexing, and continuous deployment on Vercel.',
        'Built interactive boarding-pass search widgets and custom package builders with dynamic itinerary calculation.'
      ],
      techStack: [
        'Nuxt.js (SSR)',
        'Vue 3',
        'Node.js',
        'Amadeus REST API',
        'Tailwind CSS',
        'Vercel CI/CD'
      ]
    },
    {
      id: 'jons-world',
      slug: 'jons-world',
      title: 'Jons World — Enterprise Brand & Production Portal',
      subtitle: 'Senior Systems & Web Engineer · Full-Stack Nuxt.js, Node.js/Express & Relational MySQL',
      role: 'Senior Systems & Web Engineer',
      period: '2023 – Present',
      category: 'Enterprise & SaaS',
      liveUrl: 'https://jons-liart.vercel.app',
      screenshot: '/screenshots/jonsworld-desktop.png',
      secondaryScreenshot: '/screenshots/jons-world-saved.png',
      accentColor: 'from-[#00FFA3] to-[#8B5CF6]',
      accentHex: '#10B981',
      statusBadge: 'LIVE · ENTERPRISE WEB SYSTEM',
      metrics: [
        { label: 'Database', value: 'MySQL Relational', delta: 'Optimized Queries' },
        { label: 'API Layer', value: 'Node.js + Express', delta: 'Strict Validation' },
        { label: 'Client Reach', value: '30+ Enterprise Brands', delta: '4.8/5 Trustpilot' }
      ],
      summary:
        'Client and server web platform for St. Jons World Communications Ltd., powering enterprise branding, commercial print workflows, custom packaging quotes, and client order pipelines.',
      architectureHighlights: [
        'Developed and maintained client and server solutions for web applications, managing relational MySQL database schemas, REST endpoints, and responsive user interfaces across desktop and mobile devices.',
        'Improved existing backend routes and SQL queries to reduce response latency, strengthen payload input validation, and make HTTP client calls more reliable.',
        'Collaborated directly with stakeholders to scope product features, diagnose production issues, and ship zero-downtime updates.'
      ],
      techStack: [
        'Node.js',
        'Express.js',
        'Nuxt.js',
        'MySQL',
        'REST APIs',
        'Tailwind CSS'
      ]
    },
    {
      id: 'techcare-geoedu',
      slug: 'techcare-and-geoedu360',
      title: 'Tech.Care & GeoEdu360 — Clinical Telemetry & ePIN API',
      subtitle: 'Full Stack Developer · Healthcare Records Platform & High-Security Digital ePIN API',
      role: 'Full Stack Developer',
      period: '2021 – 2024',
      category: 'Enterprise & SaaS',
      liveUrl: 'https://github.com/chrisjosh087',
      screenshot: '/screenshots/techcare-desktop.png',
      accentColor: 'from-[#00E5FF] to-[#8B5CF6]',
      accentHex: '#00E5FF',
      statusBadge: 'FULL-STACK · HEALTH & EDTECH',
      metrics: [
        { label: 'Clinical UI', value: 'Vital Sign Telemetry', delta: 'Systolic/Diastolic Charts' },
        { label: 'GeoEdu360 API', value: 'Digital ePIN Engine', delta: 'Audit Transaction Logs' },
        { label: 'Security', value: 'Session & RBAC', delta: 'MySQL Integrity' }
      ],
      summary:
        'Healthcare patient telemetry dashboard (Tech.Care) visualizing multi-month blood pressure trends, respiratory/heart-rate vitals, and patient diagnostic records, alongside GeoEdu360 API for secure digital ePIN purchases and transaction logging.',
      architectureHighlights: [
        'Engineered Tech.Care patient diagnostic dashboard featuring interactive systolic/diastolic blood pressure charting, vital sign anomaly indicators, and instant patient record lookup.',
        'Architected the GeoEdu360 REST API handling multi-role authentication, hardened session security, cryptographic digital ePIN generation/purchases, and immutable transaction logging.',
        'Coached and mentored junior developers and IT interns in frontend and backend engineering across JavaScript, Vue.js, Node.js, Express, MySQL databases, Git, and Linux.'
      ],
      techStack: [
        'JavaScript (ES6+)',
        'Vue 3',
        'Node.js',
        'Express.js',
        'MySQL',
        'PHP',
        'Linux & Git'
      ]
    },
    {
      id: 'fashionhub-renax',
      slug: 'fashion-hub-and-renax',
      title: 'Fashion Hub & Renax — Multi-Vendor & Fleet Showcase',
      subtitle: 'Full Stack Engineer · Multi-Merchant Marketplace & Dark-Mode Automotive Booking UI',
      role: 'Full Stack Developer',
      period: '2021 – 2024',
      category: 'Commerce & Delivery',
      liveUrl: 'https://github.com/chrisjosh087',
      screenshot: '/screenshots/renax-desktop.png',
      accentColor: 'from-[#F59E0B] to-[#00FFA3]',
      accentHex: '#F59E0B',
      statusBadge: 'MARKETPLACE & INTERACTIVE UI',
      metrics: [
        { label: 'Architecture', value: 'Multi-Merchant', delta: 'Catalog & Checkout' },
        { label: 'UI Performance', value: '60fps Transitions', delta: 'Responsive Grid' },
        { label: 'Backend', value: 'REST API + MySQL', delta: 'Order Lifecycle' }
      ],
      summary:
        'Merchant and customer commerce platforms including Fashion Hub (multi-vendor storefront, inventory management, and customer checkout) and high-contrast interactive automotive fleet configurators.',
      architectureHighlights: [
        'Built merchant and customer marketplace workflows supporting multi-vendor product catalogs, cart state synchronization, and order lifecycle tracking.',
        'Designed high-contrast dark-theme UI layouts with interactive category filtering, smooth viewport transitions, and mobile-first responsive grids.'
      ],
      techStack: [
        'Vue 3',
        'Nuxt.js',
        'Node.js',
        'Express.js',
        'MySQL',
        'Tailwind CSS',
        'REST APIs'
      ]
    }
  ]

  const experiences: ExperienceItem[] = [
    {
      id: 'exp-xernee',
      role: 'Technical Founder & Lead Engineer',
      company: 'Xernee',
      period: '2024 to Present',
      type: 'Full-Time · Founder & Lead Architect',
      url: 'https://xernee.com/download',
      urlLabel: 'xernee.com/download',
      accent: '#00FFA3',
      stack: [
        'React Native',
        'Node.js',
        'Express',
        'MySQL',
        'Redis',
        'BullMQ',
        'Socket.io',
        'Nuxt 3',
        'Google Cloud Platform'
      ],
      bullets: [
        {
          title: 'Full Stack & Mobile Architecture',
          text: 'Designed, built, and shipped the complete platform across a cross-platform React Native mobile app (live on Apple App Store and Google Play Store), a Node.js and Express backend, and a Nuxt 3 web storefront and merchant portal.'
        },
        {
          title: 'Local Courier Dispatch & Live GPS Tracking',
          text: 'Built the on-demand delivery system with distance-based pricing, courier collateral management, live WebSocket GPS tracking, and background job queues that match orders to nearby online couriers.'
        },
        {
          title: 'QR Proof of Delivery & Escrow Handoff',
          text: 'Implemented QR code order collection that holds payment in escrow at checkout and releases funds to merchants and couriers only when the pickup or delivery QR code is scanned, while syncing scan status live to the merchant web dashboard via Socket.io.'
        },
        {
          title: 'Database Schema & Payment Integrity',
          text: 'Managed relational MySQL schemas and migrations, using database transactions and row locking to prevent stock overselling, server-side price validation, idempotency keys, and webhook signature verification.'
        },
        {
          title: 'Google Cloud & Security Infrastructure',
          text: 'Configured media storage and streaming on Google Cloud Storage (GCS), built expiring signed URLs for private verification documents, and added authenticator 2FA protection for merchant web sessions.'
        }
      ]
    },
    {
      id: 'exp-jonsworld',
      role: 'Senior Systems & Web Engineer',
      company: 'Jons World',
      period: '2023 to Present',
      type: 'Senior Engineering Role',
      url: 'https://jons-liart.vercel.app',
      urlLabel: 'jons-liart.vercel.app',
      accent: '#00E5FF',
      stack: ['Node.js', 'Express', 'Nuxt.js', 'MySQL', 'REST APIs', 'Tailwind CSS'],
      bullets: [
        {
          text: 'Developed and maintained client and server solutions for web applications, managing MySQL database schemas, REST endpoints, and responsive user interfaces across desktop and mobile devices.'
        },
        {
          text: 'Improved existing backend routes and SQL queries to reduce response times, strengthen input validation, and make HTTP client calls more reliable.'
        },
        {
          text: 'Worked closely with stakeholders to plan features, resolve production issues, and ship updates smoothly.'
        }
      ]
    },
    {
      id: 'exp-bbl',
      role: 'Mobile Developer',
      company: 'Bold Better Living (BBL)',
      period: '2025 (Contract)',
      type: 'Contract · Mobile Engineering',
      url: 'https://boldbetterliving.com',
      urlLabel: 'boldbetterliving.com',
      accent: '#8B5CF6',
      stack: ['React Native', 'Expo', 'REST APIs', 'AI Integration'],
      bullets: [
        {
          text: 'Built the BBL wellness mobile application using React Native and Expo, implementing nutrition, fitness, weight loss tracking, and daily check-in features guided by an in-app AI assistant.'
        },
        {
          text: 'Created reliable HTTP client services, local state persistence, and smooth mobile navigation for iOS and Android users.'
        }
      ]
    },
    {
      id: 'exp-exquisite',
      role: 'Frontend & API Integration Developer',
      company: 'Exquisite Escape',
      period: '2024 to 2025 (Contract)',
      type: 'Contract · SSR & GDS Integration',
      url: 'https://exquisite-escape-nuxt.vercel.app',
      urlLabel: 'exquisite-escape-nuxt.vercel.app',
      accent: '#ADFF2F',
      stack: ['Nuxt.js (SSR)', 'Node.js', 'Amadeus REST API', 'Vercel'],
      bullets: [
        {
          text: 'Integrated the Amadeus API to power live flight search, route queries, real-time pricing, and end-to-end travel booking workflows for flights, hotels, and tours.'
        },
        {
          text: 'Engineered the web frontend using Nuxt.js with Server Side Rendering (SSR) for fast load times and managed continuous deployment on Vercel.'
        }
      ]
    },
    {
      id: 'exp-geosolutions',
      role: 'Full Stack Developer & Technical Instructor',
      company: 'Geosolutions & Independent Projects',
      period: '2021 to 2024',
      type: 'Full-Stack Engineering & Mentorship',
      accent: '#F59E0B',
      stack: ['JavaScript', 'Node.js', 'Express', 'Vue.js', 'PHP', 'MySQL', 'Linux', 'Git'],
      bullets: [
        {
          text: 'Built and maintained full stack web applications and REST APIs including GeoEdu360 API (authentication, session security, digital ePIN purchases, and transaction logging), Tech Care (healthcare records platform), and Fashion Hub (merchant and customer marketplace).'
        },
        {
          text: 'Coached and mentored junior developers and IT interns in frontend and backend engineering across JavaScript, Vue.js, Node.js, Express, MySQL databases, Git, and Linux.'
        }
      ]
    }
  ]

  const skillGroups: SkillGroup[] = [
    {
      id: 'client-mobile',
      category: 'Client & Mobile',
      tag: 'FRONTEND & CROSS-PLATFORM',
      accent: '#00FFA3',
      allocation: 30,
      description: 'Production iOS/Android mobile apps and SSR web applications with 60fps motion and resilient state.',
      skills: [
        { name: 'React Native', level: 98, highlight: true },
        { name: 'Expo (EAS / OTA)', level: 98, highlight: true },
        { name: 'Vue 3', level: 96, highlight: true },
        { name: 'Nuxt 3 (SSR)', level: 97, highlight: true },
        { name: 'React.js', level: 94 },
        { name: 'TypeScript', level: 92, highlight: true },
        { name: 'JavaScript (ES6+)', level: 98 },
        { name: 'TanStack Query', level: 92 },
        { name: 'Tailwind CSS', level: 98 },
        { name: 'HTML5 & CSS3', level: 98 }
      ]
    },
    {
      id: 'server-apis',
      category: 'Server & APIs',
      tag: 'REAL-TIME & DISTRIBUTED BACKEND',
      accent: '#00E5FF',
      allocation: 28,
      description: 'Event-driven Node.js/Express backends, WebSocket telemetry, and distributed Redis/BullMQ workers.',
      skills: [
        { name: 'Node.js', level: 98, highlight: true },
        { name: 'Express.js', level: 98, highlight: true },
        { name: 'REST APIs & HTTP Clients', level: 98, highlight: true },
        { name: 'Socket.io (WebSockets)', level: 96, highlight: true },
        { name: 'BullMQ Job Queues', level: 94, highlight: true },
        { name: 'Redis Pub/Sub', level: 94 },
        { name: 'Webhook Processing', level: 96 }
      ]
    },
    {
      id: 'databases-cloud',
      category: 'Databases & Cloud',
      tag: 'DATA INTEGRITY & CLOUD INFRA',
      accent: '#8B5CF6',
      allocation: 22,
      description: 'Relational MySQL schema design, ACID row locking for zero-oversell commerce, and GCP storage pipelines.',
      skills: [
        { name: 'MySQL', level: 98, highlight: true },
        { name: 'Database Schema & Migrations', level: 96, highlight: true },
        { name: 'Transactions & Row Locking', level: 97, highlight: true },
        { name: 'Redis Caching & Streams', level: 95 },
        { name: 'Google Cloud Platform (GCP)', level: 94, highlight: true },
        { name: 'Google Cloud Storage (GCS)', level: 96, highlight: true }
      ]
    },
    {
      id: 'security-devops',
      category: 'Security & DevOps',
      tag: 'HARDENED AUTH & CI/CD PIPELINES',
      accent: '#ADFF2F',
      allocation: 10,
      description: 'Cryptographic signed URLs, idempotent payment mutations, 2FA sessions, and automated mobile/web CI/CD.',
      skills: [
        { name: 'JWT Authentication', level: 98 },
        { name: 'Two Factor Auth (2FA)', level: 95, highlight: true },
        { name: 'Signed URLs (GCS)', level: 96 },
        { name: 'Idempotency Keys', level: 97, highlight: true },
        { name: 'Docker & Linux', level: 90 },
        { name: 'CI/CD (Codemagic, EAS, Vercel)', level: 95, highlight: true },
        { name: 'Git Workflows', level: 97 }
      ]
    },
    {
      id: 'delivery-commerce',
      category: 'Delivery & Commerce',
      tag: 'DOMAIN SPECIALIZATION',
      accent: '#F59E0B',
      allocation: 10,
      description: 'Battle-tested domain expertise in real-time courier dispatch, escrow payouts, and multi-vendor commerce.',
      skills: [
        { name: 'Local Courier Dispatch', level: 98, highlight: true },
        { name: 'Live GPS Tracking', level: 97, highlight: true },
        { name: 'QR Code Proof of Delivery', level: 99, highlight: true },
        { name: 'Escrow Payment Workflows', level: 98, highlight: true },
        { name: 'Merchant Storefront Integrations', level: 97 }
      ]
    }
  ]

  const education = [
    {
      title: 'Computer Science',
      institution: 'Yaba College of Technology (YabaTech), Lagos',
      badge: 'Academic Degree / Diploma'
    },
    {
      title: 'Full Stack Software Development',
      institution: 'New Horizons',
      badge: 'Professional Certification'
    },
    {
      title: 'Languages & Availability',
      institution: 'English (Fluent) · Available for full EST hours overlap starting 9:00 AM EST',
      badge: '9:00 AM EST Onwards'
    }
  ]

  return {
    profile,
    portfolioTelemetry,
    projects,
    experiences,
    skillGroups,
    education
  }
}
