let timer;
let timeLeft = 1500;
let isRunning = false;
let isStopwatch = false;

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  document.getElementById("minutes").textContent = String(mins).padStart(2, '0');
  document.getElementById("seconds").textContent = String(secs).padStart(2, '0');
}

function setSession(mode) {
  pauseTimer();
  isStopwatch = (mode === 'stopwatch');

  if (mode === 'focus') {
    timeLeft = parseInt(document.getElementById("focus-time").value) * 60;
  } else if (mode === 'short') {
    timeLeft = parseInt(document.getElementById("short-break").value) * 60;
  } else if (mode === 'long') {
    timeLeft = parseInt(document.getElementById("long-break").value) * 60;
  } else if (mode === 'stopwatch') {
    timeLeft = 0;
  }
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  document.getElementById("pokemon-runner").classList.remove("hidden");

  timer = setInterval(() => {
    if (!isStopwatch && timeLeft <= 0) {
      pauseTimer();
      alert("Time's up!");
      return;
    }
    timeLeft = isStopwatch ? timeLeft + 1 : timeLeft - 1;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("pokemon-runner").classList.add("hidden");
}

function resetTimer() {
  pauseTimer();
  setSession('focus');
}

updateDisplay();
