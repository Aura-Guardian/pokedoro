let timer;
let isRunning = false;
let isStopwatch = false;
let currentMode = 'focus';
let durations = { focus: 25, short: 5, long: 15 };
let timeLeft = durations[currentMode] * 60;

const timerDisplay = document.getElementById('timer');
const pokemonContainer = document.getElementById('pokemon-container');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  pokemonContainer.hidden = false;
  timer = setInterval(() => {
    timeLeft += isStopwatch ? 1 : -1;
    updateDisplay();

    if (!isStopwatch && timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      pokemonContainer.hidden = true;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  pokemonContainer.hidden = true;
}

function resetTimer() {
  pauseTimer();
  timeLeft = durations[currentMode] * 60;
  updateDisplay();
}

document.getElementById('start-pause').onclick = () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
};

document.getElementById('reset').onclick = resetTimer;

document.querySelectorAll('.mode-button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.mode-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    resetTimer();
  };
});

document.getElementById('settings-toggle').onclick = () => {
  const panel = document.getElementById('settings-panel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
};

document.getElementById('save-settings').onclick = () => {
  durations.focus = parseInt(document.getElementById('focus-time').value, 10);
  durations.short = parseInt(document.getElementById('short-time').value, 10);
  durations.long = parseInt(document.getElementById('long-time').value, 10);
  isStopwatch = document.getElementById('stopwatch-mode').checked;
  resetTimer();
  document.getElementById('settings-panel').style.display = 'none';
};

updateDisplay();
