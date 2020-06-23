import { Listener } from 'discord-akairo'
import { TextChannel } from 'discord.js'
import { createConcEmbedAndReact } from '../commands/private/concen-assign'
import { DiscordChannel } from '../util/channel.util'
import log from '../util/logger'
import { createLangEmbedAndReact } from '../commands/private/lang-assign'

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client',
        })
    }

    public exec(): void {
        log.info(`${this.client.user.tag} is online and ready.`)

        // Set presence
        this.client.user.setActivity(' through a hazmat suit.', {
            type: 'WATCHING',
        })

        let channel = this.client.channels.cache.get(
            DiscordChannel.ROLE_SELF_ASSIGN
        ) as TextChannel

        channel.messages
            .fetch({ limit: 5 })
            .then((fetched) => {
                channel.bulkDelete(fetched)
            })
            .then(() => createConcEmbedAndReact(channel))
            .then(() => createLangEmbedAndReact(channel))
    }
}
