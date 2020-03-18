import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class FlipCommand extends Command {
    public constructor() {
        super('flip', {
            aliases: ['flip', 'choice'],
            category: 'Public',
            description: {
                content: 'Flip a coin :)',
                examples: ['flip'],
                usages: 'flip',
            },
            ratelimit: 3,
        })
    }

    public exec(message: Message) {
        return message.util.reply(
            `You flipped: \`${Math.random() < 0.5 ? 'Heads' : 'Tails'}\``
        )
    }
}
