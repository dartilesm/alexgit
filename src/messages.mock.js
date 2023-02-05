import chalk from "chalk"
import os from "os"

const { username } = os.userInfo() || { username: "dear" }

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
        chalk.white(`Sorry diego, something in my circuits has ${chalk.red("gone wrong.")} Please try again later 😔`)
    ]
}

export default messages;