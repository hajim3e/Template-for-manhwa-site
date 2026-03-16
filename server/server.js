const express = require("express");
const cors = require("cors");
const path = require("path");
const { getChapters, getChapterImages } = require("./scraper");

const app = express();
app.use(cors());



//VIEW COUNTER 
let views = 0;

if (fs.existsSync("views.txt")) {
    views = parseInt(fs.readFileSync("views.txt"));
}

app.use((req, res, next) => {

    // numărăm doar accesul la pagina principală
    if (req.path === "/" || req.path === "/index.html") {
        views++;
        fs.writeFileSync("views.txt", views.toString());
        console.log("Site visits:", views);
    }

    next();
});


// Servește fișiere statice din rădăcina proiectului
app.use(express.static(path.join(__dirname, "../public")));  

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});