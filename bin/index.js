#!/usr/bin/env node
import Alexgit from "../src/alexgit.js";
import getImprovedCommits from "../src/generate-commit.js";
import makeCommit from "../src/make-commit.js";
import messages, { categorizeMessage } from "../src/messages.mock.js";
import renderPrompt from "../src/propmts.js";
import startSpinner from "../src/spinner.js";
import getInitialArguments from "../src/utils/arguments.js";
import sleep from "../src/utils/sleep.js";
import renderVerticalLine from "../src/utils/vertical-seperator.js";

const { commit: commitArg } = getInitialArguments();

const alexgit = new Alexgit();

await alexgit.say(commitArg ? messages.initialCommit : messages.welcome)
await sleep(250)

const initialCommit = await renderPrompt("initialCommit", { initial: commitArg || "", skip: !!commitArg});

if (!commitArg) {
    await alexgit.say(messages.initialCommit)
};
const spinner = startSpinner(categorizeMessage({ type: "info", message: !commitArg ? "Wonderful, I got your commit message!" : "Working on it!"}))

let suggestedCommits
try {
    suggestedCommits = await getImprovedCommits(initialCommit)
} catch (error) {}

if (!suggestedCommits || suggestedCommits?.length === 0) {
    spinner.stop()
    console.log(`✖ ${categorizeMessage({ type: "error", message: messages.error[0] })}`)
    process.exit()
}

spinner.text = categorizeMessage({ type: "success", message: "Oh! I got it!" });
await sleep(1000)
spinner.stop()

const commitSelected = await renderPrompt("commitList", { choices: suggestedCommits })

const commitConfirmed = await renderPrompt("confirmCommit", { initial: commitSelected })


renderVerticalLine()
if (commitConfirmed) makeCommit(commitConfirmed)