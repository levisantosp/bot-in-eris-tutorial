const { Client, Collection } = require("eris");
const mongoose = require("mongoose");

class App extends Client {
    /**
     * 
     * @param {string} token Insira o token do bot
     * @param {string} options 
     */
    constructor(token, options) {
        super(token, options)
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    /**
     * 
     * @param {string} path Caminho do arquivo
     * @param {string} name Arquivo JavaScript
     */
     eLoad(path, name) {
        const event = new (require(`${path}/${name}`))(this);
        if (event.init) event.init(this);
        this.on(event.name, (...args) => event.run(...args));
    }

    /**
     * 
     * @param {string} path Caminho do arquivo
     * @param {string} name Arquivo JavaScript
     */
     cLoad(path, name) {
        const cmd = new (require(`${path}/${name}`))(this);
        if (cmd.init) cmd.init(this);

        this.commands.set(cmd.name, cmd);
        if (cmd.aliases != Array) {
            cmd.aliases.forEach(alias => {
                this.aliases.set(alias, cmd.name);
            });
        }
    }

    async login() {
        await mongoose.connect(process.env.database_url);
        console.log('Conectado ao banco de dados com sucesso!');
        this.connect();
    }
}

const client = new App(process.env.token);

module.exports = client