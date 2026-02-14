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

const checkmarkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
const closeSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';

function dismissToast(container, timer) {
  clearTimeout(timer);
  container.classList.add('ayat-toast--out');
  setTimeout(() => container.remove(), 280);
}

///////////////////////// display the data //////////////////////////////////
function show() {
  const existing = document.querySelector('.ayat-toast');
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.classList.add('ayat-toast');
  container.style.position = 'fixed';

  // const icon = document.createElement("div");
  // icon.className = 'ayat-toast__icon';
  // icon.innerHTML = checkmarkSvg;

  const body = document.createElement("div");
  body.className = 'ayat-toast__body';
  const title = document.createElement("p");
  title.className = 'ayat-toast__title';
  title.textContent = 'آيات';
  const message = document.createElement("p");
  message.className = 'ayat-toast__message';
  message.textContent = ayahText;
  body.appendChild(title);
  body.appendChild(message);

  const closeBtn = document.createElement("button");
  closeBtn.type = 'button';
  closeBtn.className = 'ayat-toast__close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = closeSvg;

  // container.appendChild(icon);
  container.appendChild(body);
  container.appendChild(closeBtn);

  document.body.appendChild(container);

  const hideDelay = ayahText.length >= 100 ? ayahText.length * 50 : 6000;
  const timer = setTimeout(() => dismissToast(container, timer), hideDelay);

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissToast(container, timer);
  });

  container.addEventListener('click', (e) => {
    if (e.target === container || e.target.closest('.ayat-toast__body')) {
      dismissToast(container, timer);
    }
  });
}
