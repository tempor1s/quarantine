import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class SarcasmCommand extends Command {
    public constructor() {
        super('sarcasm', {
            aliases: ['s'],
            category: 'public',
            prefix: '\\s',
            description: {
                content: 'Make a text sarcastic!',
                examples: ['\\ss kevin is bad!'],
                usages: '\\ss',
            },
            args: [
                {
                    id: 'msg',
                    type: 'string',
                    match: 'content',
                },
            ],
        })
    }

    public exec(message: Message, { msg }: { msg: string }) {
        if (!msg)
            return message.util?.reply(
                'Please specify a message to sarcastify.'
            )

        return message.util?.send(
            msg
                .split('')
                .map((letter) =>
                    Math.random() < 0.5
                        ? letter.toUpperCase()
                        : letter.toLowerCase()
                )
                .join('')
        )
    }
}
