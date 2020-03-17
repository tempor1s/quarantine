import { Listener } from 'discord-akairo'
import { GuildMember, TextChannel, MessageEmbed } from 'discord.js'
import log from '../util/logger'
import { logChannel, frontEndUrl } from '../config'

export default class JoinListener extends Listener {
    public constructor() {
        super('Guild Member Add', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client',
        })
    }

    public exec(member: GuildMember): void {
        log.info(`${member.user.tag} (${member.id}) has joined the server.`)

        let link = `${frontEndUrl}?uid=${member.id}`

        let embed = new MessageEmbed()
            .setTitle("Welcome to Make School's COVID-19 Hideout")
            .setDescription(
                `Please verify yourself using your **Make Shool** email - ${link}`
            )

        member.user.send(embed)

        let channel = this.client.channels.cache.get(logChannel) as TextChannel
        channel.send(
            `${member.user.tag} (${member.id}) has **joined** the server.`
        )
    }
}
