require('dotenv').config()

export let token: string = process.env.DISCORD_TOKEN
export let owners: string[] = process.env.OWNERS.split(',')
export let defaultPrefix: string = process.env.PREFIX
export let logChannel: string = process.env.LOG_CHANNEL
export let googleClientId: string = process.env.GOOGLE_CLIENT_ID
export let googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET
export let frontEndUrl: string = process.env.FRONTEND_URL
export let apiUrl: string = process.env.API_URL
export let studentRoleId = process.env.STUDENT_ROLE_ID
export let staffRoleId = process.env.STAFF_ROLE_ID
