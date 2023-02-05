#!/usr/bin/env node

import enquirer from "enquirer";
import chalk from "chalk";

const promptData = {
        initialCommit: {
            promptType: "input",
            options: {
                name: "initialCommit",
                message: `${chalk.bgGreenBright(chalk.black(" input "))} Enter a commit message: `,
                result(answer) {
                    return answer
                }
            }
        },
        commitList: {
            promptType: "select",
            options: {
                name: "commitList",
                message: `${chalk.bgGreenBright(chalk.black(" select"))} Confirm and/or edit the commit: `,
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
                message: `${chalk.bgGreenBright(chalk.black(" input "))} Confirm and/or edit the commit: `,
            }
        }
    }


function renderPrompt(prompt, customOptions) {
    const { promptType, options } = promptData[prompt];

    return enquirer[promptType]({...options, ...customOptions});
}

export default renderPrompt;