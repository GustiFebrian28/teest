// Semua teks tampilan ada di sini. Mengganti teks tidak perlu menyentuh komponen.

export const JUDUL_PEMBUKA = "Ada kejutan kecil untukmu";
export const NAMA_LENGKAP = "Elza Dwi Triyana Dewi";

export type Kartu = {
  id: number;
  teks: string;
  /** "lilin" = kartu interaktif tiup lilin (tanpa tombol Lanjut) */
  interaktif?: "lilin";
};

export const KARTU: Kartu[] = [
  {
    id: 1,
    teks: "Selamat ulang tahun ke-26, Sayang. Hari ini milikmu sepenuhnya.",
  },
  {
    id: 2,
    teks: "Terima kasih sudah menemani Papa, sabar menghadapi Papa, dan selalu ada. Papa sadar merawat dua orang laki-laki yang sering membuat onar di rumah itu tidak mudah. 😁",
  },
  {
    id: 3,
    teks: "Dari semua tentangmu, yang paling Papa suka adalah senyummu. Apalagi kalau habis masak dan ngajak makan bareng dengan senyum itu, rasa makanannya jadi double-double nikmatnya 😂",
  },
  {
    id: 4,
    teks: "Sebelum lanjut, tiup lilinnya dulu dan buat satu permohonan.",
    interaktif: "lilin",
  },
  {
    id: 5,
    teks: "Doa Papa untukmu, Sayang: semoga sehat selalu, bahagia, bisa menjalani kehidupan yang lebih baik lagi dalam semua hal, dan mewujudkan semua impianmu. Papa selalu di sampingmu ❤️",
  },
  {
    id: 6,
    teks: "Satu hal lagi. Ini salah satu momen favorit Papa bersamamu dan Zhian.",
  },
];

// Satu kalimat penutup di layar foto (PRD meminta satu kalimat, isinya tidak ditentukan).
export const KALIMAT_PENUTUP = "Selamat ulang tahun, Sayang. Kami menyayangimu.";

// Teks tombol & microcopy
export const TEKS_TOMBOL = {
  buka: "Buka",
  lanjut: "Lanjut",
  ulangi: "Ulangi dari awal",
  petunjukLilin: "Ketuk lilinnya",
  fotoBelumAda: "Foto akan tampil di sini",
  putarMusik: "Putar musik",
  jedaMusik: "Jeda musik",
};
