import chalk from "chalk";
import { execSync } from "child_process";

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
        console.log(`
${chalk.red("It looks like you have no staged files!")} Please stage your files before committing them 👾
        `)
    } finally {
        return response
    }
}

function makeCommit(commit) {
    const { error, data } = applyCommit(commit)
    if (!error) console.log(`
${chalk.green("All done! ✅")} ${data.fileModified}

${data.commitData}
    `)
    process.exit()
}

export default makeCommit