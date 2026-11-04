"use client";

import { motion } from "framer-motion";
import { JUDUL_PEMBUKA, NAMA_LENGKAP, TEKS_TOMBOL } from "@/data/ucapan";

export default function Pembuka({ onBuka }: { onBuka: () => void }) {
  return (
    <motion.div
      className="flex w-full max-w-md flex-col items-center text-center"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center">
        <h1 className="font-judul text-3xl leading-snug text-krem sm:text-4xl">
          {JUDUL_PEMBUKA}
        </h1>
        <p className="mt-4 font-judul text-xl tracking-wide text-emas">
          {NAMA_LENGKAP}
        </p>
      </div>
      <button
        type="button"
        onClick={onBuka}
        className="mt-12 w-full max-w-xs touch-manipulation rounded-full bg-emas px-8 py-4 text-lg font-semibold text-malam shadow-lg shadow-black/30 transition active:scale-95"
      >
        {TEKS_TOMBOL.buka}
      </button>
    </motion.div>
  );
}
