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

//Pages footer links
  const ppPage = document.getElementById('PrivacyPolicy-PAGE');
  const termsPage = document.getElementById('TermsAndConditions-PAGE');
  const dmcaPage = document.getElementById('DMCA-PAGE');
  
//bkackBtns footer links

//PolicyBTns
  const policyBackBtnPC = document.getElementById('policyBackBtnPC');
  const policyBackBtnPhone = document.getElementById('policyBackBtnPhone');

//TermsBTns
  const termsBackBtnPC = document.getElementById('termsBackBtnPC');
  const termsBackBtnPhone = document.getElementById('termsBackBtnPhone');

//DmcaBTns
  const dmcaBackBtnPC = document.getElementById('dmcaBackBtnPC');
  const dmcaBackBtnPhone = document.getElementById('dmcaBackBtnPhone');


  //Back btns PC/Phone

//Policy
policyBackBtnPC.addEventListener('click', (e) =>{
    e.preventDefault();
    
   ppPage.style.display = 'none';
   homePagePC.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});

policyBackBtnPhone.addEventListener('click', (e) =>{
    e.preventDefault();

   ppPage.style.display = 'none';
   homePagePhone.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});

//Terms
termsBackBtnPC.addEventListener('click', (e) =>{
    e.preventDefault();

   termsPage.style.display = 'none';
   homePagePC.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});

termsBackBtnPhone.addEventListener('click', (e) =>{
    e.preventDefault();

   termsPage.style.display = 'none';
   homePagePhone.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});

//Dmca
dmcaBackBtnPC.addEventListener('click', (e) =>{
    e.preventDefault();

   dmcaPage.style.display = 'none';
   homePagePC.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});

dmcaBackBtnPhone.addEventListener('click', (e) =>{
    e.preventDefault();

   dmcaPage.style.display = 'none';
   homePagePhone.style.display = 'block';
   footer.style.display = 'block';

   scrollTopSmooth();
});





//links footer btns
  const footer = document.getElementById('footer');

  const policyBtnFooter = document.getElementById('policyBtnFooter');
  const termsBtnFooter = document.getElementById('termsBtnFooter');
  const dmcaBtnFooter = document.getElementById('dmcaBtnFooter');


policyBtnFooter.addEventListener('click', (e) =>{
    e.preventDefault();
   
   ppPage.style.display = 'block';
   homePagePhone.style.display = 'none';
   homePagePC.style.display = 'none';
   footer.style.display = 'none';

   scrollTopSmooth();
});


termsBtnFooter.addEventListener('click', (e) =>{
    e.preventDefault();

   termsPage.style.display = 'block';
   homePagePhone.style.display = 'none';
   homePagePC.style.display = 'none';
   footer.style.display = 'none';

   scrollTopSmooth();
});

dmcaBtnFooter.addEventListener('click', (e) =>{
    e.preventDefault();

   dmcaPage.style.display = 'block';
   homePagePhone.style.display = 'none';
   homePagePC.style.display = 'none';
   footer.style.display = 'none';

    scrollTopSmooth();
});



