import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class HouseAutoAssign extends Command {
    public constructor() {
        super('house-assign', {
            aliases: ['house-assign'],
            category: 'Private',
            description: {
                content: 'Set up the auto role for houses.',
                examples: ['house-assign'],
                usages: 'house-assign',
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

        createHouseEmbedAndReact(msg.channel)
    }
}

export function createHouseEmbedAndReact(channel: TextChannel) {
    const embed = new MessageEmbed()
        .setTitle('House Role Assignment')
        .setDescription(
            'React to this message to either add or remove a house role from yourself.'
        )
        .addField('Codingclaw', '<:codingclaw:698002856841707640>', true)
        .addField('Gamingdor', '<:gamindor:698002289805230150>', true)
        .addField('Justicin', '<:justicin:698002289964613712>', true)
        .addField('Growtherin', '<:growtherin:698002290719719489>', true)

    channel.send(embed).then((msg) => {
        const m = Array.isArray(msg) ? msg[0] : msg

        m.react(RoleReactions.CODINGCLAW)
            .then(() => m.react(RoleReactions.GAMINGDOR))
            .then(() => m.react(RoleReactions.JUSTICIN))
            .then(() => m.react(RoleReactions.GROWTHERIN))
    })
}
