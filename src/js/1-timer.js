import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let NewDate = null;
let timerId = null;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] > new Date()) {
        NewDate = selectedDates[0];
        clearInterval(timerId);
        startBtn.disabled = false;
    } else {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        icon: false,
      });
      startBtn.disabled = true;
    }
    },
  };

  flatpickr(datePicker, options);

  function updateTimer() {
    const now = new Date();
    const timeLeft = NewDate - now;

    if (timeLeft <= 0) {
        clearInterval(timerId);
        iziToast.success({
          title: '',
          message: "Countdown finished!",
          position: 'topRight',
          icon: false,
        });
        startBtn.disabled = false;
        return;
    }

    const time = convertMs(timeLeft);

    days.textContent = String(time.days).padStart(2, "0");
    hours.textContent = String(time.hours).padStart(2, "0");
    minutes.textContent = String(time.minutes).padStart(2, "0");
    seconds.textContent = String(time.seconds).padStart(2, "0");
}


startBtn.addEventListener("click", () => {
    if (!NewDate) return;
    clearInterval(timerId);
    startBtn.disabled = true; 
    updateTimer();
    timerId = setInterval(updateTimer, 1000);
});

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
  
  