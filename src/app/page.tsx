import fs from "node:fs";
import path from "node:path";
import UcapanApp from "@/components/UcapanApp";

export const dynamic = "force-static";

// Berkas dicek saat build: tombol musik disembunyikan jika musik.mp3 tidak ada,
// dan kotak placeholder tampil jika foto.jpg belum ada.
const ada = (nama: string) =>
  fs.existsSync(path.join(process.cwd(), "public", nama));

export default function Page() {
  return <UcapanApp fotoAda={ada("foto.jpg")} musikAda={ada("musik.mp3")} />;
}
