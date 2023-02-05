import os from "os"

const { username } = os.userInfo() || { username: "dear human" }

export default username