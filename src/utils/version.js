import fs from "fs";

export default function getVersion() {
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    return packageJson.version;
}