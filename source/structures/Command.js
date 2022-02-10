export default class Command {
    constructor(client) {
        this.client = client
        this.name = String
        this.aliases = Array
        this.description = String
    }

    async run() {}
}