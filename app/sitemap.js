const siteUrl = "https://iamharisdev.vercel.app";

export default function sitemap() {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/Muhammad-Haris-Senior-Full-Stack-Developer-CV.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
