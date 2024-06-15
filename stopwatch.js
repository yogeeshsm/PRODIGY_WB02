let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const timeDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const splitList = document.getElementById('splitList');
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
toggleDarkModeButton.addEventListener('click', toggleDarkMode);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = '00:00:00';
    for (let i = 1; i <= 5; i++) {
        document.getElementById('lap' + i).innerHTML = '';
    }
    lapCounter = 1;
    splitList.innerHTML = '';
}

function lapTimer() {
    if (running && lapCounter <= 5) {
        const lapTime = timeDisplay.innerHTML;
        document.getElementById('lap' + lapCounter).innerHTML = lapTime;
        addSplitTime(lapTime);
        lapCounter++;
    }
}

function addSplitTime(time) {
    const li = document.createElement('li');
    li.textContent = time;
    splitList.appendChild(li);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function showClock() {
    const clockElement = document.querySelector('.clock');
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

showClock();
