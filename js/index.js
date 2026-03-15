document.addEventListener('DOMContentLoaded', () => {

// Slider Chapters/BugPage Phone / slider smooth
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

// Funcție comună
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
    fetch("http://localhost:3000/chapters")
    .then(res => res.json())
    .then(data => {
        const boxes = document.querySelectorAll(".box-Ch"); // toate div-urile box-Ch

        boxes.forEach(container => {
            container.innerHTML = ""; // curățăm containerul înainte

            data.forEach(ch => {
                const a = document.createElement("a");
                a.href = "readpage.html?url=" + encodeURIComponent(ch.link);
                a.innerText = ch.title;

                container.appendChild(a);
            });
        });
    })
    .catch(err => console.error("Fetch chapters error:", err));





});


//footer fetch

async function loadFooterReading() {
  const res = await fetch('/components/footer.html');
  const data = await res.text();
  document.getElementById('footer-show').innerHTML = data;
}
loadFooterReading();




