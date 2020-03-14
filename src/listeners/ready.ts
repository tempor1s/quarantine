import { Listener } from 'discord-akairo'
import log from '../util/logger'

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client',
        })
    }

    public exec(): void {
        console.log(`${this.client.user.tag} is online and ready.`)
    }
}
