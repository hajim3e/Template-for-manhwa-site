const express = require("express");
const cors = require("cors");
const path = require("path");
const { getChapters, getChapterImages } = require("./scraper");

const app = express();

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
});

const staticRoot = path.join(__dirname, "..");
console.log("Static root:", staticRoot);
app.use(express.static(staticRoot));

// Force / to serve index.html (ensures root works even if express.static fails for some reason)
app.get("/", (req, res) => {
  res.sendFile(path.join(staticRoot, "index.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


let cachedChapters = null;
let cachedAt = 0;
const CHAPTERS_CACHE_TTL = 3 * 60 * 1000; 

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

app.get("/chapters", async (req, res) => {
  const now = Date.now();

  if (cachedChapters && now - cachedAt < CHAPTERS_CACHE_TTL) {
    return res.json(cachedChapters);
  }

  await fetchAndCacheChapters();
  return res.json(cachedChapters || []);
});

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

app.get("/chapter/:num", async (req, res) => {
  try {
    const num = Number(req.params.num);
    if (!Number.isFinite(num)) return res.status(400).json({ error: "Invalid chapter number" });

    const now = Date.now();
    if (!cachedChapters || now - cachedAt >= CHAPTERS_CACHE_TTL) {
      await fetchAndCacheChapters();
    }

    const chapter = (cachedChapters || []).find(c => c.num === num || (c.title || "").includes(`${num}`));
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found in list" });
    }

    const images = await getChapterImages(chapter.link);
    res.json({ chapter, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchAndCacheChapters();
});
