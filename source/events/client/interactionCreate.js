import {CommandInteraction} from "eris"
import Event from "../../structures/Event.js"

export default class InterationCreateEvent extends Event {
    constructor(client) {
        super(client)
        this.name = "interactionCreate"
    }
    async run(interaction) {
        if ((interaction instanceof CommandInteraction)) {
            var cmd = this.client.slashCommands.get(interaction.data.name)
            await interaction.defer()
            if (interaction.user) return interaction.createMessage("Eu ainda não suporto comandos com barra na minha DM. Tente em um servidor.")

            interaction.guild = this.client.guilds.get(interaction.guildID)
            if (cmd) cmd.run(interaction)
        }
    }
}