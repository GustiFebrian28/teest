"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Keping = {
  kiri: number;
  lebar: number;
  tinggi: number;
  warna: string;
  tunda: number;
  durasi: number;
  putar: number;
  goyang: number;
  bulat: boolean;
};

const WARNA = ["#c9a35b", "#f2a7b2", "#fdf3e7", "#e8c27a", "#d9a6c2", "#f7c9c9"];
const acak = (min: number, maks: number) => min + Math.random() * (maks - min);

// Hanya dirender di layar foto penutup (selalu di klien), jadi aman memakai Math.random.
export default function Konfeti({ jumlah = 60 }: { jumlah?: number }) {
  const [keping] = useState<Keping[]>(() =>
    Array.from({ length: jumlah }, (_, i) => ({
      kiri: acak(0, 100),
      lebar: acak(6, 11),
      tinggi: acak(9, 16),
      warna: WARNA[i % WARNA.length],
      tunda: acak(0, 2.2),
      durasi: acak(3.2, 5.5),
      putar: acak(360, 1080) * (Math.random() > 0.5 ? 1 : -1),
      goyang: acak(-40, 40),
      bulat: Math.random() > 0.7,
    }))
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {keping.map((k, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{
            left: `${k.kiri}%`,
            top: -24,
            width: k.lebar,
            height: k.bulat ? k.lebar : k.tinggi,
            borderRadius: k.bulat ? "9999px" : 2,
            backgroundColor: k.warna,
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: "110vh",
            x: [0, k.goyang, -k.goyang, 0],
            rotate: k.putar,
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: k.durasi, delay: k.tunda, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
