const params = new URLSearchParams(window.location.search);
const url = decodeURIComponent(params.get("url"));

if (!url) {
    console.error("Chapter URL is missing!");
} else {
    console.log("Fetching images for:", url);

    fetch("http://localhost:3000/chapter?url=" + encodeURIComponent(url))
        .then(res => res.json())
        .then(images => {
            console.log("Images received:", images);

            const container = document.querySelector("#images"); // aici punem pozele

            if (!container) {
                console.error("Container #images not found!");
                return;
            }

            container.innerHTML = ""; // curățăm containerul

            if (!Array.isArray(images) || images.length === 0) {
                const msg = document.createElement("p");
                msg.innerText = "No images found for this chapter.";
                container.appendChild(msg);
                return;
            }

            images.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.style.width = "100%";
                container.appendChild(img);
            });
        })
        .catch(err => console.error("Fetch error:", err));
}