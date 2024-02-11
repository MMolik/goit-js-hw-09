// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

// dane do zadania //
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      
    },
  };

  function convertMs(ms) {
    // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
    // Remaining days
      const days = Math.floor(ms / day);
    // Remaining hours
      const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
    }
    
    console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
    console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
    console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}

    //^^dane do zadania^^^//


    const button = (document.querySelector('button[data-start]').disabled = true);
    button.disabled = true;

    
    if (selectedDates[0] <= currentDate) {
      // Report.Failure('Error', 'Please choose a date in the future', 'OK');
      document.querySelector('button[data-start]').disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      document.querySelector('[data-start]').disabled = false;
    };

    let countdownInterval;
    flatpickr('#datetime-picker', options);
    document.querySelector('button[data-start]').addEventListener('click', startTimer);
    function startTimer() {
      const selectedDate = new Date(
        document.querySelector('#datetime-picker').value
      );
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        // Report.Failure('Error', 'Please choose a date in the future', 'OK');
        return;
      }
      updateTimer(selectedDate - currentDate);
      countdownInterval = setInterval(() => {
        updateTimer(selectedDate - new Date());
      }, 1000);
      document.querySelector('button[data-start]').disabled = true;
    }
    function updateTimer(timeDiff) {
      const { days, hours, minutes, seconds } = convertMs(timeDiff);
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
      if (timeDiff <= 0) {
        clearInterval(countdownInterval);
        Report.Success('Success', 'Countdown finished!', 'OK');
      }
    }
    function addLeadingZero(value) {
      return value < 10 ? `0${value}` : value;
    }