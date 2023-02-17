import enquirer from "enquirer";
import { categorizeMessage } from "./messages.mock.js";

const promptData = {
        askForAPIKey: {
            promptType: "password",
            options: {
                name: "askForAPIKey",
                message: categorizeMessage({ type: "info", message: "Please enter the API key: ", textType: "secret" }),
                result(answer) {
                    this.message(categorizeMessage({ type: "success", message: "Please enter the API key: ", textType: "done" }))
                    return answer   
                }
            }
        },
        initialCommit: {
            promptType: "input",
            options: {
                name: "initialCommit",
                message: categorizeMessage({ type: "success", message: "Enter a commit message: ", textType: "input" }),
                result(answer) {
                    this.message(categorizeMessage({ type: "success", message: "Enter a commit message: ", textType: "done" }))
                    return answer
                }
            }
        },
        commitList: {
            promptType: "select",
            options: {
                name: "commitList",
                message: categorizeMessage({ type: "success", message: "Confirm and/or edit the commit: ", textType: "select" }),
                result(answer) {
                    this.clear()
                    return answer
                }
            }
        },
        confirmCommit: {
            promptType: "input",
            options: {
                name: "confirmCommit",
                message: categorizeMessage({ type: "success", message: "Confirm and/or edit the commit: ", textType: "input" }),
            }
        }
    }


function renderPrompt(prompt, customOptions) {
    const { promptType, options } = promptData[prompt];

    return enquirer[promptType]({...options, ...customOptions});
}

export default renderPrompt;