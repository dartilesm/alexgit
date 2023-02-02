import chalk from "chalk";

function applyCommit(commit) {
    const response = {}
    try {
        execSync(`git commit -m "${commit}"`);
    } catch (error) {
        response.error = error
        console.log(chalk.red("It looks like you have no staged files! Please stage your files before committing them 👾"))
        process.exit()
    }
}

export default applyCommit