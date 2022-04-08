import Command from "../../../structures/Command.js"
import User from "../../../database/models/User.js"

export default class CoinsSlash extends Command {
    constructor() {
        super()
        this.name = "coins"
        this.description = "Veja seus coins"
        this.options = [
            {
                name: "user",
                description: "Informe o usuário",
                type: 6,
                required: true
            }
        ]
    }
    async run(interaction) {
        interaction.data.resolved.members.forEach(async member => {
            const user = await User.findById(member.id) || new User({_id: member.id})
            interaction.createMessage(member.id == interaction.member.id ? `Você tem **${user.coins} coins**.` : `${member.mention} tem **${user.coins} coins**.`)
        })
    }
}