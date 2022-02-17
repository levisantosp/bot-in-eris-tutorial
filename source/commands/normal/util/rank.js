import Command from "../../../structures/Command.js"
import Canvacord from "canvacord"
import Member from "../../../database/models/Member.js"

export default class PingCommand extends Command {
    constructor() {
        super()
        this.name = 'rank'
        this.aliases = ['xp', 'level', 'ranking']
        this.description = 'Veja seu rank ou o de outra pessoa'
    }

    async run(message) {
        var member = message.guild.members.get(message.args[0]) || message.member
        const user = await Member.findById(member.id)
        if (!user) return message.channel.createMessage("Este usuário não possui rank.")

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
            message.channel.createMessage('', {
                file: data,
                name: 'rank.png'
            })
        })
    }
}