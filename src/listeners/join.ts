import { Listener } from 'discord-akairo'
import { GuildMember, TextChannel } from 'discord.js'
import log from '../util/logger'
import { logChannel, baseUrl } from '../config'

export default class JoinListener extends Listener {
    public constructor() {
        super('Guild Member Add', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client',
        })
    }

    public exec(member: GuildMember): void {
        log.info(`${member.id} is now in the server.`)

        member.user.send(
            `Welcome to Make School's Covid 19 Hideout - Please verify yourself here using your Make School email! ${baseUrl}?uid=${member.id}`
        )

        let channel = this.client.channels.cache.get(logChannel) as TextChannel
        channel.send(`${member.user.tag} (${member.id}) has joined the server.`)
    }
}
