import {Constants} from "eris"
import {Embed} from "eris-addons"
import Command from "../../../structures/Command.js"

export default class BanSlash extends Command {
    constructor(client) {
        super(client);
        this.name = "unban";
        this.description = "Dê unban em meliantes";
        this.options = [
            {
                name: "user",
                type: Constants.ApplicationCommandOptionTypes.USER,
                description: "Informe o usuário",
                required: true
            },
            {
                name: "motivo",
                type: Constants.ApplicationCommandOptionTypes.STRING,
                description: "Informe o motivo da punição",
                required: true
            }
        ];
    }
    async run(interaction) {
        const user = await this.client.getRESTUser(interaction.data.options[0].value);
        var reason = interaction.data.options[1].value;

        const embed = new Embed();
        embed.setTitle("Desbanido");
        embed.setDescription("Se arrependeu e foi desbanido");
        embed.addField("Usuário", user.mention, true);
        embed.addField("Moderador", interaction.member.mention, true);
        embed.addField("Motivo", reason);
        embed.setColor("#ff0000");
        this.client.getChannel("966758311082995793").createMessage(embed.build());

        await interaction.guild.unbanMember(user.id, `Punido por ${interaction.member.username}#${interaction.data.discriminator} | Motivo: ${reason}`);
        interaction.createMessage(`\`${user.username}#${user.discriminator}\` foi desbanido com sucesso!`);
    }
}