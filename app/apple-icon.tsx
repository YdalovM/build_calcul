import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #ffffff 0%, #fef2f2 45%, #fde8e8 100%)",
          borderRadius: 36,
          border: "3px solid rgba(185, 28, 28, 0.14)",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#991b1b",
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size },
  );
}
