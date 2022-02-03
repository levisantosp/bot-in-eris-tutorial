const Event = require("../../structures/Event");

module.exports = class ReadyEvent extends Event {
    constructor() {
        super()
        this.name = 'ready'
    }

    async run() {
        console.log(`${this.client.user.username} online!`);
    }
}