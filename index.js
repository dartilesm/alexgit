#!/usr/bin/env node

import chalk from "chalk";
import yargsInteractive from "yargs-interactive";
import applyCommit from "./lib/apply-commit.js";
import renderEditablePrompt from "./lib/editable-prompt.js";
import getImprovedCommits from "./lib/generate-commit.js";
import startSpinner from "./lib/spinner.js";


const commitPromptOptions = {
    interactive: { default: true },
    commit: {
        type: "input",
        describe: "Enter a commit message ",
        prompt: "if-no-arg"
    }
}

const { commit: initialCommit } = await yargsInteractive().usage("$0 <command> [args]").interactive(commitPromptOptions)

const spinner = startSpinner()

let suggestedCommits
try {
    suggestedCommits = await getImprovedCommits(initialCommit)
} catch (error) {}

if (!suggestedCommits || suggestedCommits?.length === 0) {
    spinner.fail(chalk.red("Something went wrong! Please try again later 😔"))
    process.exit()
}

spinner.text = "Oh! I got it!";
await new Promise(resolve => setTimeout(resolve, 1000));
spinner.stop()


const suggestionOptions = {
    interactive: { default: true },
    commitSelected: {
        type: "list",
        describe: `Select one of the following options to edit and/or confirm:`,
        choices: suggestedCommits,
    }
}

const { commitSelected } = await yargsInteractive().usage("$0 <command> [args]").interactive(suggestionOptions)
console.log({ commitSelected })
const confirmedCommit = await renderEditablePrompt({ editableText: commitSelected, prompt: "Edit and confirm the commit, if you don't want to make changes press enter: " })

function makeCommit(commit) {
    const { error, data } = applyCommit(commit)
    if (!error) console.log(`
${chalk.green("All done! ✅")} ${data.fileModified}

${data.commitData}
    `)
    process.exit()
}

console.log(confirmedCommit)
// if (confirmedCommit) makeCommit(commitSelected)

/* if (!commitSelected) {
    const customCommitOptions = {
        interactive: { default: true },
        customCommit: {
            type: "input",
            describe: "Ok, no problem! Feel free to adjust it to your liking (and press enter to commit) 🔧:",
            default: suggestedCommits,
            prompt: "always"
        }
    }
    try {
        const { customCommit } = await yargsInteractive().usage("$0 <command> [args]").interactive(customCommitOptions)
        makeCommit(customCommit)
    } catch (error) {
        console.log(error)
    } finally {
        process.exit()
    }
} */