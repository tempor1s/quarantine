import { GuildMember } from 'discord.js'

export enum DiscordRole {
    PYTHON = '688167533660078214',
    JAVASCRIPT = '688167663381643308',
    GO = '688169256898396175',
    RUST = '696177063694041108',
    C = '688169952548618288',
    CPLUSPLUS = '688169534258937965',
    CSHARP = '688169387790041143',
    JAVA = '688169571034726460',
    RUBY = '688169670469222455',
    SWIFT = '688169792842367026',
    REACT = '688180347980218369',
    BEW = '688182070593454081',
    FEW = '688181945879756803',
    MOB = '688182340245389350',
    DS = '688182262746841108',
    JOBSEARCH = '750123073566539878',
    HERBERT = '745374306124562615',
    MOBA = '751253051364605952',
    FPS = '751253089360674946',
    BR = '751253145769869354',
}

export function isAdmin(user: GuildMember) {
    return user.hasPermission('ADMINISTRATOR')
}

export function hasRole(user: GuildMember, role: string) {
    return user.roles.cache.some((r) => r.id === role)
}
