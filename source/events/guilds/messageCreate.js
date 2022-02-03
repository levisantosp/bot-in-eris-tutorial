const Event = require("../../structures/Event");
const Member = require("../../database/models/Member");

module.exports = class MessageCreate extends Event {
    constructor() {
        super();
        this.name = 'messageCreate'
    }

    async run(message) {
        if (message.author.bot) return;
        const member = await Member.findById(message.author.id) || new Member({_id: message.author.id});
        
        var xpGain = Math.floor(Math.random() * 100);
        member.xp += xpGain
        member.save();

        if (member.xp > member.xpRequired) {
            const m = await Member.findById(message.author.id);
            m.level += 1
            m.xpRequired *= 1.15
            m.xp = 0
            m.xpRequired = parseInt(m.xpRequired);
            m.save();
            message.channel.createMessage(`${message.author.mention} Parabéns! Você upou para o nivel **${m.level}**! Continue interagindo no chat.`);

            if (m.level >= 1) message.member.addRole('915238065834983514', 'Upou de nivel');
        }
    }
}