import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class GameAutoAssign extends Command {
    public constructor() {
        super('game-assign', {
            aliases: ['game-assign'],
            category: 'Private',
            description: {
                content: 'Setup the autorole command for game roles.',
                examples: ['game-assign'],
                usages: 'game-assign',
            },
            userPermissions: ['ADMINISTRATOR'],
            ratelimit: 3,
        })
    }

    public exec(msg: Message) {
        if (!(msg.channel instanceof TextChannel)) {
            return
        }

        if (!DiscordChannel.ROLE_SELF_ASSIGN.includes(msg.channel.id)) {
            return
        }

        msg.delete()

        createGameEmbedAndReact(msg.channel)
    }
}

export function createGameEmbedAndReact(channel: TextChannel) {
    const embed = new MessageEmbed()
        .setTitle('Game Role Assignment')
        .setDescription(
            'React to this message to either add or remove a game role from yourself'
        )
        .addFields(
            { name: 'BR', value: '<:fortnite:751243633016963133>', inline: true },
            { name: 'FPS', value: '<:valorant:751236857949585428>', inline: true },
            { name: 'MOBA', value: '<:league:751237248586088548>', inline: true }
        )
        .setFooter('https://github.com/tempor1s/quarantine')

    channel.send(embed).then((msg) => {
        const m = Array.isArray(msg) ? msg[0] : msg

        m.react(RoleReactions.FPS)
            .then(() => m.react(RoleReactions.MOBA))
            .then(() => m.react(RoleReactions.BR))
    })
}
