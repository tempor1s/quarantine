import { Channel } from 'discord.js'

export enum DiscordGuild {
    MAIN = '88164329199108176',
    TEST = '536328150783623189',
}

export enum DiscordChannel {
    ROLE_SELF_ASSIGN = '689578411425005720',
    LOG_CHANNEL = '688188186916421651',
}

export enum TestDiscordChannel {
    ROLE_SELF_ASSIGN = '689578279799488692',
    LOG_CHANNEL = '688294056517697548',
}

export const CHANNEL_ROLE_SELF_ASSIGN: string[] = [
    DiscordChannel.ROLE_SELF_ASSIGN,
    TestDiscordChannel.ROLE_SELF_ASSIGN,
]

export const CHANNEL_LOGGING: string[] = [
    DiscordChannel.LOG_CHANNEL,
    TestDiscordChannel.LOG_CHANNEL,
]

export function isInRequiredChannel(
    channel: Channel,
    ...requiredChannel: string[]
): boolean {
    return requiredChannel.includes(channel.id)
}
