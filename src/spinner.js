import ora from "ora";
import chalk from "chalk";

const spinner = ora({
    text: `${chalk.bgCyanBright(chalk.black(" info  "))} Wonderful, I got your commit message!`,
    stream: process.stdout
});

const phrases = [
    `${chalk.bgCyanBright(chalk.black(" info  "))} Taking ideas from your commit message 🧠 `,
    `${chalk.bgCyanBright(chalk.black(" info  "))} Making similar commits 🧙‍♂️ `,
    `${chalk.bgCyanBright(chalk.black(" info  "))} Adding some magic to them ✨ `,
    `${chalk.bgCyanBright(chalk.black(" info  "))} Final tweaks ⚒️ `,
    `${chalk.bgCyanBright(chalk.black(" info  "))} Almost there! 🤖 `,
];

const waitingPhrases = [
    `${chalk.bgCyanBright(chalk.black(" info  "))} Things happened unexpectedly 🐛, but I'm on it 🩴`,
    `${chalk.bgCyanBright(chalk.black(" info  "))} I'm still here, just waiting for the magic to happen 🧙‍♂️`,
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
    console.log("") // Add empty line
    spinner.start()

    renderAllPhrases()

    return spinner;
}

export default startSpinner;