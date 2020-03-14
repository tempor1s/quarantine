import { CommandHandler, ListenerHandler, AkairoClient } from 'discord-akairo'
import { Message } from 'discord.js'
import { join } from 'path'

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        config: BotOptions
    }
}

interface BotOptions {
    token?: string
}

export default class BotClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        prefix: process.env.PREFIX,
        ignorePermissions: process.env.OWNER,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5, // 5 minutes
        defaultCooldown: 1e4, // 1 minute
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str): string =>
                    `${str}\n\n Type \`cancel\` to cancel the command...`,
                modifyRetry: (_, str): string =>
                    `${str}\n\n Type \`cancel\` to cancel the command...`,
                timeout: 'You took too long, the command has been cancelled.',
                ended:
                    'You exceeded the maximum amount of tries, the command has now been cancelled.',
                retries: 3,
                time: 3e4, // 30 seconds
            },
            otherwise: '',
        },
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

        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
    }

    public async start(): Promise<string> {
        await this._init()
        return this.login(this.config.token)
    }
}
