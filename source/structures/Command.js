module.exports = class Command {
    constructor() {
        this.name = String
        this.aliases = Array
        this.description = String
        this.client = require("./Client")
    }

    async run() {}
}