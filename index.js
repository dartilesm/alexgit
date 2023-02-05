#!/usr/bin/env node
import chalk from "chalk";
import makeCommit from "./src/make-commit.js";
import getImprovedCommits from "./src/generate-commit.js";
import renderPrompt from "./src/propmts.js";
import startSpinner from "./src/spinner.js";

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

if (commitConfirmed) makeCommit(commitConfirmed)