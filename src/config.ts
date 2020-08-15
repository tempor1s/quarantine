import dotenv from 'dotenv'
dotenv.config()

export const token: string = process.env.DISCORD_TOKEN
export const owners: string[] = process.env.OWNERS.split(',')
export const defaultPrefix: string = process.env.PREFIX
export const logChannel: string = process.env.LOG_CHANNEL
export const googleClientId: string = process.env.GOOGLE_CLIENT_ID
export const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET
export const frontEndUrl: string = process.env.FRONTEND_URL
export const apiUrl: string = process.env.API_URL
export const studentRoleId = process.env.STUDENT_ROLE_ID
export const staffRoleId = process.env.STAFF_ROLE_ID
export const juniorsRoleId = process.env.JUNIORS_ROLE_ID
export const seniorsRoleId = process.env.SENIORS_ROLE_ID
