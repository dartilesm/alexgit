import readline from "readline"

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function renderEditablePrompt({ editableText = "", prompt = "" }) {
  rl.write(editableText)

  return new Promise((resolve, reject) => {
    rl.question(prompt, function (answer) {
      resolve(answer)
      rl.close()
    })
  })
}

export default renderEditablePrompt