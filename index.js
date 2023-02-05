#!/usr/bin/env node
import chalk from "chalk";
import makeCommit from "./src/make-commit.js";
import getImprovedCommits from "./src/generate-commit.js";
import renderPrompt from "./src/propmts.js";
import startSpinner from "./src/spinner.js";
import Alexgit from "./src/alexgit.js";
import messages from "./src/messages.mock.js";
import sleep from "./src/utils/sleep.js";

const alexgit = new Alexgit();

await alexgit.say(messages.welcome)
await sleep(1000)

const initialCommit = await renderPrompt("initialCommit");

const spinner = startSpinner()

let suggestedCommits
try {
    suggestedCommits = await getImprovedCommits(initialCommit)
} catch (error) {}

if (!suggestedCommits || suggestedCommits?.length === 0) {
    spinner.fail(`${chalk.bgRedBright(chalk.black(" error "))} ${messages.error[0]}`)
    process.exit()
}

spinner.text = "Oh! I got it!";
await sleep(1000)
spinner.stop()

const commitSelected = await renderPrompt("commitList", { choices: suggestedCommits })

const commitConfirmed = await renderPrompt("confirmCommit", { initial: commitSelected })

if (commitConfirmed) makeCommit(commitConfirmed)