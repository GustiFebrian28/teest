"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { KARTU, TEKS_TOMBOL } from "@/data/ucapan";
import LatarMelayang from "./LatarMelayang";
import Pembuka from "./Pembuka";
import KartuUcapan from "./KartuUcapan";
import TiupLilin from "./TiupLilin";
import FotoPenutup from "./FotoPenutup";

type Props = {
  fotoAda: boolean;
  musikAda: boolean;
};

const TOTAL_KARTU = KARTU.length; // 6
const LANGKAH_FOTO = TOTAL_KARTU + 1; // 7

export default function UcapanApp({ fotoAda, musikAda }: Props) {
  // Satu angka langkah: 0 = pembuka, 1..6 = kartu, 7 = foto penutup
  const [langkah, setLangkah] = useState(0);
  const [musikMain, setMusikMain] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const lanjut = useCallback(
    () => setLangkah((s) => Math.min(s + 1, LANGKAH_FOTO)),
    []
  );
  const ulangi = useCallback(() => setLangkah(0), []);

  const buka = () => {
    setLangkah(1);
    // Musik mulai setelah "Buka" diketuk (browser HP memblokir autoplay).
    if (musikAda && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setMusikMain(true))
        .catch(() => setMusikMain(false));
    }
  };

  const toggleMusik = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setMusikMain(true)).catch(() => setMusikMain(false));
    } else {
      audio.pause();
      setMusikMain(false);
    }
  };

  const gelap = langkah === 0;

  let layar: React.ReactNode;
  if (langkah === 0) {
    layar = <Pembuka key="pembuka" onBuka={buka} />;
  } else if (langkah <= TOTAL_KARTU) {
    const kartu = KARTU[langkah - 1];
    layar =
      kartu.interaktif === "lilin" ? (
        <TiupLilin key={`kartu-${kartu.id}`} teks={kartu.teks} onSelesai={lanjut} />
      ) : (
        <KartuUcapan key={`kartu-${kartu.id}`} teks={kartu.teks} onLanjut={lanjut} />
      );
  } else {
    layar = <FotoPenutup key="foto" fotoAda={fotoAda} onUlangi={ulangi} />;
  }

  return (
    <main className="relative min-h-dvh overflow-hidden text-tinta">
      <div className="absolute inset-0 bg-malam" />
      <div
        className={`absolute inset-0 bg-gradient-to-b from-krem to-mawar transition-opacity duration-1000 ${
          gelap ? "opacity-0" : "opacity-100"
        }`}
      />
      <LatarMelayang gelap={gelap} />

      {musikAda && <audio ref={audioRef} src="/musik.mp3" loop preload="none" />}

      {/* Penanda kemajuan: titik 1 dari 6 */}
      {langkah >= 1 && langkah <= TOTAL_KARTU && (
        <div
          className="absolute inset-x-0 top-0 z-10 flex justify-center gap-2 pt-[max(1.25rem,env(safe-area-inset-top))]"
          role="img"
          aria-label={`Kartu ${langkah} dari ${TOTAL_KARTU}`}
        >
          {KARTU.map((k, i) => (
            <span
              key={k.id}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i + 1 === langkah
                  ? "w-6 bg-emas"
                  : i + 1 < langkah
                  ? "w-2.5 bg-emas/70"
                  : "w-2.5 bg-tinta/20"
              }`}
            />
          ))}
        </div>
      )}

      {/* Tombol musik: hanya tampil jika musik.mp3 ada */}
      {musikAda && langkah >= 1 && (
        <button
          type="button"
          onClick={toggleMusik}
          aria-label={musikMain ? TEKS_TOMBOL.jedaMusik : TEKS_TOMBOL.putarMusik}
          className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-emas/50 bg-white/70 text-tinta shadow-md active:scale-95"
        >
          {musikMain ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>
      )}

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 pb-12 pt-20">
        <AnimatePresence mode="wait">{layar}</AnimatePresence>
      </div>
    </main>
  );
}
