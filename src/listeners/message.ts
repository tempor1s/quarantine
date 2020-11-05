import { Listener } from 'discord-akairo'
import { TextChannel, Message} from 'discord.js'

// AudiListener will react to every message that audi sends with reactions
export default class AudiListener extends Listener {
    public constructor() {
        super('Audi Meme Machine', {
            emitter: 'client',
            event: 'message',
            category: 'client',
        })
    }

    // react :)
    public async exec(message: Message): Promise<void> {
        // only react if the author is audi
        if (message.author.id === "106975614895955968") {
            await message.react("746163149245513809") // audi
            await message.react("772161673866903575") // peepoPing
        }
    }
}
