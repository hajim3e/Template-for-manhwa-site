const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://arenascan.com/manga/the-demon-king-overrun-by-heroes/";

// Fetch lista de chaptere (aici rămâne la fel)
async function getChapters() {
    try {
        const { data } = await axios.get(BASE_URL);
        const $ = cheerio.load(data);
        const chapters = [];

        $("#chapterlist li a").each((i, el) => {
            const title = $(el).find(".chapternum").text().trim();
            const link = $(el).attr("href");
            if (link) {
                chapters.push({ title, link });
            }
        });

        return chapters;
    } catch (err) {
        console.error("Error in getChapters:", err.message);
        return [];
    }
}

// Fetch imaginile unui capitol direct din HTML (ts_reader.run) — mai stabil când AJAX-ul se schimbă
async function getChapterImages(url) {
    try {
        if (!url || !url.startsWith("http")) {
            throw new Error("Invalid URL");
        }

        // Obținem HTML-ul capitolului
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        // Căutăm obiectul JSON pasat la ts_reader.run({...});
        const match = data.match(/ts_reader\.run\(\s*(\{[\s\S]*?\})\s*\)\s*;/);
        if (!match) {
            console.error("Error in getChapterImages: ts_reader.run data not found");
            return [];
        }

        let payload;
        try {
            payload = JSON.parse(match[1]);
        } catch (jsonErr) {
            // În caz că există virgule finale (trailing commas), eliminăm înainte de parse
            const cleaned = match[1]
                .replace(/,\s*([}\]])/g, "$1")
                .replace(/\r?\n/g, " ");
            payload = JSON.parse(cleaned);
        }

        const images = [];
        if (payload.sources && Array.isArray(payload.sources)) {
            payload.sources.forEach(source => {
                if (Array.isArray(source.images)) {
                    images.push(...source.images);
                }
            });
        }

        return images;

    } catch (err) {
        if (err.response) {
            // If the chapter page itself returns 404/500, report that clearly
            console.error(`Error in getChapterImages: ${err.response.status} ${err.response.statusText} for ${url}`);
        } else {
            console.error("Error in getChapterImages:", err.message);
        }
        return [];
    }
}

module.exports = {
    getChapters,
    getChapterImages
};