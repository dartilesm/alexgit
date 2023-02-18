import Alexgit from "../src/alexgit.js";
import getImprovedCommits from "../src/generate-commit.js";
import makeCommit from "../src/make-commit.js";
import messages, { categorizeMessage } from "../src/messages.mock.js";
import renderPrompt from "../src/propmts.js";
import startSpinner from "../src/spinner.js";
import getInitialArguments from "../src/utils/arguments.js";
import sleep from "../src/utils/sleep.js";
import renderVerticalLine from "../src/utils/vertical-seperator.js";
import getAPIKey, { askForApiKey } from "./api-key.js";

async function runAlexGit() {
  const APIKey = await getAPIKey();

  const { commit: commitArg } = getInitialArguments();

  const alexgit = new Alexgit();

  function getAlexgitInitialMessage() {
    if (commitArg && !APIKey) return [...messages.initialCommit, ...messages.apiKeyNotFound];

    if (commitArg && APIKey) return messages.initialCommit;

    if (!commitArg && !APIKey) return [...messages.greeting, ...messages.apiKeyNotFound];

    if (!commitArg && APIKey) return [...messages.greeting, ...messages.welcome]
  }

  await alexgit.say(getAlexgitInitialMessage());
  await sleep(250);

  if (!APIKey) {
    await askForApiKey();
    renderVerticalLine();
  }

  const initialCommit = await renderPrompt("initialCommit", {
    initial: commitArg || "",
    skip: !!commitArg,
  });

  if(!commitArg) renderVerticalLine();
  const spinner = startSpinner(
    categorizeMessage({
      type: "info",
      message: !commitArg ? "Wonderful, I got your commit message!" : "Working on it!",
    })
  );

  const suggestedCommit = await getImprovedCommits(initialCommit);
  if (suggestedCommit.error || suggestedCommit.data.length === 0) {
    spinner.stop();
    console.log(`✖ ${categorizeMessage({ type: "error", message: messages.error[0] })}`);
    process.exit();
  }

  spinner.text = categorizeMessage({ type: "success", message: "Oh! I got it!" });
  await sleep(1000);
  spinner.stop();

  const commitSelected = await renderPrompt("commitList", { choices: suggestedCommit.data });

  const commitConfirmed = await renderPrompt("confirmCommit", { initial: commitSelected });

  renderVerticalLine();
  if (commitConfirmed) makeCommit(commitConfirmed);
}

export default runAlexGit;
