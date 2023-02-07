import { createLogUpdate } from "log-update"
import chalk from "chalk"
class Alexgit {
    mouthExpressions = [` ${chalk.blueBright("◡")} `, ` ${chalk.blueBright("○")} `, ` ${chalk.blueBright("▬")} `, ` ${chalk.blueBright("●")} `]
    eyesExpressions = ["0", "U"]
    moodExpression = {
        happy: `^ ${chalk.blueBright("▽")} ^`,
    }

    interval = null

    eye = this.eyesExpressions[0];
    mouth = this.mouthExpressions[0];

    constructor() {
        this.log = createLogUpdate(process.stdout, { showCursor: false })
    }

    say(messages) {
    
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
                this.setTalkAnimation(message, wordIndex === words.length - 1 ? "happy" : undefined)
                wordIndex++;
    
                if (wordIndex === words.length) {
                    clearInterval(this.interval)
                    if (messagesClone.length > 0) setTimeout(() => {
                        setNewMessages(messagesClone)
                        this.interval = setInterval(updateMessage, 250)
                    }, 1000)
                    if (messagesClone.length === 0) {
                        resolve()
                    } 
                }
            }
    
            this.interval = setInterval(updateMessage, 250)
        })
        
    }

    setTalkAnimation(message, mood) {
        let [eye] = this.eyesExpressions;
        let mouth;
    
        mouth = this.mouthExpressions[Math.floor(Math.random() * this.mouthExpressions.length)]
        
        const faceExpression = mood ? this.moodExpression[mood] : `${eye}${chalk.green(mouth)}${eye}`
    
this.log(`
 ╭──⌂──╮ 
[│${faceExpression}│]  ${chalk.yellow(message)}
 ╰─────╯
`)
    
    }

    clear() {
        clearInterval(this.interval)
        this.log.clear();
    }
}

export default Alexgit;