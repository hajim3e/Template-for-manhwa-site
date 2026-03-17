const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://arenascan.com/manga/the-demon-king-overrun-by-heroes/";

// Fetch lista de chaptere
async function getChapters() {
    try {
        const { data } = await axios.get(BASE_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        const $ = cheerio.load(data);
        const chapters = [];

        $("#chapterlist li").each((i, li) => {
            const $li = $(li);
            const $a = $li.find("a").first();
            const title = $a.find(".chapternum").text().trim();
            const date = $a.find(".chapterdate").text().trim();
            const link = $a.attr("href");
            const dataNum = $li.attr("data-num");
            const num = dataNum ? Number(dataNum) : (title.match(/\d+/)?.[0] ? Number(title.match(/\d+/)[0]) : null);

            if (link) {
                chapters.push({ num, title, date, link });
            }
        });

        return chapters;
    } catch (err) {
        console.error("Error in getChapters:", err.message);
        return [];
    }
}

// Fetch imaginile unui capitol din HTML (dat fiind că scripturile pot evolua în timp)
async function getChapterImages(url) {
    try {
        if (!url || !url.startsWith("http")) {
            throw new Error("Invalid URL");
        }

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        // 1) Preferăm obiectul JSON trecut către ts_reader.run(...) (cel mai stabil)
        const tsReaderMatch = data.match(/ts_reader\.run\(\s*(\{[\s\S]*?\})\s*\)\s*;/);
        if (tsReaderMatch) {
            let payload;
            try {
                payload = JSON.parse(tsReaderMatch[1]);
            } catch (jsonErr) {
                const cleaned = tsReaderMatch[1]
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

            if (images.length) {
                return images;
            }
        }

        // 2) Backup: extragem direct tag-urile <img> din readerarea
        const $ = cheerio.load(data);
        const imgs = [];
        $("#readerarea img.ts-main-image").each((i, img) => {
            const src = $(img).attr("src");
            if (src) imgs.push(src);
        });

        return imgs;
    } catch (err) {
        if (err.response) {
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