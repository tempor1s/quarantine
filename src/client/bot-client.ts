import { CommandHandler, ListenerHandler, AkairoClient } from 'discord-akairo'
import { join } from 'path'
import { defaultPrefix, owners } from '../config'

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        config: BotOptions
    }
}

interface BotOptions {
    token?: string
    onwers?: string | string[]
}

export default class BotClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        prefix: defaultPrefix,
        ignorePermissions: owners,
        handleEdits: true,
        commandUtil: true,
    })

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, '..', 'listeners'),
    })

    public constructor(config: BotOptions) {
        super({
            ownerID: process.env.OWNER,
            shards: 'auto',
            disableMentions: 'everyone',
        })

        this.config = config
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        })

        console.log('registering command handler')
        this.commandHandler.loadAll()
        console.log('registering listener handler')
        this.listenerHandler.loadAll()
    }

    public async start(): Promise<string> {
        await this._init()
        return this.login(this.config.token)
    }
}
