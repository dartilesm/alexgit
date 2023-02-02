import chalk from "chalk";
import { execSync } from "child_process";

function applyCommit(commit) {
    const response = {}
    try {
        const response = execSync(`git commit -m "${commit}"`);
        response.data = response ? response.toString() : null
    } catch (error) {
        response.error = error
        console.log(chalk.red("It looks like you have no staged files! Please stage your files before committing them 👾"))
    } finally {
        return response
    }
}

export default applyCommit