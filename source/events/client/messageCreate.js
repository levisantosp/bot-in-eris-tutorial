const Event = require("../../structures/Event")

module.exports = class MessageCreateEvent extends Event {
    constructor() {
        super()
        this.name = 'messageCreate'
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === 0) {
            if (message.content.toLowerCase().startsWith(process.env.prefix.toLowerCase())) {
                let messageArray = message.content.split(" ");
                let command = messageArray.shift().toLowerCase();
                let args = messageArray.slice(0);
                let cmd = this.client.commands.get(command.slice(process.env.prefix.length)) || this.client.commands.get(this.client.aliases.get(command.slice(process.env.prefix.length)));
                message.args = args
                message.guild = this.client.guilds.get(message.guildID);
                if (cmd) cmd.run(message);
            }
        }
    }
}