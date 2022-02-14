## Como fazer um bot para Discord usando o Eris.
> Para ter acesso aos vídeos, [clique aqui](https://www.youtube.com/channel/UC-LDvTLZatxZsS-R_yMlkMQ).

## Instalação
```
npm i eris
```

## Exemplo
~~~javascript
import {Client} from "eris"
const client = new Client('Bot token here')

client.on('messageCreate', message => {
    if (message.content.toLowerCase() === "!test") {
        message.channel.createMessage("Olá, mundo!")
    }
})

client.connect()

~~~