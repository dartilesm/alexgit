#!/usr/bin/env node

import chalk from "chalk";
import yargsInteractive from "yargs-interactive";
import applyCommit from "./lib/apply-commit.js";
import getImprovedCommit from "./lib/generate-commit.js";
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

let suggestedCommit
try {
    suggestedCommit = await getImprovedCommit(initialCommit)
} catch (error) {}

if (!suggestedCommit) {
    spinner.fail(chalk.red("Something went wrong! Please try again later 😔"))
    process.exit()
}

spinner.succeed(`Here you are! This is your commit: ${chalk.green(`"${suggestedCommit}"`)} `);


const suggestionOptions = {
    interactive: { default: true },
    isSuggestedCommitAccepted: {
        type: "confirm",
        describe: `Did you like it 👀? If so, I will commit it for you!`,
    }
}

const { isSuggestedCommitAccepted } = await yargsInteractive().usage("$0 <command> [args]").interactive(suggestionOptions)


function makeCommit(commit) {
    const { error, data } = applyCommit(commit)
    if (!error) console.log(`
        ${chalk.green("All done! ✅")}
        
        ${data}
    `)
    process.exit()
}

if (isSuggestedCommitAccepted) makeCommit(suggestedCommit)

if (!isSuggestedCommitAccepted) {
    const customCommitOptions = {
        interactive: { default: true },
        customCommit: {
            type: "input",
            describe: "Ok, no problem! Feel free to adjust it to your liking 🔧:",
            default: suggestedCommit,
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
}