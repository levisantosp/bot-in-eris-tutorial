import Command from "../../../structures/Command.js"

export default class PingCommand extends Command {
    constructor() {
        super()
        this.name = 'ping'
        this.description = 'Veja o ping do bot'
    }

    async run(interaction) {
        await interaction.createMessage('Pong!')
        interaction.editOriginalMessage(`Pong! \`${Date.now() - interaction.createdAt}ms\``)
    }
}