import chalk from "chalk";
import { execSync } from "child_process";

function applyCommit(commit) {
    const response = {}
    try {
        const data = execSync(`git commit -m "${commit}"`);
        response.data = data ? data.toString() : null
    } catch (error) {
        response.error = error
        console.log(`
${chalk.red("It looks like you have no staged files!")} Please stage your files before committing them 👾
        `)
    } finally {
        return response
    }
}

export default applyCommit