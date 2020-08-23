const inputContainer = document.querySelector('.input-container')
const countdownForm = document.querySelector('#countdownForm')
const dateEl = document.querySelector('#date-picker')
const countdownEl = document.querySelector('#countdown')
const countdownElTitle = document.querySelector('#countdown-title')
const countdownBtn = document.querySelector('#countdown-button')
const completeEl = document.querySelector('#complete')
const completeElInfo = document.querySelector('#complete-info')
const completeBtn = document.querySelector('#complete-button')
const timeElements  = document.querySelectorAll('span')
const audio  = document.querySelector('audio')
// const  = document.querySelector('#')

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function myAudio () {
    audio.onended = audio.play()
}


// set date to current date
 const today = new Date ().toISOString().split('T')[0];
 dateEl.setAttribute('min', today);

//  popolate Countdown
 function updateDOM () {
     countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // hide input
        inputContainer.hidden = true;
        // if countdown is complete
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} Completed On ${countdownDate}`
            myAudio();
            completeEl.hidden = false;
        }else{
             //  populate countdown

            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            inputContainer.hidden = true;
            countdownEl.hidden = false;
            
       }
    }), second
     };
    

 function updateCountdown (e){
     e.preventDefault()
     countdownTitle = e.srcElement[0].value
     countdownDate = e.srcElement[1].value

     savedCountdown = {
         title: countdownTitle,
         date: countdownDate
     };
     localStorage.setItem('countdown', JSON.stringify(savedCountdown))
     countdownValue = new Date (countdownDate).getTime();
    if (countdownDate === ''){
        alert('Select a Date')
    }else {
        updateDOM()
    }
 }

// reset values 
function reset () {
    // hide countdown and show inputContaner
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    audio.pause();
    // stop countdown
    clearInterval(countdownActive);
    // reset values
     countdownTitle = '';
     countdownDate = '';
}

function prevCountdown () {
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date (countdownDate).getTime();
        updateDOM();
    }
}

 countdownForm.addEventListener('submit', updateCountdown);
 countdownBtn.addEventListener('click', reset);
 completeBtn.addEventListener('click', reset)

//  on load, check local storage
prevCountdown();
