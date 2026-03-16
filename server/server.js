const express = require("express");
const cors = require("cors");
const path = require("path");
const { getChapters, getChapterImages } = require("./scraper");

const app = express();
app.use(cors({ origin: true }));

// Logging foarte simplu (ajută în Railway să vedem ce requesturi vin)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Servește fișiere statice din rădăcina proiectului
app.use(express.static(path.join(__dirname, "../public")));

// Health check (folosit de Railway și debugging)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Cache pentru lista de capitole (reduce riscul de timeout în Railway)
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

app.get("/chapters", (req, res) => {
  const now = Date.now();

  // Dăm răspuns rapid din cache (dacă există)
  if (cachedChapters && now - cachedAt < CHAPTERS_CACHE_TTL) {
    return res.json(cachedChapters);
  }

  // Dacă nu avem cache, răspundem imediat cu listă goală și pornim unui refresh în background.
  if (!cachedChapters) {
    fetchAndCacheChapters();
    return res.json([]);
  }

  // Dacă cache a expirat, returnăm vechiul cache și actualizăm în background.
  fetchAndCacheChapters();
  return res.json(cachedChapters);
});

app.get("/chapter", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL parameter" });

    const images = await getChapterImages(url);
    res.json(images);
  } catch (err) {
    console.error(err);
    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.statusText });
    }
    res.status(500).json({ error: err.message });
  }
});

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchAndCacheChapters();
});