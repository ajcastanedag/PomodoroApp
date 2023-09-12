let timer;
let isRunning = false;
let workTime = 25 * 60; // Initial work time in seconds (25 minutes)
let breakTime = 5 * 60; // Initial break time in seconds (5 minutes)

const timerDisplay = document.getElementById('timerWork');
const restDisplay = document.getElementById('timeBreak');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const taskTypeInput = document.getElementById('taskType');
const taskDescriptionInput = document.getElementById('taskDescription');

workTimeInput.addEventListener('input', () => {
    workTime = workTimeInput.value * 60;
    displayTimeLeft(workTime);
});

breakTimeInput.addEventListener('input', () => {
    breakTime = breakTimeInput.value * 60;
    displayTimeLeft(breakTime); 
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            workTime--;
            displayTimeLeft(workTime);

            if (workTime === 0) {
                clearInterval(timer);
                alert('Time to take a break!');
                resetTimer();
            }
        }, 1000);

        startButton.disabled = true;
        pauseButton.disabled = false;
        stopButton.disabled = false;

        // Update the settings icon visibility
        updateSettingsIconVisibility();
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = false;
    stopButton.disabled = true;
    startButton.classList.remove('button-active');
    pauseButton.classList.remove('button-active');
    resetTimer();

    // Update the settings icon visibility
    updateSettingsIconVisibility();
}

function resetTimer() {
    workTime = workTimeInput.value * 60;
    displayTimeLeft(workTime);
}

function displayTimeLeft(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = display;
}

// Initialize the timer display
displayTimeLeft(workTime);

// JavaScript code for toggling the settings panel visibility
const settingsPanel = document.getElementById('settingsPanel');
const settingsIcon = document.getElementById('settingsIcon');


settingsIcon.addEventListener('click', () => {
    settingsPanel.classList.toggle('show'); // Toggle the 'show' class
    closeSettings.classList.toggle('active'); // Toggle the 'active' class on the arrow
});

// Add this code to your JavaScript
startButton.addEventListener('click', () => {
    startTimer();
    startButton.classList.add('button-disabled'); // Gray out the Start button
    pauseButton.classList.remove('button-disabled'); // Remove gray-out from Stop button
    // Hide the settings panel
    settingsPanel.classList.remove('show');
});

pauseButton.addEventListener('click', () => {
    pauseTimer();
    pauseButton.classList.add('button-disabled'); // Gray out the Stop button
    startButton.classList.remove('button-disabled'); // Remove gray-out from Start button
});

stopButton.addEventListener('click', () => {
    stopTimer();
    startButton.classList.remove('button-disabled'); // Gray out the Stop button
    pauseButton.classList.remove('button-disabled'); // Remove gray-out from Start button
});

// Update the settings icon visibility when the timer starts or stops
function updateSettingsIconVisibility() {
    settingsIcon.style.display = isRunning ? 'none' : 'block';
}

// Call the function to initially set the visibility based on the initial isRunning value
updateSettingsIconVisibility();

