import Event from "../../structures/Event.js"

export default class ReadyEvent extends Event {
    constructor(client) {
        super(client)
        this.client = client
        this.name = 'ready'
    }

    async run() {
        await console.log(`${this.client.user.username} online!`)
        this.client.slashCommands.forEach(command => {
            this.client.createCommand({
                name: command.name,
                description: command.description,
                options: command.options,
                type: 1
            })

            /*this.client.createGuildCommand("786013941364424704", {
                name: command.name,
                description: command.description,
                options: command.options,
                type: 1
            })*/
        })
    }
}