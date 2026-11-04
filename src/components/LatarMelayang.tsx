"use client";

import { useEffect, useState } from "react";

type Bintang = { kiri: number; atas: number; ukuran: number; durasi: number; tunda: number };
type Balon = {
  kiri: number;
  durasi: number;
  tunda: number;
  warna: string;
  goyang: number;
  skala: number;
};

const WARNA_BALON = ["#f2a7b2", "#e8c27a", "#f7c9c9", "#d9a6c2", "#f5dfb0"];

const acak = (min: number, maks: number) => min + Math.random() * (maks - min);

// Latar dekoratif: bintang emas saat layar pembuka (gelap), balon pelan saat kartu (terang).
// Posisi diacak di klien setelah mount agar tidak beda dengan HTML server.
export default function LatarMelayang({ gelap }: { gelap: boolean }) {
  const [bintang, setBintang] = useState<Bintang[]>([]);
  const [balon, setBalon] = useState<Balon[]>([]);

  useEffect(() => {
    setBintang(
      Array.from({ length: 28 }, () => ({
        kiri: acak(2, 98),
        atas: acak(2, 96),
        ukuran: acak(2, 5),
        durasi: acak(3, 7),
        tunda: -acak(0, 7),
      }))
    );
    setBalon(
      Array.from({ length: 9 }, (_, i) => ({
        kiri: (i / 9) * 100 + acak(0, 8),
        durasi: acak(22, 36),
        tunda: -acak(0, 36),
        warna: WARNA_BALON[i % WARNA_BALON.length],
        goyang: acak(-30, 30),
        skala: acak(0.8, 1.25),
      }))
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: gelap ? 1 : 0 }}
      >
        {bintang.map((b, i) => (
          <span
            key={i}
            className="anim-kedip absolute rounded-full bg-emas"
            style={{
              left: `${b.kiri}%`,
              top: `${b.atas}%`,
              width: b.ukuran,
              height: b.ukuran,
              animationDuration: `${b.durasi}s`,
              animationDelay: `${b.tunda}s`,
              boxShadow: "0 0 8px 1px rgba(201,163,91,0.7)",
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: gelap ? 0 : 1 }}
      >
        {balon.map((b, i) => (
          <div
            key={i}
            className="anim-naik absolute"
            style={
              {
                left: `${b.kiri}%`,
                bottom: -110,
                animationDuration: `${b.durasi}s`,
                animationDelay: `${b.tunda}s`,
                "--goyang": `${b.goyang}px`,
                opacity: 0.5,
                scale: String(b.skala),
              } as React.CSSProperties
            }
          >
            <div
              style={{
                width: 38,
                height: 48,
                background: b.warna,
                borderRadius: "50% 50% 50% 50% / 58% 58% 42% 42%",
                boxShadow: "inset -6px -6px 0 rgba(255,255,255,0.25)",
              }}
            />
            <div
              style={{
                width: 1,
                height: 44,
                background: "rgba(59,42,47,0.35)",
                margin: "0 auto",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
