import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class MiscAutoAssign extends Command {
    public constructor() {
        super('misc-assign', {
            aliases: ['misc-assign'],
            category: 'Private',
            description: {
                content: 'Setup the autorole command for misc roles.',
                examples: ['misc-assign'],
                usages: 'misc-assign',
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

        createMiscEmbedAndReact(msg.channel)
    }
}

export function createMiscEmbedAndReact(channel: TextChannel) {
    const embed = new MessageEmbed()
        .setTitle('Misc Role Assignment')
        .setDescription(
            'React to this message to either add or remove a misc role from yourself'
        )
        .addField('Job Search', '<:linkedin:751181905759830096>')
        .addField('Herbert Resident', '<:herbert:751244133548687500>', true)
        .setFooter('https://github.com/tempor1s/quarantine')

    channel.send(embed).then((msg) => {
        const m = Array.isArray(msg) ? msg[0] : msg

        m.react(RoleReactions.JOBSEARCH).then(() =>
            m.react(RoleReactions.HERBERT)
        )
    })
}
