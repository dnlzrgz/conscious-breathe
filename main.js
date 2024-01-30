import bellFile from "./assets/bell.mp3";

const interval = 1_000; // 1s

const inhaleInput = document.getElementById('inhale');
const inhaleValue = document.getElementById('inhaleValue');
const hold1Input = document.getElementById('hold1');
const hold1Value = document.getElementById('hold1Value');
const exhaleInput = document.getElementById('exhale');
const exhaleValue = document.getElementById('exhaleValue');
const hold2Input = document.getElementById('hold2');
const hold2Value = document.getElementById('hold2Value');
const cyclesInput = document.getElementById('cycles');
const infoSession = document.getElementById('info');

const currentStep = document.getElementById('step');
const startButton = document.getElementById('start');

let inhaleDuration = inhaleInput.value;
let hold1Duration = hold1Input.value;
let exhaleDuration = exhaleInput.value;
let hold2Duration = hold2Input.value;
let numberOfCycles = cyclesInput.value;

let totalDuration = 0;
let currentCycle = 0;

const bell = new Audio(bellFile);

const getFormattedDuration = () => {
  const minutes = Math.floor(totalDuration / 60);
  const seconds = totalDuration % 60;

  return `${minutes}m ${seconds}s`;
}

const updateVariables = () => {
  inhaleDuration = inhaleInput.value * 1;
  hold1Duration = hold1Input.value * 1;
  exhaleDuration = exhaleInput.value * 1;
  hold2Duration = hold2Input.value * 1;
  numberOfCycles = cyclesInput.value * 1;

  totalDuration = (inhaleDuration + hold1Duration + exhaleDuration + hold2Duration) * numberOfCycles

  inhaleValue.innerHTML = `${inhaleDuration}s`
  hold1Value.innerHTML = `${hold1Duration}s`
  exhaleValue.innerHTML = `${exhaleDuration}s`
  hold2Value.innerHTML = `${hold2Duration}s`

  infoSession.innerHTML = `
<span>${numberOfCycles} breathing cycles</span>
<span class="font-bold">${getFormattedDuration()}</span>
`
};

const updateValue = (variable, value) => {
  variable = value * 1;
}

const disableControls = (disable) => {
  inhaleInput.disabled = disable;
  hold1Input.disabled = disable;
  exhaleInput.disabled = disable;
  hold2Input.disabled = disable;
  cyclesInput.disabled = disable;

  startButton.disabled = disable;
}

const start = () => {
  const timer = setInterval(() => {
    if (currentCycle < numberOfCycles) {

      if (inhaleDuration > 0) {
        currentStep.textContent = 'Inhale';
        inhaleDuration--;

        if (inhaleDuration === 0) bell.play();
      } else if (hold1Duration > 0) {
        currentStep.textContent = 'Hold';
        hold1Duration--;

        if (hold1Duration === 0) bell.play();
      } else if (exhaleDuration > 0) {
        currentStep.textContent = 'Exhale';
        exhaleDuration--;

        if (exhaleDuration === 0) bell.play();
      } else if (hold2Duration > 0) {
        currentStep.textContent = 'Hold';
        hold2Duration--;

        if (hold2Duration === 0) bell.play();
      } else {
        currentCycle++;

        inhaleDuration = inhaleInput.value;
        hold1Duration = hold1Input.value;
        exhaleDuration = exhaleInput.value;
        hold2Duration = hold2Input.value;
      }
    } else {
      clearInterval(timer);
      currentCycle = 0;
      currentStep.textContent = 'Finished!';

      bell.play();

      disableControls(false);
    }
  }, interval)
}

inhaleInput.addEventListener('input', updateVariables);
hold1Input.addEventListener('input', updateVariables);
exhaleInput.addEventListener('input', updateVariables);
hold2Input.addEventListener('input', updateVariables);
cyclesInput.addEventListener('input', updateVariables);

startButton.addEventListener('click', () => {
  disableControls(true);
  bell.play();
  start();
});
