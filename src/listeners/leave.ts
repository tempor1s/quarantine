import { Listener } from 'discord-akairo'
import { GuildMember, TextChannel, MessageEmbed } from 'discord.js'
import log from '../util/logger'
import { logChannel, frontEndUrl } from '../config'

export default class LeaveListener extends Listener {
    public constructor() {
        super('Guild Member Remove', {
            emitter: 'client',
            event: 'guildMemberRemove',
            category: 'client',
        })
    }

    public exec(member: GuildMember): void {
        log.info(`${member.user.tag} (${member.id}) has left the server.`)

        let channel = this.client.channels.cache.get(logChannel) as TextChannel
        channel.send(
            `${member.user.tag} (${member.id}) has **left** the server.`
        )
    }
}
