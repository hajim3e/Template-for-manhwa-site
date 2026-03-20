const params = new URLSearchParams(window.location.search);
const url = decodeURIComponent(params.get("url"));

const chNumbEl = document.getElementById("chNumb");
const selects = Array.from(document.querySelectorAll(".chapter-select"));

function updateChapterNumber(chapterTitle) {
  if (chNumbEl) {
    // Try to extract a numeric chapter from the title (e.g. "Chapter 4" or "Capitolul 4")
    const match = /\b(Chapter|Capitolul)\s*(\d+)\b/i.exec(chapterTitle);
    if (match) {
      chNumbEl.textContent = `Chapter ${match[2]}`;
    } else {
      // Fallback: display the full title
      chNumbEl.textContent = chapterTitle;
    }
  }

  // Update the document title to reflect current chapter
  if (chapterTitle) {
    document.title = `Mawanginde Yongsa ga Neomu Maneum - ${chapterTitle}`;
  }
}

function buildChapterSelects(chapters, currentUrl) {
  selects.forEach(select => {
    select.innerHTML = "";

    chapters.forEach(ch => {
      const opt = document.createElement("option");
      opt.value = ch.link;
      opt.textContent = ch.title;
      if (ch.link === currentUrl) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      const selectedLink = select.value;
      window.location.href = `readpage.html?url=${encodeURIComponent(selectedLink)}`;
    });
  });
}

function updateNavigationButtons(chapters, currentUrl) {
  const allButtons = document.querySelectorAll(".btns-box button, .btns-box-jos button");
  if (!allButtons.length) return;

  const currentIndex = chapters.findIndex(ch => ch.link === currentUrl);
  if (currentIndex === -1) return;

  // Determine if chapter list is descending (newest first) or ascending
  const nums = chapters
    .map(ch => {
      const m = /\b(Chapter|Capitolul)\s*(\d+)\b/i.exec(ch.title);
      return m ? Number(m[2]) : null;
    })
    .filter(n => n !== null);
  const isDescending = nums.length >= 2 ? nums[0] > nums[1] : false;

  const getTargetIndex = (direction) => {
    // direction: "back" or "next"
    const step = direction === "back" ? (isDescending ? 1 : -1) : (isDescending ? -1 : 1);
    return currentIndex + step;
  };

  allButtons.forEach(btn => {
    const text = btn.textContent.trim();
    const isBack = text.startsWith("<");
    const targetIndex = getTargetIndex(isBack ? "back" : "next");

    btn.disabled = targetIndex < 0 || targetIndex >= chapters.length;
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const target = chapters[targetIndex];
      if (!target) return;
      window.location.href = `readpage.html?url=${encodeURIComponent(target.link)}`;
    });
  });
}

if (!url) {
  console.error("Chapter URL is missing!");
} else {
  console.log("Fetching chapters for:", url);

  const FALLBACK_API_BASE = "https://manhwa-site.onrender.com";
  const origin = window.location.origin;
  const isLocalhost = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1") || origin.startsWith("http://[::1]");
  const API_BASE = (window.location.protocol === "file:" || window.location.origin === "null" || !isLocalhost)
    ? FALLBACK_API_BASE
    : origin;

  console.log("[API] using base:", API_BASE);

  fetch(`${API_BASE}/chapters`)
    .then(res => res.json())
    .then(chapters => {
      buildChapterSelects(chapters, url);

      const current = chapters.find(ch => ch.link === url);
      if (current) {
        updateChapterNumber(current.title);
      } else {
        updateChapterNumber("Chapter");
      }

      updateNavigationButtons(chapters, url);

      return fetch(`${API_BASE}/chapter?url=` + encodeURIComponent(url));
    })
    .then(res => res.json())
    .then(images => {
      console.log("Images received:", images);

      const container = document.querySelector("#images"); 

      if (!container) {
        console.error("Container #images not found!");
        return;
      }

      container.innerHTML = ""; 

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
