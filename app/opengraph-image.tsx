import { ImageResponse } from "next/og";

export const alt = "Harbor — Managed investing on Hyperliquid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #0b1f3a 0%, #1e3a5f 60%, #1b4a5c 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#ffffff",
              color: "#0b1f3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>Harbor</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderLeft: "8px solid #0e7f86", paddingLeft: 36 }}>
          <div style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.1, letterSpacing: -1.5 }}>
            Managed investing on Hyperliquid, made easy
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#c9d6e3" }}>
            A tailored selection of active and passive funds · $19 per month
          </div>
        </div>
      </div>
    ),
    size,
  );
}
