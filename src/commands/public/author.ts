import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class AuthorCommand extends Command {
    public constructor() {
        super('author', {
            aliases: ['author', 'dad', 'creator', 'developer'],
            category: 'Public',
            description: {
                content: 'Someone had to make me.',
                examples: ['author'],
                usages: 'author',
            },
            ratelimit: 3,
        })
    }

    public exec(message: Message) {
        return message.util.reply(
            'Quarantine is brought to by temporis (Ben L) with an amazing frontend by Alex Barksdale'
        )
    }
}
