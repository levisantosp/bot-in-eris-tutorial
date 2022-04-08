import Command from "../../../structures/Command.js"
import User from "../../../database/models/User.js"

export default class CoinsSlash extends Command {
    constructor() {
        super()
        this.name = "coins"
        this.aliases = ["bal", "balance", "atm"]
    }
    async run(message) {
        const member = message.guild.members.get(message.args[0])
        if (!member) return message.channel.createMessage("Informe o ID de alguém.")
        const user = await User.findById(member.id) || new User({_id: member.id})
        message.channel.createMessage(member.id == message.member.id ? `Você tem **${user.coins} coins**.` : `${member.mention} tem **${user.coins} coins**.`)
    }
}