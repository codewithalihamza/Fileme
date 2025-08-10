import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fileme - Professional Financial Services & Advisory",
    short_name: "Fileme",
    description:
      "Comprehensive professional services including tax services, accounting & financial reporting, business process outsourcing, financial analysis, internal controls, and risk advisory.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
