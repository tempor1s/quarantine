import { GuildMember } from 'discord.js'

export enum DiscordRole {
    PYTHON = '688167533660078214',
    JAVASCRIPT = '688167663381643308',
    GO = '688169256898396175',
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
}

export function isAdmin(user: GuildMember) {
    return user.hasPermission('ADMINISTRATOR')
}

export function hasRole(user: GuildMember, role: string) {
    return user.roles.cache.some(r => r.id === role)
}
