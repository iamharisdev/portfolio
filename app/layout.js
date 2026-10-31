import "./globals.css";
import content from "../data/content";

const siteUrl = "https://iamharisdev.vercel.app";
const title = "Muhammad Haris — Senior Full Stack Developer";
const description =
  "Senior full stack developer in Lahore, Pakistan with 5+ years shipping production React Native, Next.js, Node.js and AI-powered apps. 9 apps live on the App Store and Play Store.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Muhammad Haris" },
  description,
  applicationName: "Muhammad Haris Portfolio",
  authors: [{ name: "Muhammad Haris", url: siteUrl }],
  creator: "Muhammad Haris",
  keywords: [
    "Muhammad Haris",
    "iamharisdev",
    "Senior Full Stack Developer",
    "React Native Developer",
    "Mobile App Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Expo",
    "AI integrations",
    "Freelance developer Pakistan",
    "Lahore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "Muhammad Haris",
    title,
    description,
    locale: "en_US",
    firstName: "Muhammad",
    lastName: "Haris",
    username: "iamharisdev",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/images/my-pic.jpg" },
  category: "technology",
};

const { profile, contact } = content;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      email: `mailto:${contact.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      sameAs: contact.socials.map((s) => s.url),
      knowsAbout: ["React Native", "Expo", "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB", "Firebase", "AI integrations"],
      knowsLanguage: ["English", "Urdu"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Muhammad Haris",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0C11" },
    { media: "(prefers-color-scheme: light)", color: "#F7F8FB" },
  ],
};

// Runs before paint so the saved / system theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
