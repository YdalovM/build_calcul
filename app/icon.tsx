import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(165deg, #ffffff 0%, #fef2f2 55%, #fde8e8 100%)",
          color: "#991b1b",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.75,
          borderRadius: 6,
          border: "1px solid rgba(185, 28, 28, 0.12)",
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
