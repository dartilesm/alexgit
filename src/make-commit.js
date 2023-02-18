import chalk from "chalk";
import { execSync } from "child_process";
import { categorizeMessage } from "./messages.mock.js";
import username from "./utils/username.js";

function applyCommit(commit) {
    const response = {}
    try {
        const data = execSync(`git commit -m "${commit}"`);
        const gitResponse = data ? data.toString() : null
        const [commitData, fileModified] = gitResponse.split("\n")
        response.data = {
            commitData,
            fileModified
        }
    } catch (error) {
        response.error = error
    } finally {
        return response
    }
}

function makeCommit(commit) {
    const { error, data } = applyCommit(commit)

    const message = !error ? `✔ ${categorizeMessage({ type: "success", message: data.fileModified })}
    
            ${data.commitData}` : `✖ ${categorizeMessage({ type: "error", message: `${chalk.blueBright(username)}, it looks like ${chalk.red("you have no staged files")}! Please stage your files before committing them 👾` })}`

    console.log(message)
    process.exit()
}

export default makeCommit