require("dotenv").config()
const path = require("path")
const klaw = require("klaw")
const client = require("./source/structures/Client")

function load() {
    klaw('source/client').on('data', item => {
        const event = path.parse(item.path)
        if (event.ext == '.js') {
            client.eLoad(event.dir, event.name)
        }
    })
    klaw('source/commands').on('data', item => {
        const cmd = path.parse(item.path)
        if (cmd.ext == '.js') {
            client.cLoad(cmd.dir, cmd.name)
        }
    })
}

load()
client.connect()