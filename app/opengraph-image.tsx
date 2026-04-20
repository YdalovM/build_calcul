import { ImageResponse } from "next/og";

import { siteSeo } from "@/content/seo";

// ИИ: дефолтное OG-изображение для соцсетей и части сниппетов. Текст латиницей —
// в @vercel/og/Satori без встроенного шрифта кириллица может не отрисоваться.
// Русское описание страницы задаётся в metadata / export const alt ниже.
export const alt =
  "Build Calcul — калькуляторы для ремонта и стройки. Сервис DayLab.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(145deg, #fafafa 0%, #ffffff 45%, #fef2f2 100%)",
          color: "#18181b",
        }}
      >
        <div
          style={{
            width: 120,
            height: 6,
            background: "#b91c1c",
            borderRadius: 3,
            marginBottom: 28,
            boxShadow: "0 0 20px rgba(185, 28, 28, 0.35)",
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {siteSeo.siteName}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            fontWeight: 500,
            color: "#52525b",
            maxWidth: 720,
            lineHeight: 1.35,
          }}
        >
          Calculators for renovation & DIY materials
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            fontWeight: 600,
            color: "#b91c1c",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
          }}
        >
          {siteSeo.brandName}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
