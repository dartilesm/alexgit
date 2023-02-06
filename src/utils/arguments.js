#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv

function getInitialArguments() {
    return argv
}

export default getInitialArguments;