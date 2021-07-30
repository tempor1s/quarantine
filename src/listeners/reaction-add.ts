import { Listener } from 'discord-akairo'
import { MessageReaction, User, TextChannel } from 'discord.js'
import {
    CHANNEL_ROLE_SELF_ASSIGN,
    isInRequiredChannel,
} from '../util/channel.util'
import { RoleReactions } from '../util/message.util'
import { DiscordRole } from '../util/user.util'

export default class ReactionAddListener extends Listener {
    public constructor() {
        super('Reaction Add', {
            emitter: 'client',
            event: 'messageReactionAdd',
            category: 'client',
        })
    }

    public exec(messageReaction: MessageReaction, user: User): void {
        if (user.bot) {
            return
        }

        if (!(messageReaction.message.channel instanceof TextChannel)) {
            return
        }

        if (
            isInRequiredChannel(
                messageReaction.message.channel,
                ...CHANNEL_ROLE_SELF_ASSIGN
            )
        ) {
            onRoleSelfAssignReact(messageReaction, user)
            return
        }
    }
}

function onRoleSelfAssignReact(messageReaction: MessageReaction, user: User) {
    let role: DiscordRole | undefined

    switch (messageReaction.emoji.id) {
        // Concentration roles
        case RoleReactions.BEW:
            role = DiscordRole.BEW
            break
        case RoleReactions.FEW:
            role = DiscordRole.FEW
            break
        case RoleReactions.DS:
            role = DiscordRole.DS
            break
        case RoleReactions.MOB:
            role = DiscordRole.MOB
            break
        // Language specific
        case RoleReactions.PYTHON:
            role = DiscordRole.PYTHON
            break
        case RoleReactions.JAVASCRIPT:
            role = DiscordRole.JAVASCRIPT
            break
        case RoleReactions.GO:
            role = DiscordRole.GO
            break
        case RoleReactions.RUST:
            role = DiscordRole.RUST
            break
        case RoleReactions.C:
            role = DiscordRole.C
            break
        case RoleReactions.CPLUSPLUS:
            role = DiscordRole.CPLUSPLUS
            break
        case RoleReactions.CSHARP:
            role = DiscordRole.CSHARP
            break
        case RoleReactions.JAVA:
            role = DiscordRole.JAVA
            break
        case RoleReactions.RUBY:
            role = DiscordRole.RUBY
            break
        case RoleReactions.SWIFT:
            role = DiscordRole.SWIFT
            break
        case RoleReactions.REACT:
            role = DiscordRole.REACT
            break
        // Game specific
        case RoleReactions.FPS:
            role = DiscordRole.FPS
            break
        case RoleReactions.MOBA:
            role = DiscordRole.MOBA
            break
        case RoleReactions.BR:
            role = DiscordRole.BR
            break
        // Misc specific
        case RoleReactions.EVENTS:
            role = DiscordRole.EVENTS
            break
        default:
            break
    }

    if (role) {
        messageReaction.message.guild.members.fetch(user).then((user) => {
            if (!user) {
                return
            }

            if (user.roles.cache.has(role)) {
                user.roles.remove(role)
            } else {
                user.roles.add(role)
            }
        })
    }

    messageReaction.users.remove(user)
}
