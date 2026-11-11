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
      'Senior Web and Mobile Engineer with over 5 years of experience designing, building, and shipping production web and mobile applications across consumer mobile apps, travel booking systems, enterprise portals, local delivery, and digital payments.'
  }

  const portfolioTelemetry = [
    {
      id: 'exp',
      label: 'PRODUCTION ENGINEERING',
      value: '5+ Years',
      subValue: 'Full Stack & Mobile',
      delta: '100% Ownership',
      sparkline: [28, 35, 42, 50, 64, 78, 92, 100],
      color: '#00FFA3'
    },
    {
      id: 'apps',
      label: 'SHIPPED PLATFORMS',
      value: 'iOS · Android · Web',
      subValue: 'App Store, Google Play & SSR',
      delta: 'CI/CD Automated',
      sparkline: [20, 38, 45, 62, 70, 85, 94, 99],
      color: '#00E5FF'
    },
    {
      id: 'systems',
      label: 'BACKEND & DATA',
      value: 'Node · MySQL · Redis',
      subValue: 'REST APIs, WebSockets & Queues',
      delta: 'High Availability',
      sparkline: [60, 68, 75, 82, 88, 94, 98, 100],
      color: '#8B5CF6'
    },
    {
      id: 'overlap',
      label: 'TEAM COLLABORATION',
      value: '9:00 AM EST+',
      subValue: 'North American & EU Overlap',
      delta: 'Daily Standup Ready',
      sparkline: [50, 65, 70, 80, 85, 90, 95, 100],
      color: '#ADFF2F'
    }
  ]

  const projects: ProjectItem[] = [
    {
      id: 'xernee',
      slug: 'xernee-platform',
      title: 'Xernee',
      subtitle: 'Social Commerce, Storefront & QR Escrow Platform',
      role: 'Technical Founder & Lead Engineer',
      period: '2024 to Present',
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
        { label: 'Platforms', value: 'iOS, Android & Nuxt 3', delta: '3 Codebases' },
        { label: 'Settlement', value: 'QR Escrow Release', delta: 'Socket.io Sync' },
        { label: 'Dispatch', value: 'BullMQ + Redis', delta: 'Live GPS' }
      ],
      summary:
        'Cross-platform mobile app (iOS and Android), Nuxt 3 web storefront, and Node.js backend combining verified merchant catalogs, AI product detection, QR escrow handoffs, and optional local courier dispatch.',
      architectureHighlights: [
        'Shipped the React Native (Expo) mobile app on Apple App Store and Google Play Store alongside the Nuxt 3 merchant portal and Node.js/Express API.',
        'Built QR order collection and Paystack escrow release synced live to merchant dashboards via Socket.io.',
        'Implemented MySQL row locking to prevent stock overselling and Google Cloud Storage signed URLs for verification documents.'
      ],
      techStack: [
        'React Native',
        'Expo',
        'Node.js',
        'Express',
        'Nuxt 3',
        'MySQL',
        'Redis',
        'Socket.io',
        'GCP'
      ]
    },
    {
      id: 'bbl',
      slug: 'bold-better-living',
      title: 'Bold Better Living',
      subtitle: 'AI Guided Wellness & Habit Tracking Mobile App',
      role: 'Mobile Developer (Contract)',
      period: '2025',
      category: 'Mobile & AI',
      liveUrl: 'https://boldbetterliving.com',
      screenshot: '/screenshots/bbl-desktop.png',
      accentColor: 'from-[#00E5FF] to-[#00FFA3]',
      accentHex: '#00E5FF',
      statusBadge: 'PRODUCTION · iOS & ANDROID',
      metrics: [
        { label: 'Mobile Stack', value: 'React Native & Expo', delta: 'iOS & Android' },
        { label: 'Guidance', value: 'In App AI Assistant', delta: 'Daily Check Ins' },
        { label: 'State Sync', value: 'Local Persistence', delta: 'Resilient HTTP' }
      ],
      summary:
        'Mobile wellness application built with React Native and Expo for personalized nutrition, fitness, weight loss tracking, and daily check-ins guided by an in-app AI assistant.',
      architectureHighlights: [
        'Developed nutrition, fitness, weight loss tracking, and daily check-in flows guided by an interactive AI assistant.',
        'Created reliable HTTP client services with token refresh, offline state persistence, and smooth 60fps navigation across iOS and Android.',
        'Built modular progress charts and habit tracking screens for daily user retention.'
      ],
      techStack: [
        'React Native',
        'Expo',
        'TypeScript',
        'REST APIs',
        'AI Assistant',
        'State Persistence',
        'iOS & Android'
      ]
    },
    {
      id: 'exquisite-escape',
      slug: 'exquisite-escape',
      title: 'Exquisite Escape',
      subtitle: 'Amadeus GDS Flight, Hotel & Tour Booking Engine',
      role: 'Frontend & API Integration Developer',
      period: '2024 to 2025',
      category: 'Travel & FinTech',
      liveUrl: 'https://exquisite-escape-nuxt.vercel.app',
      screenshot: '/screenshots/exquisite-escape-desktop.png',
      secondaryScreenshot: '/screenshots/exquisite-escape-saved.png',
      accentColor: 'from-[#8B5CF6] to-[#00E5FF]',
      accentHex: '#8B5CF6',
      statusBadge: 'LIVE · NUXT SSR + AMADEUS API',
      metrics: [
        { label: 'GDS Engine', value: 'Amadeus REST API', delta: 'Live Fares' },
        { label: 'Rendering', value: 'Nuxt.js SSR', delta: 'Fast SEO Load' },
        { label: 'Booking Flows', value: 'Flights, Hotels & Tours', delta: 'End to End' }
      ],
      summary:
        'Travel booking platform powered by Nuxt.js Server Side Rendering (SSR) and the Amadeus GDS API for live flight search, multi-city route queries, real-time pricing, hotels, and custom tour packages.',
      architectureHighlights: [
        'Integrated the Amadeus API to handle live flight search, airport autocomplete, cabin filtering, dynamic fare pricing, and booking workflows.',
        'Built the SSR frontend in Nuxt.js for fast initial page loads, SEO indexing, and automated deployments on Vercel.',
        'Designed interactive itinerary builders and multi-traveler booking forms.'
      ],
      techStack: [
        'Nuxt.js (SSR)',
        'Vue 3',
        'Node.js',
        'Amadeus API',
        'Tailwind CSS',
        'Vercel CI/CD'
      ]
    },
    {
      id: 'jons-world',
      slug: 'jons-world',
      title: 'Jons World',
      subtitle: 'Enterprise Brand Production & Client Order Portal',
      role: 'Senior Systems & Web Engineer',
      period: '2023 to Present',
      category: 'Enterprise & SaaS',
      liveUrl: 'https://jons-liart.vercel.app',
      screenshot: '/screenshots/jonsworld-desktop.png',
      secondaryScreenshot: '/screenshots/jons-world-saved.png',
      accentColor: 'from-[#00FFA3] to-[#8B5CF6]',
      accentHex: '#10B981',
      statusBadge: 'LIVE · ENTERPRISE WEB SYSTEM',
      metrics: [
        { label: 'Database', value: 'MySQL Relational', delta: 'Tuned Queries' },
        { label: 'API Layer', value: 'Node.js & Express', delta: 'Strict Validation' },
        { label: 'Adoption', value: '30+ Enterprise Clients', delta: '4.8/5 Rating' }
      ],
      summary:
        'Full-stack web platform for St. Jons World Communications Ltd., powering enterprise branding, commercial print workflows, custom packaging quotes, and client order pipelines.',
      architectureHighlights: [
        'Architected and maintained client and server applications across Nuxt.js, Node.js/Express REST APIs, and relational MySQL schemas.',
        'Optimized SQL queries and backend routes to cut response latency, tighten request validation, and improve HTTP client reliability.',
        'Partnered with business stakeholders to scope features, resolve production issues, and ship updates without downtime.'
      ],
      techStack: [
        'Node.js',
        'Express',
        'Nuxt.js',
        'MySQL',
        'REST APIs',
        'Tailwind CSS'
      ]
    },
    {
      id: 'techcare-geoedu',
      slug: 'techcare-and-geoedu360',
      title: 'Tech.Care & GeoEdu360',
      subtitle: 'Clinical Patient Telemetry & Digital ePIN REST API',
      role: 'Full Stack Developer',
      period: '2021 to 2024',
      category: 'Enterprise & SaaS',
      liveUrl: 'https://github.com/chrisjosh087',
      screenshot: '/screenshots/techcare-desktop.png',
      accentColor: 'from-[#00E5FF] to-[#8B5CF6]',
      accentHex: '#00E5FF',
      statusBadge: 'FULL STACK · HEALTH & EDTECH',
      metrics: [
        { label: 'Clinical UI', value: 'Vital Sign Telemetry', delta: 'BP & Heart Charts' },
        { label: 'GeoEdu360 API', value: 'Digital ePIN Engine', delta: 'Audit Logs' },
        { label: 'Access Control', value: 'Session & RBAC', delta: 'MySQL Integrity' }
      ],
      summary:
        'Patient diagnostic dashboard (Tech.Care) visualizing multi-month blood pressure trends, heart-rate vitals, and lab records, paired with the GeoEdu360 REST API for digital ePIN purchases and audit logging.',
      architectureHighlights: [
        'Built the Tech.Care clinical interface with interactive systolic/diastolic blood pressure charting and instant patient diagnostic lookup.',
        'Engineered the GeoEdu360 REST API for multi-role authentication, session security, digital ePIN generation, and transaction logging.',
        'Mentored junior developers and IT interns across JavaScript, Vue.js, Node.js, Express, MySQL, Git, and Linux.'
      ],
      techStack: [
        'JavaScript (ES6+)',
        'Vue 3',
        'Node.js',
        'Express',
        'MySQL',
        'PHP',
        'Linux & Git'
      ]
    },
    {
      id: 'fashionhub-renax',
      slug: 'fashion-hub-and-renax',
      title: 'Fashion Hub & Renax',
      subtitle: 'Multi Vendor Marketplace & Fleet Booking Interface',
      role: 'Full Stack Developer',
      period: '2021 to 2024',
      category: 'Commerce & Delivery',
      liveUrl: 'https://github.com/chrisjosh087',
      screenshot: '/screenshots/renax-desktop.png',
      accentColor: 'from-[#F59E0B] to-[#00FFA3]',
      accentHex: '#F59E0B',
      statusBadge: 'MARKETPLACE & BOOKING UI',
      metrics: [
        { label: 'Catalog', value: 'Multi Merchant', delta: 'Inventory & Cart' },
        { label: 'Frontend', value: 'Responsive UI', delta: 'Fast Filtering' },
        { label: 'Backend', value: 'REST API + MySQL', delta: 'Order Tracking' }
      ],
      summary:
        'Multi-merchant e-commerce storefront (Fashion Hub) with vendor inventory management and customer checkout, alongside the Renax automotive fleet booking interface.',
      architectureHighlights: [
        'Implemented multi-vendor catalog browsing, cart synchronization, merchant inventory controls, and customer checkout flows.',
        'Crafted responsive dark-mode booking layouts with instant category filtering and mobile-first grids.'
      ],
      techStack: [
        'Vue 3',
        'Nuxt.js',
        'Node.js',
        'Express',
        'MySQL',
        'Tailwind CSS',
        'REST APIs'
      ]
    }
  ]

  const experiences: ExperienceItem[] = [
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
          title: 'Client & Server Architecture',
          text: 'Develop and maintain production web applications, managing relational MySQL schemas, Express REST endpoints, and responsive Nuxt.js interfaces across desktop and mobile.'
        },
        {
          title: 'Query & Route Optimization',
          text: 'Refactored backend routes and SQL queries to lower API latency, enforce strict payload validation, and make HTTP client integrations more resilient.'
        },
        {
          title: 'Product Delivery',
          text: 'Partner directly with stakeholders to scope requirements, diagnose live production issues, and ship zero-downtime releases.'
        }
      ]
    },
    {
      id: 'exp-xernee',
      role: 'Technical Founder & Lead Engineer',
      company: 'Xernee',
      period: '2024 to Present',
      type: 'Founder & Lead Architect',
      url: 'https://xernee.com/download',
      urlLabel: 'xernee.com/download',
      accent: '#00FFA3',
      stack: [
        'React Native',
        'Expo',
        'Node.js',
        'Express',
        'Nuxt 3',
        'MySQL',
        'Redis',
        'Socket.io',
        'GCP'
      ],
      bullets: [
        {
          title: 'Mobile, Web & API Ecosystem',
          text: 'Architected and shipped the React Native mobile app on Apple App Store and Google Play Store, the Nuxt 3 web storefront, and the Node.js/Express core API.'
        },
        {
          title: 'Escrow, QR Handover & Dispatch',
          text: 'Engineered Paystack escrow checkout with QR code order verification, live Socket.io dashboard sync, and Redis/BullMQ courier dispatch with WebSocket GPS tracking.'
        },
        {
          title: 'Data Integrity & Cloud Security',
          text: 'Implemented MySQL row locking (SELECT ... FOR UPDATE) to prevent stock overselling, idempotency keys, Google Cloud Storage signed URLs, and 2FA merchant sessions.'
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
      stack: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'AI Integration'],
      bullets: [
        {
          title: 'Cross Platform Mobile App',
          text: 'Built the BBL wellness mobile app using React Native and Expo, delivering nutrition, fitness, weight loss tracking, and daily check-ins guided by an in-app AI assistant.'
        },
        {
          title: 'Offline Persistence & Navigation',
          text: 'Engineered resilient HTTP client services, local state persistence, and smooth native navigation across iOS and Android devices.'
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
      stack: ['Nuxt.js (SSR)', 'Vue 3', 'Node.js', 'Amadeus REST API', 'Vercel'],
      bullets: [
        {
          title: 'Amadeus GDS Integration',
          text: 'Integrated the Amadeus REST API for live flight search, multi-leg route queries, real-time fare pricing, and end-to-end booking workflows across flights, hotels, and tours.'
        },
        {
          title: 'SSR Performance & CI/CD',
          text: 'Built the responsive frontend with Nuxt.js Server Side Rendering (SSR) for fast load times and SEO indexing, managing automated deployments on Vercel.'
        }
      ]
    },
    {
      id: 'exp-geosolutions',
      role: 'Full Stack Developer & Technical Instructor',
      company: 'Geosolutions & Independent Projects',
      period: '2021 to 2024',
      type: 'Full Stack Engineering & Mentorship',
      accent: '#F59E0B',
      stack: ['JavaScript', 'Node.js', 'Express', 'Vue.js', 'PHP', 'MySQL', 'Linux', 'Git'],
      bullets: [
        {
          title: 'Full Stack Web & API Systems',
          text: 'Delivered production web apps and APIs including GeoEdu360 API (authentication, digital ePIN generation, and transaction logs), Tech.Care (clinical records UI), and Fashion Hub (multi-vendor marketplace).'
        },
        {
          title: 'Engineering Mentorship',
          text: 'Trained and mentored junior developers and IT interns across JavaScript, Vue.js, Node.js, Express, MySQL schema design, Git workflows, and Linux.'
        }
      ]
    }
  ]

  const skillGroups: SkillGroup[] = [
    {
      id: 'client-mobile',
      category: 'Client & Mobile',
      tag: 'FRONTEND & CROSS PLATFORM',
      accent: '#00FFA3',
      allocation: 30,
      description: 'iOS and Android mobile apps and SSR web applications with responsive UI and offline-resilient state.',
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
      tag: 'BACKEND & REAL TIME',
      accent: '#00E5FF',
      allocation: 28,
      description: 'Node.js and Express REST APIs, third-party GDS/payment integrations, WebSockets, and job queues.',
      skills: [
        { name: 'Node.js', level: 98, highlight: true },
        { name: 'Express.js', level: 98, highlight: true },
        { name: 'REST APIs & HTTP Clients', level: 98, highlight: true },
        { name: 'Socket.io (WebSockets)', level: 96, highlight: true },
        { name: 'BullMQ & Redis Queues', level: 94, highlight: true },
        { name: 'Amadeus GDS API', level: 94 },
        { name: 'Webhook Verification', level: 96 }
      ]
    },
    {
      id: 'databases-cloud',
      category: 'Databases & Cloud',
      tag: 'DATA & INFRASTRUCTURE',
      accent: '#8B5CF6',
      allocation: 22,
      description: 'Relational MySQL schema design, query optimization, ACID transactions, and Google Cloud storage.',
      skills: [
        { name: 'MySQL', level: 98, highlight: true },
        { name: 'Schema Design & Migrations', level: 96, highlight: true },
        { name: 'ACID Transactions & Locking', level: 97, highlight: true },
        { name: 'Redis Caching', level: 95 },
        { name: 'Google Cloud Platform (GCP)', level: 94, highlight: true },
        { name: 'Google Cloud Storage (GCS)', level: 96, highlight: true }
      ]
    },
    {
      id: 'security-devops',
      category: 'Security & DevOps',
      tag: 'AUTH & DEPLOYMENT',
      accent: '#ADFF2F',
      allocation: 10,
      description: 'Role-based access control, 2FA sessions, signed URLs, idempotent mutations, and CI/CD pipelines.',
      skills: [
        { name: 'JWT & Session Security', level: 98 },
        { name: 'Two Factor Auth (2FA)', level: 95, highlight: true },
        { name: 'GCS Signed URLs', level: 96 },
        { name: 'Idempotency Keys', level: 97, highlight: true },
        { name: 'Docker & Linux', level: 90 },
        { name: 'CI/CD (EAS, Codemagic, Vercel)', level: 95, highlight: true },
        { name: 'Git Workflows', level: 97 }
      ]
    },
    {
      id: 'product-domains',
      category: 'Product Domains',
      tag: 'SHIPPED VERTICALS',
      accent: '#F59E0B',
      allocation: 10,
      description: 'Hands-on delivery across travel GDS booking, AI mobile wellness, enterprise portals, healthcare UI, and commerce.',
      skills: [
        { name: 'Travel & GDS Booking', level: 96, highlight: true },
        { name: 'AI Mobile Wellness Apps', level: 96, highlight: true },
        { name: 'Enterprise Web Portals', level: 98, highlight: true },
        { name: 'Escrow & Payment Flows', level: 98, highlight: true },
        { name: 'Live GPS & QR Dispatch', level: 97 }
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
      institution: 'English (Fluent) · Available for full EST overlap starting 9:00 AM EST',
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
