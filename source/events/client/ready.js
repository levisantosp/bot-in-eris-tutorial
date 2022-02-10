import Event from "../../structures/Event.js"

export default class ReadyEvent extends Event {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'ready'
    }

    async run() {
        console.log(`${this.client.user.username} online!`);
    }
}