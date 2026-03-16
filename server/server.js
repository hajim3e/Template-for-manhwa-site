const express = require("express");
const cors = require("cors");
const path = require("path");
const { getChapters, getChapterImages } = require("./scraper");

const app = express();

// Permitem orice origine (poți restrânge la frontend-ul tău Netlify dacă vrei)
app.use(cors({ origin: true }));

// Logging pentru debugging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Servește fișiere statice din rădăcina proiectului (unde sunt acum index.html, readpage.html, style.css, etc.)
app.use(express.static(path.join(__dirname, "..")));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Cache pentru capitole
let cachedChapters = null;
let cachedAt = 0;
const CHAPTERS_CACHE_TTL = 3 * 60 * 1000; // 3 minute

async function fetchAndCacheChapters() {
  try {
    const chapters = await getChapters();
    cachedChapters = chapters;
    cachedAt = Date.now();
    console.log(`Cached ${chapters.length} chapters`);
  } catch (err) {
    console.error("fetchAndCacheChapters error:", err.message);
  }
}

// Endpoint /chapters
app.get("/chapters", (req, res) => {
  const now = Date.now();

  if (cachedChapters && now - cachedAt < CHAPTERS_CACHE_TTL) {
    return res.json(cachedChapters);
  }

  if (!cachedChapters) {
    fetchAndCacheChapters();
    return res.json([]);
  }

  fetchAndCacheChapters();
  return res.json(cachedChapters);
});

// Endpoint /chapter
app.get("/chapter", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL parameter" });

    const images = await getChapterImages(url);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchAndCacheChapters();
});