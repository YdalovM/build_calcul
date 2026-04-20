import type { MetadataRoute } from "next";
import { siteSeo } from "@/content/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSeo.siteName,
    short_name: siteSeo.siteName,
    description: siteSeo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#b91c1c",
    lang: "ru-RU",
    categories: ["utilities", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Стены и отделка",
        short_name: "Стены",
        description: "Штукатурка, шпаклевка, краска",
        url: "/steny-i-otdelka",
      },
      {
        name: "Пол и стяжка",
        short_name: "Пол",
        description: "Объём стяжки и мешки смеси",
        url: "/pol-i-styazhka",
      },
      {
        name: "Плитка и покрытия",
        short_name: "Плитка",
        description: "Количество плитки и упаковок",
        url: "/plitka-i-pokrytiya",
      },
      {
        name: "Расходники и смета",
        short_name: "Смета",
        description: "Бюджет ремонта по площади",
        url: "/rashodniki-i-smety",
      },
    ],
  };
}
