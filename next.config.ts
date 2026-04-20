import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    // React / Next в dev используют eval для отладки и части инструментов;
    // в production eval не нужен — оставляем CSP без unsafe-eval.
    const scriptSrc =
      process.env.NODE_ENV === "development"
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://yastatic.net"
        : "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://yastatic.net";

    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "frame-src 'self' https://mc.yandex.ru",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      scriptSrc,
      "connect-src 'self' https:",
      "object-src 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
