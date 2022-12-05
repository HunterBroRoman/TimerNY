// const newDate = new Date('2022-12-26 00:00');

// const oneMinute = 1000 * 60;
// const oneHour = oneMinute * 60;
// const oneDay = oneHour * 24;

// const daysRef = document.querySelector('#clock1 [data-value="days"]');
// const hoursRef = document.querySelector('#clock1 [data-value="hours"]');
// const minutesRef = document.querySelector('#clock1 [data-value="minutes"]');
// const secondsRef = document.querySelector('#clock1 [data-value="seconds"]');

// function callback () {
//     const todayDate = new Date();
//     const diff = newDate - todayDate;

//     const days = Math.floor(diff / oneDay);
//     const hours = Math.floor((diff % oneDay) / oneHour);
//     const minute = Math.floor((diff % oneHour) / oneMinute);
//     const second = Math.floor((diff % oneMinute) / 1000);

//     daysRef.textContent = days.toString().padStart(2,'0');
//     hoursRef.textContent = hours.toString().padStart(2,'0');
//     minutesRef.textContent = minute.toString().padStart(2,'0');
//     secondsRef.textContent = second.toString().padStart(2,'0');
// }

// setInterval(callback, 1000);
//----------------------------------------- CLASS-------------------------------------------------

const oneMinute = 1000 * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      daysRef: document.querySelector(`${this.selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${this.selector} [data-value="hours"]`),
      minutesRef: document.querySelector(`${this.selector} [data-value="minutes"]`),
      secondsRef: document.querySelector(`${this.selector} [data-value="seconds"]`)
    };
  }

  getData() {
    const todayDate = new Date();
    const diff = this.targetDate - todayDate;

    const days = Math.floor(diff / oneDay);
    const hours = Math.floor((diff % oneDay) / oneHour);
    const minutes = Math.floor((diff % oneHour) / oneMinute);
    const seconds = Math.floor((diff % oneMinute) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  updateContent() {
    const {
        days,
        hours,
        minutes,
        seconds
    } = this.getData();// в этом методе вызвааем метод гетДата и полученные от него данные декструктурируем и вкладываем их в DOM

    this.refs.daysRef.textContent = days.toString().padStart(2, "0");
    this.refs.hoursRef.textContent = hours.toString().padStart(2, "0"); 
    this.refs.minutesRef.textContent = minutes.toString().padStart(2, "0");
    this.refs.secondsRef.textContent = seconds.toString().padStart(2, "0");
  }

  startTimer() {
    
    this.countDownId = setInterval(() => {
        const timer = this.getData(); // отримуємо обʼєкт { days, hours, minutes, seconds }
        this.updateContent(timer); // передаємо цей обʼєкт в метод оновлення DOM. Де він одразу деструкутурується.// в колбеку викликаємо метод этого же класса
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.countDownId);
  }
}
const stopBtn = document.querySelector('#stopCountDown');
stopBtn.addEventListener('click', e => {
  timer.stopTimer();
});

const timer = new CountdownTimer({
  selector: "#clock1",
  targetDate: new Date("January, 01 2023 00:00:00"),
});
//обявили экз.класса и передали данные 

timer.startTimer(); //вызвал у него метод startTimer
