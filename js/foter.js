//footer fetch

async function loadFooterReading() {
  const res = await fetch('../components/footer.html');
  const data = await res.text();
  document.getElementById('footer-show').innerHTML = data;
}
loadFooterReading();