let startTime, updatedTime, difference, tInterval;
let running = false;
let paused = false;

const displayHour = document.getElementById('hour');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resumeButton.addEventListener('click', resume);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        running = true;
        paused = false;
        resumeButton.style.display = 'none';
        pauseButton.style.display = 'inline';
        resetButton.style.display = 'none';
    }
}

function pause() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
        resumeButton.style.display = 'inline';
        pauseButton.style.display = 'none';
        resetButton.style.display = 'inline';
    }
}

function resume() {
    if (running && paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        paused = false;
        resumeButton.style.display = 'none';
        pauseButton.style.display = 'inline';
        resetButton.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    displayHour.innerHTML = '00';
    displayMinutes.innerHTML = ':00';
    displaySeconds.innerHTML = ':00';
    displayMilliseconds.innerHTML = '000';
    resumeButton.style.display = 'none';
    pauseButton.style.display = 'inline';
    resetButton.style.display = 'none';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    displayHour.innerHTML = hours;
    displayMinutes.innerHTML = ':' + minutes;
    displaySeconds.innerHTML = ':' + seconds;
    displayMilliseconds.innerHTML = milliseconds;
}