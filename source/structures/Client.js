import {Client, Collection} from "eris"
import mongoose from "mongoose"
import fs from "fs"

export default class App extends Client {
    /**
     * @param {string} token Insira o token do bot
     * @param {object} options Client options
     */
    constructor(token, options) {
        super(token, options)
        this.slashCommands = new Collection()
        this.commands = new Collection()
        this.aliases = new Collection()
    }

    /**
     * @param {string} path Caminho do arquivo
     */
     eLoad(path = "source/events") {
        var modules = fs.readdirSync(path)
        modules.forEach(module => {
            var events = fs.readdirSync(`${path}/${module}`)
            events.forEach(async evt => {
                const Event = await import(`../events/${module}/${evt}`)
                const event = new Event.default(this)
                this.on(event.name, (...args) => event.run(...args))
            })
        })
    }

    /**
     * @param {string} path Caminho do arquivo
     */
     cLoad(path = "source/commands/normal") {
        var modules = fs.readdirSync(path)
        modules.forEach(module => {
            var commands = fs.readdirSync(`${path}/${module}`)
            commands.forEach(async command => {
                const Command = await import(`../commands/normal/${module}/${command}`)
                const cmd = new Command.default(this)
                this.commands.set(cmd.name, cmd)
                if (cmd.aliases != Array) {
                    cmd.aliases.forEach(alias => {
                        this.aliases.set(alias, cmd.name)
                    })
                }
            })
        })
    }

    /**
     * @param {string} path Caminho do arquivo
     */
    sLoad(path = "source/commands/slash") {
        var modules = fs.readdirSync(path)
        modules.forEach(module => {
            var commands = fs.readdirSync(`${path}/${module}`)
            commands.forEach(async command => {
                const Command = await import(`../commands/slash/${module}/${command}`)
                const cmd = new Command.default(this)
                this.slashCommands.set(cmd.name, cmd)
            })
        })
    }
    async login() {
        await mongoose.connect(process.env.database_url)
        console.log('Conectado ao banco de dados com sucesso!')
        this.connect()
    }
}