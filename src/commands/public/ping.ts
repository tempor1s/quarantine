import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'public',
            description: {
                content: 'Check the ping latency to the API',
                examples: ['ping'],
                usages: 'ping',
            },
        })
    }

    public exec(message: Message) {
        return message?.util.reply(
            `The ping to the API is: \`${this.client.ws.ping}ms\``
        )
    }
}
