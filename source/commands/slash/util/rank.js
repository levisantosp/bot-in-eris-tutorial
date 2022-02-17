import Command from "../../../structures/Command.js"
import Canvacord from "canvacord"
import Member from "../../../database/models/Member.js"

export default class PingCommand extends Command {
    constructor() {
        super()
        this.name = 'rank'
        this.description = 'Veja seu rank ou o de outra pessoa'
        this.options = [
            {
                name: "member",
                description: "Informe o usuário",
                type: 6,
                required: true
            }
        ]
    }

    async run(interaction) {
        interaction.data.resolved.members.forEach(async member => {
            const user = await Member.findById(member.id)
            if (!user) return interaction.createMessage("Este usuário não possui rank.")
            const rank = new Canvacord.Rank()
            .setAvatar(member.avatarURL)
            .setCurrentXP(user.xp)
            .setRequiredXP(user.xpRequired)
            .setLevel(user.level)
            .setRank(0, 'a', false)
            .setUsername(member.username)
            .setDiscriminator(member.discriminator)
            .setProgressBar("#FFFFFF", "COLOR")
    
            rank.build()
            .then(data => {
                interaction.createMessage("", {
                    file: data,
                    name: "rank.png"
                })
            })
        })
    }
}