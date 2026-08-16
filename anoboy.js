// Scraper anoboy.xyz — ambil link, judul, deskripsi, image dari hasil pencarian
// Cara pakai: bun anoboy.js "naruto"  (atau)  node anoboy.js "naruto"
// Hasil disimpan otomatis ke hasil.js

import { writeFile } from "node:fs/promises";
import * as cheerio from "cheerio";

const BASE_URL = "https://anoboy.xyz";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// ---------- helper ----------

const fetchHTML = async (url) => {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.text();
};

// Normalisasi URL relatif -> absolut
const normalize = (url) => {
  try {
    return new URL(url, BASE_URL).href;
  } catch {
    return url;
  }
};

// Pool concurrency terbatas (biar nggak request post sejadi-jadinya)
const pool = async (items, limit, fn) => {
  const out = new Array(items.length);
  let i = 0;
  const worker = async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
};

// Ambil deskripsi dari halaman post (meta description)
const ambilDeskripsi = async (link) => {
  try {
    const html = await fetchHTML(link);
    const $ = cheerio.load(html);
    return (
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      ""
    ).trim();
  } catch {
    return "";
  }
};

// ---------- scraper utama ----------

const scraper = async (query) => {
  const html = await fetchHTML(`${BASE_URL}/?s=${encodeURIComponent(query)}`);
  const $ = cheerio.load(html);

  // Hasil search: <a><div class="amv"><img/><div class="amvj"><h3 class="ibox1">judul</h3></div>...</div></a>
  const items = $("a:has(div.amv)")
    .map((_, el) => {
      const $a = $(el);
      const $amv = $a.find("div.amv").first();
      const judul =
        $a.attr("title")?.trim() ||
        $amv.find("h3.ibox1").first().text().trim();
      const link = normalize($a.attr("href"));
      const image = normalize($amv.find("img").first().attr("src") || "");
      if (!link || !judul) return null;
      return { link, judul, image };
    })
    .get()
    .filter(Boolean);

  // Dedup berdasarkan link
  const unik = [...new Map(items.map((i) => [i.link, i])).values()];

  // Ambil deskripsi tiap post (concurrency 5)
  const deskripsi = await pool(unik, 5, (item) => ambilDeskripsi(item.link));

  return unik.map((item, i) => ({
    ...item,
    deskripsi: deskripsi[i],
  }));
};

// ---------- main ----------

const query = process.argv[2] || "naruto";

try {
  console.log(`🔍 Mencari: "${query}" di ${BASE_URL} ...`);
  const hasil = await scraper(query);

  if (hasil.length === 0) {
    console.log("⚠️  Nggak ada hasil. Coba query lain.");
    process.exit(0);
  }

  // Simpan ke hasil.js (ESM)
  const konten = `// Hasil scraper anoboy.xyz untuk query: "${query}"\n// Di-generate: ${new Date().toISOString()} — jalanin ulang: bun anoboy.js "${query}"\nexport default ${JSON.stringify(hasil, null, 2)};\n`;
  await writeFile("hasil.js", konten, "utf8");

  console.log(`✅ ${hasil.length} hasil, tersimpan di hasil.js\n`);
  for (const h of hasil) {
    console.log(`• ${h.judul}\n  Link: ${h.link}\n  Image: ${h.image}\n  Deskripsi: ${h.deskripsi.slice(0, 100)}${h.deskripsi.length > 100 ? "..." : ""}\n`);
  }
} catch (err) {
  console.error("❌ Gagal:", err.message);
  process.exit(1);
}
