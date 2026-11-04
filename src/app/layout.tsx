import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ada kejutan kecil untukmu",
  description: "Ada kejutan kecil untukmu",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a1b2d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
