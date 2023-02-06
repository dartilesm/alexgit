import ora from "ora";
import { categorizeMessage } from "./messages.mock.js";

const spinner = ora({
  stream: process.stdout,
});

const phrases = [
  categorizeMessage({ type: "info", message: "Taking ideas from your commit message 🧠 " }),
  categorizeMessage({ type: "info", message: "Making similar commits 🧙‍♂️ " }),
  categorizeMessage({ type: "info", message: "Adding some magic to them ✨ " }),
  categorizeMessage({ type: "info", message: "Final tweaks ⚒️ " }),
  categorizeMessage({ type: "info", message: "Almost there! 🤖 " }),
];

const waitingPhrases = [
  categorizeMessage({ type: "info", message: "Things happened unexpectedly 🐛, but I'm on it 🩴" }),
  categorizeMessage({
    type: "info",
    message: "I'm still here, just waiting for the magic to happen 🧙‍♂️",
  }),
];

function renderPhrases(arrayOfPhrases, duration) {
  let i = 0;

  const phrasesPromise = new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      spinner.text = arrayOfPhrases[i];
      i++;

      if (i === arrayOfPhrases.length) {
        clearInterval(interval);
        resolve();
      }
    }, duration);
  });

  return phrasesPromise;
}

async function renderAllPhrases() {
  await renderPhrases(phrases, 2000);
  await renderPhrases(waitingPhrases, 5000);
}

function startSpinner(message) {
  if (message) spinner.text = message;
  spinner.start();

  renderAllPhrases();

  return spinner;
}

export default startSpinner;
