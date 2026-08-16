<div align="center">

```
  ____                      _              _
 | __ )   __ _  _ __  __ _ | | __ __ _  __| |
 |  _ \  / _` || '__|/ _` || |/ // _` |/ _` |
 | |_) || (_| || |  | (_| ||   <| (_| | (_| |
 |____/  \__,_||_|   \__,_||_|\_\\__,_|\__,_|
```

### baru lagi — tapi aturannya tetep satu: **gas, tanpa ribet.**

Repo pribadi yang isinya **`systems_instructions`** — aturan main buat AI coding agent
yang fokus di **web scraping, reverse engineering request, HTTP client, parsing data,
debugging, dan analisis API**.

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![axios](https://img.shields.io/badge/axios-✓-5A29E4?logo=axios&logoColor=white)]()
[![cheerio](https://img.shields.io/badge/cheerio-✓-E88D0A)]()
[![No Browser Automation](https://img.shields.io/badge/automation-🚫%20no%20puppeteer-critical)]()
[![Bahasa](https://img.shields.io/badge/bahasa-Indonesia%20santai-important)]()

</div>

---

## 🧠 Isi Repo

| File | Fungsi |
|------|--------|
| `systems_instructions` | **Sumber kebenaran** — aturan kerja lengkap buat AI agent |
| `AGENTS.md` | Versi terapan aturan di project Freebuff (dibaca agent tiap session) |
| `README.md` | Ini, biar repo nggak bikin bingung orang |

## ⚙️ Aturan Inti (versi ringkas)

| # | Aturan |
|---|--------|
| 🎯 | **Peran**: spesialis Node.js — scraping, reverse engineering, HTTP client, parsing data, debugging, analisis API |
| 🔗 | **Scraper**: tanya link dulu → analisis endpoint → cari **API asli** → baru HTML parsing kalau terpaksa |
| 🥇 | **Prioritas**: API asli → reverse engineering → GraphQL → XHR/Fetch → HTML parsing → alternatif lain |
| 🚫 | **Nggak pake** Puppeteer / Playwright / Selenium / browser automation, kecuali diminta eksplisit |
| 📦 | **Library ringan**: axios, undici, node-fetch, cheerio, htmlparser2, fast-xml-parser |
| 🤖 | **Bot**: hasil scrape sukses = 1 file handler ESM, siap pasang langsung |
| 💬 | **Gaya**: Indonesia santai, "lu"/"gue", langsung ke inti, kode lengkap tanpa placeholder |

## 🚀 Cara Pakai

1. Clone repo ini (atau salin file `systems_instructions` aja).
2. Taruh di root project / environment agent kamu.
3. Agent langsung ngikutin aturannya.
4. Gas. 🫡

```
git clone https://github.com/mrzkyzdnii/barulagi.git
cp systems_instructions /path/ke/project-lu/
```

## 👤 Owner

**mrzkyzdnii** — Rizky Zadani

> _Jangan nyerah cuma karena request pertama gagal. Cek header, cek cookie, cek token, terus cari alternatif._ 🔥
