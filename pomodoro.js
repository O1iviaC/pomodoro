var time = 25 * 60; //25 minutes in seconds
var timerInterval;
var currentMode = "pomodoro";
var MODES = {
    pomodoro: 25,
    short: 5,
    long: 15,
}
const DEFAULT_MODES = {
    pomodoro: 25,
    short: 5,
    long: 15,
}
var totalBreaks = 0
const alarmSound = new Audio(`times-up.mp3`);

document.querySelectorAll("#modes button")
    .forEach(button => {
        button.addEventListener('click', handleModeButtons)
    });

document.querySelectorAll("#duration-control input")
    .forEach(function(input){
        input.addEventListener('change', durationControlHandler);
        input.value = '';
    })

function durationControlHandler(event){
    var value = event.target.value.trim(); 
    var durationId = event.target.dataset.durationId;

    if(value != '' && !isNaN(value) && Number.isInteger(parseFloat(value)) && parseInt(value) != 0) {
        MODES[durationId] = parseInt(value);
    } else {
        MODES[durationId] = DEFAULT_MODES[durationId];
    }

    resetTimer();
}
function handleModeButtons(event){
    switchMode(event.target.dataset.modeId);
}

function updateControlButtons(isrunning){
    var start_button = document.querySelector(".timer-control.start");
    var pause_button = document.querySelector(".timer-control.pause");
    var skip_button = document.querySelector(".timer-control.skip");

    if(isrunning){
        start_button.disabled = true;
        pause_button.disabled = false;
    } else {
        start_button.disabled = false;
        pause_button.disabled = true;
    }
}

function switchMode(mode) {
    currentMode = mode;
    document.documentElement.style.backgroundColor = "var(--" + mode +")";
    document.querySelectorAll("#modes button")
        .forEach(elem => {
        elem.classList.remove("active") // removes active state from a mode that we're switching from
    }); 
    document.querySelector(`button[data-mode-id="${mode}"]`).classList.add('active'); //adds active state to mode we're switching to
    resetTimer();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000) // 1 second = 1000 miliseconds (function is called every second)
    updateControlButtons(true);
}
function pauseTimer() {
    clearInterval(timerInterval);
    updateControlButtons(false);
}

function updateTimer() {
    var minutes = Math.floor(time / 60); //floor removes decimals
    var seconds = time % 60;

    //minutes if less than 10 , then add 0 to the minutes, else just display minutes
    minutes = minutes < 10 ? "0" + minutes: minutes; // display 02:30 instead of just 2:30
    seconds = seconds < 10 ? "0" + seconds: seconds; // display 12:02 instead of just 12:2

    document.getElementById("timer").textContent = minutes + ":" + seconds;
    document.title = `${minutes}:${seconds} - Pomodoro`; //changes title of tab
    if(time <= -1) {
        pauseTimer();
        nextMode();
        resetTimer();
        alarmSound.play();
        alert("Time's up!");
        alarmSound.pause();
        alarmSound.currentTime = 0;  // makes it so you can start audio file from the beginning again next time
    }
    time -=1;
}

function nextMode() {
    if(currentMode == "pomodoro"){
        totalBreaks++;
        if (totalBreaks % 4 == 0){
            switchMode("long");
        } else {
            switchMode("short");
        }
    } else {
        switchMode("pomodoro");
    }
}

function resetTimer() {
    time = MODES[currentMode] * 60;
    clearInterval(timerInterval);
    updateTimer();
    updateControlButtons(false);
}