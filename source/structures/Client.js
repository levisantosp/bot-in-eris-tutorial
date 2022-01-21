const { Client, Collection } = require("eris")

class App extends Client {
    /**
     * 
     * @param {string} token 
     * @param {string} options 
     */
    constructor(token, options) {
        super(token, options)
        this.commands = new Collection()
        this.aliases = new Collection()
    }

    /**
     * 
     * @param {string} path
     * @param {string} name 
     */
    async eLoad(path, name) {
        const event = new (require(`${path}/${name}`))(this)
        if (event.init) event.init(this)
        this.on(event.name, (...args) => event.run(...args))
    }

    /**
     * 
     * @param {string} path 
     * @param {string} name 
     */
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