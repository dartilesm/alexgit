function renderVerticalLine(msg) {
    process.stdout.write('  |')
    process.stdout.write(msg ? ' ' + msg : '\n')
}

export default renderVerticalLine