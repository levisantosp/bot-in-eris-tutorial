const { Client, Collection } = require("eris")

class App extends Client {
    constructor(token, options) {
        super(token, options)
        this.commands = new Collection()
        this.aliases = new Collection()
    }

    async eLoad(path, name) {
        const event = new (require(`${path}/${name}`))(this)
        if (event.init) event.init(this)
        this.on(event.name, (...args) => event.run(...args))
    }
    async cLoad(path, name) {
        const cmd = new (require(`${path}/${name}`))(this)
        if (cmd.init) cmd.init(this)

        this.commands.set(cmd.name, cmd)
        if (cmd.aliases != Array) {
            cmd.aliases.forEach(alias => {
                this.aliases.set(alias, cmd.name)
            })
        }
    }
}

const client = new App(process.env.token)

module.exports = client