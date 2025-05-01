var time = 25 * 60; //25 miutes in seconds
var timerInterval;
var currentMode = "pomodoro";
var MODES = {
    pomodoro: 25,
    short: 5,
    long: 15,
}

document.querySelectorAll("#modes button")
    .forEach(button => {
        button.addEventListener('click', handleModeButtons)
    });

function handleModeButtons(event){
    switchMode(event.target.dataset.modeId);
}

function switchMode(mode) {
    /*
    pomodoro mode: pomodoro
    short break: short
    long break: long
    */

    currentMode = mode;
    resetTimer();
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000) // 1 second = 1000 miliseconds (function is called every second)
}
function pauseTimer() {
    clearInterval(timerInterval);
}
function skipTimer() {}

function updateTimer() {
    time -=1;

    var minutes = Math.floor(time / 60); //floor removes decimals
    var seconds = time % 60;

    //minutes if less than 10 , then add 0 to the minutes, else just display minutes
    minutes = minutes < 10 ? "0" + minutes: minutes; // display 02:30 instead of just 2:30
    seconds = seconds < 10 ? "0" + seconds: seconds; // display 12:02 instead of just 12:2

    document.getElementById("timer").textContent = minutes + ":" + seconds;

}

function resetTimer() {
    time = MODES[currentMode] * 60;
    clearInterval(timerInterval);
    updateTimer();
}