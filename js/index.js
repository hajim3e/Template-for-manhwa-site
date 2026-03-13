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












});


//footer fetch

async function loadFooterReading() {
  const res = await fetch('/components/footer.html');
  const data = await res.text();
  document.getElementById('footer-show').innerHTML = data;
}
loadFooterReading();




