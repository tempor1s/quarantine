import { Listener } from 'discord-akairo'
import { GuildMember, TextChannel } from 'discord.js'
import log from '../util/logger'
import { logChannel } from '../config'

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
            `Thanks for joining the discord, we hope you enjoy your stay! :) - Student verification coming soon!`
        )

        let channel = this.client.channels.cache.get(logChannel) as TextChannel
        channel.send('Hi!')
    }
}
