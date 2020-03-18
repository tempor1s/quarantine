import { Listener } from 'discord-akairo'
import { TextChannel, User } from 'discord.js'

export default class JoinListener extends Listener {
    public constructor() {
        super('Raw Event', {
            emitter: 'client',
            event: 'raw',
            category: 'client',
        })
    }

    public exec(packet: any): void {
        // Ignore all events that are not reaction based - this raw randler is for reactions
        if (
            [!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE']].includes(
                packet.t
            )
        ) {
            return
        }

        // Get channel and make sure it is a text channel
        const channel = this.client.channels.cache.get(packet.d.channel_id)
        if (!(channel instanceof TextChannel)) {
            return
        }

        // Check if message is already in cache
        if (channel.messages.cache.has(packet.d.message_id)) {
            return
        }

        channel.messages.fetch(packet.d.message_id).then(message => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = packet.d.emoji.id
                ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
                : packet.d.emoji.name

            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = message.reactions.cache.get(emoji)

            // Adds the currently reacting user to the reaction's users collection
            if (reaction) {
                reaction.users.cache.set(
                    packet.d.user_id,
                    <User>this.client.users.cache.get(packet.d.user_id)
                )
            }

            if (packet.t === 'MESSAGE_REACTION_ADD') {
                this.client.emit(
                    'messageReactionAdd',
                    reaction,
                    this.client.users.cache.get(packet.d.user_id)
                )
            } else if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                this.client.emit(
                    'messageReactionRemote',
                    reaction,
                    this.client.users.cache.get(packet.d.user_id)
                )
            }
        })
    }
}
