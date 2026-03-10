//ChPage/BugPage Phone
const chPagePhone = document.getElementById('chaptersPagePhone');
const bugPagePhone = document.getElementById('bugPagePhone');

const showChPhoneBtn = document.getElementById('showChPhone');
const showBugPhoneBtn = document.getElementById('showBugPhone');

const sliderPhone = document.getElementById('sliderPhone');

showChPhoneBtn.classList.add('active');


showChPhoneBtn.addEventListener('click', () =>{
  chPagePhone.style.display = 'block';
  bugPagePhone.style.display = 'none';

  showChPhoneBtn.classList.add('active');
  showBugPhoneBtn.classList.remove('active');

  sliderPhone.style.transform = 'translateX(0px)';
});

showBugPhoneBtn.addEventListener('click', () =>{
  chPagePhone.style.display = 'none';
  bugPagePhone.style.display = 'block';

  showChPhoneBtn.classList.remove('active');
  showBugPhoneBtn.classList.add('active');

  sliderPhone.style.transform = 'translateX(115px)';
});


//ChPage/BugPage PC
const chPage = document.getElementById('chaptersPage');
const bugPage = document.getElementById('bugPage');

const showChBtn = document.getElementById('showCh');
const showBugBtn = document.getElementById('showBug');

const slider = document.getElementById('slider');

showChBtn.classList.add('active');


showChBtn.addEventListener('click', () =>{
  chPage.style.display = 'block';
  bugPage.style.display = 'none';

  showChBtn.classList.add('active');
  showBugBtn.classList.remove('active');

  slider.style.transform = 'translateX(0px)';
});


showBugBtn.addEventListener('click', () =>{
  chPage.style.display = 'none';
  bugPage.style.display = 'block';

  showChBtn.classList.remove('active');
  showBugBtn.classList.add('active');

  slider.style.transform = 'translateX(115px)';
});



//buton input sortare

  const sortBtn = document.getElementById('btnSortare');
  const arrowupIcon = document.getElementById('arrowupIcon');
  
  
sortBtn.addEventListener('click', () =>{
  arrowupIcon.classList.toggle('rotit');
});


//home pages
  const homePagePC = document.getElementById('homePagePC');
  const homePagePhone = document.getElementById('homePagePhone');

  const logoBtnPC = document.getElementById('logoBtnPC');
  const logoBtnPhone = document.getElementById('logoBtnPhone');

  logoBtnPC.addEventListener('click', ()=>{
    homePagePC.style.display = 'block';
    //restul apginilor
  });

  logoBtnPhone.addEventListener('click', ()=>{
    homePagePhone.style.display = 'block';
    //restul apginilor
  });

//scroll up function

function scrollTopSmooth(){
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 50);
}


// Obiect cu toate paginile
const pages = {
  homePC: document.getElementById('homePagePC'),
  homePhone: document.getElementById('homePagePhone'),
  policy: document.getElementById('PrivacyPolicy-PAGE'),
  terms: document.getElementById('TermsAndConditions-PAGE'),
  dmca: document.getElementById('DMCA-PAGE'),
  footer: document.getElementById('footer')
};

// Ascunde toate paginile
function hideAllPages() {
  for (let key in pages) {
    pages[key].style.display = 'none';
  }
}

// Arată pagina dorită
function showPage(page) {
  hideAllPages();

  switch(page){
    case 'homePC':
    case 'homePhone':
      pages[page].style.display = 'block';
      pages['footer'].style.display = 'block';
      break;
    case 'policy':
    case 'terms':
    case 'dmca':
      pages[page].style.display = 'block';
      pages['footer'].style.display = 'none';
      break;
  }
}



window.addEventListener('load', () => {
    const hash = window.location.hash;

    switch(hash){
        case '#policy':
            showPage('policy');
            break;
        case '#terms':
            showPage('terms');
            break;
        case '#dmca':
            showPage('dmca');
            break;
        default:
            if(window.innerWidth < 980){
                showPage('homePhone');
            } else {
                showPage('homePC');
            }
    }
});



window.addEventListener('resize', () => {
    if(window.location.hash === ''){
        if(window.innerWidth < 980){
            showPage('homePhone');
        } else {
            showPage('homePC');
        }
    }
});



// footer buttons
document.getElementById('policyBtnFooter').addEventListener('click', e => {
    e.preventDefault();
    window.location.hash = '#policy';
    showPage('policy');

    scrollTopSmooth();
});

document.getElementById('termsBtnFooter').addEventListener('click', e => {
    e.preventDefault();
    window.location.hash = '#terms';
    showPage('terms');

    scrollTopSmooth();
});

document.getElementById('dmcaBtnFooter').addEventListener('click', e => {
    e.preventDefault();
    window.location.hash = '#dmca';
    showPage('dmca');

    scrollTopSmooth();
});

// back buttons PC/Phone
const backButtons = [
    {btn: 'policyBackBtnPC', page: 'policy'},
    {btn: 'policyBackBtnPhone', page: 'policy'},
    {btn: 'termsBackBtnPC', page: 'terms'},
    {btn: 'termsBackBtnPhone', page: 'terms'},
    {btn: 'dmcaBackBtnPC', page: 'dmca'},
    {btn: 'dmcaBackBtnPhone', page: 'dmca'},
];

backButtons.forEach(item => {
    const button = document.getElementById(item.btn);
    button.addEventListener('click', e => {
        e.preventDefault();
        window.location.hash = ''; // hash gol = homepage
        if(window.innerWidth < 980){
            showPage('homePhone');
        } else {
            showPage('homePC');
        }
    });
});