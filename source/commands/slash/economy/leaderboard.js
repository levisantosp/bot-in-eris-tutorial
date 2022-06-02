import Command from "../../../structures/Command.js"
import User from "../../../database/models/User.js"
import {Embed} from "eris-addons"

export default class LeaderboardSlash extends Command {
    constructor(client) {
        super(client);
        this.name = "leaderboard"
        this.description = "Top 10 usuários com mais coins"
    }
    async run(interaction) {
        const users = await User.find({coins: {$gt: 0}});
        users.sort((a, b) => b.coins - a.coins).slice(0, 10);
        const embed = new Embed();
        embed.setTitle("Top 10 usuários com mais coins");
        var a = 1;
        for(const user of users) {
            const u = await this.client.getRESTUser(user.id);
            embed.addField(`${a++}° ${u.username}#${u.discriminator}`, `${user.coins.toLocaleString()} coins`);
        }
        interaction.createMessage(embed.build());
    }
}