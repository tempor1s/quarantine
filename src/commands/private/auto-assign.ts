import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class RoleAssignCommand extends Command {
    public constructor() {
        super('auto-assign', {
            aliases: ['auto-assign'],
            category: 'Private',
            description: {
                content: 'Setup the autorole command.',
                examples: ['auto-assign'],
                usages: 'auto-assign',
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
            .setTitle('Role Self Assign')
            .setDescription(
                'React to this role to either add or remove a roll to yourself'
            )
            .addField('Python', '<:py:688188532950696052>', true)
            .addField('JavaScript', '<:js:688188532971405313>', true)
            .addField('Go', '<:go:688188532908621965>', true)
            .addField('C', '<:c_:688188532417888356>', true)
            .addField('C++', '<:cPP:688188532904296499>', true)
            .addField('C#', '<:csharp:689594656203210813>', true)
            .addField('Java', '<:java:688188533231583328>', true)
            .addField('Ruby', '<:ruby:689594656623034402>', true)
            .addField('Swift', '<:swift:688188533013610504>', true)
            .addField('React', '<:react:688290715876458528>', true)
            .setFooter('https://github.com/tempor1s/quarantine')

        msg.channel.send(embed).then(msg => {
            const m = Array.isArray(msg) ? msg[0] : msg

            m.react(RoleReactions.PYTHON)
                .then(() => RoleReactions.JAVASCRIPT)
                .then(() => RoleReactions.GO)
                .then(() => RoleReactions.C)
                .then(() => RoleReactions.CPLUSPLUS)
                .then(() => RoleReactions.CSHARP)
                .then(() => RoleReactions.JAVA)
                .then(() => RoleReactions.RUBY)
                .then(() => RoleReactions.SWIFT)
                .then(() => RoleReactions.REACT)
        })
    }
}
