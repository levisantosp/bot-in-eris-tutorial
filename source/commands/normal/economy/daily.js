import Command from "../../../structures/Command.js"
import ms from "enhanced-ms"
import User from "../../../database/models/User.js"

export default class DailySlash extends Command {
    constructor() {
        super()
        this.name = "daily"
        this.aliases = ["diário", "diario", "bolsafamília"]
    }
    async run(message) {
        const user = await User.findById(message.member.id) || new User({_id: message.member.id})
        const cooldown = 8.64e+7
        
        if (user.lastDaily && cooldown - (Date.now() - user.lastDaily) > 0) {
            var time = ms(cooldown - (Date.now() - user.lastDaily))
            message.channel.createMessage(`Calma lá, meu patrão! Você já recebeu sua recompensa diária. Volte em **${time}**.`)
        }
        else {
            var coins = Math.floor(Math.random() * (5000 - 2000) + 2000)
            user.coins += coins
            user.lastDaily = Date.now()
            user.save()
            message.channel.createMessage(`Parabéns, no daily de hoje você recebeu **${coins} coins**.`)
        }
    }
}