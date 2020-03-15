require('dotenv').config()
import BotClient from './client/bot-client'
import { token } from './config'

// Create a new bot client
const client = new BotClient({ token })

// Start the bot and server
client.start().then(require('./server/server')(client))

