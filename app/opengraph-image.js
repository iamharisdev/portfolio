import { ImageResponse } from "next/og";

export const alt = "Muhammad Haris — Senior Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card used by Open Graph and Twitter.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0C11",
          color: "#F7F8FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#7DD3A8", letterSpacing: 4, marginBottom: 24 }}>
          IAMHARISDEV.VERCEL.APP
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Muhammad Haris</div>
        <div style={{ fontSize: 44, color: "#A9B0BF", marginTop: 16 }}>Senior Full Stack Developer</div>
        <div style={{ fontSize: 30, color: "#A9B0BF", marginTop: 48 }}>
          React Native · Next.js · Node.js · AI integrations
        </div>
      </div>
    ),
    size
  );
}
