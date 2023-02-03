#!/usr/bin/env node
import chalk from "chalk";
import applyCommit from "./lib/apply-commit.js";
import getImprovedCommits from "./lib/generate-commit.js";
import renderPrompt from "./lib/propmts.js";
import startSpinner from "./lib/spinner.js";

const initialCommit = await renderPrompt("initialCommit");

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

const commitSelected = await renderPrompt("commitList", { choices: suggestedCommits })

const commitConfirmed = await renderPrompt("confirmCommit", { initial: commitSelected })


function makeCommit(commit) {
    const { error, data } = applyCommit(commit)
    if (!error) console.log(`
${chalk.green("All done! ✅")} ${data.fileModified}

${data.commitData}
    `)
    process.exit()
}

if (commitConfirmed) makeCommit(commitConfirmed)