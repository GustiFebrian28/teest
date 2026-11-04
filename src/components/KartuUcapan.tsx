"use client";

import { motion } from "framer-motion";
import { TEKS_TOMBOL } from "@/data/ucapan";

export const kelasKartu =
  "w-full rounded-3xl border border-emas/40 bg-white/70 p-7 shadow-lg shadow-rose-900/10 backdrop-blur-sm";

type Props = {
  teks: string;
  onLanjut: () => void;
};

export default function KartuUcapan({ teks, onLanjut }: Props) {
  return (
    <motion.div
      className="flex w-full max-w-md flex-col items-center gap-8"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={kelasKartu}>
        <div className="mx-auto mb-5 h-px w-12 bg-emas" />
        <p className="text-center text-lg leading-relaxed text-tinta">{teks}</p>
        <div className="mx-auto mt-5 h-px w-12 bg-emas" />
      </div>
      <button
        type="button"
        onClick={onLanjut}
        className="w-full max-w-xs touch-manipulation rounded-full bg-emas px-8 py-4 text-lg font-semibold text-malam shadow-md shadow-rose-900/20 transition active:scale-95"
      >
        {TEKS_TOMBOL.lanjut}
      </button>
    </motion.div>
  );
}
