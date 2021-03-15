import { Command } from 'discord-akairo'
import { Message, TextChannel, MessageEmbed } from 'discord.js'
import { DiscordChannel } from '../../util/channel.util'
import { RoleReactions } from '../../util/message.util'

export default class LanguageAutoAssign extends Command {
    public constructor() {
        super('language-assign', {
            aliases: ['language-assign'],
            category: 'Private',
            description: {
                content: 'Setup the autorole command for languages.',
                examples: ['language-assign'],
                usages: 'language-assign',
            },
            userPermissions: ['ADMINISTRATOR'],
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

        createLangEmbedAndReact(msg.channel)
    }
}

export function createLangEmbedAndReact(channel: TextChannel) {
    const embed = new MessageEmbed()
        .setTitle('Language Role Assignment')
        .setDescription(
            'React to this message to either add or remove a language role from yourself'
        )
        .addFields(
            { name: 'Python', value: '<:py:688188532950696052>', inline: true },
            { name: 'JavaScript', value: '<:js:688188532971405313>', inline: true },
            { name: 'Go', value: '<:go:688188532908621965>', inline: true },
            { name: 'Rust', value: '<:rust:696177203356106762>', inline: true },
            { name: 'C', value: '<:c_:688188532417888356>', inline: true },
            { name: 'C++', value: '<:cPP:688188532904296499>', inline: true },
            { name: 'C#', value: '<:csharp:689594656203210813>', inline: true },
            { name: 'Java', value: '<:java:688188533231583328>', inline: true },
            { name: 'Ruby', value: '<:ruby:689594656623034402>', inline: true },
            { name: 'Swift', value: '<:swift:688188533013610504>', inline: true },
            { name: 'React', value: '<:react:688290715876458528>', inline: true }
        )
        .setFooter('https://github.com/tempor1s/quarantine')

    channel.send(embed).then((msg) => {
        const m = Array.isArray(msg) ? msg[0] : msg

        m.react(RoleReactions.PYTHON)
            .then(() => m.react(RoleReactions.JAVASCRIPT))
            .then(() => m.react(RoleReactions.GO))
            .then(() => m.react(RoleReactions.RUST))
            .then(() => m.react(RoleReactions.C))
            .then(() => m.react(RoleReactions.CPLUSPLUS))
            .then(() => m.react(RoleReactions.CSHARP))
            .then(() => m.react(RoleReactions.JAVA))
            .then(() => m.react(RoleReactions.RUBY))
            .then(() => m.react(RoleReactions.SWIFT))
            .then(() => m.react(RoleReactions.REACT))
    })
}
