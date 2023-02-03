import ora from "ora";

const spinner = ora({
    text: "Wonderful, I got your commit message!",
    stream: process.stdout
});

const phrases = [
    "Taking ideas from your commit message 🧠 ",
    "Making similar commits 🧙‍♂️ ",
    "Adding some magic to them ✨ ",
    "Final tweaks ⚒️ ",
    "Almost there! 🤖 ",
];

const waitingPhrases = [
    "Things happened unexpectedly 🐛, but I'm on it 🩴",
    "I'm still here, just waiting for the magic to happen 🧙‍♂️",
]


function renderPhrases(arrayOfPhrases, duration) {
    let i = 0;
    
    const phrasesPromise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            spinner.text = arrayOfPhrases[i];
            i++;
    
            if (i === arrayOfPhrases.length) {
                clearInterval(interval);
                resolve()
            }   
        }, duration);
    })
    

    return phrasesPromise;
}

async function renderAllPhrases() {
    await renderPhrases(phrases, 2000)
    await renderPhrases(waitingPhrases, 5000)
}


function startSpinner() {
    spinner.start()

    renderAllPhrases()

    return spinner;
}

export default startSpinner;