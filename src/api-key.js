import { execSync } from "child_process";
import fs from "fs";
import renderPrompt from "./propmts.js";

function getFormatedEnvVars(envVar) {
  let [name, value] = envVar.split("=");

  name = name.toLowerCase();

  // convert snake case to camel case
  name = name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

  return { [name]: value };
}

function getAPIKey() {
  const currentWorkingDirectory = process.cwd();
  // check if the file exists
  if (!fs.existsSync(`${currentWorkingDirectory}/.alexgit`)) return null;

  // read a file from the current working directory
  const data = fs.readFileSync(`${currentWorkingDirectory}/.alexgit`, "utf8");

  const config = data.split("\n").reduce(
    (acc, curr) => ({
      ...acc,
      ...getFormatedEnvVars(curr),
    }),
    {}
  );
  
  return config.cohereApiKey;
}

export async function askForApiKey(){
    const apiKey = await renderPrompt("askForAPIKey")
    const currentWorkingDirectory = process.cwd();
    fs.writeFileSync(`${currentWorkingDirectory}/.alexgit`, `COHERE_API_KEY=${apiKey}`, "utf8");
    // add file to gitignore
    execSync(`echo "\n.alexgit" >> .gitignore`)
}

export default getAPIKey;
