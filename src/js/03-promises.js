import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Funkcja obsługująca formularz
const form = document.querySelector('.form'); // Zmieniono z 'button[type="submit"]' na '.form'
form.addEventListener('submit', event  => {
  event.preventDefault();

  const amount = parseInt(document.querySelector('input[name="amount"]').value);
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const step = parseInt(document.querySelector('input[name="step"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const actualDelay = delay + step * i;

    createPromise(position, actualDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

// Ustawienie dla bibliioteki Notiflix

Notiflix.Notify.init({
  textColor: '#FF0000',
  backgroundColor: '#f8f8f8',
borderRadius: '25px',
rtl: false,
zindex: 4002,
backOverlay: true,
backOverlayColor: 'rgba(0,0,0,0.5)',
backOverlayClickToClose: false,
fontFamily: 'Quicksand',
svgSize: '110px',
plainText: true,
titleFontSize: '16px',
titleMaxLength: 34,
messageFontSize: '13px',
messageMaxLength: 400,
buttonFontSize: '14px',
buttonMaxLength: 34,
cssAnimation: true,
cssAnimationDuration: 360,
cssAnimationStyle: 'fade',
});