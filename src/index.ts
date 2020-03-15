require('dotenv').config()
import BotClient from './client/bot-client'
import { token } from './config'

const client = new BotClient({ token })

client.start().then(require('./server/server')(client))

// require('./server/server')(client)
