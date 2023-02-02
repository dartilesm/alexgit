import ora from "ora";

const spinner = ora({
    text: "Wonderful, I got your commit message!",
    stream: process.stdout,
});

const phrases = [
    "Making sure your commit message is correct and meaningful 🔍",
    "Adding some magic to your commit message ✨",
    "Almost done! 🤩",
    "Oh! I got it! 🎉",
]


function startSpinner() {
    spinner.start()

    let i = 0;
    setInterval(() => {
        spinner.text = phrases[i];
        i++;
    }, 2000);
    return spinner;
}

export default startSpinner;