let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const displayElement = document.getElementById('display');
const startStopButton = document.getElementById('startStopBtn');
const resetButton = document.getElementById('resetBtn');
const lapButton = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for milliseconds precision
    startStopButton.textContent = 'Pause';
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    displayElement.textContent = '00:00:00.00';
    elapsedTime = 0;
    startStopButton.textContent = 'Start';
    isRunning = false;
    lapsContainer.innerHTML = '';
}

function lapTime() {
    if (isRunning) {
        const lapElement = document.createElement('li');
        lapElement.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    displayElement.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalMilliseconds = time;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // Truncate to two digits
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTime);
