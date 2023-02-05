import chalk from "chalk"
import username from "./utils/username.js";


function messageType({ type, text } = { }) {
    const messageTypes = {
        "error": chalk.bgRed(chalk.black(text ? ` ${text} ` : " error ")),
        "success": chalk.bgGreen(chalk.black(text ? ` ${text} ` : " done ")),
        "info": chalk.bgBlue(chalk.black(text ? ` ${text} ` : " info ")),
        "warning": chalk.bgYellow(chalk.black(text ? ` ${text} ` : " warning ")),
        "custom": chalk.bgMagenta(chalk.black(text ? ` ${text} ` : " custom ")),
    }

    return messageTypes[type];
}

export function categorizeMessage({ type, message, textType = "" }) {
    return `${messageType({ type, text: textType }).padEnd(28, " ")} ${message}`
}


const messages = {
    welcome: [
        chalk.white(`Hi ${chalk.blueBright(username)}!`),
        chalk.white(`I am ${chalk.blueBright("Alexgit")} your personal assistant`),
        chalk.white(`Let's get started creating ${chalk.blueBright("beautiful commits!")}`)
    ],
    improvingCommit: [
        chalk.white("Taking ideas from your commit message 🧠 "),
        chalk.white("Making similar commits 🧙‍♂️ "),
        chalk.white("Adding some magic to them ✨ "),
        chalk.white("Final tweaks ⚒️ "),
        chalk.white("Almost there! 🤖 "),
    ],
    takingMoreThanExpected: [
        chalk.white("Things happened unexpectedly 🐛, but I'm on it 🩴"),
        chalk.white("I'm still here, just waiting for the magic to happen 🧙‍♂️"),
    ],
    error: [
        chalk.white(`Sorry ${chalk.blueBright(username)}, something in my circuits has ${chalk.red("gone wrong.")} Please try again later 😔`)
    ]
}

export default messages;