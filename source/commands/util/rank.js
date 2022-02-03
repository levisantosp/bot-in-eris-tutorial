const Command = require("../../structures/Command");
const {Rank} = require("canvacord");
const Member = require("../../database/models/Member");

module.exports = class PingCommand extends Command {
    constructor() {
        super()
        this.name = 'rank'
        this.aliases = ['xp', 'level', 'ranking']
        this.description = 'Veja o ping do bot'
    }

    async run(message) {
        var member = message.guild.members.get(message.args[0]) || message.member;
        const user = await Member.findById(member.id);
        if (!user) return message.channel.createMessage("Este usuário não possui rank.");

        const rank = new Rank()
        .setAvatar(member.avatarURL)
        .setCurrentXP(user.xp)
        .setRequiredXP(user.xpRequired)
        .setLevel(user.level)
        .setRank(0, 'a', false)
        .setUsername(member.username)
        .setDiscriminator(member.discriminator)
        .setProgressBar("#FFFFFF", "COLOR");

        rank.build()
        .then(data => {
            message.channel.createMessage('', {
                file: data,
                name: 'rank.png'
            });
        });
    }
}