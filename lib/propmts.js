#!/usr/bin/env node

import enquirer from "enquirer";

const promptData = {
        initialCommit: {
            promptType: "input",
            options: {
                name: "initialCommit",
                message: "Enter a commit message...",
                result(answer) {
                    this.clear()
                    return answer
                }
            }
        },
        commitList: {
            promptType: "select",
            options: {
                name: "commitList",
                message: "Select one of the following options to edit and/or confirm:",
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
                message: "Edit and/or confirm the commit: ",
            }
        }
    }


function renderPrompt(prompt, customOptions) {
    const { promptType, options } = promptData[prompt];

    return enquirer[promptType]({...options, ...customOptions});
}

export default renderPrompt;