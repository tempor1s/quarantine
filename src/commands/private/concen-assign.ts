import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class ConcentrationAutoAssign extends Command {
    public constructor() {
        super('conc-assign', {
            aliases: ['conc-assign'],
            category: 'Private',
            description: {
                content: 'Setup the autorole command for concentrations.',
                examples: ['conc-assign'],
                usages: 'conc-assign',
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

        const embed = new MessageEmbed()
            .setTitle('Concentration Role Assignment')
            .setDescription(
                'React to this message to either add or remove a concentration role from yourself'
            )
            .addField('Back-End Web', '<:bew:689675211074830407>', true)
            .addField('Front-End Web', '<:few:689674898515427366>', true)
            .addField('Data Science', '<:ds:689674423107584032>', true)
            .addField('Mobile', '<:mob:689674737982504991>', true)
            .setFooter('https://github.com/tempor1s/quarantine')

        msg.channel.send(embed).then(msg => {
            const m = Array.isArray(msg) ? msg[0] : msg

            m.react(RoleReactions.BEW)
                .then(() => m.react(RoleReactions.FEW))
                .then(() => m.react(RoleReactions.DS))
                .then(() => m.react(RoleReactions.MOB))
        })
    }
}
