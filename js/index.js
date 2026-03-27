document.addEventListener('DOMContentLoaded', () => {

document.addEventListener('keydown', function(e) {
    if (e.key === "F12" ||
       (e.ctrlKey && e.shiftKey && e.key === "I") ||
       (e.ctrlKey && e.shiftKey && e.key === "J") ||
       (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', e => e.preventDefault());


// Slider Chapters/BugPage Phone / slider 
const chPagePhone = document.getElementById('chaptersPagePhone');
const bugPagePhone = document.getElementById('bugPagePhone');
const showChPhoneBtn = document.getElementById('showChPhone');
const showBugPhoneBtn = document.getElementById('showBugPhone');
const sliderPhone = document.getElementById('sliderPhone');

showChPhoneBtn.classList.add('active');

showChPhoneBtn.addEventListener('click', () => {
  chPagePhone.style.display = 'block';
  bugPagePhone.style.display = 'none';
  showChPhoneBtn.classList.add('active');
  showBugPhoneBtn.classList.remove('active');
  sliderPhone.style.transform = 'translateX(0px)';
});

showBugPhoneBtn.addEventListener('click', () => {
  chPagePhone.style.display = 'none';
  bugPagePhone.style.display = 'block';
  showChPhoneBtn.classList.remove('active');
  showBugPhoneBtn.classList.add('active');
  sliderPhone.style.transform = 'translateX(115px)';
});

const chPage = document.getElementById('chaptersPage');
const bugPage = document.getElementById('bugPage');
const showChBtn = document.getElementById('showCh');
const showBugBtn = document.getElementById('showBug');
const slider = document.getElementById('slider');

showChBtn.classList.add('active');

showChBtn.addEventListener('click', () => {
  chPage.style.display = 'block';
  bugPage.style.display = 'none';
  showChBtn.classList.add('active');
  showBugBtn.classList.remove('active');
  slider.style.transform = 'translateX(0px)';
});

showBugBtn.addEventListener('click', () => {
  chPage.style.display = 'none';
  bugPage.style.display = 'block';
  showChBtn.classList.remove('active');
  showBugBtn.classList.add('active');
  slider.style.transform = 'translateX(115px)';
});




//Email Functionality

  emailjs.init("wYgour0wMu3k6scw0"); 


// PC
document.getElementById("reportFormSubmit").addEventListener("click", function(e) {
  e.preventDefault();
  sendEmail("issueType", "description");
});

// Phone
document.getElementById("reportFormSubmitPhone").addEventListener("click", function(e) {
  e.preventDefault();
  sendEmail("issueTypePhone", "descriptionPhone");
});


function sendEmail(issueId, descId) {
  const issueType = document.getElementById(issueId).value;
  const description = document.getElementById(descId).value;

  if (!issueType) { alert("Please select an issue type."); return; }

  const templateParams = {
    name: "Reader",
    time: new Date().toLocaleString(),
    message: description,
    issueType: issueType
  };

  emailjs.send("service_n3eq64g", "template_lpxe0qa", templateParams)
    .then(() => {
      alert("Thank you! Your report has been sent.");
      document.getElementById(descId).value = "";
      document.getElementById(issueId).selectedIndex = 0;
    })
    .catch(err => alert("Oops! Something went wrong: " + err.text));
}




    // Fetch capitole și populare pentru toate box-Ch
    let allChapters = [];
    // Start with descending order (newest/biggest first)
    let sortAscending = false;

    const searchInput = document.getElementById("searchCh");
    const searchInputPhone = document.getElementById("searchChPhone");
    const sortButtons = Array.from(document.querySelectorAll("#btnSortare"));
    const arrowIcons = Array.from(document.querySelectorAll("#arrowupIcon"));

    const parseChapterNumber = (title) => {
        const match = /\b(Chapter|Capitolul)\s*(\d+)\b/i.exec(title);
        return match ? Number(match[2]) : null;
    };

    const getFilterValue = () => {
        const desktop = searchInput?.value.trim();
        const phone = searchInputPhone?.value.trim();
        if (desktop) return desktop;
        if (phone) return phone;
        return "";
    };

    const renderChapters = (chapters) => {
        const boxes = document.querySelectorAll(".box-Ch");

        boxes.forEach(container => {
            container.innerHTML = "";

            chapters.forEach(ch => {
                const a = document.createElement("a");
                a.href = "readpage.html?url=" + encodeURIComponent(ch.link);
                a.innerText = ch.title;
                container.appendChild(a);
            });
        });
    };

    const applyFilterAndSort = () => {
        const filterValue = getFilterValue();

        let filtered = allChapters.slice();

        if (filterValue) {
            const filterNumber = Number(filterValue);
            if (!Number.isNaN(filterNumber)) {
                filtered = filtered.filter(ch => {
                    const num = parseChapterNumber(ch.title);
                    return num !== null && num.toString().startsWith(filterNumber.toString());
                });
            } else {
                // If user types non-numeric, fallback on substring matching
                filtered = filtered.filter(ch => ch.title.toLowerCase().includes(filterValue.toLowerCase()));
            }
        }

        filtered.sort((a, b) => {
            const aNum = parseChapterNumber(a.title);
            const bNum = parseChapterNumber(b.title);

            if (aNum == null || bNum == null) return 0;
            return sortAscending ? aNum - bNum : bNum - aNum;
        });

        renderChapters(filtered);
    };

    const updateArrowRotation = () => {
        arrowIcons.forEach(icon => {
            icon.style.transform = sortAscending ? "rotate(0deg)" : "rotate(180deg)";
            icon.style.transition = "transform 0.2s";
        });
    };

    sortButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sortAscending = !sortAscending;
            updateArrowRotation();
            applyFilterAndSort();
        });
    });

    // Ensure the arrow is correct on initial load
    updateArrowRotation();

    [searchInput, searchInputPhone].forEach(input => {
        if (!input) return;
        input.addEventListener("input", () => {
            applyFilterAndSort();
        });
    });

    // For local development use localhost backend; for deployed sites use the Render public API.
    const FALLBACK_API_BASE = "https://manhwa-site.onrender.com";
    const origin = window.location.origin;
    const isLocalhost = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1") || origin.startsWith("http://[::1]");
    const API_BASE = (window.location.protocol === "file:" || window.location.origin === "null" || !isLocalhost)
        ? FALLBACK_API_BASE
        : origin;

    console.log("[API] using base:", API_BASE);

    fetch(`${API_BASE}/chapters`)
        .then(res => res.json())
        .then(data => {
            allChapters = data;

            // Update total chapters display (desktop + phone)
            document.querySelectorAll('#totalCh').forEach(el => {
                el.textContent = `${allChapters.length}`;
            });

            // Update the 'First Chapter' / 'Last Chapter' quick buttons
            const parseChapterNumber = (title) => {
                const match = /\b(Chapter|Capitolul)\s*(\d+)\b/i.exec(title);
                return match ? Number(match[2]) : null;
            };

            const sortedByNum = [...allChapters].sort((a, b) => {
                const aNum = parseChapterNumber(a.title);
                const bNum = parseChapterNumber(b.title);
                if (aNum == null || bNum == null) return 0;
                return aNum - bNum;
            });

            const first = sortedByNum[0];
            const last = sortedByNum[sortedByNum.length - 1];

            document.querySelectorAll('.chBtns-cutie').forEach(container => {
                const firstLink = container.querySelector('a:first-child');
                const lastLink = container.querySelector('a:last-child');

                if (first && firstLink) {
                    firstLink.href = `readpage.html?url=${encodeURIComponent(first.link)}`;
                    const spans = firstLink.querySelectorAll('span');
                    if (spans.length >= 2) spans[1].textContent = `Chapter ${parseChapterNumber(first.title) ?? ''}`;
                }

                if (last && lastLink) {
                    lastLink.href = `readpage.html?url=${encodeURIComponent(last.link)}`;
                    const spans = lastLink.querySelectorAll('span');
                    if (spans.length >= 2) spans[1].textContent = `Chapter ${parseChapterNumber(last.title) ?? ''}`;
                }
            });

            applyFilterAndSort();
        })
        .catch(err => console.error("Fetch chapters error:", err));





});







