let stop = true; // must be dynamic
let ayahText;
///////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  if (stop) {
    getData()
  } else {
    setInterval(getData, 5000)
  }
});

//////////////////////// fetching the date///////////////////////////////////
function getData() {
  let surahApi
  let ayahNumber = Math.floor(Math.random() * 6236)
  surahApi = new XMLHttpRequest();
  surahApi.open('get', `https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar`)
  surahApi.send()
  surahApi.addEventListener('loadend', function () {
    let ayah = JSON.parse(surahApi.response).data.text;
    ayahText = ayah;
    console.log('getting data');
    show()
  })
}

///////////////////////// display the data //////////////////////////////////
function show() {
  const existing = document.querySelector('.quote');
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.innerHTML = ayahText;
  container.style.padding = '10px 20px';
  container.classList.add('quote');
  document.body.appendChild(container);

  const duration = ayahText.length >= 100 ? ayahText.length / 20 : 5;
  const hideDelay = ayahText.length >= 100 ? ayahText.length * 50 : 6000;
  container.style.animationDuration = `${duration}s`;

  const timer = setTimeout(() => container.classList.add('d-none'), hideDelay);
  container.addEventListener('click', () => {
    clearTimeout(timer);
    container.remove();
  });
}
