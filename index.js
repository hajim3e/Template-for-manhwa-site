//logo home btn
const homePage = document.getElementById('homePage');
const logoBtn = document.getElementById('logoBtn');

logoBtn.addEventListener('click', () =>{
   homePage.style.display = 'block';
   //restulPages
});




//pages 

const chPage = document.getElementById('chaptersPage');
const bugPage = document.getElementById('bugPage');

const showChBtn = document.getElementById('showCh');
const showBugBtn = document.getElementById('showBug');

showChBtn.classList.add('active');


showChBtn.addEventListener('click', () =>{
  chPage.style.display = 'block';
  bugPage.style.display = 'none';

  showChBtn.classList.add('active');
  showBugBtn.classList.remove('active');
});


showBugBtn.addEventListener('click', () =>{
  chPage.style.display = 'none';
  bugPage.style.display = 'block';

  showChBtn.classList.remove('active');
  showBugBtn.classList.add('active');
});



//buton input sortare

  const sortBtn = document.getElementById('btnSortare');
  const arrowupIcon = document.getElementById('arrowupIcon');
  
  
sortBtn.addEventListener('click', () =>{
  arrowupIcon.classList.toggle('rotit');
});