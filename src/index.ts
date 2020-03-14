require('dotenv').config()
import BotClient from './client/bot-client'

let token = process.env.DISORD_TOKEN

const client = new BotClient({ token })

client.start()
