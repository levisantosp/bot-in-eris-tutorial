import Command from "../../../structures/Command.js"

export default class PingCommand extends Command {
    constructor() {
        super()
        this.name = 'ping'
        this.aliases = ['latency']
        this.description = 'Veja o ping do bot'
    }

    async run(message) {
        let msg = await message.channel.createMessage('Pong!')
        msg.edit(`Pong! \`${Date.now() - msg.timestamp}ms\``)
    }
}