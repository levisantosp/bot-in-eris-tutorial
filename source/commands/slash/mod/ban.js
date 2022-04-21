import {Constants} from "eris"
import {Embed} from "eris-addons"
import Command from "../../../structures/Command.js"

export default class BanSlash extends Command {
    constructor(client) {
        super(client);
        this.name = "ban";
        this.description = "Dê ban em meliantes";
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
        embed.setTitle("Banido");
        embed.setDescription("Não seguiu as regras e foi banido");
        embed.addField("Usuário", user.mention, true);
        embed.addField("Moderador", interaction.member.mention, true);
        embed.addField("Motivo", reason);
        embed.setColor("#ff0000");
        this.client.getChannel("966758311082995793").createMessage(embed.build());

        await interaction.guild.banMember(user.id, 0, `Punido por ${interaction.member.username}#${interaction.member.discriminator} | Motivo: ${reason}`);
        interaction.createMessage(`\`${user.username}#${user.discriminator}\` foi banido com sucesso!`);
    }
}