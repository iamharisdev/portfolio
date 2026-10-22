// ─────────────────────────────────────────────────────────────
// EVERYTHING ON THE SITE LIVES IN THIS FILE.
// Change text, links, or image paths here — no need to touch
// any component. To change a photo, drop the new file into
// /public/images (or /public/images/projects) and update the
// path below, e.g. "/images/my-pic.jpg".
// ─────────────────────────────────────────────────────────────

const content = {
  profile: {
    name: "Muhammad Haris",
    role: "Senior Full Stack Developer",
    location: "Lahore, Pakistan",
    photo: "/images/my-pic.jpg",
    resumeUrl: "/Muhammad-Haris-Senior-Full-Stack-Developer-CV.pdf",
    availability: "AVAILABLE FOR FREELANCE",
    tagline:
      "5+ years shipping production mobile & web apps — from pixel-accurate React Native UI to the Node.js APIs underneath. 9 apps live across the App Store and Play Store.",
    // Animated counters in the hero.
    stats: [
      { value: 5, suffix: "+", label: "Years experience" },
      { value: 10, suffix: "+", label: "Production apps" },
      { value: 9, suffix: "", label: "Apps on the stores" },
      { value: 4, suffix: "", label: "Companies" },
    ],
    metaChips: [
      { label: "Lahore, Pakistan", led: true },
      { label: "React Native · Expo · AI integrations · OpenAI · Anthropic · LLM APIs · Ionic · React.js · Next.js · Node.js", led: true },
      { label: "English · Urdu" },
    ],
  },

  // Lines typed out in the hero terminal window, in order.
  terminalLines: [
    { cmd: "whoami", out: "Muhammad Haris — Senior Full Stack Developer" },
    { cmd: "cat status.txt", out: "5+ yrs experience · Lahore, PK · open to freelance" },
    { cmd: "ls stack/", out: "react-native expo ionic react.js  next.js  node.js  postgres  mongodb  firebase" },
    { cmd: "./deploy --list | wc -l", out: "9 apps shipped to App Store & Play Store" },
  ],

  about: {
    paragraphs: [
      "Senior Mobile App Developer with 5+ years of hands-on experience building, integrating, and deploying cross-platform iOS and Android applications, primarily with React Native. Experienced across the full mobile delivery lifecycle—from UI/UX implementation and API integration to production releases on Google Play and the Apple App Store. Strong background in TypeScript, JavaScript, Node.js, Firebase, real-time communication, payments, media/AR capabilities AI integrations, and third-party SDK integration. Has led 2 associate developers and contributed to 10+ production mobile applications.",
      "Adept at architecting end-to-end solutions, from polished, responsive front-end interfaces to robust, secure back-end APIs, and integrating third-party services such as Twilio, Stripe, Firebase, and Agora. Recognized for engineering excellence and a consistent track record of delivering production-ready apps to global markets.",
    ],
    configRows: [
      { key: "nationality", value: "Pakistani" },
      { key: "languages", value: "English (fluent), Urdu (native)" },
      { key: "hobbies", value: "cricket, gym, traveling" },
      { key: "freelance", value: "available", highlight: true },
    ],
  },

  experience: [
    {
      role: "Full Stack Developer",
      company: "LUMS",
      date: "Aug 2025 — Present",
      points: [
        "Architect and deliver end-to-end web and mobile solutions across the university's digital products.",
        "Build responsive, accessible front-end interfaces in Next.js/React and ship cross-platform mobile features in React Native.",
        "Design and maintain RESTful APIs in Node.js/Express, with PostgreSQL and MongoDB.",
        "Integrate third-party services (payments, notifications, comms) and own deployments through release.",
      ],
    },
    {
      role: "Senior Mobile App Developer",
      company: "IdeaX / Outsourcenz (NZ)",
      date: "Sep 2023 — Aug 2025",
      points: [
        "Led delivery of multiple production React Native apps for the NZ/AU market — iSQROLL, Trova, SafeSign, Total Tint, No Yelling.",
        "Owned architecture: navigation, state management, offline support, and performance tuning for iOS and Android.",
        "Integrated Stripe, Apple Pay, IAP, Twilio, Agora, OneSignal, and Socket.io for real-time chat and calls.",
        "Managed Play Store and App Store releases via FastLane and handled review/compliance cycles.",
      ],
      award: "★ Engineering Excellence Award — outstanding contribution to project innovation",
    },
    {
      role: "Mobile App Developer",
      company: "Viral Square",
      date: "Aug 2022 — Sep 2023",
      points: [
        "Built cross-platform React Native apps including Memee — an AR meme generator with Banuba SDK and Imgly editor.",
        "Authored Node.js/Express REST APIs with PostgreSQL/Prisma ORM and Firebase services.",
        "Implemented in-app purchases, push notifications, and image/video media pipelines.",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "Argon Tech Inc (Ozi Group)",
      date: "Apr 2021 — Jul 2022",
      points: [
        "Delivered ProspectX — a real-estate communication app with Twilio voice calls and Socket.io real-time chat.",
        "Built user-facing features in React Native (Redux) and contributed to the Node.js/Express backend.",
        "Integrated push notifications, deep links, and deployed apps to both Play Store and App Store.",
      ],
    },
  ],

  education: [
    { years: "2017 — 2021", title: "BS Software Engineering", place: "Lahore Garrison University" },
    { years: "2015 — 2017", title: "Intermediate, Computer Science", place: "Civil Lines College, Lahore" },
    { years: "2013 — 2015", title: "Matriculation, Computer Science", place: "Decent Public High School, Lahore" },
  ],

  projects: [
   
    {
      name: "Screen Mirror TV — Android TV App | Kotlin + WebRTC",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/screenmirror.png",
      desc: "Android TV app that shows a Mac or Windows screen on the TV, with nothing to install on the computer. The TV shows a web address and a 6-digit code. You open the site in any browser, type the code and pick a screen, and the picture and sound stream straight to the TV over WebRTC. Firebase is used only to pair the two devices. Also runs on Android phones and tablets.",
      tags: ["Kotlin", "Android TV", "WebRTC", "Firebase", "OkHttp"],
      role: "Sole developer. Built the Android TV app, the browser sender site, Firebase pairing and the Play Store release.",
      features: [
        "Code-based pairing: no app or account needed on the computer",
        "Low-latency screen and audio streaming over WebRTC",
        "Works from Chrome, Edge, Safari and Firefox on Mac and Windows",
        "TURN relay set in Firebase so different networks connect, with no app update",
        "Runs on Android TV, phones and tablets",
      ],
      links: [{ label: "screen-mirror-tv.web.app", url: "https://screen-mirror-tv.web.app" }],
    },
    {
      name: "ProspectX — Real Estate Mobile App",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/prospectX.png",
      desc: "Built a React Native mobile application for real estate wholesalers and investors. I worked on mobile development, API/backend integration and real-time communication features. The application included incoming and outgoing voice calls using Twilio and real-time chat using Socket.io. I also worked with Firebase and push notifications to support the app's communication and user experience across iOS and Android.",
      tags: ["React Native", "Node.js", "Twilio", "Socket.io", "Firebase"],
      role: "Senior React Native / Mobile App Developer",
      features: [
        "Virtual incoming & outgoing voice calls (Twilio)",
        "Real-time 1:1 and group chat over Socket.io",
        "Push notifications for calls, messages, and lead updates",
        "Role-based, authenticated mobile-only access",
      ],
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.prospectx.app" },
        { label: "App Store", url: "https://apps.apple.com/us/app/prospectx/id1600834752" },
      ],
    },
     {
      name: "Reelroom — AI Video Production Studio | Electron + Node.js",
      status: "live",
      category: ["Desktop", "AI"],
      img: "/images/projects/reelroom.png",
      desc: "Desktop studio for multi-channel YouTube production on Windows and macOS. Give it a YouTube URL and a timestamped transcript, and it builds a 1080p long video plus up to four vertical Shorts. OpenAI writes the script, titles and thumbnails, B-roll is picked from a local media library, and AI voice-over is added before the ffmpeg render. Jobs run through a durable SQLite queue with optional review steps, and finished videos can upload to YouTube automatically.",
      tags: ["Electron", "Node.js", "Express", "SQLite", "ffmpeg", "OpenAI", "YouTube Data API"],
      role: "Sole developer. Built the render pipeline, job queue, AI/TTS integrations, YouTube upload and Autopilot, and the cross-platform installers.",
      features: [
        "URL + transcript to one long video and 4 Shorts (yt-dlp download, ffmpeg render)",
        "AI script, titles, thumbnails and celebrity detection with OpenAI",
        "Voice-over with fallback across Inworld, Azure and ElevenLabs, plus a free local Kokoro voice",
        "Auto transcripts from YouTube subtitles or faster-whisper",
        "Resumable YouTube auto-upload with scheduled publishing and quota handling",
        "Trend Intelligence and per-channel Autopilot that queues trending videos",
        "Hardware encoding (NVENC / VideoToolbox) that falls back to CPU",
        "Encrypted API-key vault (AES-256-GCM), roles, and DMG/EXE installers built with GitHub Actions",
      ],
      links: [],
    },
    {
      name: "Awaaz-e-Sehat — AI-Powered Healthcare Platform",
      status: "live",
      category: ["Web", "AI"],
      img: "/images/projects/awaazesehat.png",
      desc: "Worked on Awaaz-e-Sehat, an AI-powered healthcare platform focused on improving maternal healthcare access in Pakistan. The platform combines voice, WhatsApp and AI technologies to support patient engagement, clinical workflows and healthcare delivery. My contribution included software development and integration work across the product, helping deliver technology-driven healthcare solutions.",
      tags: ["Nextjs", "Nodejs", "Express.js", "Firebase"],
      role: "Full Stack / Mobile App Developer. Owned the AI, voice, and image labelling features.",
      features: [
        "APPA & EMR integration for patient data management",
        "Proper whatsapp integration for patient communication AI chat",
        "Analytics and reporting for healthcare insights",
        "AI-powered triage and symptom checking for patients",
      ],
       links: [{ label: "Awaaz-e-Sehat page", url: "https://www.awaazesehat.com/" },{ label: "Web link", url: "https://app.awaazesehat.com/login" }],
    },
    {
      name: "No Yelling — Driving School Web App | Next.js",
      status: "live",
      category: ["Web"],
      img: "/images/projects/noyelling.png",
      desc: "Web platform for an Australia-wide driving school, built for SEO and speed.Developed and enhanced a web application for a driving school platform serving users across Australia. I worked on UI/UX implementation, API integration and SEO optimization using Next.js and Node.js. The project focused on delivering a clean, user-friendly web experience while integrating backend functionality and improving the application's search visibility.",
      tags: ["Next.js", "Node.js", "SEO"],
      role: "Full stack developer — UI/UX implementation, SEO, and API integration.",
      features: [
        "Pixel-accurate UI/UX from design",
        "SEO-optimised pages and metadata",
        "Responsive across mobile, tablet, desktop",
      ],
      links: [{ label: "noyelling.com.au", url: "https://noyelling.com.au" }],
    },
   
    {
      name: "Acadify",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/acadify.png",
      desc: "Study-abroad platform, part of the Physics Wallah ecosystem.",
      tags: ["React Native", "Node.js", "Firebase"],
      role: "React Native developer — UI/UX implementation and API integration.",
      features: [
        "Course & university discovery with filtering",
        "Application tracking and document uploads",
        "In-app communication with counsellors",
      ],
      links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.acadif.app" }],
    },
    {
      name: "SafeSign — Workplace Safety App | React Native",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/Desend.png",
      desc: "Workplace health & safety education app for CALD workers.Developed a React Native mobile application focused on workplace health and safety education for CALD workers. I worked on mobile development, UI/UX implementation and API integration, using Node.js and Firebase for backend functionality. The app was designed to provide an accessible and user-friendly mobile learning experience across iOS and Android.",
      tags: ["React Native", "Node.js", "Firebase"],
      role: "React Native developer — UI/UX implementation and API integration.",
      features: [
        "Industrial signage education modules",
        "Workplace risk awareness content",
        "Multilingual support for CALD workers",
      ],
      links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.safesignz" }],
    },
    {
      name: "iSQROLL — Real-Time Marketplace App | React Native",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/Isqroll.png",
      desc: "Developed a React Native mobile marketplace application for buying and selling products in New Zealand. I worked on mobile app development, UI/UX implementation and API integrations, including real-time communication features. The application used Twilio and Socket.io for messaging and communication, with Node.js and Firebase supporting the backend functionality. Built for a smooth cross-platform experience across iOS and Android.",
      tags: ["React Native", "Socket.io", "Twilio"],
      role: "Senior React Native developer — owned the real-time chat experience and key marketplace flows.",
      features: [
        "Real-time buyer/seller chat over Socket.io",
        "Twilio-backed comms for verification",
        "Secure trade flow with auth and ratings",
      ],
      links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.isqroll" }],
    },
    {
      name: "Trova — Healthcare Scheduling App | Ionic capacitor",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/trova.png",
      desc: "Developed a Ionic capacitor mobile application for healthcare professionals to manage schedules, virtual sessions, and clients. I worked on the mobile app development, UI implementation, API integration and Firebase functionality. The app was designed to help professionals manage their schedules and client interactions through a streamlined mobile experience across iOS and Android.",
      tags: ["React Native", "Node.js", "Firebase"],
      role: "React Native developer — built the provider-facing experience.",
      features: [
        "Schedule and calendar management",
        "Virtual session support",
        "Client list and engagement tracking",
      ],
      links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=trovahealth.provider" }],
    },
     {
      name: "Memee",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/memee.png",
      desc: "Meme-creation platform with tournaments, anonymous judging, and an in-app coin economy.",
      tags: ["React Native", "Banuba SDK", "Imgly", "Prisma"],
      role: "React Native + Node.js developer. Owned the on-device media pipeline and the tournament/coin-economy backend.",
      features: [
        "AR-powered camera & effects via Banuba SDK",
        "Image/video editing with Imgly (filters, stickers, overlays)",
        "Tournament submissions with anonymous judging",
        "In-app coin economy and IAP top-ups",
      ],
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.rn.memee" },
        { label: "App Store", url: "https://apps.apple.com/us/app/meme-maker-generator-memee/id6444485595" },
      ],
    },
    {
      name: "SpotSwap — Smart Parking App | React Native",
      status: "live",
      category: ["Mobile"],
      img: "/images/projects/spotswap.png",
      desc: "Smart-city parking marketplace — find and share parking spots nearby.",
      tags: ["React Native", "Google Maps API", "Firebase"],
      role: "React Native developer. Owned the maps and location experience end-to-end.",
      features: [
        "Google Maps & Places API integration",
        "Real-time availability and location-based search",
        "User profile and spot listings",
      ],
      links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.spotswap" }],
    },
  ],

  achievements: [
    {
      icon: "★",
      title: "Engineering Excellence Award",
      desc: "OutsourceNZ — recognized for outstanding contribution to project innovation delivering production React Native apps for NZ/AU.",
    },
    {
      icon: "☎",
      title: "Real-time Voice & Video",
      desc: "Twilio & Agora — 1:1 and group calling with full background/foreground handling and push-triggered ringing for ProspectX and iSQROLL.",
    },
    {
      icon: "$",
      title: "Payments, end to end",
      desc: "Stripe, Apple Pay, and IAP — subscriptions, one-off purchases, coin economies, receipt validation and edge-case handling.",
    },
    {
      icon: "◆",
      title: "AR & Rich Media",
      desc: "Banuba & Imgly — shipped an AR camera and full image/video editor in Memee: stickers, filters, overlays, export pipelines.",
    },
    {
      icon: "9",
      title: "9 Production Apps",
      desc: "Shipped to the Play Store and App Store — managing release pipelines, FastLane automation, and store review cycles.",
    },
  ],

  skillGroups: [
    {
      label: "core",
      items: ["JavaScript / TypeScript", "React Native", "Expo","AI integrations", "OpenAI","anthropic","LLM apis", "React.js", "Next.js", "Ionic", "Node.js / Express"],
    },
    {
      label: "data",
      items: ["PostgreSQL / MySQL", "MongoDB / Mongoose", "Firebase", "Sequelize / Prisma ORM"],
    },
    {
      label: "integrations",
      items: ["Socket.io", "Stripe / Apple Pay / IAP", "Twilio / Agora", "OneSignal / Push", "Banuba / Imgly (AR & Media)","Redux","Zustand","React Query","REST APIs","GraphQL","WebSockets","Google Maps / Places API","Opticutter API","Third-party SDKs","Google Analytics","Mixpanel","Sentry","Crashlytics","Firebase Cloud Messaging","Firebase Authentication","Firebase Realtime Database","Firebase Firestore","Firebase Storage","Firebase Functions"],
    },
    {
      label: "tooling",
      items: ["FastLane (Mobile CI)", "Git / GitHub / Bitbucket", "Jira / Asana / Trello", "Slack / Teams", "Vercel / Netlify / Heroku", "Docker", "Postman", "VS Code", "Xcode / Android Studio"],
    },
  ],

  contact: {
    heading: "Let's build something.",
    blurb: "Open to freelance work and full-time roles across mobile and web. Usually replies within a day.",
    email: "iamharisdev@gmail.com",
    phone: "+92 317-4011082",
    location: "Lahore, Pakistan",
    socials: [
      { label: "GitHub", url: "https://github.com/iamharisdev" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/iamharisdev" },
      { label: "Facebook", url: "https://www.facebook.com/Harris4999/" },
    ],
  },

  footerText: "built by Muhammad Haris",
};

export default content;
