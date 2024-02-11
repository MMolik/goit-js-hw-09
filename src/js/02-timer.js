import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const inputField = document.querySelector('#datetime-picker');
const bodyElement = document.body;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      inputField.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      bodyElement.classList.add('red-transparent-background');
    } else {
      startButton.disabled = false;
    }
  },
};

let countdownInterval;

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = new Date(inputField.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  inputField.disabled = true;
  updateTimer(selectedDate - currentDate);
  countdownInterval = setInterval(() => {
    updateTimer(selectedDate - new Date());
  }, 1000);
  startButton.disabled = true;
}

function updateTimer(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('Countdown finished!');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Dodanie niestandardowego stylu CSS dla czerwonego tła z przezroczystością
const customStyles = `
.red-transparent-background {
  background-color: rgba(255, 0, 0, 0.5);
}
`;

// Wstawienie niestandardowego stylu CSS do nagłówka dokumentu
const styleElement = document.createElement('style');
styleElement.innerHTML = customStyles;
document.head.appendChild(styleElement);
