const express = require("express");
const cors = require("cors");
const path = require("path");
const { getChapters, getChapterImages } = require("./scraper");

const app = express();
app.use(cors());

// Servește fișiere statice din rădăcina proiectului
app.use(express.static(path.join(__dirname, "..")));  

// Endpoint pentru lista de capitole
app.get("/chapters", async (req, res) => {
    try {
        const chapters = await getChapters();
        res.json(chapters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint pentru imagini dintr-un capitol
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
app.listen(3000, () => {
    console.log("Server running on port 3000");
});