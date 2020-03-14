require('dotenv').config()

export let token: string = process.env.DISCORD_TOKEN
export let owners: string[] = process.env.OWNERS.split(',')
export let defaultPrefix: string = process.env.PREFIX
export let logChannel: string = process.env.LOG_CHANNEL
