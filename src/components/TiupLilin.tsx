"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TEKS_TOMBOL } from "@/data/ucapan";
import { kelasKartu } from "./KartuUcapan";

type Props = {
  teks: string;
  onSelesai: () => void;
};

const POSISI_LILIN = [90, 120, 150];

export default function TiupLilin({ teks, onSelesai }: Props) {
  const [padam, setPadam] = useState(false);

  // Setelah lilin padam, beri jeda sebentar lalu lanjut ke ucapan berikutnya.
  useEffect(() => {
    if (!padam) return;
    const t = setTimeout(onSelesai, 1500);
    return () => clearTimeout(t);
  }, [padam, onSelesai]);

  return (
    <motion.div
      className="flex w-full max-w-md flex-col items-center gap-6"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={kelasKartu}>
        <p className="text-center text-lg leading-relaxed text-tinta">{teks}</p>
      </div>

      <button
        type="button"
        onClick={() => setPadam(true)}
        disabled={padam}
        aria-label="Tiup lilin"
        className="touch-manipulation outline-none"
      >
        <svg viewBox="0 0 240 230" className="h-60 w-60" aria-hidden>
          {/* piring */}
          <ellipse cx="120" cy="214" rx="108" ry="12" fill="#e9d9c0" />
          {/* tingkat bawah */}
          <rect x="28" y="142" width="184" height="70" rx="14" fill="#f3b8bf" />
          <path
            d="M28 160 q15 16 30.7 0 t30.7 0 t30.7 0 t30.7 0 t30.7 0 t30.7 0 V156 a14 14 0 0 0 -14 -14 H42 a14 14 0 0 0 -14 14z"
            fill="#fff6ec"
          />
          {/* tingkat atas */}
          <rect x="62" y="98" width="116" height="48" rx="12" fill="#f7e3b5" />
          <path
            d="M62 114 q9.6 14 19.3 0 t19.3 0 t19.3 0 t19.3 0 t19.3 0 t19.3 0 V110 a12 12 0 0 0 -12 -12 H74 a12 12 0 0 0 -12 12z"
            fill="#fff6ec"
          />
          {/* hiasan */}
          <circle cx="60" cy="188" r="5" fill="#c9a35b" />
          <circle cx="100" cy="192" r="5" fill="#c9a35b" />
          <circle cx="140" cy="192" r="5" fill="#c9a35b" />
          <circle cx="180" cy="188" r="5" fill="#c9a35b" />

          {POSISI_LILIN.map((x) => (
            <g key={x}>
              {/* batang lilin */}
              <rect x={x - 4} y="64" width="8" height="36" rx="2" fill="#f2a7b2" />
              <rect x={x - 4} y="74" width="8" height="5" fill="#fff6ec" />
              <rect x={x - 4} y="88" width="8" height="5" fill="#fff6ec" />
              <rect x={x - 0.7} y="58" width="1.4" height="7" fill="#3b2a2f" />

              {/* api */}
              <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
                initial={false}
                animate={
                  padam
                    ? { opacity: 0, scale: 0.2, transition: { duration: 0.3 } }
                    : {
                        opacity: 1,
                        scaleY: [1, 1.18, 0.92, 1.1, 1],
                        scaleX: [1, 0.92, 1.06, 0.95, 1],
                        transition: {
                          duration: 0.9,
                          repeat: Infinity,
                          delay: (x % 7) * 0.05,
                        },
                      }
                }
              >
                <ellipse cx={x} cy="48" rx="6" ry="10" fill="#f6c453" />
                <ellipse cx={x} cy="51" rx="3" ry="6" fill="#fff3c4" />
              </motion.g>

              {/* asap */}
              {padam && (
                <motion.circle
                  cx={x}
                  cy="52"
                  r="4"
                  fill="#cfc4c4"
                  style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                  initial={{ opacity: 0.6, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -40, scale: 2.4 }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                />
              )}
            </g>
          ))}
        </svg>
      </button>

      <motion.p
        className="h-6 text-sm tracking-wide text-tinta/70"
        animate={padam ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
        transition={padam ? { duration: 0.3 } : { duration: 1.8, repeat: Infinity }}
      >
        {TEKS_TOMBOL.petunjukLilin}
      </motion.p>
    </motion.div>
  );
}
