"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { KALIMAT_PENUTUP, TEKS_TOMBOL } from "@/data/ucapan";
import Konfeti from "./Konfeti";

type Props = {
  fotoAda: boolean;
  onUlangi: () => void;
};

export default function FotoPenutup({ fotoAda, onUlangi }: Props) {
  return (
    <motion.div
      className="flex w-full max-w-md flex-col items-center gap-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Konfeti />

      <motion.div
        className="w-full rounded-2xl border border-emas/60 bg-white/85 p-2 shadow-xl shadow-rose-900/15"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        {fotoAda ? (
          <Image
            src="/foto.jpg"
            alt="Papa, Elza, dan Zhian"
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 448px) 100vw, 448px"
            className="rounded-xl"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "58dvh",
              objectFit: "contain",
            }}
          />
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border-2 border-dashed border-emas/60 bg-krem/70 text-tinta/60">
            {TEKS_TOMBOL.fotoBelumAda}
          </div>
        )}
      </motion.div>

      <motion.p
        className="px-2 font-judul text-xl leading-relaxed text-tinta"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {KALIMAT_PENUTUP}
      </motion.p>

      <motion.button
        type="button"
        onClick={onUlangi}
        className="w-full max-w-xs touch-manipulation rounded-full border border-emas bg-white/70 px-8 py-4 text-lg font-semibold text-tinta shadow-md shadow-rose-900/15 transition active:scale-95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        {TEKS_TOMBOL.ulangi}
      </motion.button>
    </motion.div>
  );
}
