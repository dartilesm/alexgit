#!/usr/bin/env node
import { createLogUpdate } from "log-update"
import chalk from "chalk"

const log = createLogUpdate(process.stdout, { showCursor: false })

const mouthExpressions = [" ◡ ", " ○ ", " ▬ ", " ● "]
const eyesExpressions = ["0", "U"]
const moodExpression = {
    happy: "^ ▽ ^",
}

let [eye] = eyesExpressions;
let [mouth] = mouthExpressions;

log(`
 ╭──⌂──╮ 
 │${eye}${chalk.green(mouth)}${eye}|
 ╰─────╯
`)

function setTalkAnimation(message, mood) {
    let [eye] = eyesExpressions;
    let mouth;

    mouth = mouthExpressions[Math.floor(Math.random() * mouthExpressions.length)]
    
    const faceExpression = mood ? moodExpression[mood] : `${eye}${chalk.green(mouth)}${eye}`

log(`
 ╭──⌂──╮ 
 │${faceExpression}│ ${chalk.yellow(message)}
 ╰─────╯
`)

}

function alexgitSay(messages) {
    let interval = null;

    let messagesClone, words, message, wordIndex;

    function setNewMessages(currentMessages = messages) {
        messagesClone = [...currentMessages]
        words = messagesClone.shift()?.split(" ");
        message = "";
        wordIndex = 0;
    }

    setNewMessages()
    
    return new Promise((resolve, reject) => {
        
        const updateMessage = () => {
            const word = words[wordIndex]
            message = `${message} ${word}`
            setTalkAnimation(message, wordIndex === words.length - 1 ? "happy" : undefined)
            wordIndex++;

            if (wordIndex === words.length) {
                clearInterval(interval)
                if (messagesClone.length > 0) setTimeout(() => {
                    setNewMessages(messagesClone)
                    interval = setInterval(updateMessage, 250)
                }, 1000)
                if (messagesClone.length === 0) {
                    resolve()
                } 
            }
        }

        interval = setInterval(updateMessage, 250)
    })
    
}

export default alexgitSay;